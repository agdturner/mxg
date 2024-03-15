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
 * The font sizes for different levels of the GUI.
 */ let fontSize1 = "1.5em";
let fontSize2 = "1.25em";
let fontSize3 = "1.0em";
let fontSize4 = "0.75em";
/**
 * Margins for spacing GUI components.
 */ let margin0 = "0px";
let margin1 = "1px";
let margin2 = "2px";
let margin5 = "5px";
let margin25 = "25px";
let margin50 = "50px";
let margin75 = "75px";
/**
 * Units for different things.
 */ let unitsEnergy = [
    "kJ/mol",
    "cm-1",
    "kcal/mol",
    "Hartree"
];
let unitsRotConsts = [
    "cm-1",
    "GHz"
];
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
 * The conditions.
 */ let conditions;
/**
 * The model parameters.
 */ let modelParameters;
/**
 * The control.
 */ let control;
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
 * The XML title and text elements.
 */ let xml_title;
let xml_text;
/**
 * Load the XML file.
 */ function loadXML() {
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
    // Set up for XML loading.
    window.loadXML = function() {
        loadXML();
    //reload();
    };
});
/**
 * Parse the XML.
 * @param {XMLDocument} xml 
 */ function parse(xml) {
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
        mesmer.setTitle(titleNode);
        // Create a new div element for the input.
        let divElement = document.createElement("div");
        divElement.style.marginTop = margin1;
        divElement.style.marginBottom = margin1;
        // Create a text node.
        let textNode = document.createTextNode("Title: ");
        divElement.appendChild(textNode);
        // Create a new input element.
        let inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = title;
        inputElement.style.fontSize = fontSize1;
        divElement.appendChild(inputElement);
        // Add the new div element to the parent of the titleElement.
        titleElement.parentNode?.insertBefore(divElement, titleElement);
        // Remove the original titleElement.
        titleElement.parentNode?.removeChild(titleElement);
        (0, _htmlJs.resizeInputElement)(inputElement, 0);
        console.log("inputElement.value=" + inputElement.value);
        // Add event listener to inputElement.
        inputElement.addEventListener("change", function() {
            if (inputElement.value != title) titleNode.value = inputElement.value;
            (0, _htmlJs.resizeInputElement)(inputElement, 0);
        });
        // Create a collapsible div for molecules
        let moleculesElement = document.getElementById("molecules");
        if (moleculesElement == null) ;
        else {
            let moleculeListElement = processMoleculeList(xml);
            moleculesElement.appendChild((0, _htmlJs.getCollapsibleDiv)(moleculeListElement, "Molecules", "molecules_button", fontSize1, margin0, margin1, margin1, "moleculesList"));
            mesmer.setMoleculeList(new (0, _mesmerJs.MoleculeList)((0, _xmlJs.getAttributes)(moleculeListElement), Array.from(molecules.values())));
        }
        // Create a collapsible div for reactions
        let reactionsElement = document.getElementById("reactions");
        if (reactionsElement == null) ;
        else {
            let reactionListElement = processReactionList(xml);
            reactionsElement.appendChild((0, _htmlJs.getCollapsibleDiv)(reactionListElement, "Reactions", "reactions_button", fontSize1, margin0, margin1, margin1, "reactionsList"));
            mesmer.setReactionList(new (0, _mesmerJs.ReactionList)((0, _xmlJs.getAttributes)(reactionListElement), Array.from(reactions.values())));
        }
        // Display reaction diagram. 
        displayReactionsDiagram();
        // Create a collapsible div for conditions
        let conditionsElement = document.getElementById("conditions");
        if (conditionsElement == null) ;
        else {
            let conditionsListElement = processConditions(xml);
            conditionsElement.appendChild((0, _htmlJs.getCollapsibleDiv)(conditionsListElement, "Conditions", "conditions_button", fontSize1, margin0, margin1, margin1, "conditionsList"));
            mesmer.setConditions(conditions);
        }
        // Create a collapsible div for model parameters
        let modelParametersElement = document.getElementById("modelParameters");
        if (modelParametersElement == null) ;
        else {
            let modelParametersListElement = processModelParameters(xml);
            modelParametersElement.appendChild((0, _htmlJs.getCollapsibleDiv)(modelParametersListElement, "Model Parameters", "modelParameters_button", fontSize1, margin0, margin1, margin1, "modelParametersList"));
            mesmer.setModelParameters(modelParameters);
        }
        // Create a collapsible div for control
        let controlElement = document.getElementById("control");
        if (controlElement == null) ;
        else {
            let controlListElement = processControl(xml);
            controlElement.appendChild((0, _htmlJs.getCollapsibleDiv)(controlListElement, "Control", "control_button", fontSize1, margin0, margin1, margin1, "controlList"));
            mesmer.setControl(control);
        }
        // Collapse and set up action listeners for all collapsible content.
        (0, _htmlJs.makeCollapsible)();
    }
}
/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */ function processMoleculeList(xml) {
    // Create div to contain the molecules list.
    let moleculeListDiv = document.createElement("div");
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
            let buttonId = molecule.id + "_" + (0, _moleculeJs.PropertyList).tagName;
            let contentDivId = molecule.id + "_" + (0, _moleculeJs.PropertyList).tagName + "_";
            let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)(plDiv, (0, _moleculeJs.PropertyList).tagName, buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
            moleculeDiv.appendChild(collapsibleDiv);
            // Create a new PropertyList.
            let pl = new (0, _moleculeJs.PropertyList)((0, _xmlJs.getAttributes)(xml_PLs[0]));
            molecule.setProperties(pl);
            let xml_Ps = xml_PLs[0].getElementsByTagName((0, _moleculeJs.Property).tagName);
            for(let j = 0; j < xml_Ps.length; j++){
                let p = new (0, _moleculeJs.Property)((0, _xmlJs.getAttributes)(xml_Ps[j]));
                pl.setProperty(p);
                molecule.setProperties(pl);
                if (p.dictRef == (0, _moleculeJs.ZPE).dictRef) processProperty(p, unitsEnergy, molecule, xml_Ps[j], plDiv, margin75);
                else if (p.dictRef == (0, _moleculeJs.RotConsts).dictRef) processProperty(p, unitsRotConsts, molecule, xml_Ps[j], plDiv, margin75);
                else processProperty(p, undefined, molecule, xml_Ps[j], plDiv, margin75);
            }
            moleculeTagNames.delete((0, _moleculeJs.PropertyList).tagName);
        } else {
            // If there is a Property on its own, then create a property on its own.
            let xml_Ps = xml_molecules[i].getElementsByTagName((0, _moleculeJs.Property).tagName);
            if (xml_Ps.length != 1) throw new Error("Expecting 1 " + (0, _moleculeJs.Property).tagName + " but finding " + xml_Ps.length + ". Should these be in a " + (0, _moleculeJs.PropertyList).tagName + "?");
            // Create a new Property.
            let p = new (0, _moleculeJs.Property)((0, _xmlJs.getAttributes)(xml_Ps[0]));
            molecule.setProperties(p);
            if (p.dictRef == (0, _moleculeJs.ZPE).dictRef) processProperty(p, unitsEnergy, molecule, xml_Ps[0], moleculeDiv, margin75);
            else if (p.dictRef == (0, _moleculeJs.RotConsts).dictRef) processProperty(p, unitsRotConsts, molecule, xml_Ps[0], moleculeDiv, margin75);
            else processProperty(p, undefined, molecule, xml_Ps[0], moleculeDiv, margin75);
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
            processDOSCMethod(dOSCMethod, molecule, margin50, moleculeDiv);
            moleculeTagNames.delete((0, _moleculeJs.DOSCMethod).tagName);
        }
        // Organise ExtraDOSCMethod.
        let xml_ExtraDOSCMethod = xml_molecules[i].getElementsByTagName((0, _moleculeJs.ExtraDOSCMethod).tagName);
        if (xml_ExtraDOSCMethod.length > 0) {
            if (xml_ExtraDOSCMethod.length != 1) throw new Error("Expecting only 1 extra DOSCMethod, but there are " + xml_ExtraDOSCMethod.length);
            console.warn("ExtraDOSCMethod detected: This is not displayed in the GUI - more coding needed!");
            let extraDOSCMethod = new (0, _moleculeJs.ExtraDOSCMethod)((0, _xmlJs.getAttributes)(xml_DOSCMethod[0]));
            // Create a new collapsible div for the ExtraDOSCMethod.
            let extraDOSCMethodDiv = document.createElement("div");
            let buttonId = molecule.id + "_" + (0, _moleculeJs.ExtraDOSCMethod).tagName;
            let contentDivId = molecule.id + "_" + (0, _moleculeJs.ExtraDOSCMethod).tagName + "_";
            let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)(extraDOSCMethodDiv, (0, _moleculeJs.ExtraDOSCMethod).tagName, buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
            moleculeDiv.appendChild(collapsibleDiv);
            // Read bondRef.
            let bondRefs = xml_ExtraDOSCMethod[0].getElementsByTagName((0, _moleculeJs.BondRef).tagName);
            let bondRef;
            if (bondRefs.length > 0) {
                if (bondRefs.length != 1) throw new Error("Expecting only 1 bondRef, but there are " + bondRefs.length);
                bondRef = new (0, _moleculeJs.BondRef)((0, _xmlJs.getAttributes)(bondRefs[0]), (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(bondRefs[0])));
                extraDOSCMethod.setBondRef(bondRef);
            }
            // Read hunderedRotorPotential.
            let hinderedRotorPotentials = xml_ExtraDOSCMethod[0].getElementsByTagName((0, _moleculeJs.HinderedRotorPotential).tagName);
            let hinderedRotorPotential;
            if (hinderedRotorPotentials.length > 0) {
                if (hinderedRotorPotentials.length != 1) throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + hinderedRotorPotentials.length);
                // Load PotentialPoints.
                let potentialPoints = [];
                let xml_potentialPoints = hinderedRotorPotentials[0].getElementsByTagName((0, _moleculeJs.PotentialPoint).tagName);
                for(let k = 0; k < xml_potentialPoints.length; k++)potentialPoints.push(new (0, _moleculeJs.PotentialPoint)((0, _xmlJs.getAttributes)(xml_potentialPoints[k])));
                hinderedRotorPotential = new (0, _moleculeJs.HinderedRotorPotential)((0, _xmlJs.getAttributes)(hinderedRotorPotentials[0]), potentialPoints);
                extraDOSCMethod.setHinderedRotorPotential(hinderedRotorPotential);
            }
            // Read periodicities.
            let xml_periodicities = xml_DOSCMethod[0].getElementsByTagName((0, _moleculeJs.Periodicity).tagName);
            let periodicity;
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                periodicity = new (0, _moleculeJs.Periodicity)((0, _xmlJs.getAttributes)(xml_periodicities[0]), parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_periodicities[0]))));
                extraDOSCMethod.setPeriodicity(periodicity);
            }
            molecule.setExtraDOSCMethod(extraDOSCMethod);
            moleculeTagNames.delete((0, _moleculeJs.ExtraDOSCMethod).tagName);
        }
        // Organise ReservoirSize.
        moleculeTagNames.delete((0, _moleculeJs.ReservoirSize).tagName);
        let xml_ReservoirSize = xml_molecules[i].getElementsByTagName((0, _moleculeJs.ReservoirSize).tagName);
        if (xml_ReservoirSize.length > 0) {
            if (xml_ReservoirSize.length != 1) throw new Error("Expecting only 1 reservoirSize, but there are " + xml_ReservoirSize.length);
            console.warn("ReservoirSize detected: This is not displayed in the GUI - more coding needed!");
            molecule.setReservoirSize(new (0, _moleculeJs.ReservoirSize)((0, _xmlJs.getAttributes)(xml_ReservoirSize[0]), parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_ReservoirSize[0])))));
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach((x)=>console.warn(x));
        //throw new Error("Unexpected tags in molecule.");
        }
        // Create a new collapsible div for the molecule.
        let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)(moleculeDiv, molecule.getLabel(), molecule.tagName + "_" + molecule.id + "_button", fontSize2, margin25, margin1, margin1, molecule.tagName + "_" + molecule.id);
        // Append the collapsibleDiv to the moleculeListDiv.
        moleculeListDiv.appendChild(collapsibleDiv);
    }
    return moleculeListDiv;
}
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */ function displayXML(xml) {
    //console.log("xml=" + xml);
    if (xml_title != null) xml_title.innerHTML = input_xml_filename;
    if (xml_text != null) xml_text.innerHTML = (0, _xmlJs.toHTML)(xml);
}
/**
 * For processing a molecule property.
 * @param p The property.
 * @param units The possible units.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 * @param margin The margin.
 */ function processProperty(p, units, molecule, element, moleculeDiv, margin) {
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
        let inputDiv = (0, _htmlJs.getInput)("number", molecule.id + "_" + p.dictRef, (event)=>{
            if (event.target instanceof HTMLInputElement) setNumberNode(ps, event.target);
        }, inputString, label);
        inputDiv.style.marginLeft = margin;
        inputDiv.style.marginTop = margin1;
        inputDiv.style.marginBottom = margin1;
        let inputElement = inputDiv.querySelector("input");
        inputElement.value = inputString;
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
                displayReactionsDiagram();
            }
        });
        addAnyUnits(units, psAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, margin2, margin1, margin1);
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
            let inputDiv = (0, _htmlJs.getInput)("text", molecule.id + "_" + p.dictRef, (event)=>{
                if (event.target instanceof HTMLInputElement) setNumberArrayNode(pa, event.target);
            }, inputString, label);
            inputDiv.style.marginLeft = margin;
            inputDiv.style.marginTop = margin1;
            inputDiv.style.marginBottom = margin1;
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
            addAnyUnits(units, paAttributes, inputDiv, molecule.id + "_" + p.dictRef + "_Select_Units", p.dictRef, margin2, margin1, margin1);
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
 */ function addAnyUnits(units, attributes, inputDiv, id, tagOrDictRef, marginLeft, marginTop, marginBottom) {
    if (units != undefined) {
        let unitsSelectElement = getUnitsSelectElement(units, attributes, id, tagOrDictRef);
        if (unitsSelectElement != undefined) {
            unitsSelectElement.style.marginLeft = marginLeft;
            unitsSelectElement.style.marginTop = marginTop;
            unitsSelectElement.style.marginBottom = marginBottom;
            inputDiv.appendChild(unitsSelectElement);
        }
    } else {
        let units = attributes.get("units");
        if (units != undefined) {
            let label = document.createElement("label");
            label.textContent = units;
            label.style.marginLeft = marginLeft;
            label.style.marginTop = marginTop;
            label.style.marginBottom = marginBottom;
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
        let selectElement = (0, _htmlJs.getSelectElement)(units, "Units", id);
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
 */ function processDOSCMethod(dOSCMethod, molecule, margin, moleculeDiv) {
    let label = document.createElement("label");
    label.textContent = (0, _moleculeJs.DOSCMethod).tagName + ": ";
    let container = document.createElement("div");
    container.appendChild(label);
    // Create a HTMLSelectElement to select the DOSCMethod.
    let options = [
        "ClassicalRotors",
        "QMRotors"
    ];
    let selectElement = (0, _htmlJs.getSelectElement)(options, "DOSCMethod", molecule.id + "_" + "Select_DOSCMethod");
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
    container.style.marginLeft = margin;
    container.style.marginTop = margin1;
    container.style.marginBottom = margin1;
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
        let buttonId = molecule.id + "_" + (0, _moleculeJs.EnergyTransferModel).tagName;
        let contentDivId = molecule.id + "_" + (0, _moleculeJs.EnergyTransferModel).tagName + "_";
        let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)(etmDiv, (0, _moleculeJs.EnergyTransferModel).tagName, buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
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
            let inputDiv = (0, _htmlJs.getInput)("number", id, (event)=>{
                if (event.target instanceof HTMLInputElement) setNumberNode(deltaEDown, event.target);
            }, inputString, label);
            inputDiv.style.marginLeft = margin;
            inputDiv.style.marginTop = margin1;
            inputDiv.style.marginBottom = margin1;
            etmDiv.appendChild(inputDiv);
            let inputElement = inputDiv.querySelector("input");
            inputElement.value = inputString;
            (0, _htmlJs.resizeInputElement)(inputElement);
            inputElement.addEventListener("change", (event)=>{
                let eventTarget = event.target;
                inputString = eventTarget.value;
                deltaEDowns[k].setValue(parseFloat(inputString));
                console.log("Set " + id + " to " + inputString);
                (0, _htmlJs.resizeInputElement)(inputElement);
            });
            let unitsLabel = document.createElement("label");
            unitsLabel.textContent = "cm-1";
            inputDiv.appendChild(unitsLabel);
        }
        etm.setDeltaEDowns(deltaEDowns);
        molecule.setEnergyTransferModel(etm);
    }
}
function setNumberArrayNode(node, input) {
    let inputId = input.id;
    let inputString = input.value.trim();
    if (inputString == "") {
        alert("Empty input resetting...");
        let input = document.getElementById(inputId);
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
        let input = document.getElementById(inputId);
        input.value = (0, _utilJs.arrayToString)(node.values, " ");
        return;
    }
    //console.log("propertyArray=" + propertyArray);
    if (values.length == node.values.length) console.log("Changed " + node.tagName + ' from: "' + inputString + '" to: "' + (0, _utilJs.arrayToString)(node.values, " ") + '"');
    else {
        alert("Expecting " + node.values.length + " values for, but finding " + values.length + " resetting...");
        let input = document.getElementById(inputId);
        input.value = (0, _utilJs.arrayToString)(node.values, " ");
    }
}
window.setNumberArrayNode = setNumberArrayNode;
function setNumberNode(node, input) {
    let inputId = input.id;
    //let moleculeID: string = inputId.split("_")[0];
    //let molecule: Molecule | undefined = molecules.get(moleculeID);
    //if (molecule != undefined) {
    if ((0, _utilJs.isNumeric)(input.value)) {
        let inputNumber = parseFloat(input.value);
        node.value = inputNumber;
        console.log("Value set to " + inputNumber);
    } else {
        alert("Value is not numeric, resetting...");
        let inputElement = document.getElementById(inputId);
        inputElement.value = node.value.toString();
    }
//console.log("molecule=" + molecule);
//}
}
window.set = setNumberNode;
/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param {XMLDocument} xml The XML document.
 */ function processReactionList(xml) {
    // Create div to contain the reaction list.
    let reactionListDiv = document.createElement("div");
    reactionListDiv.style.marginTop = margin1;
    reactionListDiv.style.marginBottom = margin1;
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
        let reactionDiv = document.createElement("div");
        // Set attributes.
        let attributes = (0, _xmlJs.getAttributes)(xml_reactions[i]);
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
        let reaction = new (0, _reactionJs.Reaction)(attributes);
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
                let selectElement = (0, _htmlJs.getSelectElement)(options, "Role", molecule.ref + "_" + "Select_Role");
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
                container.style.marginLeft = margin75;
                container.style.marginTop = margin1;
                container.style.marginBottom = margin1;
                reactantsDiv.appendChild(container);
            }
            reaction.setReactants(reactants);
            // Create a new collapsible div for the reactants.
            let buttonId = reaction.id + "_" + (0, _reactionJs.Reactant).tagName;
            let contentDivId = reaction.id + "_" + (0, _reactionJs.Reactant).tagName + "_";
            let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)(reactantsDiv, "Reactants", buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
            reactionDiv.appendChild(collapsibleDiv);
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
                // Create a new div for the role.
                let container = document.createElement("div");
                let label = document.createElement("label");
                label.textContent = molecule.ref + " role: ";
                container.appendChild(label);
                // Create a HTMLSelectElement to select the Role.
                let options = [
                    "modelled",
                    "sink"
                ];
                let selectElement = (0, _htmlJs.getSelectElement)(options, "Role", molecule.ref + "_" + "Select_Role");
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
                container.style.marginLeft = margin75;
                container.style.marginTop = margin1;
                container.style.marginBottom = margin1;
                productsDiv.appendChild(container);
            }
            reaction.setProducts(products);
            // Create a new collapsible div for the products.
            let buttonId = reaction.id + "_" + (0, _reactionJs.Product).tagName;
            let contentDivId = reaction.id + "_" + (0, _reactionJs.Product).tagName + "_";
            let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)(productsDiv, "Products", buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
            reactionDiv.appendChild(collapsibleDiv);
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
            let selectElement = (0, _htmlJs.getSelectElement)(options, "Tunneling", reaction.id + "_" + "Select_Tunneling");
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
            container.style.marginLeft = margin50;
            container.style.marginTop = margin1;
            container.style.marginBottom = margin1;
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
                let label = document.createElement("label");
                label.textContent = molecule.ref + " role: transitionState";
                label.style.marginLeft = margin75;
                label.style.marginTop = margin1;
                label.style.marginBottom = margin1;
                transitionStatesDiv.appendChild(label);
            }
            reaction.setTransitionStates(transitionStates);
            // Create a new collapsible div for the transition states.
            let buttonId = reaction.id + "_" + (0, _reactionJs.TransitionState).tagName;
            let contentDivId = reaction.id + "_" + (0, _reactionJs.TransitionState).tagName + "_";
            let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)(transitionStatesDiv, "Transition States", buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
            reactionDiv.appendChild(collapsibleDiv);
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
                                let inputDiv = (0, _htmlJs.getInput)("number", id, (event)=>{
                                    if (event.target instanceof HTMLInputElement) setNumberNode(preExponential, event.target);
                                }, inputString, label);
                                inputDiv.style.marginLeft = margin75;
                                inputDiv.style.marginTop = margin1;
                                inputDiv.style.marginBottom = margin1;
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
                                addAnyUnits(undefined, preExponentialAttributes, inputDiv, reaction.id + "_" + (0, _reactionJs.MesmerILT).xsiType + "_" + (0, _reactionJs.PreExponential).tagName, (0, _reactionJs.PreExponential).tagName, margin2, margin1, margin1);
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
                                let inputDiv = (0, _htmlJs.getInput)("number", id, (event)=>{
                                    if (event.target instanceof HTMLInputElement) setNumberNode(activationEnergy, event.target);
                                }, inputString, label);
                                inputDiv.style.marginLeft = margin75;
                                inputDiv.style.marginTop = margin1;
                                inputDiv.style.marginBottom = margin1;
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
                                addAnyUnits(undefined, activationEnergyAttributes, inputDiv, reaction.id + "_" + (0, _reactionJs.MesmerILT).xsiType + "_" + (0, _reactionJs.ActivationEnergy).tagName, (0, _reactionJs.ActivationEnergy).tagName, margin2, margin1, margin1);
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
                                let inputDiv = (0, _htmlJs.getInput)("number", id, (event)=>{
                                    if (event.target instanceof HTMLInputElement) setNumberNode(tInfinity, event.target);
                                }, inputString, label);
                                inputDiv.style.marginLeft = margin75;
                                inputDiv.style.marginTop = margin1;
                                inputDiv.style.marginBottom = margin1;
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
                                addAnyUnits(undefined, tInfinityAttributes, inputDiv, reaction.id + "_" + (0, _reactionJs.MesmerILT).xsiType + "_" + (0, _reactionJs.TInfinity).tagName, (0, _reactionJs.TInfinity).tagName, margin2, margin1, margin1);
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
                                let inputDiv = (0, _htmlJs.getInput)("number", id, (event)=>{
                                    if (event.target instanceof HTMLInputElement) setNumberNode(nInfinity, event.target);
                                }, inputString, label);
                                inputDiv.style.marginLeft = margin75;
                                inputDiv.style.marginTop = margin1;
                                inputDiv.style.marginBottom = margin1;
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
                                addAnyUnits(undefined, nInfinityAttributes, inputDiv, reaction.id + "_" + (0, _reactionJs.MesmerILT).xsiType + "_" + (0, _reactionJs.NInfinity).tagName, (0, _reactionJs.NInfinity).tagName, margin2, margin1, margin1);
                                mCRCMethodDiv.appendChild(inputDiv);
                            }
                        }
                        //console.log("nInfinity " + nInfinity);
                        // Create a new collapsible div for the MCRCMethod.
                        let buttonId = reaction.id + "_" + (0, _reactionJs.MCRCMethod).tagName;
                        let contentDivId = reaction.id + "_" + (0, _reactionJs.MCRCMethod).tagName + "_";
                        let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)(mCRCMethodDiv, (0, _reactionJs.MCRCMethod).tagName, buttonId, fontSize3, margin50, margin1, margin1, contentDivId);
                        reactionDiv.appendChild(collapsibleDiv);
                    } else throw new Error("Unexpected xsi:type=" + type);
                } else {
                    mCRCMethod = new (0, _reactionJs.MCRCMethod)(mCRCMethodAttributes);
                    let mCRCMethodLabel = document.createElement("label");
                    mCRCMethodLabel.textContent = (0, _reactionJs.MCRCMethod).tagName + ": " + mCRCMethodAttributes.get("name");
                    mCRCMethodLabel.style.marginLeft = margin50;
                    mCRCMethodLabel.style.marginTop = margin1;
                    mCRCMethodLabel.style.marginBottom = margin1;
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
            let excessReactantConc;
            let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_excessReactantConc[0])));
            excessReactantConc = new (0, _reactionJs.ExcessReactantConc)((0, _xmlJs.getAttributes)(xml_excessReactantConc[0]), value);
            reaction.setExcessReactantConc(excessReactantConc);
        }
        // Create a new collapsible div for the reaction.
        let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)(reactionDiv, reaction.id + "(" + reaction.getLabel() + ")", reaction.tagName + "_" + reaction.id + "_button", fontSize2, margin25, margin1, margin1, reaction.tagName + "_" + reaction.id);
        // Append the collapsibleDiv to the reactionListDiv.
        reactionListDiv.appendChild(collapsibleDiv);
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
    let conditionsDiv = document.createElement("div");
    // Get the XML "moleculeList" element.
    let xml_conditions = (0, _xmlJs.getSingularElement)(xml, (0, _conditionsJs.Conditions).tagName);
    conditions = new (0, _conditionsJs.Conditions)((0, _xmlJs.getAttributes)(xml_conditions));
    // Process any "bathGas" element.
    let xml_bathGases = xml_conditions.getElementsByTagName((0, _conditionsJs.BathGas).tagName);
    if (xml_bathGases.length > 0) {
        if (xml_bathGases.length > 1) throw new Error("Expecting 1 " + (0, _conditionsJs.BathGas).tagName + " but finding " + xml_bathGases.length + "!");
        let attributes = (0, _xmlJs.getAttributes)(xml_bathGases[0]);
        let moleculeID = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_bathGases[0]));
        let bathGas = new (0, _conditionsJs.BathGas)(attributes, moleculeID);
        console.log("bathGas" + bathGas.toString());
        conditions.setBathGas(bathGas);
        let bathGasLabel = document.createElement("label");
        bathGasLabel.textContent = (0, _conditionsJs.BathGas).tagName + ": " + bathGas.value;
        bathGasLabel.style.marginLeft = margin25;
        bathGasLabel.style.marginTop = margin1;
        bathGasLabel.style.marginBottom = margin1;
        conditionsDiv.appendChild(bathGasLabel);
    }
    // PTs
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
                // Create div for the pTPair.
                let pTPairDiv = document.createElement("div");
                pTPairDiv.style.marginLeft = margin25;
                pTPairDiv.style.marginTop = margin1;
                pTPairDiv.style.marginBottom = margin1;
                pTsDiv.appendChild(pTPairDiv);
                // Add optional BathGas
                let xml_bathGass = xml_PTPairs[i].getElementsByTagName((0, _conditionsJs.BathGas).tagName);
                if (xml_bathGass.length > 0) {
                    if (xml_bathGass.length > 1) console.warn("xml_bathGass.length=" + xml_bathGass.length);
                    let bathGas = new (0, _conditionsJs.BathGas)((0, _xmlJs.getAttributes)(xml_bathGass[0]), (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_bathGass[0])));
                    pTPair.setBathGas(bathGas);
                    // Create HTMLLabelElement for the BathGas.
                    let bathGasLabel = document.createElement("label");
                    bathGasLabel.textContent = (0, _conditionsJs.BathGas).tagName + ": " + bathGas.value;
                    bathGasLabel.style.marginLeft = margin50;
                    bathGasLabel.style.marginTop = margin1;
                    bathGasLabel.style.marginBottom = margin1;
                    pTPairDiv.appendChild(bathGasLabel);
                }
                // Add optional ExperimentRate
                let xml_experimentRates = xml_PTPairs[i].getElementsByTagName((0, _conditionsJs.ExperimentRate).tagName);
                if (xml_experimentRates.length > 0) {
                    if (xml_experimentRates.length > 1) console.warn("xml_experimentRates.length=" + xml_experimentRates.length);
                    let experimentRate = new (0, _conditionsJs.ExperimentRate)((0, _xmlJs.getAttributes)(xml_experimentRates[0]), parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_experimentRates[0]))));
                    pTPair.setExperimentRate(experimentRate);
                    // Create a new div for the ExperimentRate.
                    let id = (0, _conditionsJs.PTpair).tagName + "_" + (0, _conditionsJs.ExperimentRate).tagName;
                    let inputDiv = (0, _htmlJs.getInput)("number", id, (event)=>{
                        if (event.target instanceof HTMLInputElement) setNumberNode(experimentRate, event.target);
                    }, experimentRate.value.toString(), (0, _conditionsJs.ExperimentRate).tagName);
                    inputDiv.style.marginLeft = margin50;
                    inputDiv.style.marginTop = margin1;
                    inputDiv.style.marginBottom = margin1;
                    pTPairDiv.appendChild(inputDiv);
                }
                // Create a new input element for the P.
                let p = pTPair.getP();
                let pId = (0, _conditionsJs.PTpair).tagName + "_" + "P";
                let t = pTPair.getT();
                let tId = (0, _conditionsJs.PTpair).tagName + "_" + "T";
                // Create a container div for P, T and units.
                let containerDiv = document.createElement("div");
                containerDiv.style.display = "flex";
                // Add the P input element to the container.
                let pInputDiv = (0, _htmlJs.getInput)("number", pId, (event)=>{
                    if (event.target instanceof HTMLInputElement) {
                        if ((0, _utilJs.isNumeric)(event.target.value)) {
                            pTPair.setP(parseFloat(event.target.value));
                            console.log("Set P to " + event.target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            let inputElement = document.getElementById(pId);
                            inputElement.value = pTPair.getP().toString();
                        }
                        (0, _htmlJs.resizeInputElement)(event.target);
                    }
                }, p.toString(), "P");
                let pInputElement = pInputDiv.querySelector("input");
                pInputElement.value = p.toString();
                (0, _htmlJs.resizeInputElement)(pInputElement);
                pInputDiv.style.marginLeft = margin25;
                pInputDiv.style.marginTop = margin1;
                pInputDiv.style.marginBottom = margin1;
                containerDiv.appendChild(pInputDiv);
                // Add the T input element to the container.
                let tInputDiv = (0, _htmlJs.getInput)("number", tId, (event)=>{
                    if (event.target instanceof HTMLInputElement) {
                        if ((0, _utilJs.isNumeric)(event.target.value)) {
                            pTPair.setT(parseFloat(event.target.value));
                            console.log("Set T to " + event.target.value);
                        } else {
                            alert("Value is not numeric, resetting...");
                            let inputElement = document.getElementById(tId);
                            inputElement.value = pTPair.getT().toString();
                        }
                    }
                }, t.toString(), "T");
                let tInputElement = tInputDiv.querySelector("input");
                tInputElement.value = t.toString();
                (0, _htmlJs.resizeInputElement)(tInputElement);
                tInputDiv.style.marginLeft = margin5;
                tInputDiv.style.marginTop = margin1;
                tInputDiv.style.marginBottom = margin1;
                containerDiv.appendChild(tInputDiv);
                // Add any units to the container.
                addAnyUnits(undefined, (0, _xmlJs.getAttributes)(xml_PTPairs[i]), containerDiv, (0, _conditionsJs.PTpair).tagName, (0, _conditionsJs.PTpair).tagName, margin2, margin1, margin1);
                // Append the container div to the pTPairDiv.
                pTPairDiv.appendChild(containerDiv);
                // Create a collapsible container for the pTPairs.
                let buttonId = (0, _conditionsJs.PTpair).tagName + "_" + i;
                let contentDivId = (0, _conditionsJs.PTpair).tagName + "_" + i + "_";
                let collapsibleDiv = (0, _htmlJs.getCollapsibleDiv)(pTPairDiv, (0, _conditionsJs.PTpair).tagName, buttonId, fontSize2, margin25, margin1, margin1, contentDivId);
                pTsDiv.appendChild(collapsibleDiv);
                pTs.addPTpair(pTPair);
            }
            conditions.setPTs(pTs);
        }
    }
    return conditionsDiv;
}
/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */ function processModelParameters(xml) {
    console.log((0, _modelParametersJs.ModelParameters).tagName);
    // Create div to contain the modelParameters.
    let modelParametersDiv = document.createElement("div");
    // Get the XML "moleculeList" element.
    let xml_modelParameters = (0, _xmlJs.getSingularElement)(xml, (0, _modelParametersJs.ModelParameters).tagName);
    modelParameters = new (0, _modelParametersJs.ModelParameters)((0, _xmlJs.getAttributes)(xml_modelParameters));
    // Process any "me:grainSize" elements.
    let xml_grainSizess = xml_modelParameters.getElementsByTagName((0, _modelParametersJs.GrainSize).tagName);
    if (xml_grainSizess.length > 0) {
        if (xml_grainSizess.length > 1) throw new Error("Expecting 1 " + (0, _conditionsJs.BathGas).tagName + " but finding " + xml_grainSizess.length + "!");
        let attributes = (0, _xmlJs.getAttributes)(xml_grainSizess[0]);
        let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_grainSizess[0])));
        let grainSize = new (0, _modelParametersJs.GrainSize)(attributes, value);
        modelParameters.setGrainSize(grainSize);
        let grainSizeDiv = document.createElement("div");
        grainSizeDiv.style.display = "flex";
        // Create a new div for the grainSize.
        let id = (0, _modelParametersJs.ModelParameters).tagName + "_" + (0, _modelParametersJs.GrainSize).tagName;
        let inputDiv = (0, _htmlJs.getInput)("number", id, (event)=>{
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(grainSize, event.target);
                (0, _htmlJs.resizeInputElement)(event.target);
            }
        }, value.toString(), (0, _modelParametersJs.GrainSize).tagName);
        (0, _htmlJs.resizeInputElement)(inputDiv.querySelector("input"));
        inputDiv.style.marginLeft = margin25;
        inputDiv.style.marginTop = margin1;
        inputDiv.style.marginBottom = margin1;
        grainSizeDiv.appendChild(inputDiv);
        // Add any units
        addAnyUnits(undefined, attributes, grainSizeDiv, (0, _modelParametersJs.ModelParameters).tagName + "_" + (0, _modelParametersJs.GrainSize).tagName, (0, _modelParametersJs.GrainSize).tagName, margin2, margin1, margin1);
        modelParametersDiv.appendChild(grainSizeDiv);
    }
    // Process any "me:energyAboveTheTopHill" elements.
    let xml_energyAboveTheTopHill = (0, _xmlJs.getSingularElement)(xml_modelParameters, (0, _modelParametersJs.EnergyAboveTheTopHill).tagName);
    let energyAboveTheTopHill = new (0, _modelParametersJs.EnergyAboveTheTopHill)((0, _xmlJs.getAttributes)(xml_energyAboveTheTopHill), parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_energyAboveTheTopHill))));
    modelParameters.setEnergyAboveTheTopHill(energyAboveTheTopHill);
    // Create a new div for the energyAboveTheTopHill.
    let id = (0, _modelParametersJs.ModelParameters).tagName + "_" + (0, _modelParametersJs.EnergyAboveTheTopHill).tagName;
    let inputDiv = (0, _htmlJs.getInput)("number", id, (event)=>{
        if (event.target instanceof HTMLInputElement) {
            setNumberNode(energyAboveTheTopHill, event.target);
            (0, _htmlJs.resizeInputElement)(event.target);
        }
    }, energyAboveTheTopHill.value.toString(), (0, _modelParametersJs.EnergyAboveTheTopHill).tagName);
    (0, _htmlJs.resizeInputElement)(inputDiv.querySelector("input"));
    inputDiv.style.marginLeft = margin25;
    inputDiv.style.marginTop = margin1;
    inputDiv.style.marginBottom = margin1;
    modelParametersDiv.appendChild(inputDiv);
    return modelParametersDiv;
}
/**
 * Parses xml to initialise controls.
 * @param xml The XML document.
 * @returns The controls div.
 */ function processControl(xml) {
    console.log((0, _controlJs.Control).tagName);
    // Create div to contain the controls.
    let controlsDiv = document.createElement("div");
    // Get the XML "me:control" element.
    let xml_control = (0, _xmlJs.getSingularElement)(xml, (0, _controlJs.Control).tagName);
    control = new (0, _controlJs.Control)((0, _xmlJs.getAttributes)(xml_control));
    // me:testDOS
    let testDOSDiv = document.createElement("div");
    testDOSDiv.style.display = "flex";
    testDOSDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(testDOSDiv);
    let xml_testDOS = xml_control.getElementsByTagName((0, _controlJs.TestDOS).tagName);
    // Create a input checkbox for the TestDOS.
    let testDOSLabel = document.createElement("label");
    testDOSDiv.appendChild(testDOSLabel);
    testDOSLabel.textContent = (0, _controlJs.TestDOS).tagName;
    let testDOSInput = document.createElement("input");
    testDOSDiv.appendChild(testDOSInput);
    testDOSInput.type = "checkbox";
    testDOSInput.id = (0, _controlJs.TestDOS).tagName;
    testDOSInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setTestDOS(new (0, _controlJs.TestDOS)());
            else control.removeTestDOS();
        }
    });
    if (xml_testDOS.length == 1) {
        testDOSInput.checked = true;
        control.setTestDOS(new (0, _controlJs.TestDOS)());
    } else if (xml_testDOS.length > 1) console.warn("xml_testDOS.length=" + xml_testDOS.length);
    // me:printSpeciesProfile
    let printSpeciesProfileDiv = document.createElement("div");
    printSpeciesProfileDiv.style.display = "flex";
    printSpeciesProfileDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printSpeciesProfileDiv);
    let xml_printSpeciesProfile = xml_control.getElementsByTagName((0, _controlJs.PrintSpeciesProfile).tagName);
    // Create a input checkbox for the PrintSpeciesProfile.
    let printSpeciesProfileLabel = document.createElement("label");
    printSpeciesProfileDiv.appendChild(printSpeciesProfileLabel);
    printSpeciesProfileLabel.textContent = (0, _controlJs.PrintSpeciesProfile).tagName;
    let printSpeciesProfileInput = document.createElement("input");
    printSpeciesProfileDiv.appendChild(printSpeciesProfileInput);
    printSpeciesProfileInput.type = "checkbox";
    printSpeciesProfileInput.id = (0, _controlJs.PrintSpeciesProfile).tagName;
    printSpeciesProfileInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintSpeciesProfile(new (0, _controlJs.PrintSpeciesProfile)());
            else control.removePrintSpeciesProfile();
        }
    });
    if (xml_printSpeciesProfile.length == 1) {
        printSpeciesProfileInput.checked = true;
        control.setTestDOS(new (0, _controlJs.PrintSpeciesProfile)());
    } else if (xml_testDOS.length > 1) console.warn("xml_printSpeciesProfile.length=" + xml_printSpeciesProfile.length);
    // me:testMicroRates
    let testMicroRatesDiv = document.createElement("div");
    testMicroRatesDiv.style.display = "flex";
    testMicroRatesDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(testMicroRatesDiv);
    let xml_testMicroRates = xml_control.getElementsByTagName((0, _controlJs.TestMicroRates).tagName);
    // Create a input checkbox for the TestMicroRates.
    let testMicroRatesLabel = document.createElement("label");
    testMicroRatesDiv.appendChild(testMicroRatesLabel);
    testMicroRatesLabel.textContent = (0, _controlJs.TestMicroRates).tagName;
    let testMicroRatesInput = document.createElement("input");
    testMicroRatesDiv.appendChild(testMicroRatesInput);
    testMicroRatesInput.type = "checkbox";
    testMicroRatesInput.id = (0, _controlJs.TestMicroRates).tagName;
    testMicroRatesInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setTestMicroRates(new (0, _controlJs.TestMicroRates)());
            else control.removeTestMicroRates();
        }
    });
    if (xml_testMicroRates.length == 1) {
        testMicroRatesInput.checked = true;
        control.setTestMicroRates(new (0, _controlJs.TestMicroRates)());
    } else if (xml_testMicroRates.length > 1) console.warn("xml_testMicroRates.length=" + xml_testMicroRates.length);
    // me:testRateConstant
    let testRateConstantDiv = document.createElement("div");
    testRateConstantDiv.style.display = "flex";
    testRateConstantDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(testRateConstantDiv);
    let xml_testRateConstant = xml_control.getElementsByTagName((0, _controlJs.TestRateConstant).tagName);
    // Create a input checkbox for the TestRateConstant.
    let testRateConstantLabel = document.createElement("label");
    testRateConstantDiv.appendChild(testRateConstantLabel);
    testRateConstantLabel.textContent = (0, _controlJs.TestRateConstant).tagName;
    let testRateConstantInput = document.createElement("input");
    testRateConstantDiv.appendChild(testRateConstantInput);
    testRateConstantInput.type = "checkbox";
    testRateConstantInput.id = (0, _controlJs.TestRateConstant).tagName;
    testRateConstantInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setTestRateConstant(new (0, _controlJs.TestRateConstant)());
            else control.removeTestRateConstant();
        }
    });
    if (xml_testRateConstant.length == 1) {
        testRateConstantInput.checked = true;
        control.setTestRateConstant(new (0, _controlJs.TestRateConstant)());
    } else if (xml_testRateConstant.length > 1) console.warn("xml_testRateConstant.length=" + xml_testRateConstant.length);
    // me:printGrainDOS
    let printGrainDOSDiv = document.createElement("div");
    printGrainDOSDiv.style.display = "flex";
    printGrainDOSDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printGrainDOSDiv);
    let xml_printGrainDOS = xml_control.getElementsByTagName((0, _controlJs.PrintGrainDOS).tagName);
    // Create a input checkbox for the PrintGrainDOS.
    let printGrainDOSLabel = document.createElement("label");
    printGrainDOSDiv.appendChild(printGrainDOSLabel);
    printGrainDOSLabel.textContent = (0, _controlJs.PrintGrainDOS).tagName;
    let printGrainDOSInput = document.createElement("input");
    printGrainDOSDiv.appendChild(printGrainDOSInput);
    printGrainDOSInput.type = "checkbox";
    printGrainDOSInput.id = (0, _controlJs.PrintGrainDOS).tagName;
    printGrainDOSInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintGrainDOS(new (0, _controlJs.PrintGrainDOS)());
            else control.removePrintGrainDOS();
        }
    });
    if (xml_printGrainDOS.length == 1) {
        printGrainDOSInput.checked = true;
        control.setPrintGrainDOS(new (0, _controlJs.PrintGrainDOS)());
    } else if (xml_printGrainDOS.length > 1) console.warn("xml_printGrainDOS.length=" + xml_printGrainDOS.length);
    // me:printCellDOS
    let printCellDOSDiv = document.createElement("div");
    printCellDOSDiv.style.display = "flex";
    printCellDOSDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printCellDOSDiv);
    let xml_printCellDOS = xml_control.getElementsByTagName((0, _controlJs.PrintCellDOS).tagName);
    // Create a input checkbox for the PrintCellDOS.
    let printCellDOSLabel = document.createElement("label");
    printCellDOSDiv.appendChild(printCellDOSLabel);
    printCellDOSLabel.textContent = (0, _controlJs.PrintCellDOS).tagName;
    let printCellDOSInput = document.createElement("input");
    printCellDOSDiv.appendChild(printCellDOSInput);
    printCellDOSInput.type = "checkbox";
    printCellDOSInput.id = (0, _controlJs.PrintCellDOS).tagName;
    printCellDOSInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintCellDOS(new (0, _controlJs.PrintCellDOS)());
            else control.removePrintCellDOS();
        }
    });
    if (xml_printCellDOS.length == 1) {
        printCellDOSInput.checked = true;
        control.setPrintCellDOS(new (0, _controlJs.PrintCellDOS)());
    } else if (xml_printCellDOS.length > 1) console.warn("xml_printCellDOS.length=" + xml_printCellDOS.length);
    // me:printReactionOperatorColumnSums
    let printReactionOperatorColumnSumsDiv = document.createElement("div");
    printReactionOperatorColumnSumsDiv.style.display = "flex";
    printReactionOperatorColumnSumsDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printReactionOperatorColumnSumsDiv);
    let xml_printReactionOperatorColumnSums = xml_control.getElementsByTagName((0, _controlJs.PrintReactionOperatorColumnSums).tagName);
    // Create a input checkbox for the PrintReactionOperatorColumnSums.
    let printReactionOperatorColumnSumsLabel = document.createElement("label");
    printReactionOperatorColumnSumsDiv.appendChild(printReactionOperatorColumnSumsLabel);
    printReactionOperatorColumnSumsLabel.textContent = (0, _controlJs.PrintReactionOperatorColumnSums).tagName;
    let printReactionOperatorColumnSumsInput = document.createElement("input");
    printReactionOperatorColumnSumsDiv.appendChild(printReactionOperatorColumnSumsInput);
    printReactionOperatorColumnSumsInput.type = "checkbox";
    printReactionOperatorColumnSumsInput.id = (0, _controlJs.PrintReactionOperatorColumnSums).tagName;
    printReactionOperatorColumnSumsInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintReactionOperatorColumnSums(new (0, _controlJs.PrintReactionOperatorColumnSums)());
            else control.removePrintReactionOperatorColumnSums();
        }
    });
    if (xml_printReactionOperatorColumnSums.length == 1) {
        printReactionOperatorColumnSumsInput.checked = true;
        control.setPrintReactionOperatorColumnSums(new (0, _controlJs.PrintReactionOperatorColumnSums)());
    } else if (xml_printReactionOperatorColumnSums.length > 1) console.warn("xml_printReactionOperatorColumnSums.length=" + xml_printReactionOperatorColumnSums.length);
    // me:printTunnellingCoefficients
    let printTunnellingCoefficientsDiv = document.createElement("div");
    printTunnellingCoefficientsDiv.style.display = "flex";
    printTunnellingCoefficientsDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printTunnellingCoefficientsDiv);
    let xml_printTunnellingCoefficients = xml_control.getElementsByTagName((0, _controlJs.PrintTunnellingCoefficients).tagName);
    // Create a input checkbox for the PrintTunnellingCoefficients.
    let printTunnellingCoefficientsLabel = document.createElement("label");
    printTunnellingCoefficientsDiv.appendChild(printTunnellingCoefficientsLabel);
    printTunnellingCoefficientsLabel.textContent = (0, _controlJs.PrintTunnellingCoefficients).tagName;
    let printTunnellingCoefficientsInput = document.createElement("input");
    printTunnellingCoefficientsDiv.appendChild(printTunnellingCoefficientsInput);
    printTunnellingCoefficientsInput.type = "checkbox";
    printTunnellingCoefficientsInput.id = (0, _controlJs.PrintTunnellingCoefficients).tagName;
    printTunnellingCoefficientsInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintTunnellingCoefficients(new (0, _controlJs.PrintTunnellingCoefficients)());
            else control.removePrintTunnellingCoefficients();
        }
    });
    if (xml_printTunnellingCoefficients.length == 1) {
        printTunnellingCoefficientsInput.checked = true;
        control.setPrintTunnellingCoefficients(new (0, _controlJs.PrintTunnellingCoefficients)());
    } else if (xml_printTunnellingCoefficients.length > 1) console.warn("xml_printTunnellingCoefficients.length=" + xml_printTunnellingCoefficients.length);
    // me:printGrainkfE
    let printGrainkfEDiv = document.createElement("div");
    printGrainkfEDiv.style.display = "flex";
    printGrainkfEDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printGrainkfEDiv);
    let xml_printGrainkfE = xml_control.getElementsByTagName((0, _controlJs.PrintGrainkfE).tagName);
    // Create a input checkbox for the PrintGrainkfE.
    let printGrainkfELabel = document.createElement("label");
    printGrainkfEDiv.appendChild(printGrainkfELabel);
    printGrainkfELabel.textContent = (0, _controlJs.PrintGrainkfE).tagName;
    let printGrainkfEInput = document.createElement("input");
    printGrainkfEDiv.appendChild(printGrainkfEInput);
    printGrainkfEInput.type = "checkbox";
    printGrainkfEInput.id = (0, _controlJs.PrintGrainkfE).tagName;
    printGrainkfEInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintGrainkfE(new (0, _controlJs.PrintGrainkfE)());
            else control.removePrintGrainkfE();
        }
    });
    // me:printGrainBoltzmann
    let printGrainBoltzmannDiv = document.createElement("div");
    printGrainBoltzmannDiv.style.display = "flex";
    printGrainBoltzmannDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printGrainBoltzmannDiv);
    let xml_printGrainBoltzmann = xml_control.getElementsByTagName((0, _controlJs.PrintGrainBoltzmann).tagName);
    // Create a input checkbox for the PrintGrainBoltzmann.
    let printGrainBoltzmannLabel = document.createElement("label");
    printGrainBoltzmannDiv.appendChild(printGrainBoltzmannLabel);
    printGrainBoltzmannLabel.textContent = (0, _controlJs.PrintGrainBoltzmann).tagName;
    let printGrainBoltzmannInput = document.createElement("input");
    printGrainBoltzmannDiv.appendChild(printGrainBoltzmannInput);
    printGrainBoltzmannInput.type = "checkbox";
    printGrainBoltzmannInput.id = (0, _controlJs.PrintGrainBoltzmann).tagName;
    printGrainBoltzmannInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintGrainBoltzmann(new (0, _controlJs.PrintGrainBoltzmann)());
            else control.removePrintGrainBoltzmann();
        }
    });
    // me:printGrainkbE
    let printGrainkbEDiv = document.createElement("div");
    printGrainkbEDiv.style.display = "flex";
    printGrainkbEDiv.style.marginLeft = margin25;
    controlsDiv.appendChild(printGrainkbEDiv);
    let xml_printGrainkbE = xml_control.getElementsByTagName((0, _controlJs.PrintGrainkbE).tagName);
    // Create a input checkbox for the PrintGrainkbE.
    let printGrainkbELabel = document.createElement("label");
    printGrainkbEDiv.appendChild(printGrainkbELabel);
    printGrainkbELabel.textContent = (0, _controlJs.PrintGrainkbE).tagName;
    let printGrainkbEInput = document.createElement("input");
    printGrainkbEDiv.appendChild(printGrainkbEInput);
    printGrainkbEInput.type = "checkbox";
    printGrainkbEInput.id = (0, _controlJs.PrintGrainkbE).tagName;
    printGrainkbEInput.addEventListener("change", (event)=>{
        if (event.target instanceof HTMLInputElement) {
            if (event.target.checked) control.setPrintGrainkbE(new (0, _controlJs.PrintGrainkbE)());
            else control.removePrintGrainkbE();
        }
    });
    // me:eigenvalues
    let xml_eigenvalues = xml_control.getElementsByTagName((0, _controlJs.Eigenvalues).tagName);
    if (xml_eigenvalues.length == 1) {
        let eigenvalues = new (0, _controlJs.Eigenvalues)((0, _xmlJs.getAttributes)(xml_eigenvalues[0]), parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_eigenvalues[0]))));
        control.setEigenvalues(eigenvalues);
        // Create a new div for the eigenvalues.
        let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.Eigenvalues).tagName;
        let inputDiv = (0, _htmlJs.getInput)("number", id, (event)=>{
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(eigenvalues, event.target);
                (0, _htmlJs.resizeInputElement)(event.target);
            }
        }, eigenvalues.value.toString(), (0, _controlJs.Eigenvalues).tagName);
        (0, _htmlJs.resizeInputElement)(inputDiv.querySelector("input"));
        inputDiv.style.marginLeft = margin25;
        inputDiv.style.marginTop = margin1;
        inputDiv.style.marginBottom = margin1;
        controlsDiv.appendChild(inputDiv);
    } else console.warn("eigenvalues.length=" + xml_eigenvalues.length);
    // me:diagramEnergyOffset
    let xml_diagramEnergyOffset = xml_control.getElementsByTagName((0, _controlJs.DiagramEnergyOffset).tagName);
    if (xml_diagramEnergyOffset.length == 1) {
        let value = parseFloat((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_diagramEnergyOffset[0])));
        let diagramEnergyOffset = new (0, _controlJs.DiagramEnergyOffset)((0, _xmlJs.getAttributes)(xml_diagramEnergyOffset[0]), value);
        control.setDiagramEnergyOffset(diagramEnergyOffset);
        // Create a new div for the diagramEnergyOffset.
        let id = (0, _controlJs.Control).tagName + "_" + (0, _controlJs.DiagramEnergyOffset).tagName;
        let inputDiv = (0, _htmlJs.getInput)("number", id, (event)=>{
            if (event.target instanceof HTMLInputElement) {
                setNumberNode(diagramEnergyOffset, event.target);
                (0, _htmlJs.resizeInputElement)(event.target);
            }
        }, value.toString(), (0, _controlJs.DiagramEnergyOffset).tagName);
        (0, _htmlJs.resizeInputElement)(inputDiv.querySelector("input"));
        inputDiv.style.marginLeft = margin25;
        inputDiv.style.marginTop = margin1;
        inputDiv.style.marginBottom = margin1;
        controlsDiv.appendChild(inputDiv);
    } else console.warn("diagramEnergyOffset.length=" + xml_diagramEnergyOffset.length);
    return controlsDiv;
}
/**
 * Create a diagram.
 * @param canvas The canvas.
 * @param dark True for dark mode.
 * @param font The font to use.
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
        let reactionTransitionStates = reaction.getTransitionStates();
        //console.log("reactant=" + reactant);
        let reactantsLabel = reaction.getReactantsLabel();
        if (reactantsLabel != undefined) {
            reactants.add(reactantsLabel);
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
 */ function displayReactionsDiagram() {
    if (reactions.size > 0) {
        // Display the diagram.
        let canvas = document.getElementById("reactions_diagram");
        let font = "14px Arial";
        let dark = true;
        let lw = 4;
        let lwc = 2;
        if (canvas != null) {
            canvas.style.display = "block";
            drawReactionDiagram(canvas, dark, font, lw, lwc);
        }
    }
}
/**
 * Save to XML file.
 */ window.saveXML = function() {
    console.log("saveXML");
    const pad = "  ";
    /*
    const padding2: string = pad.repeat(2);

    // Create moleculeList.
    let moleculeList: string = "";
    molecules.forEach(function (molecule, id) {
        moleculeList += molecule.toXML(pad, padding2);
        //moleculeList += molecule.toXML("molecule", pad, level);
    });
    moleculeList = getTag(moleculeList, "moleculeList", undefined, pad, true);

    // Create reactionList.
    let reactionList: string = "";
    reactions.forEach(function (reaction, id) {
        reactionList += reaction.toXML(pad, padding2);
        //reactionList += reaction.toXML("reaction", pad, level);
    });
    reactionList = getTag(reactionList, "reactionList", undefined, pad, true);

    // Create me.Conditions
    let xml_conditions: string = conditions.toXML(pad, pad);

    // Create modelParameters
    let xml_modelParameters: string = modelParameters.toXML(pad, pad);

    // create me.control
    let xml_control: string = control.toXML(pad, pad);
*/ // Create a new Blob object from the data
    let blob = new Blob([
        (0, _mesmerJs.Mesmer).header,
        mesmer.toXML(pad, pad)
    ], {
        type: "text/plain"
    });
    //     let blob = new Blob([moleculeList, reactionList,
    //         xml_conditions, xml_modelParameters, xml_control],
    //         { type: "text/plain" });
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
        if (this.attributes) for (let [k, v] of this.attributes)s += " " + k + '="' + v.toString() + '"';
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
        return this.nodes.size - 1;
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
function toHTML(text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/  /g, "&nbsp;&nbsp;");
}

},{"./html":"aLPSL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aLPSL":[function(require,module,exports) {
/**
 * Create a collapsible div.
 * @param content The content that will be collapsible.
 * @param buttonLabel The label of the button.
 * @param buttonId The id of the button.
 * @param buttonFontSize The font size of the button.
 * @param marginLeft The margin left of the button.
 * @param marginTop The margin top of the button.
 * @param marginBottom The margin bottom of the button.
 * @param contentDivId The id of the content div.
 * @param contentDivClassName The class of the content div.
 * @returns A collapsible div.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getCollapsibleDiv", ()=>getCollapsibleDiv);
/**
 * For making elements with the class "collapsible" collapsible.
 */ parcelHelpers.export(exports, "makeCollapsible", ()=>makeCollapsible);
/**
 * Create a input. This is an HTMLDivElement that contains an HTMLLabelElement and a HTMLInputElement.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the input.
 * @param func The function called on a change to the input.
 * @param value The value of the input.
 * @param labelText The label text.
 * @returns A HTMLDivElement that contains a HTMLLabelElement and a HTMLInputElement.
 */ parcelHelpers.export(exports, "getInput", ()=>getInput);
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
 * @param input The input to resize.
 * @param minSize The minimum size of the input.
 */ parcelHelpers.export(exports, "resizeSelectElement", ()=>resizeSelectElement);
/**
 * @param options The options.
 * @param name The name.
 * @param id The id.
 * @returns An HTMLSelectElement.
 */ parcelHelpers.export(exports, "getSelectElement", ()=>getSelectElement);
function getCollapsibleDiv(content, buttonLabel, buttonId, buttonFontSize, marginLeft, marginTop, marginBottom, contentDivId, contentDivClassName) {
    let contentDiv = document.createElement("div");
    if (contentDivId != undefined) contentDiv.id = contentDivId;
    if (contentDivClassName != undefined) contentDiv.className = contentDivClassName;
    let button = document.createElement("button");
    if (buttonId != undefined) button.id = buttonId;
    button.className = "collapsible";
    button.innerText = buttonLabel + " \u25BC";
    button.addEventListener("click", function() {
        if (button.innerText.includes("\u25BC")) button.innerText = buttonLabel + " \u25B2"; // Change to up content is expanded
        else button.innerText = buttonLabel + " \u25BC"; // Change to down arrow when content is collapsed
    });
    if (buttonFontSize != undefined) button.style.fontSize = buttonFontSize;
    if (marginLeft != undefined) button.style.marginLeft = marginLeft;
    if (marginTop != undefined) button.style.marginTop = marginTop;
    if (marginBottom != undefined) button.style.marginBottom = marginBottom;
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
    return container;
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
function getSelectElement(options, name, id) {
    let selectElement = document.createElement("select");
    options.forEach((option)=>{
        selectElement.name = name;
        selectElement.id = id;
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
    return selectElement;
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
 * The attributes may include "id", "x3", "y3", "z3" - coordinates used to depict a molecule containing the atom.
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
 * The attributes are expected to include "xsi:type" - expected values are either "ClassicalRotors" or "QMRotors".
 */ parcelHelpers.export(exports, "DOSCMethod", ()=>DOSCMethod);
/**
 * In the XML, a "me:bondRef" node is a child node of a "me:ExtraDOSCMethod" node.
 */ parcelHelpers.export(exports, "BondRef", ()=>BondRef);
/**
 * In the XML, a "me:PotentialPoint" node is a child node of a "me:HinderedRotorPotential" node.
 */ parcelHelpers.export(exports, "PotentialPoint", ()=>PotentialPoint);
/**
 * In the XML, a "me:HinderedRotorPotential" node is a child node of a "me:ExtraDOSCMethod" node.
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
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, Bond.tagName);
        let atomRefs2 = attributes.get("atomRefs2");
        if (atomRefs2 == undefined) throw new Error("atomRefs2 is undefined");
        this.atomRefs2 = atomRefs2;
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
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */ updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            if (this.attributes != undefined) {
                let existingUnits = this.attributes.get("units");
                if (existingUnits != undefined) {
                    if (existingUnits != units) //console.log('Units are not the same, changing units...');
                    this.attributes.set("units", units);
                }
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
            if (this.attributes != undefined) {
                let existingUnits = this.attributes.get("units");
                if (existingUnits != undefined) {
                    if (existingUnits != units) //console.log('Units are not the same, changing units...');
                    this.attributes.set("units", units);
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
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, Property.tagName);
        let dictRef = attributes.get("dictRef");
        if (dictRef == undefined) throw new Error("dictRef is undefined");
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
        this.dictRef = "me:ZPE";
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
        this.dictRef = "me:frequenciesScaleFactor";
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
        this.dictRef = "me:vibFreqs";
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
        this.dictRef = "me:rotConsts";
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
        this.dictRef = "me:MW";
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
        this.dictRef = "me:imFreqs";
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
        if (properties) properties.forEach((property)=>{
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
    /**
     * @param attributes The attributes.
     * @param units The units.
     */ constructor(attributes, value){
        super(attributes, DeltaEDown.tagName, value);
    }
    /**
     * @returns The bath gas of the DeltaEDown.
     */ getBathGas() {
        if (this.attributes != undefined) return this.attributes.get("bathGas");
    }
    /**
     * @param bathGas The bath gas of the DeltaEDown.
     */ setBathGas(bathGas) {
        if (this.attributes != undefined) this.attributes.set("bathGas", bathGas);
    }
    /**
     * @returns The units of the DeltaEDown.
     */ getUnits() {
        if (this.attributes != undefined) return this.attributes.get("units");
    }
    /**
     * @returns The lower of the DeltaEDown.
     */ getLower() {
        if (this.attributes != undefined) return parseFloat((0, _utilJs.get)(this.attributes, "lower"));
    }
    /**
     * @param lower The lower of the DeltaEDown.
     */ setLower(lower) {
        if (this.attributes != undefined) this.attributes.set("lower", lower.toString());
    }
    /**
     * @returns The upper of the DeltaEDown.
     */ getUpper() {
        if (this.attributes != undefined) return parseFloat((0, _utilJs.get)(this.attributes, "upper"));
    }
    /**
     * @param upper The upper of the DeltaEDown.
     */ setUpper(upper) {
        if (this.attributes != undefined) this.attributes.set("upper", upper.toString());
    }
    /**
     * @returns The stepsize of the DeltaEDown.
     */ getStepsize() {
        if (this.attributes != undefined) return parseFloat((0, _utilJs.get)(this.attributes, "stepsize"));
    }
    /**
     * @param stepsize The stepsize of the DeltaEDown.
     */ setStepsize(stepsize) {
        if (this.attributes != undefined) this.attributes.set("stepsize", stepsize.toString());
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
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, DOSCMethod.tagName);
        if (attributes.get("xsi:type") == undefined) throw new Error("xsi:type is undefined");
    }
    /**
     * @returns The xsi type of the DOSCMethod.
     */ getXsiType() {
        if (this.attributes == undefined) throw new Error("attributes is undefined");
        return this.attributes.get("xsi:type");
    }
    /**
     * @param xsiType The xsi type of the DOSCMethod.
     */ setXsiType(xsiType) {
        if (this.attributes == undefined) throw new Error("attributes is undefined");
        this.attributes.set("xsi:type", xsiType);
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
    /**
     * @returns The potential point with the given index.
     */ getPotentialPoint(index) {
        return this.nodes.get(index);
    }
    /**
     * Set the potential point at the given index.
     * @param index The index to set the potential point at.
     * @param p The potential point to set at the index.
     */ setPotentialPoints(index, p) {
        this.nodes.set(index, p);
    }
    /**
     * Add the potential point.
     * @param p The potential point.
     * @returns The index of the potential point added.
     */ addPotentialPoint(p) {
        this.nodes.set(this.nodes.size, p);
        return this.nodes.size - 1;
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
        let id = attributes.get("id");
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
        if (this.attributes != undefined) return this.attributes.get("description");
    }
    /**
     * Set the description of the molecule.
     * @param description The description of the molecule.
     */ setDescription(description) {
        if (this.attributes != undefined) this.attributes.set("description", description);
    }
    /**
     * Get the active status of the molecule.
     * @returns The active status of the molecule, or undefined if it is not set.
     */ getActive() {
        if (this.attributes != undefined) {
            let active = this.attributes.get("active");
            if (active != undefined) {
                if (active == "true") return true;
                else return false;
            }
        }
    }
    /**
     * Set the active status of the molecule.
     * @param active The active status of the molecule.
     */ setActive(active) {
        if (this.attributes != undefined) this.attributes.set("active", active.toString());
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
        if (active) label += " (active)";
        return label;
    }
    /**
     * @returns A comma and space separated string of the attributes of the molecule.
     */ getAttributesAsString() {
        if (this.attributes == undefined) return "";
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
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
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
            throw new Error("ZPE property not found");
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
    /**
     * @param {Map<string, string>} attributes The attributes.
     */ constructor(attributes){
        super(attributes, Tunneling.tagName);
    }
    /**
     * @returns The name of the tunneling method.
     */ getName() {
        if (this.attributes != undefined) return this.attributes.get("name");
        return "";
    }
    /**
     * @param The name of the tunneling method.
     */ setName(name) {
        if (this.attributes != undefined) this.attributes.set("name", name);
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
        let id = attributes.get("id");
        if (id == undefined) throw new Error("Reaction id is undefined");
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
 * A class for representing a Pressure and Temperature pair with optional BathGas and ExperimentRate.
 * Can there be multiple BathGases and ExperimentRates?
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
    /**
     * @param attributes The attributes. 
     * @param value The value. 
     */ constructor(attributes, value){
        super(attributes, ExperimentRate.tagName, value);
    }
    /**
     * @returns The error attribute or undefined if there is no error attribute.
     */ getError() {
        if (this.attributes != undefined) {
            let error = this.attributes.get("error");
            if (error) return parseFloat(error);
        }
    }
    /**
     * Set the error attribute.
     * @param error The error.
     */ setError(error) {
        if (this.attributes != undefined) this.attributes.set("error", error.toString());
    }
}
class PTpair extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:PTpair";
    }
    /**
     * @param attributes The attributes.
     * @param bathGas The bath gas.
     * @param experimentRate The experiment rate.
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
        if (this.attributes != undefined) {
            let p = this.attributes.get("P");
            if (p) return parseFloat(p);
            else throw new Error("P is undefined");
        }
        return NaN;
    }
    /**
     * Set The Pressure
     */ setP(p) {
        if (this.attributes != undefined) this.attributes.set("P", p.toString());
    }
    /**
     * @returns The Temperature.
     */ getT() {
        if (this.attributes != undefined) {
            let t = this.attributes.get("T");
            if (t) return parseFloat(t);
            else throw new Error("T is undefined");
        }
        return NaN;
    }
    /**
     * Set The Temperature.
     */ setT(t) {
        if (this.attributes != undefined) this.attributes.set("T", t.toString());
    }
    /**
     * @returns The bath gas.
     */ getBathGas() {
        let i = this.index.get(BathGas.tagName);
        if (i) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param bathGas The bath gas.
     */ setBathGas(bathGas) {
        let i = this.index.get(BathGas.tagName);
        if (i) this.nodes.set(i, bathGas);
        else {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
    }
    /**
     * @returns The experiment rate.
     */ getExperimentRate() {
        let i = this.index.get(ExperimentRate.tagName);
        if (i) return this.nodes.get(i);
        else return undefined;
    }
    /**
     * @param experimentRate The experiment rate.
     */ setExperimentRate(experimentRate) {
        let i = this.index.get(ExperimentRate.tagName);
        if (i) this.nodes.set(i, experimentRate);
        else {
            this.index.set(ExperimentRate.tagName, this.nodes.size);
            this.addNode(experimentRate);
        }
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
     */ constructor(attributes, pTs){
        super(attributes, PTs.tagName);
        if (pTs) pTs.forEach((pTpair)=>{
            this.addNode(pTpair);
        });
    }
    /**
     * @param index 
     * @returns The PT pair at the given index or undefined if the index is out of range.
     */ getPTpair(index) {
        return this.nodes.get(index);
    }
    /**
     * Set the PT at the given index.
     * @returns The PT pairs.
     */ setPTpair(index, pT) {
        this.nodes.set(index, pT);
    }
    /**
     * Add a PT.
     * @param pTPair The PT to add.
     * @returns The index of the PT added.
     */ addPTpair(pT) {
        return this.addNode(pT);
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
     * @param bathGas The bath gas.
     * @param pTs The PTs - the Pressure, Temperature, BathGas, ExperimentRate instances.
     */ constructor(attributes, bathGas, pTs){
        super(attributes, Conditions.tagName);
        this.index = new Map();
        if (bathGas) {
            this.index.set(BathGas.tagName, this.nodes.size);
            this.addNode(bathGas);
        }
        if (pTs) {
            this.index.set(PTs.tagName, this.nodes.size);
            this.addNode(pTs);
        }
    }
    /**
     * @returns The bath gas.
     */ getBathGas() {
        let i = this.index.get(BathGas.tagName);
        if (i != undefined) return this.nodes.get(i);
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
    constructor(attributes, grainSize, energyAboveTheTopHill){
        super(attributes, ModelParameters.tagName);
        this.index = new Map();
        if (grainSize != undefined) {
            this.index.set(GrainSize.tagName, this.nodes.size);
            this.addNode(grainSize);
        }
        if (energyAboveTheTopHill != undefined) {
            this.index.set(EnergyAboveTheTopHill.tagName, this.nodes.size);
            this.addNode(energyAboveTheTopHill);
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
    /**
     * @returns The testDOS or undefined.
     */ getTestDOS() {
        let i = this.index.get(TestDOS.tagName);
        if (i != undefined) return this.nodes.get(i);
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
     * @returns The PrintSpeciesProfile or undefined.
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
     * @returns The TestMicroRates or undefined.
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
    /**
     * @returns The TestRateConstant or undefined.
     */ getTestRateConstant() {
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param testRateConstant The testRateConstant.
     */ setTestRateConstant(testRateConstant) {
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) this.nodes.set(i, testRateConstant);
        else {
            this.index.set(TestRateConstant.tagName, this.nodes.size);
            this.addNode(testRateConstant);
        }
    }
    /**
     * Remove the testRateConstant.
     */ removeTestRateConstant() {
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(TestRateConstant.tagName);
        }
    }
    /**
     * @returns The PrintGrainDOS or undefined.
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
     * @returns The PrintCellDOS or undefined.
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
     * @returns The PrintReactionOperatorColumnSums or undefined.
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
     * @returns The PrintTunnellingCoefficients or undefined.
     */ getPrintTunnellingCoefficients() {
        let i = this.index.get(PrintTunnellingCoefficients.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param printTunnellingCoefficients The printTunnellingCoefficients.
     */ setPrintTunnellingCoefficients(printTunnellingCoefficients) {
        let i = this.index.get(PrintTunnellingCoefficients.tagName);
        if (i != undefined) this.nodes.set(i, printTunnellingCoefficients);
        else {
            this.index.set(PrintTunnellingCoefficients.tagName, this.nodes.size);
            this.addNode(printTunnellingCoefficients);
        }
    }
    /**
     * Remove the printTunnellingCoefficients.
     */ removePrintTunnellingCoefficients() {
        let i = this.index.get(PrintTunnellingCoefficients.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(PrintTunnellingCoefficients.tagName);
        }
    }
    /**
     * @returns The PrintGrainkfE or undefined.
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
     * @returns The PrintGrainBoltzmann or undefined.
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
     * @returns The PrintGrainkbE or undefined.
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
     * @returns The diagramEnergyOffset or undefined.
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
