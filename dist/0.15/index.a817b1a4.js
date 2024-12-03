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
        globalObject
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
})({"ftTiJ":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "7fd16dc2a817b1a4";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
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
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
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
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
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
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
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
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
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
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
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
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
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
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
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
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
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
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"dPB9w":[function(require,module,exports,__globalThis) {
// Imports from MXG modules.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "level0", ()=>level0);
parcelHelpers.export(exports, "level1", ()=>level1);
parcelHelpers.export(exports, "boundary1", ()=>boundary1);
parcelHelpers.export(exports, "sy_add", ()=>sy_add);
parcelHelpers.export(exports, "sy_edit", ()=>sy_edit);
parcelHelpers.export(exports, "sy_deselected", ()=>sy_deselected);
parcelHelpers.export(exports, "sy_selected", ()=>sy_selected);
parcelHelpers.export(exports, "s_Add_sy_add", ()=>s_Add_sy_add);
parcelHelpers.export(exports, "s_Add_from_library", ()=>s_Add_from_library);
parcelHelpers.export(exports, "s_Add_from_spreadsheet", ()=>s_Add_from_spreadsheet);
parcelHelpers.export(exports, "s_container", ()=>s_container);
parcelHelpers.export(exports, "s_description", ()=>s_description);
parcelHelpers.export(exports, "s_input", ()=>s_input);
parcelHelpers.export(exports, "s_molecules", ()=>s_molecules);
parcelHelpers.export(exports, "s_optionOn", ()=>s_optionOn);
parcelHelpers.export(exports, "s_optionOff", ()=>s_optionOff);
parcelHelpers.export(exports, "s_Products", ()=>s_Products);
parcelHelpers.export(exports, "s_Reactants", ()=>s_Reactants);
parcelHelpers.export(exports, "s_reactions", ()=>s_reactions);
parcelHelpers.export(exports, "s_Remove_sy_remove", ()=>s_Remove_sy_remove);
parcelHelpers.export(exports, "s_save", ()=>s_save);
parcelHelpers.export(exports, "s_selectOption", ()=>s_selectOption);
parcelHelpers.export(exports, "s_table", ()=>s_table);
parcelHelpers.export(exports, "s_Transition_States", ()=>s_Transition_States);
parcelHelpers.export(exports, "s_textarea", ()=>s_textarea);
parcelHelpers.export(exports, "s_Tunneling", ()=>s_Tunneling);
parcelHelpers.export(exports, "s_undefined", ()=>s_undefined);
parcelHelpers.export(exports, "s_units", ()=>s_units);
parcelHelpers.export(exports, "s_viewer", ()=>s_viewer);
/**
 * Add an ID to the set of IDs.
 * @param parts The parts of the ID.
 */ parcelHelpers.export(exports, "addID", ()=>addID);
/**
 * Add an ID to the set of IDs.
 * @param parts The parts of the ID.
 */ parcelHelpers.export(exports, "addRID", ()=>addRID);
/**
 * Remove an element with the given id.
 * @param id The id of the element to remove.
 */ parcelHelpers.export(exports, "remove", ()=>remove);
parcelHelpers.export(exports, "menuDivID", ()=>menuDivID);
parcelHelpers.export(exports, "reactionsDiagramDivID", ()=>reactionsDiagramDivID);
parcelHelpers.export(exports, "big0", ()=>big0);
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
 * For ID management.
 */ parcelHelpers.export(exports, "IDManager", ()=>IDManager);
parcelHelpers.export(exports, "mesmer", ()=>mesmer);
parcelHelpers.export(exports, "defaults", ()=>defaults);
parcelHelpers.export(exports, "libmols", ()=>libmols);
/**
 * For initialising the libmols map.
 * @param m The map of molecules to set.
 */ parcelHelpers.export(exports, "setLibmols", ()=>setLibmols);
/**
 * Adds a molecule to the map of molecules.
 * The molecule label is updated if the molecule attribute id is not unique. 
 * @param m The molecule to add
 * @param ms The map of molecules to add the molecule to.
 */ parcelHelpers.export(exports, "addMolecule", ()=>addMolecule);
/**
 * Get the keys of the molecules. The keys are a composite of the molecule ID and the index.
 * @returns The keys of the molecules.
 */ parcelHelpers.export(exports, "getMoleculeKeys", ()=>getMoleculeKeys);
/**
 * This returns the molecule found with the given label from ms.
 * @param id The id of the molecule to find.
 * @param ms The map of molecules to search.
 * @returns The molecule with the lable in ms.
 */ parcelHelpers.export(exports, "getMolecule", ()=>getMolecule);
parcelHelpers.export(exports, "s_Reactions_Diagram", ()=>s_Reactions_Diagram);
/**
 * Load interface.
 */ parcelHelpers.export(exports, "startAfresh", ()=>startAfresh);
/**
 * Redraw the reactions diagram.
 */ parcelHelpers.export(exports, "redrawReactionsDiagram", ()=>redrawReactionsDiagram);
/**
 * Prompts the user for a MESMER XML file, and initiates the parsing of the chosen file.
 */ parcelHelpers.export(exports, "load", ()=>load);
/**
 * @param className The className of Elements to update
 * @param optionToRemove The option value to remove.
 */ parcelHelpers.export(exports, "removeOptionByClassName", ()=>removeOptionByClassName);
/**
 * @param className The className of Elements to update
 * @param optionToAdd  The option value to add.
 */ parcelHelpers.export(exports, "addOptionByClassName", ()=>addOptionByClassName);
/**
 * For adding or removing s_selectOption.
 * @param options The options.
 * @param add If true then a new option is added with an instruction to select another option.
 * If false then this option is removed if it is present.
 */ parcelHelpers.export(exports, "addOrRemoveInstructions", ()=>addOrRemoveInstructions);
/**
 * Process a numerical variable.
 * @param id The id.
 * @param tIDM The IDManager.
 * @param name The name of the variable.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param margin The margin.
 * @returns A div element.
 */ parcelHelpers.export(exports, "processNumber", ()=>processNumber);
/**
 * @param div The div to append the button to.
 * @param removeFunction The function to call when the button is clicked.
 * @param args The parameters passed to the removeFunction.
 * @param margin The margin to go around the button.
 * @returns The button.
 */ parcelHelpers.export(exports, "addRemoveButton", ()=>addRemoveButton);
/**
 * Process a string variable.
 * @param id The id.
 * @param iDs The set of IDs to add to.
 * @param name The name of the variable.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param remover The remover function.
 * @param marginComponent The margin component.
 * @param margin The margin.
 */ parcelHelpers.export(exports, "processString", ()=>processString);
/**
 * If there is a choice of units, then a HTMLDivElement is appended containing an HTMLLabelElement and a HTMLSelectElement.
 * If there is no choice of units, a HTMLLabelElement is appended.
 * @param units The possible units.
 * @param attributes The attributes.
 * @param divToAddTo The input div.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 * @param margin The boundary.
 * @param level The level.
 */ parcelHelpers.export(exports, "addAnyUnits", ()=>addAnyUnits);
/**
 * For getting a positive integer.
 * @param message The message for the user prompt.
 * @returns A positive integer.
 */ parcelHelpers.export(exports, "getN", ()=>getN);
/**
 * @param options The options.
 * @param select The select element.
 */ parcelHelpers.export(exports, "selectAnotherOptionEventListener", ()=>selectAnotherOptionEventListener);
/**
 * Save the Mesmer object as XML.
 */ parcelHelpers.export(exports, "saveXML", ()=>saveXML);
/**
 * Create and append a Save as PNG button.
 * 
 * @param canvas The canvas to save as an image.
 * @param divToAddTo The div to add the button to.
 * @param elementToInsertBefore The element to insert before.
 * @param name The name to be appended to the file.
 */ parcelHelpers.export(exports, "addSaveAsPNGButton", ()=>addSaveAsPNGButton);
/**
 * Create and append a Save as CSV button.
 * 
 * @param toCSV The function to convert to CSV.
 * @param divToAddTo The div to add the button to.
 * @param elementToInsertBefore The element to insert before.
 * @param name The name to be appended to the file.
 */ parcelHelpers.export(exports, "addSaveAsCSVButton", ()=>addSaveAsCSVButton);
/**
 * Set a number node when the input value is changed.
 * @param node The number node.
 * @param input The input element.
 */ parcelHelpers.export(exports, "setNumberNode", ()=>setNumberNode);
var _utilJs = require("./util.js");
var _xmlJs = require("./xml.js");
var _htmlJs = require("./html.js");
var _guiMenuJs = require("./gui_menu.js");
var _xmlConditionsJs = require("./xml_conditions.js");
var _xmlModelParametersJs = require("./xml_modelParameters.js");
var _xmlControlJs = require("./xml_control.js");
var _xmlMesmerJs = require("./xml_mesmer.js");
var _xmlAnalysisJs = require("./xml_analysis.js");
var _xmlMetadataJs = require("./xml_metadata.js");
var _defaultsJs = require("./defaults.js");
var _guiMoleculeListJs = require("./gui_moleculeList.js");
var _guiReactionListJs = require("./gui_reactionList.js");
var _guiConditionsListJs = require("./gui_ConditionsList.js");
var _guiModelParametersListJs = require("./gui_ModelParametersList.js");
var _guiControlListJs = require("./gui_ControlList.js");
var _guiReactionDiagramJs = require("./gui_reactionDiagram.js");
// Imports from 3rd party modules.
//import { openDB } from 'idb';
var _bigJs = require("big.js");
//import * as $3Dmol from '$3Dmol';
/**
 * Big.js.
 */ // Set the number toString() format for Big.js. The default is Big.PE = 21, so this change means that Big numbers
// with an order of magnitude of greater than 6 (e.g. 1000000) are presented as 1.0e+7.
(0, _bigJs.Big).PE = 7;
/**
 * The filename of the MESMER XML file.
 */ let filename;
/**
 * fontSize is set to a relative measure so that component text is resizeable.
 */ let fontSize = "1.0em";
/**
 * Margins for spacing GUI components.
 */ let s_0px = "0px";
let s_1px = "1px";
let s_25px = "25px";
let level0 = {
    marginLeft: s_0px,
    marginTop: s_1px,
    marginBottom: s_1px,
    marginRight: s_0px
};
let level1 = {
    marginLeft: s_25px,
    marginTop: s_1px,
    marginBottom: s_1px,
    marginRight: s_0px
};
let boundary1 = {
    marginLeft: s_1px,
    marginTop: s_1px,
    marginBottom: s_1px,
    marginRight: s_1px
};
const sy_add = "\uFF0B"; // ＋
const sy_edit = "\u270E"; // ✎
const sy_deselected = " \u2717"; // ✗
//const sy_refresh: string = "\u27F3"; // ⟳
const sy_remove = "\u2715"; // ✕
const sy_selected = " \u2713"; // ✓
const s_Add_sy_add = "Add " + sy_add;
const s_Add_from_library = "Add from library " + sy_add;
const s_Add_from_spreadsheet = "Add from spreadsheet " + sy_add;
const s_analysis = "analysis";
const s_conditions = "conditions";
const s_container = "container";
const s_control = "control";
const s_description = "description";
const s_graph = "graph";
const s_input = "input";
const s_menu = "menu";
const s_metadata = "metadata";
const s_modelParameters = "modelParameters";
const s_molecules = "molecules";
const s_optionOn = 'optionOn';
const s_optionOff = 'optionOff';
const s_Products = "Products";
const s_Reactants = "Reactants";
const s_reactions = "reactions";
const s_reactionsDiagram = "reactionsDiagram";
const s_Remove_sy_remove = "Remove " + sy_remove;
const s_save = "save";
const s_selectOption = "Select an option (press a letter key to cycle through options for it)...";
const s_table = "table";
const s_title = "title";
const s_Transition_States = "Transition States";
const s_textarea = "textarea";
const s_Tunneling = "Tunneling";
const s_undefined = "undefined";
const s_units = "units";
const s_xml = "xml";
const s_viewer = "viewer";
const s_welcome = "welcome";
/**
 * allIDs is a set of all IDs used in the GUI.
 * This is used to ensure that all IDs are unique.
 * If an ID is not unique, an error is thrown.
 */ let allIDs = new Set();
/**
 * A set of all IDs to be removed when loading a MESMER file.
 */ let rIDs = new Set();
function addID(...parts) {
    let validID = (0, _utilJs.getID)(...parts);
    if (allIDs.has(validID)) throw new Error(validID + " already exists!");
    allIDs.add(validID);
    //console.log("addID: \"" + validID + "\"");
    return validID;
}
function addRID(...parts) {
    let validID = addID(...parts);
    rIDs.add(validID);
    return validID;
}
function remove(id) {
    let e = document.getElementById(id);
    if (e != null) e.remove();
    rIDs.delete(id);
    allIDs.delete(id);
}
const menuDivID = addID(s_menu);
const titleDivID = addID(s_title);
const moleculesDivID = addID(s_molecules);
const reactionsDivID = addID(s_reactions);
const reactionsDiagramDivID = addID(s_reactionsDiagram);
const conditionsDivID = addID(s_conditions);
const modelParametersDivID = addID(s_modelParameters);
const controlDivID = addID(s_control);
const metadataListDivID = addID(s_metadata);
const analysisDivID = addID(s_analysis);
const xmlDivID = addID(s_xml);
//const welcomeDivID: string = addID(s_welcome);
// For dark/light mode.
let dark = false;
const big0 = new (0, _bigJs.Big)(0);
class IDManager {
    /**
     * Adds an ID to the map.
     * @param iD The key ID.
     * @param parts The parts of the ID to be created.
     * @returns The ID created.
     */ addID(iD, ...parts) {
        let id = addRID(iD, ...parts);
        if (!this.ids.has(iD)) this.ids.set(iD, new Set());
        this.ids.get(iD)?.add(id);
        return id;
    }
    /**
     * Remove the IDs to the map.
     * @param iD The key ID.
     * @param parts The parts of the ID to be created.
     * @returns The ID created.
     */ removeID(iD) {
        rIDs.delete(iD);
        allIDs.delete(iD);
    }
    /**
     * Removes the IDs.
     * @param iD The ID key for the IDs to remove.
     */ removeIDs(iD) {
        if (!this.ids.has(iD)) return;
        this.ids.get(iD).forEach((id)=>{
            console.log("remove id " + id);
            this.removeID(id);
        });
        this.ids.delete(iD);
    }
    /**
     * Remove all IDs.
     */ removeAllIDs() {
        this.ids.forEach((value, key)=>{
            this.removeIDs(key);
        });
    }
    constructor(){
        /**
     * A map of IDs with the key ID as the key and a set of IDs as the value.
     */ this.ids = new Map();
    }
}
/**
 * For moleculeList Div ID management.
 */ let mIDM;
/**
 * For reactionList Div ID management.
 */ let rIDM;
/**
 * For conditionsList Div ID management.
 */ let conditionsIDM;
/**
 * For ModelParametersList Div ID management.
 */ let mpIDM;
/**
 * For ControlList Div ID management.
 */ let controlIDM;
let mesmer;
let defaults;
let libmols;
function setLibmols(m) {
    libmols = m;
}
function addMolecule(ask, m, ms) {
    let mid;
    while(true){
        mid = (0, _guiMoleculeListJs.setMoleculeID)(ask, m.getID(), m, ms);
        if (mid != undefined) break;
    }
    ms.set(mid, m);
}
/**
 * A map of molecules with id as key and Molecule as value.
 * The key is a composite of the molecule ID and the index.
 */ let molecules;
function getMoleculeKeys(molecules) {
    let keys = new Set();
    molecules.forEach((v, k)=>{
        let id = v.getID();
        if (keys.has(id)) keys.add(id + "-" + k.toString());
        else keys.add(id);
    });
    return keys;
}
function getMolecule(id, ms) {
    for (let [key, value] of ms){
        //if (value.label == label) {
        if (value.id == id) return value;
    }
    return null;
}
/**
 * A map of reactions with Reaction.id as keys and Reactions as values.
 */ let reactions;
/**
 * For storing any scatter plots.
 */ let scatterPlots;
const s_Reactions_Diagram = "Reactions Diagram";
const rddDivID = addRID(s_Reactions_Diagram);
const rddcID = addRID(rddDivID, "Canvas");
//let rd_canvas_width: number = 800;
let rdcHeight = 400;
let rd_lw = 4; // Line width of reactants, transition states and products.
let rd_lwc = 2; // Line width of connectors.
let rd_font = "1em SensSerif";
let rdWindow = null;
// Scatterplot font.
let sp_font = "2em SensSerif";
/**
 * Once the DOM is loaded, add the menu and collapsed buttons for content
 */ document.addEventListener('DOMContentLoaded', ()=>{
    // Update the page styles based on the user's preference.
    document.body.className = dark ? 'dark-mode' : 'light-mode';
    /* It is not allowed to use localStorage with a Service Worker!
    let darkModePreference = localStorage.getItem('darkMode');
    dark = (darkModePreference === 'true');
    console.log("dark=" + dark);
    */ // Initialise mesmer.
    let mesmerAttributes = new Map();
    mesmerAttributes.set("xmlns", "http://www.xml-cml.org/schema");
    mesmerAttributes.set("xmlns:me", "http://www.chem.leeds.ac.uk/mesmer");
    mesmerAttributes.set("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    mesmer = new (0, _xmlMesmerJs.Mesmer)(mesmerAttributes);
    // Create the menu.
    (0, _guiMenuJs.createMenu)();
    // StartAfresh
    startAfresh();
});
/**
 * (Re)Initialise the main GUI and IDManagers.
 */ function initialise() {
    // Clear content.
    rIDs.forEach((id)=>{
        remove(id);
    });
    // Initialise
    rIDs = new Set();
    mIDM = new IDManager();
    rIDM = new IDManager();
    conditionsIDM = new IDManager();
    mpIDM = new IDManager();
    controlIDM = new IDManager();
    // libmols is not reinitialised on purpose. To completely start again, reload the app.
    //libmols = new Map();
    defaults = new (0, _defaultsJs.Defaults)();
    molecules = new Map();
    reactions = new Map();
    scatterPlots = [];
}
function startAfresh() {
    initialise();
    // Title.
    let title = "Example_title";
    let attributes = new Map();
    createTitle(title, attributes);
    // Molecules.
    let moleculesDiv = document.getElementById(moleculesDivID);
    let mlDivID = addRID((0, _xmlMesmerJs.MoleculeList).tagName);
    let mlDiv = (0, _htmlJs.createDiv)(mlDivID);
    moleculesDiv.appendChild(mlDiv);
    // Create collapsible content.
    let mlcDiv = (0, _htmlJs.getCollapsibleDiv)(mlDivID, moleculesDiv, null, mlDiv, (0, _xmlMesmerJs.MoleculeList).tagName, boundary1, level0);
    // Add add molecule button.
    let mb = (0, _guiMoleculeListJs.getAddMoleculeButton)(mlDiv, mIDM, molecules);
    // Add add from library button.
    let lb = (0, _guiMoleculeListJs.getAddFromLibraryButton)(mlDiv, mb, mIDM, molecules);
    // Reaction List.
    let rlDivID = addRID((0, _xmlMesmerJs.ReactionList).tagName);
    // Remove any existing rlDivID HTMLDivElement.
    remove(rlDivID);
    createReactionList((0, _htmlJs.createDiv)(rlDivID));
    // Reactions Diagram.
    (0, _guiReactionDiagramJs.createReactionDiagram)(rddcID, rdcHeight, dark, rd_font, rd_lw, rd_lwc, rdWindow, molecules, reactions, true);
    // Conditions.
    let conditionsDiv = document.getElementById(conditionsDivID);
    let cdlDivID = addRID((0, _xmlConditionsJs.Conditions).tagName);
    let cdlDiv = (0, _htmlJs.createDiv)(cdlDivID);
    conditionsDiv.appendChild(cdlDiv);
    // Create a div for the conditionss.
    let conditionssDiv = (0, _htmlJs.createDiv)(undefined, boundary1);
    // Create an add button to add a conditions.
    (0, _guiConditionsListJs.createAddConditionsButton)(conditionssDiv, conditionsIDM, molecules);
    // Create collapsible content.
    let cdlcDiv = (0, _htmlJs.getCollapsibleDiv)(cdlDivID, cdlDiv, null, conditionssDiv, "ConditionsList", boundary1, level0);
    // Model Parameters.
    let modelParametersDiv = document.getElementById(modelParametersDivID);
    let mplDivID = addRID((0, _xmlModelParametersJs.ModelParameters).tagName, "list");
    let mplDiv = (0, _htmlJs.createDiv)(mplDivID);
    modelParametersDiv.appendChild(mplDiv);
    // Create a div for the model parameterss.
    let modelParameterssDiv = (0, _htmlJs.createDiv)(undefined, boundary1);
    // Create an add button to add a model parameters.
    (0, _guiModelParametersListJs.createAddModelParametersButton)(modelParameterssDiv, mpIDM);
    // Create collapsible content.
    let mplcDiv = (0, _htmlJs.getCollapsibleDiv)(mplDivID, mplDiv, null, modelParameterssDiv, "ModelParametersList", boundary1, level0);
    // Control.
    let controlDiv = document.getElementById(controlDivID);
    let clDivID = addRID((0, _xmlControlJs.Control).tagName);
    let clDiv = (0, _htmlJs.createDiv)(clDivID);
    controlDiv.appendChild(clDiv);
    // Create a div for the controls.
    let controlsDiv = (0, _htmlJs.createDiv)(undefined, boundary1);
    // Create an add button to add a control.
    (0, _guiControlListJs.createAddControlButton)(controlsDiv, controlIDM);
    // Create collapsible content.
    let controlcDiv = (0, _htmlJs.getCollapsibleDiv)(clDivID, clDiv, null, controlsDiv, "ControlList", boundary1, level0);
/*
    // MetadataList.
    let metadataListDiv: HTMLDivElement = document.getElementById(metadataListDivID) as HTMLDivElement;
    let mdDivID: string = addRID(MetadataList.tagName);
    let mdDiv: HTMLDivElement = createDiv(mdDivID);
    metadataListDiv.appendChild(mdDiv);
    // Create collapsible content.
    let mdcDiv: HTMLDivElement = getCollapsibleDiv(mdDivID, metadataListDiv, null, mdDiv,
        MetadataList.tagName, boundary1, level0);

    // Analysis.
    let analysisDiv: HTMLDivElement = document.getElementById(analysisDivID) as HTMLDivElement;
    let aDivID: string = addRID(Analysis.tagName);
    let aDiv: HTMLDivElement = createDiv(aDivID);
    analysisDiv.appendChild(aDiv);
    // Create collapsible content.
    let acDiv: HTMLDivElement = getCollapsibleDiv(aDivID, analysisDiv, null, aDiv,
        Analysis.tagName, boundary1, level0);

    // XML.
    let xmlDiv: HTMLDivElement = document.getElementById(xmlDivID) as HTMLDivElement;
    let xDivID: string = addRID(s_xml, 2);
    let xDiv: HTMLDivElement = createDiv(xDivID);
    xmlDiv.appendChild(xDiv);
    // Create collapsible content.
    let xcDiv: HTMLDivElement = getCollapsibleDiv(xDivID, xmlDiv, null, xDiv,
        s_xml, boundary1, level0);
    */ }
/**
 * Create the title input.
 */ function createTitle(title, attributes) {
    let titleNode = new (0, _xmlMesmerJs.Title)(attributes, title);
    mesmer.setTitle(titleNode);
    let titleDiv = document.getElementById(titleDivID);
    let lwiId = addRID('titleDiv');
    // Remove any existing lwiId HTMLDivElement.
    remove(lwiId);
    // Create input element.
    let lwi = (0, _htmlJs.createLabelWithInput)("text", addRID(lwiId, s_input), boundary1, level0, (event)=>{
        let target = event.target;
        titleNode.value = target.value;
        console.log(titleNode.tagName + " changed to " + titleNode.value);
        (0, _htmlJs.resizeInputElement)(target);
    }, title, (0, _xmlMesmerJs.Title).tagName);
    lwi.id = lwiId;
    titleDiv.appendChild(lwi);
}
/**
 * Create the Reaction List.
 * @param rlDiv The reactionList div.
 */ function createReactionList(rlDiv) {
    let reactionsDiv = document.getElementById(reactionsDivID);
    let rlDivID = addRID((0, _xmlMesmerJs.ReactionList).tagName);
    //let rlDiv: HTMLDivElement = createDiv(rlDivID);
    reactionsDiv.appendChild(rlDiv);
    // Create collapsible content.
    let rlcDiv = (0, _htmlJs.getCollapsibleDiv)(rlDivID, reactionsDiv, null, rlDiv, (0, _xmlMesmerJs.ReactionList).tagName, boundary1, level0);
    // Add add reaction button.
    let rb = (0, _guiReactionListJs.getAddReactionButton)(rIDM, rlDiv, reactions, molecules);
}
function redrawReactionsDiagram() {
    if (rdWindow == null) {
        let rdCanvas = document.getElementById(rddcID);
        (0, _guiReactionDiagramJs.drawReactionDiagram)(rdCanvas, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
    } else {
        let c = rdWindow.document.getElementById(rddcID);
        (0, _guiReactionDiagramJs.drawReactionDiagram)(c, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
    }
}
/**
 * Redraw any scatterplots.
 */ function redrawScatterPlots() {
    scatterPlots.forEach((scatterPlot)=>{
        scatterPlot.draw(sp_font);
    });
}
function load() {
    // Before loading a new file, remove existing content and initialise data containers.
    initialise();
    // Create a file input element to prompt the user to select a file.
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = function() {
        if (input.files) {
            for(let i = 0; i < input.files.length; i++)console.log("inputElement.files[" + i + "]=" + input.files[i]);
            let file = input.files[0];
            //console.log("file=" + file);
            console.log(file.name);
            filename = file.name;
            let reader = new FileReader();
            let chunkSize = 1048576; // 1MB
            let start = 0;
            let contents = '';
            reader.onload = function(e) {
                if (e.target == null) throw new Error('Event target is null');
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
                        displayXML(filename, contents);
                        let parser = new DOMParser();
                        let xml = parser.parseFromString(contents, "text/xml");
                        parse(xml);
                    }
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
    let xml_mesmer = (0, _xmlJs.getSingularElement)(xml, (0, _xmlMesmerJs.Mesmer).tagName);
    mesmer = new (0, _xmlMesmerJs.Mesmer)((0, _xmlJs.getAttributes)(xml_mesmer));
    // Title.
    let xml_title = xml.getElementsByTagName((0, _xmlMesmerJs.Title).tagName);
    let title;
    let attributes;
    if (xml_title.length > 0) {
        if (xml_title.length > 1) console.warn('Multiple ' + (0, _xmlMesmerJs.Title).tagName + ' tags found, using the first.');
        title = xml_title[0].childNodes[0].nodeValue.trim();
        attributes = (0, _xmlJs.getAttributes)(xml_title[0]);
    } else {
        title = filename;
        console.warn('No ' + (0, _xmlMesmerJs.Title).tagName + ' tag found, using the filename: ' + filename + ' as the title.');
        attributes = new Map();
    }
    createTitle(title, attributes);
    // moleculeList.
    let mlDiv = document.getElementById(moleculesDivID);
    let mlDivID = addRID((0, _xmlMesmerJs.MoleculeList).tagName);
    // Remove any existing mlDivID HTMLDivElement.
    remove(mlDivID);
    // Create collapsible content.
    let mlcDiv = (0, _htmlJs.getCollapsibleDiv)(mlDivID, mlDiv, null, (0, _guiMoleculeListJs.processMoleculeList)(xml, mIDM, molecules), (0, _xmlMesmerJs.MoleculeList).tagName, boundary1, level0);
    //document.body.appendChild(mlcDiv);
    // Reaction List.
    let rlDivID = addRID((0, _xmlMesmerJs.ReactionList).tagName);
    // Remove any existing rlDivID HTMLDivElement.
    remove(rlDivID);
    createReactionList((0, _guiReactionListJs.processReactionList)(xml, rIDM, rlDivID, reactions, molecules));
    // Reactions Diagram.
    (0, _guiReactionDiagramJs.createReactionDiagram)(rddcID, rdcHeight, dark, rd_font, rd_lw, rd_lwc, rdWindow, molecules, reactions, true);
    // ConditionsList.
    let cdlDiv = document.getElementById(conditionsDivID);
    let cdlDivID = addRID((0, _xmlConditionsJs.Conditions).tagName);
    // Remove any existing cdlDivID HTMLDivElement.
    remove(cdlDivID);
    // Create collapsible content.
    let cdlcDiv = (0, _htmlJs.getCollapsibleDiv)(cdlDivID, cdlDiv, null, (0, _guiConditionsListJs.processConditions)(xml, conditionsIDM, molecules), "ConditionsList", boundary1, level0);
    // ModelParametersList.
    let mplDiv = document.getElementById(modelParametersDivID);
    let mplDivID = addRID((0, _xmlModelParametersJs.ModelParameters).tagName, "list");
    // Remove any existing mpDivID HTMLDivElement.
    remove(mplDivID);
    // Create collapsible content.
    let mplcDiv = (0, _htmlJs.getCollapsibleDiv)(mplDivID, mplDiv, null, (0, _guiModelParametersListJs.processModelParameters)(xml, mpIDM), "ModelParametersList", boundary1, level0);
    // ControlList.
    let clDiv = document.getElementById(controlDivID);
    let clDivID = addRID((0, _xmlControlJs.Control).tagName);
    // Remove any existing clDivID HTMLDivElement.
    remove(clDivID);
    // Create collapsible content.
    let controlcDiv = (0, _htmlJs.getCollapsibleDiv)(clDivID, clDiv, null, (0, _guiControlListJs.processControl)(xml, controlIDM), "ControlList", boundary1, level0);
    // MetadataList.
    // Check if xml contains metadata.
    if (xml.getElementsByTagName((0, _xmlMetadataJs.MetadataList).tagName).length > 0) {
        let mdDiv = document.getElementById(metadataListDivID);
        let mdDivID = addRID((0, _xmlMetadataJs.MetadataList).tagName);
        // Remove any existing mdDivID HTMLDivElement.
        remove(mdDivID);
        // Create collapsible content.
        let mdcDiv = (0, _htmlJs.getCollapsibleDiv)(mdDivID, mdDiv, null, processMetadataList(xml), (0, _xmlMetadataJs.MetadataList).tagName, boundary1, level0);
    }
    // Analysis.
    // Check if xml contains analysis.
    if (xml.getElementsByTagName((0, _xmlAnalysisJs.Analysis).tagName).length > 0) {
        let aDiv = document.getElementById(analysisDivID);
        let aDivID = addRID((0, _xmlAnalysisJs.Analysis).tagName);
        // Remove any existing aDivID HTMLDivElement.
        remove(aDivID);
        // Create collapsible content.
        let acDiv = (0, _htmlJs.getCollapsibleDiv)(aDivID, aDiv, null, processAnalysis(xml), (0, _xmlAnalysisJs.Analysis).tagName, boundary1, level0);
    }
}
function removeOptionByClassName(className, optionToRemove) {
    let elements = document.getElementsByClassName(className);
    for(let i = 0; i < elements.length; i++)if (elements[i] instanceof HTMLSelectElement) {
        let options = elements[i].options;
        let selectValue = elements[i].value;
        Array.from(options).forEach((option)=>{
            if (option.value == optionToRemove) {
                option.remove();
                if (selectValue == optionToRemove) {
                    // Create a new event
                    let event = new Event('change');
                    // Dispatch the event
                    elements[i].dispatchEvent(event);
                }
            }
        });
    }
}
function addOptionByClassName(className, optionToAdd) {
    let elements = document.getElementsByClassName(className);
    console.log("n elements with className " + className + "=" + elements.length);
    for(let i = 0; i < elements.length; i++){
        let select = elements[i];
        if (elements[i] instanceof HTMLSelectElement) {
            let option = document.createElement('option');
            option.value = optionToAdd;
            option.text = optionToAdd;
            select.add(option);
        }
    }
}
function addOrRemoveInstructions(options, add) {
    if (add) options.push(s_selectOption);
    else {
        // remove selectOption if present.
        let index = options.indexOf(s_selectOption);
        if (index > -1) options.splice(index, 1);
    }
}
function processNumber(id, tIDM, name, getter, setter, remover, marginComponent, margin) {
    let div = (0, _htmlJs.createFlexDiv)(id, margin);
    let buttonTextContentSelected = name + sy_selected;
    let buttonTextContentDeselected = name + sy_deselected;
    //let idb: string = tIDM.addID(id, name, s_button);
    let idb = (0, _utilJs.getID)(id, name, (0, _htmlJs.s_button));
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, idb, marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    //let inputId: string = tIDM.addID(id, name, s_input)
    let inputId = (0, _utilJs.getID)(id, name, s_input);
    let value = getter();
    if (value == undefined) {
        //remover(name);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    } else {
        addNumber(div, inputId, name, value, getter, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event)=>{
        if (document.getElementById(inputId) == null) {
            console.log("Adding " + inputId);
            addNumber(div, inputId, name, value, getter, setter, marginComponent);
            // Invoke the setter function.
            let input = div.querySelector(s_input);
            // Enact a change event on input.
            if (value != undefined) input.value = value.toString();
            let event = new Event('change');
            input.dispatchEvent(event);
            //setter;
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing HTMLElement.
            document.getElementById(inputId)?.remove();
            // Remove node.
            //remover();
            remover(name);
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
    return div;
}
/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param name The name of the input.
 * @param value The numerical value.
 * @param setter The setter function to call.
 * @param margin The boundary.
 * @param level The level.
 */ function addNumber(div, id, name, value, getter, setter, margin) {
    let valueString;
    if (value == undefined) valueString = "";
    else valueString = value.toString();
    //let input: HTMLInputElement = createInput("number", id, boundary);
    let input = (0, _htmlJs.createInput)("text", id, margin);
    input.addEventListener('click', (event)=>{
        valueString = input.value;
    });
    input.addEventListener('change', (event)=>{
        let target = event.target;
        try {
            let value2 = target.value;
            if (value2 == "") value2 = "0";
            setter(new (0, _bigJs.Big)(value2));
            console.log(name + " changed from " + valueString + " to " + target.value);
        } catch (e) {
            alert("Input invalid, resetting...");
            let value2 = getter();
            if (value2 != undefined) target.value = value2.toString();
        }
        (0, _htmlJs.resizeInputElement)(target);
    });
    input.value = valueString;
    //setter(new Big(valueString));
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
}
function addRemoveButton(div, margin, removeFunction, ...args) {
    let button = (0, _htmlJs.createButton)(s_Remove_sy_remove, undefined, margin);
    div.appendChild(button);
    button.addEventListener('click', ()=>{
        removeFunction(...args);
        div.remove();
        remove(div.id);
    });
    return button;
}
function processString(id, iDs, name, getter, setter, remover, marginComponent, margin) {
    let div = (0, _htmlJs.createFlexDiv)(id, margin);
    let buttonTextContentSelected = name + sy_selected;
    let buttonTextContentDeselected = name + sy_deselected;
    let idb = addRID(id, (0, _htmlJs.s_button));
    iDs.add(idb);
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, idb, marginComponent);
    div.appendChild(button);
    button.classList.add(s_optionOn);
    button.classList.add(s_optionOff);
    let inputId = addRID(id, name, s_input);
    iDs.add(inputId);
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle(s_optionOn);
    } else {
        addString(div, inputId, name, value, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle(s_optionOff);
    }
    // Add event listener for the button.
    button.addEventListener('click', (event)=>{
        if (document.getElementById(inputId) == null) {
            addString(div, inputId, name, value, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            // Remove node.
            remover();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle(s_optionOn);
        button.classList.toggle(s_optionOff);
    });
    return div;
}
/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param name The name of the input.
 * @param value The numerical value.
 * @param setter The setter function to call.
 * @param margin The boundary.
 * @param level The level.
 */ function addString(div, id, name, value, setter, margin) {
    let valueString;
    if (value == undefined) valueString = "";
    else valueString = value.toString();
    //let input: HTMLInputElement = createInput("number", id, boundary);
    let input = (0, _htmlJs.createInput)("text", id, margin);
    input.addEventListener('change', (event)=>{
        let target = event.target;
        setter(target.value);
        console.log(name + " changed from " + value + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * Display the XML.
 * @param {string} xml The XML to display.
 */ function displayXML(xmlFilename, xml) {
    let xmlDiv = document.getElementById(xmlDivID);
    let xml2DivID = addRID(xmlDivID, 2);
    // Remove any existing mlDivID HTMLDivElement.
    remove(xml2DivID);
    // Create collapsible content.
    let xml2Div = (0, _htmlJs.createDiv)(xml2DivID, level1);
    let xmlcDiv = (0, _htmlJs.getCollapsibleDiv)(xml2DivID, xmlDiv, null, xml2Div, xmlFilename, boundary1, level0);
    let xmlPre = document.createElement("pre");
    xmlPre.textContent = xml;
    xml2Div.appendChild(xmlPre);
}
function addAnyUnits(units, attributes, divToAddTo, elementToInsertBefore, id, tagOrDictRef, margin, level) {
    if (units != undefined) {
        let lws = getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef, margin, level);
        if (lws != undefined) divToAddTo.insertBefore(lws, elementToInsertBefore);
    } else {
        let attributesUnits = attributes.get("units");
        if (attributesUnits != undefined) {
            let label = (0, _htmlJs.createLabel)("units " + attributesUnits, level);
            divToAddTo.insertBefore(label, elementToInsertBefore);
        }
    }
}
/**
 * @param attributes The attributes.
 * @param id The id.
 * @param tagOrDictRef The tag or dictionary reference.
 * @returns A select element for setting the units or undefined if there is not attribute for units.
 */ function getUnitsLabelWithSelect(units, attributes, id, tagOrDictRef, boundary, level) {
    let psUnits = attributes.get("units");
    if (psUnits != undefined) {
        // Get a select element for setting the units.
        let lws = (0, _htmlJs.createLabelWithSelect)("units", units, "units", psUnits, id, boundary, level);
        let select = lws.querySelector('select');
        // Set the initial value to the units.
        select.value = psUnits;
        // Add event listener to selectElement.
        (0, _htmlJs.resizeSelectElement)(select);
        select.addEventListener('change', (event)=>{
            let target = event.target;
            attributes.set("units", target.value);
            console.log("Set " + tagOrDictRef + " units to " + target.value);
            (0, _htmlJs.resizeSelectElement)(target);
        });
        return lws;
    }
    return undefined;
}
function getN(message) {
    let n = 0;
    let nset = false;
    while(!nset){
        let nString = prompt(message, "0");
        if (nString != null) {
            if ((0, _utilJs.isNumeric)(nString)) {
                n = parseInt(nString);
                if (n > 0) nset = true;
            }
        }
    }
    return n;
}
function selectAnotherOptionEventListener(options, select) {
    select.addEventListener('click', (event)=>{
        if (options[options.length - 1] == s_selectOption) options.pop();
        let lastIndex = select.options.length - 1;
        if (select.options[lastIndex].value == s_selectOption) select.remove(lastIndex);
    });
}
/**
 * Parses xml to initialise metadataList.
 * @param xml The XML document.
 */ function processMetadataList(xml) {
    console.log((0, _xmlMetadataJs.MetadataList).tagName);
    let mlDiv = (0, _htmlJs.createDiv)(addRID((0, _xmlMetadataJs.MetadataList).tagName, 0), boundary1);
    let xml_mls = xml.getElementsByTagName((0, _xmlMetadataJs.MetadataList).tagName);
    if (xml_mls.length > 0) {
        if (xml_mls.length > 1) console.warn("More than one MetadataList element - showing the last.");
        let ml = new (0, _xmlMetadataJs.MetadataList)((0, _xmlJs.getAttributes)(xml_mls[xml_mls.length - 1]));
        mesmer.setMetadataList(ml);
        function handleElement(tagName, constructor, setter) {
            let xml_elements = xml_mls[xml_mls.length - 1].getElementsByTagName(tagName);
            if (xml_elements.length > 0) {
                if (xml_elements.length == 1) {
                    let s = (0, _xmlJs.getFirstChildNode)(xml_elements[0])?.nodeValue ?? "";
                    let n = new constructor((0, _xmlJs.getAttributes)(xml_elements[0]), s);
                    let cDiv = (0, _htmlJs.createDiv)(undefined, level1);
                    mlDiv.appendChild(cDiv);
                    cDiv.appendChild((0, _htmlJs.createLabel)(n.tagName + " " + s, boundary1));
                    //console.log(n.tagName + " " + s);
                    setter.call(ml, n);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        handleElement((0, _xmlMetadataJs.DCSource).tagName, (0, _xmlMetadataJs.DCSource), ml.setSource);
        handleElement((0, _xmlMetadataJs.DCCreator).tagName, (0, _xmlMetadataJs.DCCreator), ml.setCreator);
        handleElement((0, _xmlMetadataJs.DCDate).tagName, (0, _xmlMetadataJs.DCDate), ml.setDate);
        handleElement((0, _xmlMetadataJs.DCContributor).tagName, (0, _xmlMetadataJs.DCContributor), ml.setContributor);
    }
    return mlDiv;
}
/**
 * Parses xml to initialise analysis.
 * @param xml The XML document.
 */ function processAnalysis(xml) {
    console.log((0, _xmlAnalysisJs.Analysis).tagName);
    let aDivID = addRID((0, _xmlAnalysisJs.Analysis).tagName, 0);
    let aDiv = (0, _htmlJs.createDiv)(aDivID, boundary1);
    let xml_as = xml.getElementsByTagName((0, _xmlAnalysisJs.Analysis).tagName);
    if (xml_as.length > 0) {
        if (xml_as.length > 1) throw new Error("More than one Analysis element.");
        let a = new (0, _xmlAnalysisJs.Analysis)((0, _xmlJs.getAttributes)(xml_as[0]));
        mesmer.setAnalysis(a);
        // "me:description".
        let xml_d = xml_as[0].getElementsByTagName((0, _xmlMesmerJs.Description).tagName);
        if (xml_d.length > 0) {
            if (xml_d.length == 1) {
                let s = (0, _xmlJs.getFirstChildNode)(xml_d[0])?.nodeValue ?? "";
                let d = new (0, _xmlMesmerJs.Description)((0, _xmlJs.getAttributes)(xml_d[0]), s);
                let dDiv = (0, _htmlJs.createDiv)(addRID(aDivID, (0, _xmlMesmerJs.Description).tagName), level1);
                aDiv.appendChild(dDiv);
                dDiv.appendChild((0, _htmlJs.createLabel)(d.tagName + " " + s, boundary1));
                a.setDescription(d);
            } else throw new Error("More than one Description element.");
        }
        // "me:eigenvalueList".
        let xml_el = xml_as[0].getElementsByTagName((0, _xmlAnalysisJs.EigenvalueList).tagName);
        // Create a new collapsible div for the EigenvalueLists.
        let elDivID = addRID(aDivID, (0, _xmlAnalysisJs.EigenvalueList).tagName);
        let elDiv = (0, _htmlJs.createDiv)(elDivID, level1);
        let elcDiv = (0, _htmlJs.getCollapsibleDiv)(elDivID, aDiv, null, elDiv, (0, _xmlAnalysisJs.EigenvalueList).tagName + "s", boundary1, level1);
        if (xml_el.length > 0) for(let i = 0; i < xml_el.length; i++){
            let el_attributes = (0, _xmlJs.getAttributes)(xml_el[i]);
            let el = new (0, _xmlAnalysisJs.EigenvalueList)(el_attributes);
            let labelText = el.tagName + " " + i.toString() + " " + (0, _utilJs.mapToString)(el_attributes);
            // Create a new collapsible div for the EigenvalueList.
            let eDivID = addRID(elDiv.id, i.toString());
            let eDiv = (0, _htmlJs.createDiv)(elDivID, level1);
            let ecDiv = (0, _htmlJs.getCollapsibleDiv)(eDivID, elDiv, null, eDiv, labelText, boundary1, level0);
            //eDiv.appendChild(createLabel(labelText, boundary1));
            a.addEigenvalueList(el);
            // "me:eigenvalue".
            let evs = [];
            let xml_ei = xml_el[i].getElementsByTagName((0, _xmlAnalysisJs.Eigenvalue).tagName);
            if (xml_ei.length > 0) for(let j = 0; j < xml_ei.length; j++){
                let ev = new (0, _bigJs.Big)((0, _xmlJs.getFirstChildNode)(xml_ei[j])?.nodeValue);
                evs.push(ev);
                el.addEigenvalue(new (0, _xmlAnalysisJs.Eigenvalue)((0, _xmlJs.getAttributes)(xml_ei[j]), ev));
            }
            eDiv.appendChild((0, _htmlJs.createLabel)((0, _utilJs.arrayToString)(evs, ", "), boundary1));
        }
        // "me:populationList".
        let xml_pl = xml_as[0].getElementsByTagName((0, _xmlAnalysisJs.PopulationList).tagName);
        // Create a new collapsible div for the PopulationLists.
        let plDivID = addRID(aDivID, (0, _xmlAnalysisJs.PopulationList).tagName);
        let plDiv = (0, _htmlJs.createDiv)(plDivID, level1);
        let plcDiv = (0, _htmlJs.getCollapsibleDiv)(plDivID, aDiv, null, plDiv, (0, _xmlAnalysisJs.PopulationList).tagName + "s", boundary1, level1);
        if (xml_pl.length > 0) // Create a new collapsible div for the PopulationList.
        for(let i = 0; i < xml_pl.length; i++){
            let pl_attributes = (0, _xmlJs.getAttributes)(xml_pl[i]);
            let T = pl_attributes.get("T") != undefined ? new (0, _bigJs.Big)(pl_attributes.get("T")) : big0;
            let conc = pl_attributes.get("conc") != undefined ? new (0, _bigJs.Big)(pl_attributes.get("conc")) : big0;
            let pl = new (0, _xmlAnalysisJs.PopulationList)(pl_attributes);
            let labelText = pl.tagName + " " + i.toString() + " " + (0, _utilJs.mapToString)(pl_attributes);
            let plDivID = addRID(aDiv.id, (0, _xmlAnalysisJs.PopulationList).tagName, i.toString());
            // Create a new collapsible div for the EigenvalueList.
            let pDivID = addRID(plDivID, i.toString());
            let pDiv = (0, _htmlJs.createDiv)(plDivID, level1);
            let pcDiv = (0, _htmlJs.getCollapsibleDiv)(pDivID, plDiv, null, pDiv, labelText, boundary1, level0);
            a.addPopulationList(pl);
            // "me:population".
            //let lt_ref_pop : Map<Big, Map<string, Big>> = new Map(); // Change to calculate the log of the time when creating the plots.
            let t_ref_pop = new Map();
            let refs = [];
            refs.push("time");
            let xml_pn = xml_pl[i].getElementsByTagName((0, _xmlAnalysisJs.Population).tagName);
            if (xml_pn.length > 0) for(let j = 0; j < xml_pn.length; j++){
                let pn_attributes = (0, _xmlJs.getAttributes)(xml_pn[j]);
                let population = new (0, _xmlAnalysisJs.Population)(pn_attributes, []);
                pl.addPopulation(population);
                let t = pn_attributes.get("time") != undefined ? new (0, _bigJs.Big)(pn_attributes.get("time")) : big0;
                //let lt: Big = pn_attributes.get("logTime") != undefined ? new Big(pn_attributes.get("logTime") as string) : big0; 
                let ref_pop = new Map();
                //lt_ref_pop.set(lt, ref_pop);
                t_ref_pop.set(t, ref_pop);
                let xml_pop = xml_pn[j].getElementsByTagName((0, _xmlAnalysisJs.Pop).tagName);
                if (xml_pop.length > 0) for(let k = 0; k < xml_pop.length; k++){
                    let pop_attributes = (0, _xmlJs.getAttributes)(xml_pop[k]);
                    let ref = pop_attributes.get("ref");
                    if (j == 0) refs.push(ref);
                    let p = new (0, _bigJs.Big)((0, _xmlJs.getFirstChildNode)(xml_pop[k])?.nodeValue);
                    let pop = new (0, _xmlAnalysisJs.Pop)(pop_attributes, p);
                    population.addPop(pop);
                    ref_pop.set(ref, p);
                }
            }
            // Create graph.
            let graphDiv = (0, _htmlJs.createDiv)(addRID(pDivID, s_graph), boundary1);
            pDiv.appendChild(graphDiv);
            let canvas = document.createElement('canvas');
            graphDiv.appendChild(canvas);
            // Create an scatter plot.
            let scatterPlot = new ScatterPlot(canvas, t_ref_pop, sp_font);
            // Add the scatter plot to the collection.
            scatterPlots.push(scatterPlot);
            //scatterPlot.draw();
            // Add a save to PNG button.
            addSaveAsPNGButton(canvas, pDiv, graphDiv, labelText);
            // Create Table.
            let tableDiv = (0, _htmlJs.createDiv)(addRID(pDivID, s_table), boundary1);
            pDiv.appendChild(tableDiv);
            let tab = (0, _htmlJs.createTable)(addRID(plDivID, s_table), boundary1);
            (0, _htmlJs.addTableHeaderRow)(tab, refs);
            t_ref_pop.forEach((ref_pop, t)=>{
                let row = [];
                row.push(t.toString());
                ref_pop.forEach((p, ref)=>{
                    row.push(p.toString());
                });
                (0, _htmlJs.addTableRow)(tab, row);
            });
            tableDiv.appendChild(tab);
            // Insert a save as csv button.
            addSaveAsCSVButton(()=>tableToCSV(tab), pDiv, tableDiv, labelText, boundary1);
        }
        // me:rateList.
        let xml_rl = xml_as[0].getElementsByTagName((0, _xmlAnalysisJs.RateList).tagName);
        // Create a new collapsible div for the RateLists.
        let rlDivID = addRID(aDivID, (0, _xmlAnalysisJs.RateList).tagName);
        let rlDiv = (0, _htmlJs.createDiv)(rlDivID, level1);
        let rlcDiv = (0, _htmlJs.getCollapsibleDiv)(rlDivID, aDiv, null, rlDiv, (0, _xmlAnalysisJs.RateList).tagName + "s", boundary1, level1);
        if (xml_rl.length > 0) for(let i = 0; i < xml_rl.length; i++){
            let rle_attributes = (0, _xmlJs.getAttributes)(xml_rl[i]);
            let rle_attributesKeys = Array.from(rle_attributes.keys());
            let rle_values = [];
            for(let j = 0; j < rle_attributesKeys.length; j++)rle_values.push(rle_attributes.get(rle_attributesKeys[j]));
            let rl = new (0, _xmlAnalysisJs.RateList)(rle_attributes);
            let t = rle_attributes.get("T");
            rl.setTemperature(new (0, _bigJs.Big)(t));
            let conc = rle_attributes.get("conc");
            rl.setConcentration(new (0, _bigJs.Big)(conc));
            let bathGas = rle_attributes.get("bathGas");
            rl.setBathGas(bathGas);
            let units = rle_attributes.get("units");
            rl.setUnits(units);
            a.addRateList(rl);
            //let labelText: string = rl.tagName + " " + i.toString() + " " + mapToString(rle_attributes);
            let labelText = rl.tagName + " " + i.toString() + " T(" + t + "(K)) conc(" + rle_attributes.get("conc") + "(molec/cm3)) bathGas(" + bathGas + ")";
            // Create a new collapsible div for the RateList.
            let rleDivID = addID(rlDivID, i.toString());
            let rleDiv = (0, _htmlJs.createDiv)(rleDivID);
            rlDiv.appendChild(rleDiv);
            let rlecDiv = (0, _htmlJs.getCollapsibleDiv)(rleDivID, rlDiv, null, rleDiv, labelText, boundary1, level0);
            let keys;
            let values;
            // "me:firstOrderLoss".
            // Create a new collapsible div for the FirstOrderLosses.
            let folDivID = addID(rleDivID, (0, _xmlAnalysisJs.FirstOrderLoss).tagName);
            let folDiv = (0, _htmlJs.createDiv)(folDivID);
            rleDiv.appendChild(folDiv);
            let folcDiv = (0, _htmlJs.getCollapsibleDiv)(folDivID, rleDiv, null, folDiv, (0, _xmlAnalysisJs.FirstOrderLoss).tagName, boundary1, level1);
            let xml_fol = xml_rl[i].getElementsByTagName((0, _xmlAnalysisJs.FirstOrderLoss).tagName);
            let folTable = (0, _htmlJs.createTable)(folDivID, boundary1);
            let folTableDiv = (0, _htmlJs.createDiv)(addRID(folDivID, s_table), level1);
            folTableDiv.appendChild(folTable);
            folDiv.appendChild(folTableDiv);
            for(let j = 0; j < xml_fol.length; j++){
                let fol_attributes = (0, _xmlJs.getAttributes)(xml_fol[j]);
                if (j == 0) {
                    // header
                    keys = Array.from(fol_attributes.keys());
                    /*
                        let keys2 = Array.from(fol_attributes.keys());
                        // In keys2, replace "ref" to be "reactant/product".
                        keys2 = keys2.map((key) => {
                            if (key == "ref") {
                                return "reactant/product";
                            } else {
                                return key;
                            }
                        });
                        keys2.push("kloss/" + units);
                        addTableHeaderRow(folTable, keys2);
                        */ keys.push("kloss/" + units);
                    (0, _htmlJs.addTableHeaderRow)(folTable, keys);
                }
                values = Array.from(fol_attributes.values());
                // Check lengths.
                //if (keys!.length != values!.length) {
                if (keys.length - 1 != values.length) console.error("FirstOrderLoss values0!.length != values!.length");
                let s = ((0, _xmlJs.getFirstChildNode)(xml_fol[j])?.nodeValue ?? "").trim();
                let fol = new (0, _xmlAnalysisJs.FirstOrderLoss)(fol_attributes, new (0, _bigJs.Big)(s));
                rl.addFirstOrderLoss(fol);
                for(let k = 0; k < keys.length; k++)// Check reference.
                if (keys[k] == values[k]) values.push(fol_attributes.get(values[k]));
                else console.log("FirstOrderLoss values0![k] != values![k]");
                values.push(s);
                (0, _htmlJs.addTableRow)(folTable, values);
            }
            // Insert a save as csv button.
            addSaveAsCSVButton(()=>tableToCSV(folTable), folDiv, folTableDiv, "First Order Losses", level1);
            // "me:firstOrderRate".
            // Create a new collapsible div for the FirstOrderRates.
            let forDivID = addID(rleDivID, (0, _xmlAnalysisJs.FirstOrderRate).tagName);
            let forDiv = (0, _htmlJs.createDiv)(forDivID);
            rleDiv.appendChild(forDiv);
            let forcDiv = (0, _htmlJs.getCollapsibleDiv)(forDivID, rleDiv, null, forDiv, (0, _xmlAnalysisJs.FirstOrderRate).tagName, boundary1, level1);
            let xml_for = xml_rl[i].getElementsByTagName((0, _xmlAnalysisJs.FirstOrderRate).tagName);
            let forTable = (0, _htmlJs.createTable)(forDivID, boundary1);
            let forTableDiv = (0, _htmlJs.createDiv)(addRID(forDivID, s_table), level1);
            forTableDiv.appendChild(forTable);
            forDiv.appendChild(forTableDiv);
            for(let j = 0; j < xml_for.length; j++){
                let for_attributes = (0, _xmlJs.getAttributes)(xml_for[j]);
                //let fromRef: string = for_attributes.get("fromRef") as string;
                //let toRef: string = for_attributes.get("toRef") as string;
                if (j == 0) {
                    // header
                    keys = Array.from(for_attributes.keys());
                    let keys2 = Array.from(for_attributes.keys());
                    // In keys2, replace "fromRef" to be "reactant" and "toRef" to be "product".
                    keys2 = keys2.map((key)=>{
                        if (key == "fromRef") return "reactant";
                        else if (key == "toRef") return "product";
                        else return key;
                    });
                    keys2.push("k/" + units);
                    (0, _htmlJs.addTableHeaderRow)(forTable, keys2);
                }
                values = Array.from(for_attributes.values());
                // Check lengths.
                if (keys.length != values.length) console.error("FirstOrderLoss values0!.length != values!.length");
                let s = ((0, _xmlJs.getFirstChildNode)(xml_for[j])?.nodeValue ?? "").trim();
                let forate = new (0, _xmlAnalysisJs.FirstOrderRate)(for_attributes, new (0, _bigJs.Big)(s));
                rl.addFirstOrderRate(forate);
                for(let k = 0; k < keys.length; k++)// Check reference.
                if (keys[k] == values[k]) values.push(for_attributes.get(values[k]));
                else console.log("FirstOrderRate values0![k] != values![k]");
                values.push(s);
                (0, _htmlJs.addTableRow)(forTable, values);
            }
            // Insert a save as csv button.
            addSaveAsCSVButton(()=>tableToCSV(forTable), forDiv, forTableDiv, "First Order Rates", level1);
            // "me:secondOrderRate".
            // Create a new collapsible div for the SecondOrderRates.
            let sorDivID = addID(rleDivID, (0, _xmlAnalysisJs.SecondOrderRate).tagName);
            let sorDiv = (0, _htmlJs.createDiv)(sorDivID);
            rleDiv.appendChild(sorDiv);
            let sorcDiv = (0, _htmlJs.getCollapsibleDiv)(sorDivID, rleDiv, null, sorDiv, (0, _xmlAnalysisJs.SecondOrderRate).tagName, boundary1, level1);
            let xml_sor = xml_rl[i].getElementsByTagName((0, _xmlAnalysisJs.SecondOrderRate).tagName);
            let sorTable = (0, _htmlJs.createTable)(sorDivID, boundary1);
            let sorTableDiv = (0, _htmlJs.createDiv)(addRID(sorDivID, s_table), level1);
            sorTableDiv.appendChild(sorTable);
            sorDiv.appendChild(sorTableDiv);
            for(let j = 0; j < xml_sor.length; j++){
                let sor_attributes = (0, _xmlJs.getAttributes)(xml_sor[j]);
                //let fromRef: string = sor_attributes.get("fromRef") as string;
                //let toRef: string = sor_attributes.get("toRef") as string;
                if (j == 0) {
                    // header
                    keys = Array.from(sor_attributes.keys());
                    let keys2 = Array.from(sor_attributes.keys());
                    // In keys2, replace "fromRef" to be "reactant" and "toRef" to be "product".
                    keys2 = keys2.map((key)=>{
                        if (key == "fromRef") return "reactant";
                        else if (key == "toRef") return "product";
                        else return key;
                    });
                    keys2.push("k/cm3molecule-1" + units);
                    (0, _htmlJs.addTableHeaderRow)(sorTable, keys2);
                }
                values = Array.from(sor_attributes.values());
                // Check lengths.
                if (keys.length != values.length) console.error("SecondOrderRate values0!.length != values!.length");
                let s = ((0, _xmlJs.getFirstChildNode)(xml_sor[j])?.nodeValue ?? "").trim();
                let sorate = new (0, _xmlAnalysisJs.SecondOrderRate)(sor_attributes, new (0, _bigJs.Big)(s));
                rl.addSecondOrderRate(sorate);
                for(let k = 0; k < keys.length; k++)// Check reference.
                if (keys[k] == values[k]) values.push(sor_attributes.get(values[k]));
                else console.log("SecondOrderRate values0![k] != values![k]");
                values.push(s);
                (0, _htmlJs.addTableRow)(sorTable, values);
            }
            // Insert a save as csv button.
            addSaveAsCSVButton(()=>tableToCSV(sorTable), sorDiv, sorTableDiv, "Second Order Rates", level1);
        }
    }
    return aDiv;
}
/**
 * A class for creating a scatter plot.
 */ class ScatterPlot {
    constructor(canvas, data, font){
        this.canvas = canvas;
        this.data = data;
        // Create a new scatter plot.
        this.draw(font);
    }
    /**
     * Draw the scatter plot.
     */ draw(font) {
        this.canvas.width = 800; // Set the width of the canvas
        this.canvas.height = 400; // Set the height of the canvas
        const ctx = this.canvas.getContext("2d");
        //const ctx: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;        
        ctx.font = font;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas.
        let width = this.canvas.width;
        let height = this.canvas.height;
        let xMin = Number.MAX_VALUE;
        let xMax = Number.MIN_VALUE;
        //let yMin: number = Number.MAX_VALUE;
        //let yMax: number = Number.MIN_VALUE;
        let yMin = 0;
        let yMax = 1;
        let maxRefWidth = 0;
        this.data.forEach((ref_pop, x)=>{
            let logx = Math.log10(x.toNumber());
            xMin = Math.min(xMin, logx);
            xMax = Math.max(xMax, logx);
            ref_pop.forEach((p, ref)=>{
                maxRefWidth = Math.max(maxRefWidth, ctx.measureText(ref).width);
            });
        /*
            ref_pop.forEach((p, ref) => {
                yMin = Math.min(yMin, p.toNumber());
                yMax = Math.max(yMax, p.toNumber());
            });
            */ });
        // Calculate the width of the largest tick label
        let yTicks = 2;
        let yTickSpacing = 1;
        let maxTickLabelWidth = 0;
        for(let i = 0; i < yTicks; i++){
            let yTick = 1 - i * yTickSpacing;
            let tickLabelWidth = ctx.measureText(yTick.toString()).width;
            maxTickLabelWidth = Math.max(maxTickLabelWidth, tickLabelWidth);
        }
        // Calculate the height of the largest tick label
        let metrics = ctx.measureText('0');
        let th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        let xmargin = th * 4;
        // Set the margin based on the width of the largest tick label
        let ymargin = maxTickLabelWidth + th + 20; // Add 20 for some extra space
        let x0 = ymargin;
        let y0 = height - (ymargin + th * 3);
        let x1 = width - (xmargin + maxRefWidth + 20);
        let y1 = xmargin;
        let xScale = (x1 - x0) / (xMax - xMin);
        let yScale = (y1 - y0) / (yMax - yMin);
        // Draw x-axis.
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y0);
        ctx.stroke();
        // Draw y-axis.
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x0, y1);
        ctx.stroke();
        // Define an array of colors for different styles
        let colors = [
            "red",
            "green",
            "blue",
            "orange",
            "purple",
            "grey",
            "cyan",
            "magenta",
            "lightblue",
            "lightgreen",
            "pink",
            "yellow",
            "brown",
            "black"
        ];
        let refToColor = new Map();
        // Draw data points.
        this.data.forEach((ref_pop, x)=>{
            // Define a reference id for each color
            let i = 0;
            ref_pop.forEach((p, ref)=>{
                let logx = Math.log10(x.toNumber());
                let xPixel = x0 + (logx - xMin) * xScale;
                let pn = p.toNumber();
                if (pn < 1) {
                    let yPixel = y0 + (pn - yMin) * yScale;
                    if (yPixel > 0) {
                        ctx.beginPath();
                        ctx.arc(xPixel, yPixel, 2, 0, 2 * Math.PI); // Points
                        // Use the ref index to select a color
                        let color = colors[i % colors.length];
                        refToColor.set(ref, color);
                        ctx.fillStyle = color;
                        ctx.fill();
                    }
                }
                i++;
            });
        });
        // Draw x-axis labels.
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "black";
        let xLabel = "log10(time/secs)";
        ctx.fillText(xLabel, x0 + (x1 - x0) / 2, y0 + xmargin / 2);
        // Draw y-axis labels.
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        let yLabel = "fractional population";
        ctx.fillText(yLabel, -y0 - (y1 - y0) / 2, x0 - ymargin);
        ctx.restore();
        // Draw x-axis ticks.
        let xrange = xMax - xMin;
        //console.log("xrange=" + xrange);
        let orderOfMagnitude = Math.floor(Math.log10(xrange));
        //console.log("orderOfMagnitude=" + orderOfMagnitude);
        let xTickSpacing = Math.abs(Math.ceil(xrange / Math.pow(10, orderOfMagnitude)));
        //console.log("xTickSpacing=" + xTickSpacing);
        let i = Math.ceil(xMin / xTickSpacing);
        let xTick = i * xTickSpacing;
        // Draw x-axis ticks > 0.
        while(xTick < xMax){
            //console.log("xTick=" + xTick);
            let xPixel = x0 + (xTick - xMin) * xScale; // Convert xTick to pixel scale
            ctx.beginPath();
            ctx.moveTo(xPixel, y0);
            ctx.lineTo(xPixel, y0 + 5);
            ctx.stroke();
            ctx.fillText(xTick.toString(), xPixel, y0 + 5);
            xTick += xTickSpacing;
        }
        // Draw y-axis ticks.
        for(let i = 0; i < yTicks; i++){
            let yTick = y0 - i * yTickSpacing;
            ctx.beginPath();
            ctx.moveTo(x0, yTick);
            ctx.lineTo(x0 - 5, yTick);
            ctx.stroke();
        }
        // Add a legend.
        // Calculate the maxiimum text height of a ref.
        let maxth = 0;
        refToColor.forEach((color, ref)=>{
            let metrics = ctx.measureText(ref);
            let th = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
            maxth = Math.max(maxth, th);
        });
        // Calculate the position of the legend.
        let legendX = x1 + 20; // Position the legend 20 pixels to the right of the graph
        let legendY = y1; // Position the legend at the top of the graph
        let legendYSpacing = maxth; // Adjust as needed
        // Draw a legend for each ref.
        i = 0;
        refToColor.forEach((color, ref)=>{
            let legendYPos = legendY + i * legendYSpacing;
            ctx.fillStyle = color;
            ctx.fillRect(legendX, legendYPos, maxth / 2, maxth / 2); // Draw a small rectangle of the ref's color
            ctx.fillStyle = "black";
            ctx.fillText(ref, legendX + th + ctx.measureText(ref).width / 2, legendYPos - maxth / 2); // Draw the ref's name
            i++;
        });
    }
}
/**
 * Convert an HTMLTableElement to a CSV string.
 */ function tableToCSV(t) {
    let csv = "";
    let rows = t.rows;
    for(let i = 0; i < rows.length; i++){
        let row = rows[i];
        let cells = row.cells;
        for(let j = 0; j < cells.length; j++){
            csv += cells[j].textContent;
            if (j < cells.length - 1) csv += ",";
        }
        csv += "\n";
    }
    return csv;
}
/**
 * For saving data to a file.
 * 
 * @param data The data.
 * @param dataType The data type.
 * @param filename The filename.
 * @param isDataURL A boolean indicating whether the data is a data URL.
 */ function saveDataAsFile(data, dataType, filename, isDataURL = false) {
    let a = document.createElement('a');
    a.href = isDataURL ? data : `data:${dataType};charset=utf-8,` + encodeURIComponent(data);
    a.download = filename;
    document.body.appendChild(a); // Append the anchor to the body.
    a.click(); // Programmatically click the anchor to trigger the download.
    document.body.removeChild(a); // Remove the anchor from the body after triggering the download.
}
function saveXML() {
    if (mesmer == null) {
        alert("No Mesmer object to save.");
        return;
    } else {
        /**
         * Organise mesmer nodes to be in order:
         * title
         * moleculeList
         * reactionList
         * conditions
         * modelParameters
         * control
         * metadataList
         * analysis
         */ let mesmerOrdered = new (0, _xmlMesmerJs.Mesmer)(mesmer.attributes);
        mesmerOrdered.setTitle(mesmer.getTitle());
        if (molecules != undefined) mesmerOrdered.setMoleculeList(new (0, _xmlMesmerJs.MoleculeList)(new Map(), Array.from(molecules.values())));
        if (reactions != undefined) mesmerOrdered.setReactionList(new (0, _xmlMesmerJs.ReactionList)(new Map(), Array.from(reactions.values())));
        if (mesmer.getConditionss() != undefined) mesmerOrdered.setConditionss(mesmer.getConditionss());
        if (mesmer.getModelParameterss() != undefined) mesmerOrdered.setModelParameterss(mesmer.getModelParameterss());
        if (mesmer.getControls() != undefined) mesmerOrdered.setControls(mesmer.getControls());
        let mdl = mesmer.getMetadataList();
        if (mdl != undefined) mesmerOrdered.setMetadataList(mdl);
        let analysis = mesmer.getAnalysis();
        if (analysis != undefined) mesmerOrdered.setAnalysis(analysis);
        console.log("saveXML");
        const pad = "  ";
        let xmlData = (0, _xmlMesmerJs.Mesmer).header + mesmerOrdered.toXML(pad, "");
        let title = mesmerOrdered.getTitle()?.value;
        saveDataAsFile(xmlData, 'text/xml', getFilename(title) + ".xml");
    }
}
/**
 * Convert name into a filename.
 */ function getFilename(name) {
    return name.replace(/[^a-z0-9]/gi, '_');
}
function addSaveAsPNGButton(canvas, divToAddTo, elementToInsertBefore, name) {
    // Add a save button to save the canvas as an image.
    let saveButtonID = addRID(divToAddTo.id, 'saveButton');
    let saveButton = (0, _htmlJs.createButton)("Save as PNG", saveButtonID, boundary1);
    if (elementToInsertBefore != null) divToAddTo.insertBefore(saveButton, elementToInsertBefore);
    else divToAddTo.appendChild(saveButton);
    saveButton.addEventListener('click', ()=>{
        let dataURL = canvas.toDataURL();
        let title = mesmer.getTitle()?.value;
        saveDataAsFile(dataURL, 'image/png', getFilename(title + "_" + name) + ".png", true);
    });
}
function addSaveAsCSVButton(toCSV, divToAddTo, elementToInsertBefore, name, margin) {
    let bID = addRID(divToAddTo.id, (0, _htmlJs.s_button), s_save);
    let b = (0, _htmlJs.createButton)("Save as CSV", bID, margin);
    divToAddTo.insertBefore(b, elementToInsertBefore);
    b.addEventListener('click', ()=>{
        let csv = toCSV();
        let title = mesmer.getTitle()?.value;
        let fn = getFilename(title + "_" + name) + ".csv";
        saveDataAsFile(csv, 'text/csv', fn);
        console.log("Saved " + fn);
    });
}
function setNumberNode(node, input) {
    try {
        let value = new (0, _bigJs.Big)(input.value);
        //node.setValue(value);
        node.value = value;
    } catch (e) {
        alert("Value invalid, resetting...");
    }
    input.value = node.value.toString();
}

},{"./util.js":"f0Rnl","./xml.js":"7znDa","./html.js":"aLPSL","./gui_menu.js":"2khyJ","./xml_conditions.js":"cZv1r","./xml_modelParameters.js":"gfUOc","./xml_control.js":"fiNxW","./xml_mesmer.js":"8G2m7","./xml_analysis.js":"1PdDF","./xml_metadata.js":"5YFPw","./defaults.js":"d6DU0","./gui_moleculeList.js":"66Fjc","./gui_reactionList.js":"bQ6KF","./gui_ConditionsList.js":"jmz8t","./gui_ModelParametersList.js":"7ORr8","./gui_ControlList.js":"1hXD4","./gui_reactionDiagram.js":"aytWV","big.js":"91nMZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f0Rnl":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Get the value mapped to the key.
 * @param map The map to search in. 
 * @param key The key to search for.
 * @returns The value mapped to the key.
 * @throws An error if the key is not in the map.
 */ parcelHelpers.export(exports, "get", ()=>get);
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
 * @throws An error if any string in the array is not a number.
 */ parcelHelpers.export(exports, "toNumberArray", ()=>toNumberArray);
/**
 * @param s The string to check.
 * @returns true iff s is a number.
 */ parcelHelpers.export(exports, "isNumeric", ()=>isNumeric);
/**
 * For converting a string array to a number array.
 * @param xs The string to convert to a number array.
 * @returns A number array.
 */ parcelHelpers.export(exports, "bigArrayToString", ()=>bigArrayToString);
/**
 * @param x A number to check.
 * @param y Another number to check.
 * @returns The maximum of x and y.
 */ parcelHelpers.export(exports, "max", ()=>max);
/**
 * @param x A number to check.
 * @param y Another number to check.
 * @returns The minimum of x and y.
 */ parcelHelpers.export(exports, "min", ()=>min);
var _bigJs = require("big.js");
var _bigJsDefault = parcelHelpers.interopDefault(_bigJs);
function get(map, key) {
    if (!map.has(key)) throw new Error(`Key ${key} not found in map`);
    return map.get(key);
}
function getID(...parts) {
    // Convert the components to strings.
    let sparts = parts.map((part)=>part.toString());
    // Join the parts with a hyphen.
    let id = sparts.join("-");
    // Replace any character that is not a letter (upper or lower case), a digit, a hyphen, or an underscore 
    // with an underscore. 
    let validId = id.replace(/[^a-zA-Z-_0-9]/g, '_');
    // If the first character is a digit, two hyphens, or a hyphen followed by a digit, add an underscore to 
    // the beginning of the ID.
    if (/^[0-9]|^--|-^[0-9]/.test(validId)) validId = '_' + validId;
    return validId;
}
function rescale(min, range, newMin, newRange, value) {
    // The + 0.0 is to force the division to be a floating point division.
    //return (((value - min) / (range + 0.0)) * (newRange)) + newMin;
    return (value - min) * newRange / (range + 0.0) + newMin;
}
function mapToString(map, delimiter) {
    if (map == null) return "";
    if (delimiter == undefined) delimiter = ', ';
    return Array.from(map.entries()).map(([key, value])=>`${key == null ? "null" : key.toString()}(${value == null ? "null" : value.toString()})`).join(delimiter);
}
function arrayToString(array, delimiter) {
    if (delimiter == undefined) delimiter = ', ';
    return array.map((value)=>value == null ? "null" : value.toString()).join(delimiter);
}
function setToString(set, delimiter) {
    if (delimiter == undefined) delimiter = ', ';
    return Array.from(set).map((value)=>value == null ? "null" : value.toString()).join(delimiter);
}
function toNumberArray(s) {
    let r = [];
    for(let i = 0; i < s.length; i++)r.push(new (0, _bigJsDefault.default)(s[i]));
    return r;
}
function isNumeric(s) {
    try {
        let x = new (0, _bigJsDefault.default)(s);
        return true;
    } catch (e) {
        return false;
    }
}
function bigArrayToString(s, delimiter) {
    if (delimiter == undefined) delimiter = ' ';
    return s.map((value)=>value.toString()).join(delimiter);
}
function max(x, y) {
    if (x == null) return y;
    if (x.lt(y)) return y;
    return x;
}
function min(x, y) {
    if (x == null) return y;
    if (x.gt(y)) return y;
    return x;
}

},{"big.js":"91nMZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"91nMZ":[function(require,module,exports,__globalThis) {
(function(GLOBAL) {
    'use strict';
    var Big, /************************************** EDITABLE DEFAULTS *****************************************/ // The default values below must be integers within the stated ranges.
    /*
     * The maximum number of decimal places (DP) of the results of operations involving division:
     * div and sqrt, and pow with negative exponents.
     */ DP = 20, /*
     * The rounding mode (RM) used when rounding to the above decimal places.
     *
     *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
     *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
     *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
     *  3  Away from zero.                                  (ROUND_UP)
     */ RM = 1, // The maximum value of DP and Big.DP.
    MAX_DP = 1E6, // The maximum magnitude of the exponent argument to the pow method.
    MAX_POWER = 1E6, /*
     * The negative exponent (NE) at and beneath which toString returns exponential notation.
     * (JavaScript numbers: -7)
     * -1000000 is the minimum recommended exponent value of a Big.
     */ NE = -7, /*
     * The positive exponent (PE) at and above which toString returns exponential notation.
     * (JavaScript numbers: 21)
     * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
     */ PE = 21, /*
     * When true, an error will be thrown if a primitive number is passed to the Big constructor,
     * or if valueOf is called, or if toNumber is called on a Big which cannot be converted to a
     * primitive number without a loss of precision.
     */ STRICT = false, /**************************************************************************************************/ // Error messages.
    NAME = '[big.js] ', INVALID = NAME + 'Invalid ', INVALID_DP = INVALID + 'decimal places', INVALID_RM = INVALID + 'rounding mode', DIV_BY_ZERO = NAME + 'Division by zero', // The shared prototype object.
    P = {}, UNDEFINED = void 0, NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
    /*
   * Create and return a Big constructor.
   */ function _Big_() {
        /*
     * The Big constructor and exported function.
     * Create and return a new instance of a Big number object.
     *
     * n {number|string|Big} A numeric value.
     */ function Big(n) {
            var x = this;
            // Enable constructor usage without new.
            if (!(x instanceof Big)) return n === UNDEFINED ? _Big_() : new Big(n);
            // Duplicate.
            if (n instanceof Big) {
                x.s = n.s;
                x.e = n.e;
                x.c = n.c.slice();
            } else {
                if (typeof n !== 'string') {
                    if (Big.strict === true && typeof n !== 'bigint') throw TypeError(INVALID + 'value');
                    // Minus zero?
                    n = n === 0 && 1 / n < 0 ? '-0' : String(n);
                }
                parse(x, n);
            }
            // Retain a reference to this Big constructor.
            // Shadow Big.prototype.constructor which points to Object.
            x.constructor = Big;
        }
        Big.prototype = P;
        Big.DP = DP;
        Big.RM = RM;
        Big.NE = NE;
        Big.PE = PE;
        Big.strict = STRICT;
        Big.roundDown = 0;
        Big.roundHalfUp = 1;
        Big.roundHalfEven = 2;
        Big.roundUp = 3;
        return Big;
    }
    /*
   * Parse the number or string value passed to a Big constructor.
   *
   * x {Big} A Big number instance.
   * n {number|string} A numeric value.
   */ function parse(x, n) {
        var e, i, nl;
        if (!NUMERIC.test(n)) throw Error(INVALID + 'number');
        // Determine sign.
        x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;
        // Decimal point?
        if ((e = n.indexOf('.')) > -1) n = n.replace('.', '');
        // Exponential form?
        if ((i = n.search(/e/i)) > 0) {
            // Determine exponent.
            if (e < 0) e = i;
            e += +n.slice(i + 1);
            n = n.substring(0, i);
        } else if (e < 0) // Integer.
        e = n.length;
        nl = n.length;
        // Determine leading zeros.
        for(i = 0; i < nl && n.charAt(i) == '0';)++i;
        if (i == nl) // Zero.
        x.c = [
            x.e = 0
        ];
        else {
            // Determine trailing zeros.
            for(; nl > 0 && n.charAt(--nl) == '0';);
            x.e = e - i - 1;
            x.c = [];
            // Convert string to array of digits without leading/trailing zeros.
            for(e = 0; i <= nl;)x.c[e++] = +n.charAt(i++);
        }
        return x;
    }
    /*
   * Round Big x to a maximum of sd significant digits using rounding mode rm.
   *
   * x {Big} The Big to round.
   * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.
   * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   * [more] {boolean} Whether the result of division was truncated.
   */ function round(x, sd, rm, more) {
        var xc = x.c;
        if (rm === UNDEFINED) rm = x.constructor.RM;
        if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) throw Error(INVALID_RM);
        if (sd < 1) {
            more = rm === 3 && (more || !!xc[0]) || sd === 0 && (rm === 1 && xc[0] >= 5 || rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED)));
            xc.length = 1;
            if (more) {
                // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                x.e = x.e - sd + 1;
                xc[0] = 1;
            } else // Zero.
            xc[0] = x.e = 0;
        } else if (sd < xc.length) {
            // xc[sd] is the digit after the digit that may be rounded up.
            more = rm === 1 && xc[sd] >= 5 || rm === 2 && (xc[sd] > 5 || xc[sd] === 5 && (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) || rm === 3 && (more || !!xc[0]);
            // Remove any digits after the required precision.
            xc.length = sd;
            // Round up?
            if (more) // Rounding up may mean the previous digit has to be rounded up.
            for(; ++xc[--sd] > 9;){
                xc[sd] = 0;
                if (sd === 0) {
                    ++x.e;
                    xc.unshift(1);
                    break;
                }
            }
            // Remove trailing zeros.
            for(sd = xc.length; !xc[--sd];)xc.pop();
        }
        return x;
    }
    /*
   * Return a string representing the value of Big x in normal or exponential notation.
   * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
   */ function stringify(x, doExponential, isNonzero) {
        var e = x.e, s = x.c.join(''), n = s.length;
        // Exponential notation?
        if (doExponential) s = s.charAt(0) + (n > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e;
        else if (e < 0) {
            for(; ++e;)s = '0' + s;
            s = '0.' + s;
        } else if (e > 0) {
            if (++e > n) for(e -= n; e--;)s += '0';
            else if (e < n) s = s.slice(0, e) + '.' + s.slice(e);
        } else if (n > 1) s = s.charAt(0) + '.' + s.slice(1);
        return x.s < 0 && isNonzero ? '-' + s : s;
    }
    // Prototype/instance methods
    /*
   * Return a new Big whose value is the absolute value of this Big.
   */ P.abs = function() {
        var x = new this.constructor(this);
        x.s = 1;
        return x;
    };
    /*
   * Return 1 if the value of this Big is greater than the value of Big y,
   *       -1 if the value of this Big is less than the value of Big y, or
   *        0 if they have the same value.
   */ P.cmp = function(y) {
        var isneg, x = this, xc = x.c, yc = (y = new x.constructor(y)).c, i = x.s, j = y.s, k = x.e, l = y.e;
        // Either zero?
        if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;
        // Signs differ?
        if (i != j) return i;
        isneg = i < 0;
        // Compare exponents.
        if (k != l) return k > l ^ isneg ? 1 : -1;
        j = (k = xc.length) < (l = yc.length) ? k : l;
        // Compare digit by digit.
        for(i = -1; ++i < j;){
            if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
        }
        // Compare lengths.
        return k == l ? 0 : k > l ^ isneg ? 1 : -1;
    };
    /*
   * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
   * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */ P.div = function(y) {
        var x = this, Big = x.constructor, a = x.c, b = (y = new Big(y)).c, k = x.s == y.s ? 1 : -1, dp = Big.DP;
        if (dp !== ~~dp || dp < 0 || dp > MAX_DP) throw Error(INVALID_DP);
        // Divisor is zero?
        if (!b[0]) throw Error(DIV_BY_ZERO);
        // Dividend is 0? Return +-0.
        if (!a[0]) {
            y.s = k;
            y.c = [
                y.e = 0
            ];
            return y;
        }
        var bl, bt, n, cmp, ri, bz = b.slice(), ai = bl = b.length, al = a.length, r = a.slice(0, bl), rl = r.length, q = y, qc = q.c = [], qi = 0, p = dp + (q.e = x.e - y.e) + 1; // precision of the result
        q.s = k;
        k = p < 0 ? 0 : p;
        // Create version of divisor with leading zero.
        bz.unshift(0);
        // Add zeros to make remainder as long as divisor.
        for(; rl++ < bl;)r.push(0);
        do {
            // n is how many times the divisor goes into current remainder.
            for(n = 0; n < 10; n++){
                // Compare divisor and remainder.
                if (bl != (rl = r.length)) cmp = bl > rl ? 1 : -1;
                else {
                    for(ri = -1, cmp = 0; ++ri < bl;)if (b[ri] != r[ri]) {
                        cmp = b[ri] > r[ri] ? 1 : -1;
                        break;
                    }
                }
                // If divisor < remainder, subtract divisor from remainder.
                if (cmp < 0) {
                    // Remainder can't be more than 1 digit longer than divisor.
                    // Equalise lengths using divisor with extra leading zero?
                    for(bt = rl == bl ? b : bz; rl;){
                        if (r[--rl] < bt[rl]) {
                            ri = rl;
                            for(; ri && !r[--ri];)r[ri] = 9;
                            --r[ri];
                            r[rl] += 10;
                        }
                        r[rl] -= bt[rl];
                    }
                    for(; !r[0];)r.shift();
                } else break;
            }
            // Add the digit n to the result array.
            qc[qi++] = cmp ? n : ++n;
            // Update the remainder.
            if (r[0] && cmp) r[rl] = a[ai] || 0;
            else r = [
                a[ai]
            ];
        }while ((ai++ < al || r[0] !== UNDEFINED) && k--);
        // Leading zero? Do not remove if result is simply zero (qi == 1).
        if (!qc[0] && qi != 1) {
            // There can't be more than one zero.
            qc.shift();
            q.e--;
            p--;
        }
        // Round?
        if (qi > p) round(q, p, Big.RM, r[0] !== UNDEFINED);
        return q;
    };
    /*
   * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
   */ P.eq = function(y) {
        return this.cmp(y) === 0;
    };
    /*
   * Return true if the value of this Big is greater than the value of Big y, otherwise return
   * false.
   */ P.gt = function(y) {
        return this.cmp(y) > 0;
    };
    /*
   * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
   * return false.
   */ P.gte = function(y) {
        return this.cmp(y) > -1;
    };
    /*
   * Return true if the value of this Big is less than the value of Big y, otherwise return false.
   */ P.lt = function(y) {
        return this.cmp(y) < 0;
    };
    /*
   * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
   * return false.
   */ P.lte = function(y) {
        return this.cmp(y) < 1;
    };
    /*
   * Return a new Big whose value is the value of this Big minus the value of Big y.
   */ P.minus = P.sub = function(y) {
        var i, j, t, xlty, x = this, Big = x.constructor, a = x.s, b = (y = new Big(y)).s;
        // Signs differ?
        if (a != b) {
            y.s = -b;
            return x.plus(y);
        }
        var xc = x.c.slice(), xe = x.e, yc = y.c, ye = y.e;
        // Either zero?
        if (!xc[0] || !yc[0]) {
            if (yc[0]) y.s = -b;
            else if (xc[0]) y = new Big(x);
            else y.s = 1;
            return y;
        }
        // Determine which is the bigger number. Prepend zeros to equalise exponents.
        if (a = xe - ye) {
            if (xlty = a < 0) {
                a = -a;
                t = xc;
            } else {
                ye = xe;
                t = yc;
            }
            t.reverse();
            for(b = a; b--;)t.push(0);
            t.reverse();
        } else {
            // Exponents equal. Check digit by digit.
            j = ((xlty = xc.length < yc.length) ? xc : yc).length;
            for(a = b = 0; b < j; b++)if (xc[b] != yc[b]) {
                xlty = xc[b] < yc[b];
                break;
            }
        }
        // x < y? Point xc to the array of the bigger number.
        if (xlty) {
            t = xc;
            xc = yc;
            yc = t;
            y.s = -y.s;
        }
        /*
     * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
     * needs to start at yc.length.
     */ if ((b = (j = yc.length) - (i = xc.length)) > 0) for(; b--;)xc[i++] = 0;
        // Subtract yc from xc.
        for(b = i; j > a;){
            if (xc[--j] < yc[j]) {
                for(i = j; i && !xc[--i];)xc[i] = 9;
                --xc[i];
                xc[j] += 10;
            }
            xc[j] -= yc[j];
        }
        // Remove trailing zeros.
        for(; xc[--b] === 0;)xc.pop();
        // Remove leading zeros and adjust exponent accordingly.
        for(; xc[0] === 0;){
            xc.shift();
            --ye;
        }
        if (!xc[0]) {
            // n - n = +0
            y.s = 1;
            // Result must be zero.
            xc = [
                ye = 0
            ];
        }
        y.c = xc;
        y.e = ye;
        return y;
    };
    /*
   * Return a new Big whose value is the value of this Big modulo the value of Big y.
   */ P.mod = function(y) {
        var ygtx, x = this, Big = x.constructor, a = x.s, b = (y = new Big(y)).s;
        if (!y.c[0]) throw Error(DIV_BY_ZERO);
        x.s = y.s = 1;
        ygtx = y.cmp(x) == 1;
        x.s = a;
        y.s = b;
        if (ygtx) return new Big(x);
        a = Big.DP;
        b = Big.RM;
        Big.DP = Big.RM = 0;
        x = x.div(y);
        Big.DP = a;
        Big.RM = b;
        return this.minus(x.times(y));
    };
    /*
   * Return a new Big whose value is the value of this Big negated.
   */ P.neg = function() {
        var x = new this.constructor(this);
        x.s = -x.s;
        return x;
    };
    /*
   * Return a new Big whose value is the value of this Big plus the value of Big y.
   */ P.plus = P.add = function(y) {
        var e, k, t, x = this, Big = x.constructor;
        y = new Big(y);
        // Signs differ?
        if (x.s != y.s) {
            y.s = -y.s;
            return x.minus(y);
        }
        var xe = x.e, xc = x.c, ye = y.e, yc = y.c;
        // Either zero?
        if (!xc[0] || !yc[0]) {
            if (!yc[0]) {
                if (xc[0]) y = new Big(x);
                else y.s = x.s;
            }
            return y;
        }
        xc = xc.slice();
        // Prepend zeros to equalise exponents.
        // Note: reverse faster than unshifts.
        if (e = xe - ye) {
            if (e > 0) {
                ye = xe;
                t = yc;
            } else {
                e = -e;
                t = xc;
            }
            t.reverse();
            for(; e--;)t.push(0);
            t.reverse();
        }
        // Point xc to the longer array.
        if (xc.length - yc.length < 0) {
            t = yc;
            yc = xc;
            xc = t;
        }
        e = yc.length;
        // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
        for(k = 0; e; xc[e] %= 10)k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;
        // No need to check for zero, as +x + +y != 0 && -x + -y != 0
        if (k) {
            xc.unshift(k);
            ++ye;
        }
        // Remove trailing zeros.
        for(e = xc.length; xc[--e] === 0;)xc.pop();
        y.c = xc;
        y.e = ye;
        return y;
    };
    /*
   * Return a Big whose value is the value of this Big raised to the power n.
   * If n is negative, round to a maximum of Big.DP decimal places using rounding
   * mode Big.RM.
   *
   * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
   */ P.pow = function(n) {
        var x = this, one = new x.constructor('1'), y = one, isneg = n < 0;
        if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) throw Error(INVALID + 'exponent');
        if (isneg) n = -n;
        for(;;){
            if (n & 1) y = y.times(x);
            n >>= 1;
            if (!n) break;
            x = x.times(x);
        }
        return isneg ? one.div(y) : y;
    };
    /*
   * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
   * significant digits using rounding mode rm, or Big.RM if rm is not specified.
   *
   * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */ P.prec = function(sd, rm) {
        if (sd !== ~~sd || sd < 1 || sd > MAX_DP) throw Error(INVALID + 'precision');
        return round(new this.constructor(this), sd, rm);
    };
    /*
   * Return a new Big whose value is the value of this Big rounded to a maximum of dp decimal places
   * using rounding mode rm, or Big.RM if rm is not specified.
   * If dp is negative, round to an integer which is a multiple of 10**-dp.
   * If dp is not specified, round to 0 decimal places.
   *
   * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */ P.round = function(dp, rm) {
        if (dp === UNDEFINED) dp = 0;
        else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) throw Error(INVALID_DP);
        return round(new this.constructor(this), dp + this.e + 1, rm);
    };
    /*
   * Return a new Big whose value is the square root of the value of this Big, rounded, if
   * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */ P.sqrt = function() {
        var r, c, t, x = this, Big = x.constructor, s = x.s, e = x.e, half = new Big('0.5');
        // Zero?
        if (!x.c[0]) return new Big(x);
        // Negative?
        if (s < 0) throw Error(NAME + 'No square root');
        // Estimate.
        s = Math.sqrt(+stringify(x, true, true));
        // Math.sqrt underflow/overflow?
        // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
        if (s === 0 || s === 1 / 0) {
            c = x.c.join('');
            if (!(c.length + e & 1)) c += '0';
            s = Math.sqrt(c);
            e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
            r = new Big((s == 1 / 0 ? '5e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e);
        } else r = new Big(s + '');
        e = r.e + (Big.DP += 4);
        // Newton-Raphson iteration.
        do {
            t = r;
            r = half.times(t.plus(x.div(t)));
        }while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''));
        return round(r, (Big.DP -= 4) + r.e + 1, Big.RM);
    };
    /*
   * Return a new Big whose value is the value of this Big times the value of Big y.
   */ P.times = P.mul = function(y) {
        var c, x = this, Big = x.constructor, xc = x.c, yc = (y = new Big(y)).c, a = xc.length, b = yc.length, i = x.e, j = y.e;
        // Determine sign of result.
        y.s = x.s == y.s ? 1 : -1;
        // Return signed 0 if either 0.
        if (!xc[0] || !yc[0]) {
            y.c = [
                y.e = 0
            ];
            return y;
        }
        // Initialise exponent of result as x.e + y.e.
        y.e = i + j;
        // If array xc has fewer digits than yc, swap xc and yc, and lengths.
        if (a < b) {
            c = xc;
            xc = yc;
            yc = c;
            j = a;
            a = b;
            b = j;
        }
        // Initialise coefficient array of result with zeros.
        for(c = new Array(j = a + b); j--;)c[j] = 0;
        // Multiply.
        // i is initially xc.length.
        for(i = b; i--;){
            b = 0;
            // a is yc.length.
            for(j = a + i; j > i;){
                // Current sum of products at this digit position, plus carry.
                b = c[j] + yc[i] * xc[j - i - 1] + b;
                c[j--] = b % 10;
                // carry
                b = b / 10 | 0;
            }
            c[j] = b;
        }
        // Increment result exponent if there is a final carry, otherwise remove leading zero.
        if (b) ++y.e;
        else c.shift();
        // Remove trailing zeros.
        for(i = c.length; !c[--i];)c.pop();
        y.c = c;
        return y;
    };
    /*
   * Return a string representing the value of this Big in exponential notation rounded to dp fixed
   * decimal places using rounding mode rm, or Big.RM if rm is not specified.
   *
   * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */ P.toExponential = function(dp, rm) {
        var x = this, n = x.c[0];
        if (dp !== UNDEFINED) {
            if (dp !== ~~dp || dp < 0 || dp > MAX_DP) throw Error(INVALID_DP);
            x = round(new x.constructor(x), ++dp, rm);
            for(; x.c.length < dp;)x.c.push(0);
        }
        return stringify(x, true, !!n);
    };
    /*
   * Return a string representing the value of this Big in normal notation rounded to dp fixed
   * decimal places using rounding mode rm, or Big.RM if rm is not specified.
   *
   * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   */ P.toFixed = function(dp, rm) {
        var x = this, n = x.c[0];
        if (dp !== UNDEFINED) {
            if (dp !== ~~dp || dp < 0 || dp > MAX_DP) throw Error(INVALID_DP);
            x = round(new x.constructor(x), dp + x.e + 1, rm);
            // x.e may have changed if the value is rounded up.
            for(dp = dp + x.e + 1; x.c.length < dp;)x.c.push(0);
        }
        return stringify(x, false, !!n);
    };
    /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Omit the sign for negative zero.
   */ P.toJSON = P.toString = function() {
        var x = this, Big = x.constructor;
        return stringify(x, x.e <= Big.NE || x.e >= Big.PE, !!x.c[0]);
    };
    /*
   * Return the value of this Big as a primitve number.
   */ P.toNumber = function() {
        var n = +stringify(this, true, true);
        if (this.constructor.strict === true && !this.eq(n.toString())) throw Error(NAME + 'Imprecise conversion');
        return n;
    };
    /*
   * Return a string representing the value of this Big rounded to sd significant digits using
   * rounding mode rm, or Big.RM if rm is not specified.
   * Use exponential notation if sd is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
   */ P.toPrecision = function(sd, rm) {
        var x = this, Big = x.constructor, n = x.c[0];
        if (sd !== UNDEFINED) {
            if (sd !== ~~sd || sd < 1 || sd > MAX_DP) throw Error(INVALID + 'precision');
            x = round(new Big(x), sd, rm);
            for(; x.c.length < sd;)x.c.push(0);
        }
        return stringify(x, sd <= x.e || x.e <= Big.NE || x.e >= Big.PE, !!n);
    };
    /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Include the sign for negative zero.
   */ P.valueOf = function() {
        var x = this, Big = x.constructor;
        if (Big.strict === true) throw Error(NAME + 'valueOf disallowed');
        return stringify(x, x.e <= Big.NE || x.e >= Big.PE, true);
    };
    // Export
    Big = _Big_();
    Big['default'] = Big.Big = Big;
    //AMD.
    if (typeof define === 'function' && define.amd) define(function() {
        return Big;
    });
    else if (0, module.exports) module.exports = Big;
    else GLOBAL.Big = Big;
})(this);

},{}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
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

},{}],"7znDa":[function(require,module,exports,__globalThis) {
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
 * <mytag id="1">
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
var _htmlJs = require("./html.js");
var _utilJs = require("./util.js");
function getAttribute(xml, name) {
    let v = xml.getAttribute(name);
    if (!v) throw new Error(name + ' attribute not found');
    return v;
}
function getFirstElement(element, tagName) {
    let el = element.getElementsByTagName(tagName)[0];
    if (el == null) throw new Error(tagName + ' element not found');
    return el;
}
function getFirstChildNode(element) {
    let cn = element.childNodes;
    if (cn == null) throw new Error('Element has no childNodes');
    return cn[0];
}
function getNodeValue(node) {
    let nodeValue = node.nodeValue;
    if (nodeValue == null) throw new Error('nodeValue is null');
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
        let s = (0, _htmlJs.getSelfClosingTag)(undefined, this.tagName);
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
        s += '<' + this.tagName;
        for (let [k, v] of this.attributes)s += ' ' + k + '="' + v.toString() + '"';
        return s + ' />';
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
        return getTag(this.value.toString(), this.tagName, this.attributes, padding, false);
    }
}
class NumberArrayNode extends TagWithAttributes {
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param values The values.
     * @param delimiter The delimiter of the values (Optional - default will be ",").
     */ constructor(attributes, tagName, values, delimiter){
        super(attributes, tagName), /**
     * The delimiter of the values.
     */ this.delimiter = " ";
        this.values = values;
        if (delimiter != undefined) this.delimiter = delimiter;
    }
    /**
     * @returns The values.
     */ getValues() {
        return this.values;
    }
    /**
     * @returns A string representation.
     */ setValues(values) {
        this.values = values;
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
        return getTag((0, _utilJs.bigArrayToString)(this.values, this.delimiter), this.tagName, this.attributes, padding, false);
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
            let i = 0;
            this.nodes.forEach((v)=>{
                if (v == undefined) console.warn("Node " + i.toString() + " is undefined this.nodes.size = " + this.nodes.size);
                else {
                    if (v instanceof NodeWithNodes) s += v.toXML(pad, padding1);
                    else if (v instanceof TagWithAttributes) s += v.toXML(padding1);
                    else s += v.toXML(padding1);
                }
                i++;
            });
            return getTag(s, this.tagName, this.attributes, padding, true);
        } else {
            let s = (0, _htmlJs.getSelfClosingTag)(this.attributes, this.tagName);
            if (padding != undefined) return "\n" + padding + s;
            return s;
        }
    }
}
function getStartTag(tagName, attributes, padding) {
    let s = "";
    if (padding != undefined) s += "\n" + padding;
    s += '<' + tagName;
    if (attributes) for (let [k, v] of attributes)s += ' ' + k + '="' + v.toString() + '"';
    return s + '>';
}
function getEndTag(tagName, padding, padValue) {
    let s = "";
    if (padValue) {
        if (padding != undefined) s += "\n" + padding;
    }
    return s + '</' + tagName + '>';
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
        if (attributeValue != null) attributes.set(attributeName.trim(), attributeValue.trim());
    });
    return attributes;
}
function getSingularElement(xml, tagName) {
    let e = xml.getElementsByTagName(tagName);
    if (e.length != 1) throw new Error("Expecting 1 " + tagName + " but finding " + e.length);
    return e[0];
}

},{"./html.js":"aLPSL","./util.js":"f0Rnl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aLPSL":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "s_button", ()=>s_button);
parcelHelpers.export(exports, "s_collapsible", ()=>s_collapsible);
parcelHelpers.export(exports, "sy_downTriangle", ()=>sy_downTriangle);
parcelHelpers.export(exports, "sy_upTriangle", ()=>sy_upTriangle);
parcelHelpers.export(exports, "s_select", ()=>s_select);
/**
 * Create a HTMLDivElement containing a HTMLButtonElement and a HTMLDivElement which display is toggled as the button is actioned. 
 * By default the content is not displayed. Then if the button is actioned the content is diplayed, then if actioned again it is 
 * not diplayed and so on...
 * 
 * @param id The id of the HTMLDivElement returned which is also used to generate ids of components.
 * @param divToAppendTo The div to append to.
 * @param elementToInsertBefore The element to insert before. (If null then the content will be appended to the div.)
 * @param content The content to expand/collapse.
 * @param buttonLabel The label for the button.
 * @param componentMargin The margin for the button.
 * @param margin The margin for HTMLDivElement created. 
 * @returns A HTMLDivElement containing a HTMLButtonElement and the content.
 */ parcelHelpers.export(exports, "getCollapsibleDiv", ()=>getCollapsibleDiv);
/**
 * Create and return HTMLDivElement that contains an HTMLLabelElement and a HTMLInputElement.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the input.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLSelectElement.
 * @param divMargin The margin for the HTMLDivElement.
 * @param func The function called on a change to the input.
 * @param value The value of the input.
 * @param labelTextContent The label text.
 * @returns A HTMLDivElement that contains a HTMLLabelElement and a HTMLInputElement.
 */ parcelHelpers.export(exports, "createLabelWithInput", ()=>createLabelWithInput);
/**
 * Create and return a HTMLInputElement.
 * @param type The input type (e.g. "text", "number").
 * @param id The id of the HTMLInputElement.
 * @param margin The margin for the HTMLInputElement.
 * @param func The function called on a change to the input.
 * @returns A HTMLInputElement.
 */ parcelHelpers.export(exports, "createInputWithFunction", ()=>createInputWithFunction);
/**
 * Create and return a HTMLInputElement.
 * @param type The input type (e.g. "text", "number", "checkbox").
 * @param id The id of the HTMLInputElement.
 * @param margin The margin for the HTMLInputElement.
 * @returns A HTMLInputElement.
 */ parcelHelpers.export(exports, "createInput", ()=>createInput);
/**
 * Create and return HTMLDivElement that contains an HTMLLabelElement and a HTMLTextAreaElement.
 * @param id The id of the HTMLTextAreaElement.
 * @param componentMargin The margin for the HTMLLabelElement and HTMLSelectElement.
 * @param divMargin The margin for the HTMLDivElement.
 * @param func The function called on a change to the input.
 * @param value The value of the input.
 * @param labelTextContent The label text.
 * @returns A HTMLDivElement that contains a HTMLLabelElement and a HTMLTextAreaElement.
 */ parcelHelpers.export(exports, "createLabelWithTextArea", ()=>createLabelWithTextArea);
/**
 * Create and return a HTMLTextAreaElement.
 * @param id The id of the HTMLTextAreaElement.
 * @param margin The margin for the HTMLInputElement.
 * @param func The function called on a change to the HTMLTextAreaElement.
 * @returns A HTMLInputElement.
 */ parcelHelpers.export(exports, "createTextAreaWithFunction", ()=>createTextAreaWithFunction);
/**
 * Create and return a HTMLTextAreaElement.
 * @param id The id of the HTMLTextAreaElement.
 * @param margin The margin for the HTMLTextAreaElement.
 * @returns A HTMLTextAreaElement.
 */ parcelHelpers.export(exports, "createTextArea", ()=>createTextArea);
/**
 * Create a self closing tag.
 * @param attributes The attributes.
 * @param tagName The tag name.
 */ parcelHelpers.export(exports, "getSelfClosingTag", ()=>getSelfClosingTag);
/**
 * For resizing an HTMLInputElement to the width of what it contains.
 * @param i The HTMLInputElement to resize.
 * @param minSize The minimum size of the input.
 */ parcelHelpers.export(exports, "resizeInputElement", ()=>resizeInputElement);
/**
 * For resizing an HTMLSelectElement to the width of what it contains.
 * 
 * @param s The HTMLSelectElement to resize.
 * @param minSize The minimum size of the input.
 */ parcelHelpers.export(exports, "resizeSelectElement", ()=>resizeSelectElement);
/**
 * For resizing an HTMLTextAreaElement to the width of what it contains.
 * 
 * @param ta The HTMLTextAreaElement to resize.
 * @param minSize The minimum size of the input.
 */ parcelHelpers.export(exports, "resizeTextAreaElement", ()=>resizeTextAreaElement);
/**
 * Create and return an HTMLSelectElement.
 * 
 * @param options The options.
 * @param name The name for the select.
 * @param value The value for the select.
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
 * @param margin The margin for the HTMLLabelElement.
 * @param fontsize The font size for the label.
 * @returns An HTMLLabelElement with specified boundary.
 */ parcelHelpers.export(exports, "createLabel", ()=>createLabel);
/**
 * Create and return a HTMLTableElement.
 * @param id The id of the HTMLTableElement.
 * @param margin The margin for the HTMLTableElement.
 * @returns A HTMLTableElement.
 */ parcelHelpers.export(exports, "createTable", ()=>createTable);
/**
 * Create and return a HTMLTableRowElement.
 * @param id The id of the HTMLTableRowElement.
 * @param margin The margin for the HTMLTableRowElement.
 * @returns A HTMLTableRowElement.
 */ parcelHelpers.export(exports, "addTableHeaderRow", ()=>addTableHeaderRow);
/**
 * Create and return a HTMLTableRowElement.
 * @param id The id of the HTMLTableRowElement.
 * @param margin The margin for the HTMLTableRowElement.
 * @returns A HTMLTableRowElement.
 */ parcelHelpers.export(exports, "addTableRow", ()=>addTableRow);
var _util = require("./util");
const s_button = "button";
const s_collapsible = "collapsible";
const sy_downTriangle = "\u25BC"; // ▼
const sy_upTriangle = "\u25B2"; // ▲
const s_select = "select";
function getCollapsibleDiv(id, divToAddTo, elementToInsertBefore, content, buttonLabel, componentMargin, margin) {
    let div = createDiv(id, margin);
    let bid = (0, _util.getID)(id, s_button);
    let b = createButton(buttonLabel + " " + sy_downTriangle, bid, componentMargin);
    b.className = s_collapsible;
    b.addEventListener('click', function() {
        let parts = b.textContent.split(' ');
        parts[parts.length - 1] = parts[parts.length - 1] === sy_downTriangle ? sy_upTriangle : sy_downTriangle;
        b.textContent = parts.join(' ');
    });
    // Add the button and content to the div.
    div.appendChild(b);
    div.appendChild(content);
    if (elementToInsertBefore != null) divToAddTo.insertBefore(div, elementToInsertBefore);
    else divToAddTo.appendChild(div);
    setCollapsibleEventListener(b);
    return div;
}
/**
 * For setting the event listener for a collapsible element.
 * @param e The element to add the event listener to.
 */ function setCollapsibleEventListener(e) {
    // Remove any existing event listener.
    e.removeEventListener("click", toggleCollapsible);
    // Add new event listener.
    e.addEventListener("click", toggleCollapsible);
}
/**
 * For toggling the collapsible content.
 */ function toggleCollapsible() {
    this.classList.toggle("active");
    let nes = this.nextElementSibling;
    if (nes != null) {
        if (nes instanceof HTMLDivElement) {
            if (nes.style.display === "block") nes.style.display = "none";
            else nes.style.display = "block";
        } else console.log("toggleCollapsible: nextElementSibling is not an HTMLDivElement");
    } else console.log("toggleCollapsible: nextElementSibling is null");
}
function createLabelWithInput(type, id, componentMargin, divMargin, func, value, labelTextContent) {
    let div = createFlexDiv(undefined, divMargin);
    let input = createInputWithFunction(type, id, componentMargin, func, value);
    let label = createLabel(labelTextContent, componentMargin);
    label.htmlFor = id;
    div.appendChild(label);
    div.appendChild(input);
    return div;
}
function createInputWithFunction(type, id, margin, func, value) {
    let input = createInput(type, id, margin);
    input.onchange = func;
    input.value = value;
    resizeInputElement(input);
    return input;
}
function createInput(type, id, margin) {
    let input = document.createElement('input');
    input.type = type;
    input.id = id;
    Object.assign(input.style, margin);
    input.style.fontSize = '1em'; // Set the font size with a relative unit.
    input.classList.add('auto-width');
    return input;
}
function createLabelWithTextArea(id, componentMargin, divMargin, func, value, labelTextContent) {
    let div = createFlexDiv(undefined, divMargin);
    let ta = createTextAreaWithFunction(id, componentMargin, func, value);
    let label = createLabel(labelTextContent, componentMargin);
    label.htmlFor = id;
    div.appendChild(label);
    div.appendChild(ta);
    return div;
}
function createTextAreaWithFunction(id, margin, func, value) {
    let ta = createTextArea(id, margin);
    ta.onchange = func;
    ta.value = value;
    resizeTextAreaElement(ta);
    return ta;
}
function createTextArea(id, margin) {
    let ta = document.createElement('textarea');
    ta.id = id;
    Object.assign(ta.style, margin);
    ta.style.fontSize = '1em'; // Set the font size with a relative unit.
    ta.classList.add('auto-width');
    return ta;
}
function getSelfClosingTag(attributes, tagName) {
    let s = "<" + tagName;
    if (attributes) for (let [key, value] of attributes)s += " " + key + "=\"" + value + "\"";
    return s + " />";
}
function resizeInputElement(i, minSize) {
    if (minSize == undefined) minSize = 4;
    i.style.width = i.value.length + minSize + "ch";
}
function resizeSelectElement(s, minSize) {
    if (minSize == undefined) minSize = 6;
    s.style.width = s.value.length + minSize + "ch";
}
function resizeTextAreaElement(ta, minSize) {
    if (minSize == undefined) minSize = 6;
    ta.style.width = ta.value.length + minSize + "ch";
}
function createSelectElement(options, name, value, id, margin) {
    let select = document.createElement('select');
    options.forEach((option)=>{
        select.name = name;
        select.id = id;
        let optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
    });
    select.value = value;
    select.style.fontSize = '1em'; // Set the font size with a relative unit.
    select.classList.add('auto-width');
    resizeSelectElement(select);
    Object.assign(select.style, margin);
    return select;
}
function createLabelWithSelect(textContent, options, name, value, id, componentMargin, divMargin) {
    let div = createFlexDiv(id, divMargin);
    let label = createLabel(textContent, componentMargin);
    div.appendChild(label);
    div.appendChild(createSelectElement(options, name, value, (0, _util.getID)(id, s_select), componentMargin));
    return div;
}
function createButton(textContent, id, margin) {
    let button = document.createElement('button');
    button.textContent = textContent;
    if (id != undefined) button.id = id;
    if (margin != undefined) Object.assign(button.style, margin);
    button.style.fontSize = '1em'; // Set the font size with a relative unit.
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
    div.style.display = 'flex';
    div.style.flexWrap = 'wrap';
    //div.classList.add('auto-width-flex');
    return div;
}
function createLabel(textContent, margin) {
    let label = document.createElement("label");
    Object.assign(label.style, margin);
    label.textContent = textContent;
    label.style.fontSize = '1em'; // Set the font size with a relative unit.
    return label;
}
function createTable(id, margin) {
    let table = document.createElement('table');
    table.id = id;
    Object.assign(table.style, margin);
    return table;
}
function addTableHeaderRow(table, content) {
    let thead = table.createTHead();
    let headerRow = thead.insertRow();
    content.forEach((c)=>{
        let th = document.createElement("th");
        th.textContent = c;
        headerRow.appendChild(th);
    });
    return headerRow;
}
function addTableRow(table, content) {
    let row = table.insertRow();
    content.forEach((c)=>{
        row.insertCell().textContent = c;
    });
    return row;
}

},{"./util":"f0Rnl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2khyJ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Create a menu.
 * @returns HTMLDivElement
 */ parcelHelpers.export(exports, "createMenu", ()=>createMenu);
var _htmlJs = require("./html.js");
var _appJs = require("./app.js");
var _librarymolsJs = require("./librarymols.js");
let mk_url = "https://github.com/MESMER-kinetics";
/**
 * MXG.
 */ let mxg_url = mk_url + "/mxg";
let mxg_a = document.createElement('a');
mxg_a.href = mxg_url;
mxg_a.textContent = mxg_url;
/**
 * Example data.
 */ let mxgDataExamples_url = mxg_url + "/tree/main/data/examples";
let mxgDataExamples_a = document.createElement('a');
mxgDataExamples_a.href = mxgDataExamples_url;
mxgDataExamples_a.textContent = mxgDataExamples_url;
/**
 * MESMER.
 */ let mesmer_url = mk_url + "/MESMER-code";
let mesmer_a = document.createElement('a');
mesmer_a.href = mesmer_url;
mesmer_a.textContent = mesmer_url;
/**
 * EPSRC.
 */ let epsrc_url = "https://epsrc.ukri.org/";
let epsrc_a = document.createElement('a');
epsrc_a.href = epsrc_url;
epsrc_a.textContent = "The UK Engineering and Physical Sciences Research Council (EPSRC)";
/**
 * University of Leeds
 */ let uol_url = "https://www.leeds.ac.uk/";
let uol_a = document.createElement('a');
uol_a.href = uol_url;
uol_a.textContent = "The University of Leeds";
/**
 * 3DMol.
 */ let t3Dmol_url = "https://github.com/3dmol/3Dmol.js";
let t3Dmol_a = document.createElement('a');
t3Dmol_a.href = t3Dmol_url;
t3Dmol_a.textContent = t3Dmol_url;
let t3Dmol_citation_url = "http://doi.org/10.1093/bioinformatics/btu829";
let t3Dmol_citation_a = document.createElement('a');
t3Dmol_citation_a.href = t3Dmol_citation_url;
t3Dmol_citation_a.textContent = "doi:10.1093/bioinformatics/btu829";
/**
 * Big.js.
 */ let bigjs_url = "https://mikemcl.github.io/big.js/";
let bigjs_a = document.createElement('a');
bigjs_a.href = bigjs_url;
bigjs_a.textContent = bigjs_url;
/**
 * Get a div with details about MXG.
 */ function about(w) {
    if (w == null) return;
    w.document.title = "About MXG";
    // Welcome Text.
    let wDiv = document.createElement('div');
    w.document.body.appendChild(wDiv);
    // p1.
    let p1 = w.document.createElement('p');
    wDiv.appendChild(p1);
    p1.appendChild(w.document.createTextNode('MXG is a free and open source program to assist in creating, editing and \
        visualising MESMER XML data. MXG is released via the MESMER-kinetics GitHub repository: '));
    p1.appendChild(mxg_a);
    p1.appendChild(w.document.createTextNode('. Details of MESMER - the Master Equation Solver for Multi Energy-well Reactions \
        can be found at: '));
    p1.appendChild(mesmer_a);
    p1.appendChild(w.document.createTextNode('.'));
    // p2.
    let p2 = document.createElement('p');
    wDiv.appendChild(p2);
    p2.appendChild(w.document.createTextNode('MXG development has been led by a team based at '));
    p2.appendChild(uol_a);
    p2.appendChild(w.document.createTextNode(' and funded by '));
    p2.appendChild(epsrc_a);
    p2.appendChild(w.document.createTextNode('. Please contribute to MXG development by reporting issues on GitHub.'));
    // p3.
    let p3 = w.document.createElement('p');
    wDiv.appendChild(p3);
    p3.appendChild(w.document.createTextNode('MXG should work with the latest Firefox, Chrome, Edge or Safari Web browsers. \
        It can be used offline after installation as a Progressive Web App (PWA). The process of installing a PWA varies by \
        Web browser and device. For guidance please see the MXG development repository README.'));
    // p4.
    let p4 = w.document.createElement('p');
    wDiv.appendChild(p4);
    p4.appendChild(w.document.createTextNode('The Menu contains 7 buttons: \
        The About button displays the about text in a new Window. \
        The Load MESMER File button is for loading a MESMER XML data file. \
        The Load Into Library button is for adding molecule data to a molecule library. \
        The Clear Library button clears the molecule library. \
        The Load Defaults button is for loading default values from a file. \
        The Save button is for saving a new MESMER XML data file. \
        The Restart button reinitialises the interface.'));
    /* 
        The file will contain no comments, and numbers are output in a particular format (decimals - where numbers with more \
        than 8 digits are output in scientific notation). The file should reflect what is specified via the interface.'));
        Between the Load and Save buttons are buttons to increase or decrease the fontsize and to change between a light \
        and dark theme. In fontsize buttons either increase or decrease the fontsize of text elements including those in \
        the reaction diagram and species plots.'));*/ // p5.
    let p5 = document.createElement('p');
    wDiv.appendChild(p5);
    p5.appendChild(w.document.createTextNode('A MESMER XML input data file normally has a "me:mesmer" element containing: \
        "me:title", "moleculeList", "reactionList", "me:conditions", "me:modelParameters", and "me:control" elements. \
        A MESMER XML output data usually also has "me:metadataList" and "me:analysis" elements in the "me:mesmer" \
        element, and additional output located in the "moleculeList" and "reactionList" elements. \
        The main interface below the Menu presents what is in a loaded MESMER file, or what will be in saved to a MESMER file. \
        It also presents visualisations of the data which can be output in PNG or CSV formats. \
        The "me:title" value is presented in an input after a label. The input allows for the default value, \
        "Example_title" to be changed. Other details are presented via buttons with descriptive names and a triangular \
        symbol: \
        A triangle orientated with a point down: ' + (0, _htmlJs.sy_downTriangle) + ' can be actioned to reveal details. \
        A triangle orientated with a point up: ' + (0, _htmlJs.sy_upTriangle) + ' can be actioned to hide those details.'));
    // p6.
    let p6 = w.document.createElement('p');
    wDiv.appendChild(p6);
    p6.textContent = 'The Reaction Diagram button shows/hides a reaction well diagram which is redrawn if molecule "me:ZPE" \
        property values are changed. The diagram can be opened in a new Window and saved as an image in PNG format file.';
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
function createMenu() {
    // Create Menu.
    let menuDiv = document.getElementById((0, _appJs.menuDivID));
    menuDiv.style.display = 'flex';
    menuDiv.style.justifyContent = 'center';
    menuDiv.style.margin = '5px';
    menuDiv.style.padding = '5px';
    menuDiv.style.border = '1px solid black';
    menuDiv.style.backgroundColor = 'lightgrey';
    // Add About MXG button.
    let s_About = 'About';
    let ab = (0, _htmlJs.createButton)(s_About, (0, _appJs.addID)(s_About), (0, _appJs.boundary1));
    menuDiv.appendChild(ab);
    ab.addEventListener('click', async (event)=>{
        let aw = window.open("", "", "width=600,height=400");
        about(aw);
    });
    // Add Load MESMER File button.
    let s_Load_MESMER_File = 'Load MESMER File';
    let lb = (0, _htmlJs.createButton)(s_Load_MESMER_File, (0, _appJs.addID)(s_Load_MESMER_File), (0, _appJs.boundary1));
    lb.addEventListener('click', (event)=>{
        // Alert the user that any changes will be lost unless saved, giving the option to save.
        if (confirm('Any unsaved changes will be lost. Select OK to continue loading or Cancel to cancel.')) (0, _appJs.load)();
        else return;
    });
    menuDiv.appendChild(lb);
    // Add Load Into Library button.
    let s_Load_Into_Library = 'Load Into Library';
    let llmb = (0, _htmlJs.createButton)(s_Load_Into_Library, (0, _appJs.addID)(s_Load_Into_Library), (0, _appJs.boundary1));
    menuDiv.appendChild(llmb);
    let lms = new (0, _librarymolsJs.LibraryMolecules)();
    llmb.addEventListener('click', async (event)=>{
        let ms = await lms.readFile();
        // Add the molecules to the libmols map.
        if ((0, _appJs.libmols) == undefined) (0, _appJs.setLibmols)(new Map());
        ms.forEach((v, k)=>{
            (0, _appJs.addMolecule)(false, v, (0, _appJs.libmols));
        });
    });
    // Add Clear Library button.
    let s_Clear_Library = 'Clear Library';
    let clmb = (0, _htmlJs.createButton)(s_Clear_Library, (0, _appJs.addID)(s_Clear_Library), (0, _appJs.boundary1));
    menuDiv.appendChild(clmb);
    clmb.addEventListener('click', async (event)=>{
        (0, _appJs.setLibmols)(new Map());
    });
    // Add Load Defaults button.
    let s_Load_Defaults = 'Load Defaults';
    let ldb = (0, _htmlJs.createButton)(s_Load_Defaults, (0, _appJs.addID)(s_Load_Defaults), (0, _appJs.boundary1));
    ldb.addEventListener('click', (event)=>{
        (0, _appJs.defaults).readFile();
    });
    menuDiv.appendChild(ldb);
    // Add Save File button.
    let s_Save = 'Save';
    let saveButton = (0, _htmlJs.createButton)(s_Save, (0, _appJs.addID)(s_Save), (0, _appJs.boundary1));
    saveButton.addEventListener('click', (0, _appJs.saveXML));
    menuDiv.appendChild(saveButton);
    // Add Restart button.
    let s_Restart = 'Restart';
    let sab = (0, _htmlJs.createButton)(s_Restart, (0, _appJs.addID)(s_Restart), (0, _appJs.boundary1));
    menuDiv.appendChild(sab);
    sab.addEventListener('click', (event)=>{
        // Alert the user that any changes will be lost unless saved, giving the option to save.
        if (confirm('Any unsaved changes will be lost. Select OK to continue loading or Cancel to cancel.')) (0, _appJs.startAfresh)();
        else return;
    });
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
    */ return menuDiv;
}

},{"./html.js":"aLPSL","./app.js":"dPB9w","./librarymols.js":"dhi1y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dhi1y":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LibraryMolecules", ()=>LibraryMolecules);
parcelHelpers.export(exports, "processPropertyString", ()=>processPropertyString);
var _bigJs = require("big.js");
var _xmlMesmer = require("./xml_mesmer");
var _xmlMetadata = require("./xml_metadata");
var _xmlMolecule = require("./xml_molecule");
var _xml = require("./xml");
var _util = require("./util");
var _guiMoleculeList = require("./gui_moleculeList");
class LibraryMolecules {
    /**
     * @param defaults The defaults.
     */ constructor(){}
    /**
     * Read molecules from file.
     * @returns A promise that resolves to a map of molecules.
     */ readFile() {
        return new Promise((resolve, reject)=>{
            let input = document.createElement('input');
            input.type = 'file';
            let self = this;
            input.onchange = function() {
                if (input.files) {
                    let file = input.files[0];
                    let inputFilename = file.name;
                    let reader = new FileReader();
                    let chunkSize = 1048576; // 1MB
                    let start = 0;
                    let contents = '';
                    reader.onload = function(e) {
                        if (e.target == null) {
                            reject(new Error('Event target is null'));
                            return;
                        }
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
                                let parser = new DOMParser();
                                let xml = parser.parseFromString(contents, "text/xml");
                                resolve(self.parse(xml));
                            }
                        }
                    };
                    // Read the first chunk
                    let blob = file.slice(start, start + chunkSize);
                    reader.readAsText(blob);
                    start += chunkSize;
                }
            };
            input.click();
        });
    }
    /**
     * Parse the XML.
     */ parse(xml) {
        /**
         * The molecules.
         */ let molecules = new Map();
        // Get the XML "moleculeList" element.
        let xml_ml = (0, _xml.getSingularElement)(xml, (0, _xmlMesmer.MoleculeList).tagName);
        // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
        let mlTagNames = new Set();
        xml_ml.childNodes.forEach(function(node) {
            mlTagNames.add(node.nodeName);
        });
        /*
        if (mlTagNames.size != 1) {
            if (!(mlTagNames.size >= 2 && mlTagNames.has("#text")) ||
                !(mlTagNames.size == 3 && mlTagNames.has('#comment'))) {
                console.error("moleculeListTagNames:");
                mlTagNames.forEach(x => console.error(x));
                //throw new Error("Additional tag names in moleculeList:");
            }
        }
        if (!mlTagNames.has(Molecule.tagName)) {
            throw new Error("Expecting tags with \"" + Molecule.tagName + "\" tagName but there are none!");
        }
        */ // Process the XML "molecule" elements.
        let xml_ms = xml_ml.getElementsByTagName((0, _xmlMolecule.Molecule).tagName);
        let xml_msl = xml_ms.length;
        console.log("Number of molecules=" + xml_msl);
        let naliases = 0;
        //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
        for(let i = 0; i < xml_msl; i++){
            // console.log("i=" + i);
            // Create a new Molecule.
            let attributes = (0, _xml.getAttributes)(xml_ms[i]);
            let mid = attributes.get((0, _xmlMolecule.Molecule).s_id);
            //console.log("mID=" + mID);
            if (mid == undefined) throw new Error((0, _xmlMolecule.Molecule).s_id + ' is undefined');
            let cns = xml_ms[i].childNodes;
            //console.log("cns.length=" + cns.length);
            // Check if there are any child elements. If not, then this molecule is an alias.
            if (cns.length == 0) {
                naliases++;
                //console.log("This molecule is an alias.");
                let ref = attributes.get("ref");
                if (ref == undefined) throw new Error("ref is undefined");
                continue;
            }
            let id;
            while(true){
                id = (0, _guiMoleculeList.setMoleculeID)(false, mid, undefined, molecules);
                if (id != undefined) break;
            }
            let m = new (0, _xmlMolecule.Molecule)(attributes, id);
            molecules.set(id, m);
            // Create a set of molecule tag names.
            let moleculeTagNames = new Set();
            //cns.forEach(function (cn) {
            for(let j = 0; j < cns.length; j++){
                let cn = cns[j];
                // Check for nodeName repeats that are not #text.
                if (!moleculeTagNames.has(cn.nodeName)) moleculeTagNames.add(cn.nodeName);
                else // nodeName = #text are comments or white space/newlines in the XML which are ignored.
                if (cn.nodeName != "#text") console.warn("Another ChildNode with nodeName=" + cn.nodeName);
            //console.log(cn.nodeName);
            }
            // Init metadataList.
            //console.log("Init metadataList.");
            let xml_mls = xml_ms[i].getElementsByTagName((0, _xmlMetadata.MetadataList).tagName);
            if (xml_mls.length > 0) {
                if (xml_mls.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMetadata.MetadataList).tagName + " but finding " + xml_mls.length + "!");
                let ml = new (0, _xmlMetadata.MetadataList)((0, _xml.getAttributes)(xml_mls[0]));
                m.setMetadataList(ml);
                let xml_ms = xml_mls[0].getElementsByTagName((0, _xmlMetadata.Metadata).tagName);
                for(let j = 0; j < xml_ms.length; j++){
                    // Create a new Metadata.
                    let md = new (0, _xmlMetadata.Metadata)((0, _xml.getAttributes)(xml_ms[j]));
                    ml.addMetadata(md);
                }
                moleculeTagNames.delete((0, _xmlMetadata.MetadataList).tagName);
            }
            // Init atoms.
            //console.log("Init atoms.");
            // There can be an individual atom not in an atom array, or an atom array.
            let xml_aas = xml_ms[i].getElementsByTagName((0, _xmlMolecule.AtomArray).tagName);
            if (xml_aas.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMolecule.AtomArray).tagName + " but finding " + xml_aas.length + "!");
            if (xml_aas.length == 1) {
                let xml_aa = xml_aas[0];
                let xml_as = xml_aa.getElementsByTagName((0, _xmlMolecule.Atom).tagName);
                if (xml_as.length == 0) throw new Error("Expecting 1 or more atoms in " + (0, _xmlMolecule.AtomArray).tagName + ", but finding 0!");
                let aa = new (0, _xmlMolecule.AtomArray)((0, _xml.getAttributes)(xml_aa));
                m.setAtoms(aa);
                for(let j = 0; j < xml_as.length; j++)aa.addAtom(new (0, _xmlMolecule.Atom)((0, _xml.getAttributes)(xml_as[j]), m));
                moleculeTagNames.delete((0, _xmlMolecule.AtomArray).tagName);
            } else {
                let xml_as = xml_ms[i].getElementsByTagName((0, _xmlMolecule.Atom).tagName);
                if (xml_as.length == 1) {
                    let aa = new (0, _xmlMolecule.AtomArray)(new Map());
                    aa.addAtom(new (0, _xmlMolecule.Atom)((0, _xml.getAttributes)(xml_as[0]), m));
                    m.setAtoms(aa);
                } else if (xml_as.length > 1) throw new Error("Expecting 1 " + (0, _xmlMolecule.Atom).tagName + " but finding " + xml_as.length + ". Should these be in an " + (0, _xmlMolecule.AtomArray).tagName + "?");
            }
            //console.log("atomsNode=" + atomsNode);
            moleculeTagNames.delete((0, _xmlMolecule.Atom).tagName);
            // Init bonds.
            // There can be an individual bond not in a bond array, or a bond array.
            // There may be only 1 bond in a BondArray.
            let xml_bas = xml_ms[i].getElementsByTagName((0, _xmlMolecule.BondArray).tagName);
            if (xml_bas.length > 0) {
                if (xml_bas.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMolecule.BondArray).tagName + " but finding " + xml_bas.length + "!");
                let xml_bs = xml_bas[0].getElementsByTagName((0, _xmlMolecule.Bond).tagName);
                let ba = new (0, _xmlMolecule.BondArray)((0, _xml.getAttributes)(xml_bas[0]));
                for(let j = 0; j < xml_bs.length; j++)ba.addBond(new (0, _xmlMolecule.Bond)((0, _xml.getAttributes)(xml_bs[j]), m));
                m.setBonds(ba);
                moleculeTagNames.delete((0, _xmlMolecule.BondArray).tagName);
            } else {
                let xml_bonds = xml_ms[i].getElementsByTagName((0, _xmlMolecule.Bond).tagName);
                if (xml_bonds.length > 0) {
                    if (xml_bonds.length > 1) throw new Error("Expecting 1 " + (0, _xmlMolecule.Bond).tagName + " but finding " + xml_bonds.length + ". Should these be in a " + (0, _xmlMolecule.BondArray).tagName + "?");
                    let ba = new (0, _xmlMolecule.BondArray)(new Map());
                    ba.addBond(new (0, _xmlMolecule.Bond)((0, _xml.getAttributes)(xml_bonds[0]), m));
                    m.setBonds(ba);
                }
            }
            moleculeTagNames.delete((0, _xmlMolecule.Bond).tagName);
            // Organise PropertyList or individual Property.
            // (There can be an individual property not in a propertyList?)
            // If there is a PropertyList, then create a property list.
            let xml_pls = xml_ms[i].getElementsByTagName((0, _xmlMolecule.PropertyList).tagName);
            if (xml_pls.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMolecule.PropertyList).tagName + " but finding " + xml_pls.length + "!");
            if (xml_pls.length == 1) {
                // Create a new PropertyList.
                let pl = new (0, _xmlMolecule.PropertyList)((0, _xml.getAttributes)(xml_pls[0]));
                m.setPropertyList(pl);
                let xml_ps = xml_pls[0].getElementsByTagName((0, _xmlMolecule.Property).tagName);
                for(let j = 0; j < xml_ps.length; j++)// Create a new Property.
                pl.setProperty(createProperty(xml_ps[j]));
                moleculeTagNames.delete((0, _xmlMolecule.PropertyList).tagName);
            } else {
                // There is a Property on its own. For simplicity, this will be stored in a PropertyList.
                // Create a new PropertyList.
                let pl = new (0, _xmlMolecule.PropertyList)(new Map());
                m.setPropertyList(pl);
                let xml_ps = xml_ms[i].getElementsByTagName((0, _xmlMolecule.Property).tagName);
                if (xml_ps.length != 1) throw new Error("Expecting 1 " + (0, _xmlMolecule.Property).tagName + " but finding " + xml_ps.length + ". Should these be in a " + (0, _xmlMolecule.PropertyList).tagName + "?");
                // Create a new Property.
                pl.setProperty(createProperty(xml_ps[0]));
                moleculeTagNames.delete((0, _xmlMolecule.Property).tagName);
            }
            // Organise EnergyTransferModel.
            let xml_etms = xml_ms[i].getElementsByTagName((0, _xmlMolecule.EnergyTransferModel).tagName);
            if (xml_etms.length > 0) {
                if (xml_etms.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMolecule.EnergyTransferModel).tagName + " but finding " + xml_etms.length + "!");
                let etm = new (0, _xmlMolecule.EnergyTransferModel)((0, _xml.getAttributes)(xml_etms[0]));
                m.setEnergyTransferModel(etm);
                moleculeTagNames.delete((0, _xmlMolecule.EnergyTransferModel).tagName);
            }
            // Organise DOSCMethod.
            let xml_dms = xml_ms[i].getElementsByTagName((0, _xmlMolecule.DOSCMethod).tagName);
            if (xml_dms.length > 0) {
                if (xml_dms.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMolecule.DOSCMethod).tagName + " but finding " + xml_dms.length + "!");
                let doscm = new (0, _xmlMolecule.DOSCMethod)((0, _xml.getAttributes)(xml_dms[0]));
                m.setDOSCMethod(doscm);
                moleculeTagNames.delete((0, _xmlMolecule.DOSCMethod).tagName);
            }
            // Organise DistributionCalcMethod. (Output only)
            let xml_dcms = xml_ms[i].getElementsByTagName((0, _xmlMolecule.DistributionCalcMethod).tagName);
            if (xml_dcms.length > 0) {
                if (xml_dcms.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMolecule.DistributionCalcMethod).tagName + " but finding " + xml_dcms.length + "!");
                let dcmAttributes = (0, _xml.getAttributes)(xml_dcms[0]);
                let dcm = new (0, _xmlMolecule.DistributionCalcMethod)(dcmAttributes);
                m.setDistributionCalcMethod(dcm);
                moleculeTagNames.delete((0, _xmlMolecule.DistributionCalcMethod).tagName);
            }
            // Organise DensityOfStatesList. (Output only)
            let xml_dosl = xml_ms[i].getElementsByTagName((0, _xmlMolecule.DensityOfStatesList).tagName);
            if (xml_dosl.length > 0) {
                if (xml_dosl.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMolecule.DensityOfStatesList).tagName + " but finding " + xml_dosl.length + "!");
                let dosl = new (0, _xmlMolecule.DensityOfStatesList)((0, _xml.getAttributes)(xml_dosl[0]));
                m.setDensityOfStatesList(dosl);
                let xml_dos = xml_dosl[0].getElementsByTagName((0, _xmlMolecule.DensityOfStates).tagName);
                // Organise Description.
                let xml_ds = xml_dosl[0].getElementsByTagName((0, _xmlMesmer.Description).tagName);
                if (xml_ds.length > 0) {
                    if (xml_ds.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMesmer.Description).tagName + " but finding " + xml_ds.length + "!");
                    let ds = new (0, _xmlMesmer.Description)((0, _xml.getAttributes)(xml_ds[0]), (0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml_ds[0])));
                    dosl.setDescription(ds);
                }
                // Organise DensityOfStates.
                //console.log("xml_dos.length=" + xml_dos.length);
                if (xml_dos.length == 0) throw new Error("Expecting 1 or more " + (0, _xmlMolecule.DensityOfStates).tagName + " but finding 0!");
                else for(let j = 0; j < xml_dos.length; j++){
                    //console.log("j=" + j);
                    let dos = new (0, _xmlMolecule.DensityOfStates)((0, _xml.getAttributes)(xml_dos[j]));
                    dosl.addDensityOfStates(dos);
                    // T.
                    let xml_t = xml_dos[j].getElementsByTagName((0, _xmlMesmer.T).tagName);
                    if (xml_t.length != 1) throw new Error("Expecting 1 " + (0, _xmlMesmer.T).tagName + " but finding " + xml_t.length + "!");
                    else {
                        let t = new (0, _xmlMesmer.T)((0, _xml.getAttributes)(xml_t[0]), new (0, _bigJs.Big)((0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml_t[0]))));
                        dos.setT(t);
                    //dosDiv.appendChild(createLabel(t.value.toString(), boundary1));
                    }
                    // qtot.
                    let xml_qtot = xml_dos[j].getElementsByTagName((0, _xmlMolecule.Qtot).tagName);
                    if (xml_qtot.length != 1) throw new Error("Expecting 1 " + (0, _xmlMolecule.Qtot).tagName + " but finding " + xml_qtot.length + "!");
                    else {
                        let qtot = new (0, _xmlMolecule.Qtot)((0, _xml.getAttributes)(xml_qtot[0]), new (0, _bigJs.Big)((0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml_qtot[0]))));
                        dos.setQtot(qtot);
                    //dosDiv.appendChild(createLabel(Qtot.tagName + " " + qtot.value.toString(), boundary1));
                    }
                    // sumc.
                    let xml_sumc = xml_dos[j].getElementsByTagName((0, _xmlMolecule.Sumc).tagName);
                    if (xml_sumc.length != 1) throw new Error("Expecting 1 " + (0, _xmlMolecule.Sumc).tagName + " but finding " + xml_sumc.length + "!");
                    else {
                        let sumc = new (0, _xmlMolecule.Sumc)((0, _xml.getAttributes)(xml_sumc[0]), new (0, _bigJs.Big)((0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml_sumc[0]))));
                        dos.setSumc(sumc);
                    //dosDiv.appendChild(createLabel(sumc.value.toString(), boundary1));
                    }
                    // sumg.
                    let xml_sumg = xml_dos[j].getElementsByTagName((0, _xmlMolecule.Sumg).tagName);
                    if (xml_sumg.length != 1) throw new Error("Expecting 1 " + (0, _xmlMolecule.Sumg).tagName + " but finding " + xml_sumg.length + "!");
                    else {
                        let sumg = new (0, _xmlMolecule.Sumg)((0, _xml.getAttributes)(xml_sumg[0]), new (0, _bigJs.Big)((0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml_sumg[0]))));
                        dos.setSumg(sumg);
                    //dosDiv.appendChild(createLabel(sumg.value.toString(), boundary1));
                    }
                }
                moleculeTagNames.delete((0, _xmlMolecule.DensityOfStatesList).tagName);
            }
            // Organise States.
            let xml_states = xml_ms[i].getElementsByTagName((0, _xmlMolecule.States).tagName);
            if (xml_states.length > 0) {
                if (xml_states.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMolecule.States).tagName + " but finding " + xml_states.length + "!");
                let ss = new (0, _xmlMolecule.States)((0, _xml.getAttributes)(xml_states[0]));
                //let state: State[] = [];
                let xml_ss = xml_states[0].getElementsByTagName((0, _xmlMolecule.State).tagName);
                for(let j = 0; j < xml_ss.length; j++){
                    let s = new (0, _xmlMolecule.State)((0, _xml.getAttributes)(xml_ss[j]), j);
                    //state.push(s);
                    ss.addState(s);
                //let sDivID = mIDM.addID(ssDivID, State.tagName, j);
                //let sDiv: HTMLDivElement = createDiv(sDivID, level1);
                //ssDiv.appendChild(sDiv);
                }
                m.setStates(ss);
                moleculeTagNames.delete((0, _xmlMolecule.States).tagName);
            }
            // Check for unexpected tags.
            moleculeTagNames.delete("#text");
            if (moleculeTagNames.size > 0) {
                console.warn("There are additional unexpected moleculeTagNames:");
                moleculeTagNames.forEach((x)=>console.warn(x));
            //throw new Error("Unexpected tags in molecule.");
            }
        }
        console.log("Number of molecules=" + molecules.size);
        console.log("Number of alias molecules=" + naliases.toString());
        return molecules;
    }
}
/**
 * Create a property.
 * @param xml The XML element.
 * @returns The property.
 */ function createProperty(xml) {
    let p = new (0, _xmlMolecule.Property)((0, _xml.getAttributes)(xml));
    //console.log("p.dictRef " + p.dictRef);
    if (p.dictRef == (0, _xmlMolecule.ZPE).dictRef) // "me:ZPE", scalar, Mesmer.energyUnits.
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.Hf0).dictRef) // "me:Hf0", scalar, Mesmer.energyUnits.
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.HfAT0).dictRef) // "me:HfAT0", scalar, Mesmer.energyUnits.
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.Hf298).dictRef) // "me:Hf298", scalar, Mesmer.energyUnits.
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.RotConsts).dictRef) // "me:rotConsts", array, Mesmer.frequencyUnits.
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.SymmetryNumber).dictRef) // "me:symmetryNumber", scalar, No units.
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.TSOpticalSymmetryNumber).dictRef) // "me:TSOpticalSymmetryNumber", scalar, No units.
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.FrequenciesScaleFactor).dictRef) // "me:frequenciesScaleFactor", scalar, No units.
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.VibFreqs).dictRef) // "me:vibFreqs", array, cm-1.
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.MW).dictRef) // "me:MW", scalar, amu.
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.SpinMultiplicity).dictRef) // "me:spinMultiplicity", scalar, No units.
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.Epsilon).dictRef) // "me:epsilon", scalar, K (fixed).
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.Sigma).dictRef) // "me:sigma", scalar, Å (fixed).
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.Hessian).dictRef) // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.EinsteinAij).dictRef) // "me:EinsteinAij", array, s-1 (fixed).
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.EinsteinBij).dictRef) // "me:EinsteinBij", array, m3/J/s2 (fixed).
    processProperty(p, xml);
    else if (p.dictRef == (0, _xmlMolecule.ElectronicExcitation).dictRef) // "me:electronicExcitation", scalar, cm-1.
    processProperty(p, xml);
    else processPropertyString(p, xml);
    return p;
}
/**
 * Process a property.
 * @param p The property.
 * @param element The element.
 */ function processProperty(p, element) {
    // PropertyScalar.
    let scalarNodes = element.getElementsByTagName((0, _xmlMolecule.PropertyScalarNumber).tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) throw new Error("Expecting 1 " + (0, _xmlMolecule.PropertyScalarNumber).tagName + " but finding " + scalarNodes.length + "!");
        let inputString = (0, _xml.getInputString)(scalarNodes[0]);
        let value = new (0, _bigJs.Big)(inputString);
        let psAttributes = (0, _xml.getAttributes)(scalarNodes[0]);
        // Add PropertyScalarNumber.
        let ps = new (0, _xmlMolecule.PropertyScalarNumber)(psAttributes, value);
        p.setProperty(ps);
    } else {
        // PropertyArray.
        let arrayNodes = element.getElementsByTagName((0, _xmlMolecule.PropertyArray).tagName);
        if (arrayNodes.length > 0) {
            if (arrayNodes.length != 1) throw new Error("Expecting 1 " + (0, _xmlMolecule.PropertyArray).tagName + " but finding " + arrayNodes.length + "!");
            let inputString = (0, _xml.getInputString)(arrayNodes[0]);
            if (inputString != "") {
                let values = (0, _util.toNumberArray)(inputString.split(/\s+/));
                let paAttributes = (0, _xml.getAttributes)(arrayNodes[0]);
                let pa = new (0, _xmlMolecule.PropertyArray)(paAttributes, values);
                p.setProperty(pa);
            }
        } else {
            // PropertyMatrix.
            let matrixNodes = element.getElementsByTagName((0, _xmlMolecule.PropertyMatrix).tagName);
            if (matrixNodes.length > 0) {
                if (matrixNodes.length != 1) throw new Error("Expecting 1 " + (0, _xmlMolecule.PropertyMatrix).tagName + " but finding " + matrixNodes.length + "!");
                let inputString = (0, _xml.getInputString)(matrixNodes[0]);
                let values = (0, _util.toNumberArray)(inputString.split(/\s+/));
                let pmAttributes = (0, _xml.getAttributes)(matrixNodes[0]);
                let pm = new (0, _xmlMolecule.PropertyMatrix)(pmAttributes, values);
                p.setProperty(pm);
            } else throw new Error("Expecting " + (0, _xmlMolecule.PropertyScalarNumber).tagName + ", " + (0, _xmlMolecule.PropertyArray).tagName + " or " + (0, _xmlMolecule.PropertyMatrix).tagName + " but finding none!");
        }
    }
}
function processPropertyString(p, element) {
    // PropertyScalarString.
    let scalarNodes = element.getElementsByTagName((0, _xmlMolecule.PropertyScalarString).tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) throw new Error("Expecting 1 " + (0, _xmlMolecule.PropertyScalarString).tagName + " but finding " + scalarNodes.length + "!");
        let inputString = (0, _xml.getInputString)(scalarNodes[0]);
        let psAttributes = (0, _xml.getAttributes)(scalarNodes[0]);
        // Add PropertyScalarNumber.
        let ps = new (0, _xmlMolecule.PropertyScalarString)(psAttributes, inputString);
        p.setProperty(ps);
    } else console.log("Expecting " + (0, _xmlMolecule.PropertyScalarString).tagName + " but finding none!");
}

},{"big.js":"91nMZ","./xml_mesmer":"8G2m7","./xml_metadata":"5YFPw","./xml_molecule":"cg9tc","./xml":"7znDa","./util":"f0Rnl","./gui_moleculeList":"66Fjc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8G2m7":[function(require,module,exports,__globalThis) {
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
 * A class for representing a "conditionsList" - this does not yet exist in the MEMSER, so this is not used.
 * Currently, in the XML, a "conditions" node is a child node of a "me:mesmer" node and there is no "conditionsList".
 */ parcelHelpers.export(exports, "ConditionsList", ()=>ConditionsList);
/**
 * A class for representing a "modelParametersList" - this does not yet exist in the MEMSER, so this is not used.
 * Currently, in the XML, a "modelParameters" node is a child node of a "me:mesmer" node and there is no "modelParametersList".
 */ parcelHelpers.export(exports, "ModelParametersList", ()=>ModelParametersList);
/**
 * A class for representing a "controlList" - this does not yet exist in the MEMSER, so this is not used.
 * Currently, in the XML, a "control" node is a child node of a "me:mesmer" node and there is no "controlList".
 */ parcelHelpers.export(exports, "ControlList", ()=>ControlList);
/**
 * The "me:mesmer" node contains a "me:title", "moleculeList", "reactionList", "me:conditions", 
 * "me:modelParameters" and "me:control".
 */ parcelHelpers.export(exports, "Mesmer", ()=>Mesmer);
/**
 * In the XML, a "me:description" node is a child node of a "me:densityOfStatesList" node.
 */ parcelHelpers.export(exports, "Description", ()=>Description);
/**
 * In the XML, a "me:T" node is a child node of a "me:densityOfStates" node. 
 */ parcelHelpers.export(exports, "T", ()=>T);
var _xmlAnalysisJs = require("./xml_analysis.js");
var _xmlConditionsJs = require("./xml_conditions.js");
var _xmlControlJs = require("./xml_control.js");
var _xmlMetadataJs = require("./xml_metadata.js");
var _xmlModelParametersJs = require("./xml_modelParameters.js");
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
            this.index.set(molecule.getID(), this.nodes.size - 1);
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
        let mID = molecule.getID();
        let index = this.index.get(mID);
        if (index !== undefined) {
            this.nodes.set(index, molecule);
            console.log('Replaced molecule with id ' + mID);
        } else {
            this.nodes.set(this.nodes.size, molecule);
            this.index.set(mID, this.nodes.size - 1);
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
            console.log('Replaced reaction with id ' + reaction.id);
        } else {
            this.nodes.set(this.nodes.size, reaction);
            this.index.set(reaction.id, this.nodes.size - 1);
        }
    }
    /**
     * @returns The next control id.
     */ getNextReactionID() {
        let id = 1;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.index.keys()).sort((a, b)=>{
            // Extract the number parts from the keys
            let matchA = a.match(/\d+/);
            let matchB = b.match(/\d+/);
            let numberA = matchA ? parseInt(matchA[0]) : 0;
            let numberB = matchB ? parseInt(matchB[0]) : 0;
            // Compare the number parts
            return numberA - numberB;
        });
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key)=>{
            let key2 = parseInt(key.match(/\d+/)[0]);
            if (key2 > id) return id;
            id++;
        });
        return id;
    }
}
class ConditionsList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "conditionsList";
    }
    /**
     * @param attributes The attributes.
     * @param conditionss The conditions.
     */ constructor(attributes, conditionss){
        super(attributes, ControlList.tagName);
        this.index = new Map();
        if (conditionss != undefined) conditionss.forEach((conditions)=>{
            this.nodes.set(this.nodes.size, conditions);
            this.index.set(conditions.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the control.
     * @returns The conditions.
     */ getConditions(id) {
        let i = this.index.get(id);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Remove a control.
     * @param id The id of the control to remove.
     */ removeConditions(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a conditions.
     * @param conditions The conditions.
     */ addConditions(conditions) {
        let index = this.index.get(conditions.id);
        if (index != undefined) {
            this.nodes.set(index, conditions);
            console.log('Replaced conditions with id ' + conditions.id);
        } else {
            this.nodes.set(this.nodes.size, conditions);
            this.index.set(conditions.id, this.nodes.size - 1);
        }
    }
}
class ModelParametersList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "modelParametersList";
    }
    /**
     * @param attributes The attributes.
     * @param modelParameterss The modelParameters.
     */ constructor(attributes, modelParameterss){
        super(attributes, ModelParametersList.tagName);
        this.index = new Map();
        if (modelParameterss != undefined) modelParameterss.forEach((modelParameters)=>{
            this.nodes.set(this.nodes.size, modelParameters);
            this.index.set(modelParameters.id, this.nodes.size - 1);
        });
    }
    /**
     * @param id The id of the modelParameters.
     * @returns The modelParameters.
     */ getModelParameters(id) {
        let i = this.index.get(id);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Remove a modelParameters.
     * @param id The id of the modelParameters to remove.
     */ removeModelParameters(id) {
        let i = this.index.get(id);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(id);
        }
    }
    /**
     * Add a modelParameters.
     * @param modelParameters The modelParameters.
     */ addModelParameters(modelParameters) {
        let index = this.index.get(modelParameters.id);
        if (index != undefined) {
            this.nodes.set(index, modelParameters);
            console.log('Replaced modelParameters with id ' + modelParameters.id);
        } else {
            this.nodes.set(this.nodes.size, modelParameters);
            this.index.set(modelParameters.id, this.nodes.size - 1);
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
        if (i != undefined) return this.nodes.get(i);
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
            console.log('Replaced control with id ' + control.id);
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
            "kJ per mol",
            "cm-1",
            "wavenumber",
            "kcal/mol",
            "kcal per mol",
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
     * Mass units.
     */ this.massUnits = [
            "amu",
            "g/mol",
            "kg/mol"
        ];
    }
    static{
        /**
     * Temperature units.
     */ this.temperatureUnits = [
            "K"
        ];
    }
    static{
        /**
     * Time units.
     */ this.timeUnits = [
            "fs",
            "ps",
            "ns",
            "s"
        ];
    }
    static{
        /**
     * Length units.
     */ this.lengthUnits = [
            "\xc5",
            "nm",
            "um",
            "mm",
            "cm",
            "m"
        ];
    }
    static{
        /**
     * Hessian units.
     */ this.hessianUnits = [
            "kJ/mol/\xc52",
            "kcal/mol/\xc52",
            "Hartree/\xc52"
        ];
    }
    static{
        /**
     * EinsteinAUnits units.
     */ this.EinsteinAUnits = [
            "s-1"
        ];
    }
    static{
        /**
     * EinsteinBUnits units.
     */ this.EinsteinBUnits = [
            "m3/J/s2"
        ];
    }
    static{
        /**
     * The atoms with 1 to 118 protons inclusive.
     * (source: https://query.wikidata.org/#SELECT%20%3Felement%20%3Fsymbol%20%20%3Fprotons%0AWHERE%0A%7B%0A%20%20%3Felement%20wdt%3AP31%20wd%3AQ11344%20%3B%0A%20%20%20%20%20%20%20%20%20%20%20wdt%3AP1086%20%3Fprotons%20%3B%0A%20%20%20%20%20%20%20%20%20%20%20wdt%3AP246%20%3Fsymbol%20.%0A%7D%0A%0AORDER%20BY%20%3Fprotons)
     */ this.elementTypes = [
            "H",
            "He",
            "Li",
            "Be",
            "B",
            "C",
            "N",
            "O",
            "F",
            "Ne",
            "Na",
            "Mg",
            "Al",
            "Si",
            "P",
            "S",
            "Cl",
            "Ar",
            "K",
            "Ca",
            "Sc",
            "Ti",
            "V",
            "Cr",
            "Mn",
            "Fe",
            "Co",
            "Ni",
            "Cu",
            "Zn",
            "Ga",
            "Ge",
            "As",
            "Se",
            "Br",
            "Kr",
            "Rb",
            "Sr",
            "Y",
            "Zr",
            "Nb",
            "Mo",
            "Tc",
            "Ru",
            "Rh",
            "Pd",
            "Ag",
            "Cd",
            "In",
            "Sn",
            "Sb",
            "Te",
            "I",
            "Xe",
            "Cs",
            "Ba",
            "La",
            "Ce",
            "Pr",
            "Nd",
            "Pm",
            "Sm",
            "Eu",
            "Gd",
            "Tb",
            "Dy",
            "Ho",
            "Er",
            "Tm",
            "Yb",
            "Lu",
            "Hf",
            "Ta",
            "W",
            "Re",
            "Os",
            "Ir",
            "Pt",
            "Au",
            "Hg",
            "Tl",
            "Pb",
            "Bi",
            "Po",
            "At",
            "Rn",
            "Fr",
            "Ra",
            "Ac",
            "Th",
            "Pa",
            "U",
            "Np",
            "Pu",
            "Am",
            "Cm",
            "Bk",
            "Cf",
            "Es",
            "Fm",
            "Md",
            "No",
            "Lr",
            "Rf",
            "Db",
            "Sg",
            "Bh",
            "Hs",
            "Mt",
            "Ds",
            "Rg",
            "Cn",
            "Nh",
            "Fl",
            "Mc",
            "Lv",
            "Ts",
            "Og"
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
     */ constructor(attributes, title, moleculeList, reactionList, conditionss, modelParameterss, controls, metadataList, analysis){
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
        this.conditionsIndex = new Map();
        if (conditionss != undefined) conditionss.forEach((conditions)=>{
            this.index.set((0, _xmlConditionsJs.Conditions).tagName + conditions.id, this.nodes.size);
            this.conditionsIndex.set(conditions.id, this.nodes.size);
            this.addNode(conditions);
        });
        this.modelParametersIndex = new Map();
        if (modelParameterss != undefined) modelParameterss.forEach((modelParameters)=>{
            this.index.set((0, _xmlModelParametersJs.ModelParameters).tagName + modelParameters.id, this.nodes.size);
            this.modelParametersIndex.set(modelParameters.id, this.nodes.size);
            this.addNode(modelParameters);
        });
        this.controlIndex = new Map();
        if (controls != undefined) controls.forEach((control)=>{
            this.index.set((0, _xmlControlJs.Control).tagName + control.id, this.nodes.size);
            this.controlIndex.set(control.id, this.nodes.size);
            this.addNode(control);
        });
        if (metadataList != undefined) {
            this.index.set((0, _xmlMetadataJs.MetadataList).tagName, this.nodes.size);
            this.addNode(metadataList);
        }
        if (analysis != undefined) {
            this.index.set((0, _xmlAnalysisJs.Analysis).tagName, this.nodes.size);
            this.addNode(analysis);
        }
    }
    /**
     * @returns The title.
     */ getTitle() {
        let i = this.index.get(Title.tagName);
        if (i != undefined) return this.nodes.get(i);
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
        if (i != undefined) return this.nodes.get(i);
        else {
            let moleculeList = new MoleculeList(new Map());
            this.index.set(MoleculeList.tagName, this.nodes.size);
            this.addNode(moleculeList);
            return moleculeList;
        }
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
     * @returns The next control id.
     *
    getNextReactionID(): number {
        let id = 1;
        if (this.getReactionList() == undefined) {
            return id;
        }
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.getReactionList()!.index.keys()).sort((a, b) => {
            // Extract the number parts from the keys
            let matchA = a.match(/\d+/);
            let matchB = b.match(/\d+/);
            let numberA = matchA ? parseInt(matchA[0]) : 0;
            let numberB = matchB ? parseInt(matchB[0]) : 0;
            // Compare the number parts
            return numberA - numberB;
        });
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key) => {
            let key2 = parseInt(key.match(/\d+/)![0]);
            if (key2 > id) {
                return id;
            }
            id++;
        });
        return id;
    }

    /**
     * @param reaction The reaction to add.
     *
    addReaction(reaction: Reaction) {
        let id = Reaction.tagName + reaction.id;
        let i: number | undefined = this.index.get(id);
        if (i != undefined) {
            this.nodes.set(i, reaction);
        } else {
            this.index.set(id, this.nodes.size);
            this.addNode(reaction);
        }
    }

    /**
     * @param reactionID The id of the reaction to remove.
     *
    removeReaction(reactionID: number) {
        let i: number | undefined = this.index.get(Reaction.tagName + reactionID);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(Reaction.tagName + reactionID);
        }
    }

    /**
     * @returns The reaction list.
     */ getReactionList() {
        let i = this.index.get(ReactionList.tagName);
        if (i != undefined) return this.nodes.get(i);
        else {
            let reactionList = new ReactionList(new Map());
            this.index.set(ReactionList.tagName, this.nodes.size);
            this.addNode(reactionList);
            return reactionList;
        }
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
     * Add a Conditions.
     * @param conditions The Conditions.
     */ addConditions(conditions) {
        let id = (0, _xmlConditionsJs.Conditions).tagName + conditions.id;
        let i = this.index.get(id);
        if (i != undefined) this.nodes.set(i, conditions);
        else {
            this.index.set(id, this.nodes.size);
            this.conditionsIndex.set(conditions.id, this.nodes.size);
            this.addNode(conditions);
        }
    }
    /**
     * @param conditionsID The id of the conditions.
     * @returns The conditions for the conditionsID.
     */ getConditions(conditionsID) {
        let i = this.conditionsIndex.get(conditionsID);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @returns The conditions as a Conditions[].
     */ getConditionss() {
        let conditionss = [];
        this.conditionsIndex.forEach((index, conditionsID)=>{
            conditionss.push(this.nodes.get(index));
        });
        return conditionss;
    }
    /**
     * Set the conditions.
     * @param conditionss The Conditions[].
     */ setConditionss(conditionss) {
        conditionss.forEach((conditions)=>{
            this.addConditions(conditions);
        });
    }
    /**
     * @returns The next control id.
     */ getNextConditionsID() {
        let id = 0;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.conditionsIndex.keys()).sort((a, b)=>a - b);
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key)=>{
            if (key > id) return id;
            id++;
        });
        return id;
    }
    /**
     * Remove a conditions.
     * @param conditionsID The id of the conditions to remove.
     */ removeConditions(conditionsID) {
        let i = this.conditionsIndex.get(conditionsID);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete((0, _xmlConditionsJs.Conditions).tagName + conditionsID);
            this.conditionsIndex.delete(conditionsID);
        }
    }
    /**
     * Add a ModelParameters.
     * @param modelParameters The ModelParameters.
     */ addModelParameters(modelParameters) {
        let id = (0, _xmlModelParametersJs.ModelParameters).tagName + modelParameters.id;
        let i = this.index.get(id);
        if (i != undefined) this.nodes.set(i, modelParameters);
        else {
            this.index.set(id, this.nodes.size);
            this.modelParametersIndex.set(modelParameters.id, this.nodes.size);
            this.addNode(modelParameters);
        }
    }
    /**
     * @param modelParametersID The id of the modelParameters.
     * @returns The modelParameters for the modelParametersID.
     */ getModelParameters(modelParametersID) {
        let i = this.modelParametersIndex.get(modelParametersID);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @returns The modelParameters as a ModelParameters[].
     */ getModelParameterss() {
        let modelParameterss = [];
        this.modelParametersIndex.forEach((index, modelParametersID)=>{
            modelParameterss.push(this.nodes.get(index));
        });
        return modelParameterss;
    }
    /**
     * Set the modelParameters.
     * @param modelParameterss The ModelParameters[].
     */ setModelParameterss(modelParameterss) {
        modelParameterss.forEach((modelParameters)=>{
            this.addModelParameters(modelParameters);
        });
    }
    /**
     * @returns The next modelParameters id.
     */ getNextModelParametersID() {
        let id = 0;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.modelParametersIndex.keys()).sort((a, b)=>a - b);
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key)=>{
            if (key > id) return id;
            id++;
        });
        return id;
    }
    /**
     * Remove a modelParameters.
     * @param modelParametersID The id of the modelParameters to remove.
     */ removeModelParameters(modelParametersID) {
        let i = this.modelParametersIndex.get(modelParametersID);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete((0, _xmlModelParametersJs.ModelParameters).tagName + modelParametersID);
            this.modelParametersIndex.delete(modelParametersID);
        }
    }
    /**
     * Add a Control.
     * @param control The Control.
     */ addControl(control) {
        let id = (0, _xmlControlJs.Control).tagName + control.id;
        let i = this.index.get(id);
        if (i != undefined) this.nodes.set(i, control);
        else {
            this.index.set(id, this.nodes.size);
            this.controlIndex.set(control.id, this.nodes.size);
            this.addNode(control);
        }
    }
    /**
     * @returns The control.
     */ getControl(controlID) {
        let i = this.controlIndex.get(controlID);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @returns The controls.
     */ getControls() {
        let controls = [];
        this.controlIndex.forEach((index, controlID)=>{
            controls.push(this.nodes.get(index));
        });
        return controls;
    }
    /**
     * Set the controls.
     * @param controls The controls.
     */ setControls(controls) {
        controls.forEach((control)=>{
            this.addControl(control);
        });
    }
    /**
     * @returns The next control id.
     */ getNextControlID() {
        let id = 0;
        // Sort the control index by key and go through these and take the next available id.
        let sortedKeys = Array.from(this.controlIndex.keys()).sort((a, b)=>a - b);
        //console.log("sortedKeys " + arrayToString(sortedKeys));
        sortedKeys.forEach((key)=>{
            if (key > id) return id;
            id++;
        });
        return id;
    }
    /**
     * Remove a control.
     * @param controlID The id of the control to remove.
     */ removeControl(controlID) {
        let i = this.controlIndex.get(controlID);
        //console.log("removeControl " + controlID + " " + i);
        //console.log("controlIndex " + arrayToString(Array.from(this.controlIndex.keys())));
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete((0, _xmlControlJs.Control).tagName + controlID);
            this.controlIndex.delete(controlID);
        }
    }
    /**
     * @returns The metadata list.
     */ getMetadataList() {
        let i = this.index.get((0, _xmlMetadataJs.MetadataList).tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param metadataList The metadata list.
     */ setMetadataList(metadataList) {
        let i = this.index.get((0, _xmlMetadataJs.MetadataList).tagName);
        if (i != undefined) this.nodes.set(i, metadataList);
        else {
            this.index.set((0, _xmlMetadataJs.MetadataList).tagName, this.nodes.size);
            this.addNode(metadataList);
        }
    }
    /**
     * @returns The analysis.
     */ getAnalysis() {
        let i = this.index.get((0, _xmlAnalysisJs.Analysis).tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param analysis The analysis.
     */ setAnalysis(analysis) {
        let i = this.index.get((0, _xmlAnalysisJs.Analysis).tagName);
        if (i != undefined) this.nodes.set(i, analysis);
        else {
            this.index.set((0, _xmlAnalysisJs.Analysis).tagName, this.nodes.size);
            this.addNode(analysis);
        }
    }
}
class Description extends (0, _xmlJs.StringNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:description";
    }
    /**
     * @param attributes The attributes.
     * @param description The description.
     */ constructor(attributes, description){
        super(attributes, Description.tagName, description);
    }
}
class T extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:T";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, T.tagName, value);
    }
}

},{"./xml_analysis.js":"1PdDF","./xml_conditions.js":"cZv1r","./xml_control.js":"fiNxW","./xml_metadata.js":"5YFPw","./xml_modelParameters.js":"gfUOc","./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1PdDF":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * In the XML, the "me:eigenvalue" element is a child of the "me:eigenvalueList" element.
 */ parcelHelpers.export(exports, "Eigenvalue", ()=>Eigenvalue);
/**
 * In the XML, the "me:eigenvalueList" element is a child of the "analysis" element.
 * Attributes include:
 * number
 * selection
 * Child nodes include:
 * me:eigenvalue
 */ parcelHelpers.export(exports, "EigenvalueList", ()=>EigenvalueList);
/**
 * In the XML, the "me:pop" element is a child of the "population" element.
 * Attributes include:
 * ref (A reference to the species (molecule).)
 */ parcelHelpers.export(exports, "Pop", ()=>Pop);
/**
 * In the XML, the "me:population" element is a child of the "populationList" element.
 * Attributes include:
 * time
 * logTime
 * Child elements include:
 * me:pop
 */ parcelHelpers.export(exports, "Population", ()=>Population);
/**
 * In the XML, the "me:populationList" element is a child of the "analysis" element.
 * Attributes include:
 * T (Temperature)
 * conc (Concentration)
 * Child elements include:
 * me:population
 */ parcelHelpers.export(exports, "PopulationList", ()=>PopulationList);
/**
 * In the XML, the "me:firstOrderLoss" element is a child of the "me:rateList" element.
 * Attributes include:
 * ref
 */ parcelHelpers.export(exports, "FirstOrderLoss", ()=>FirstOrderLoss);
/**
 * In the XML, the "me:firstOrderRate" element is a child of the "me:rateList" element.
 * Attributes include:
 * fromRef, toRef, reactionType
 */ parcelHelpers.export(exports, "FirstOrderRate", ()=>FirstOrderRate);
/**
 * In the XML, the "me:secondOrderRate" element is a child of the "me:rateList" element.
 * Attributes include:
 * fromRef, toRef, reactionType
 */ parcelHelpers.export(exports, "SecondOrderRate", ()=>SecondOrderRate);
/**
 * In the XML, the "me:rateList" element is a child of the "analysis" element.
 * Attributes include:
 * T, conc, bathGas, units
 * Child elements include:
 * me:firstOrderLoss
 * me:firstOrderRate
 */ parcelHelpers.export(exports, "RateList", ()=>RateList);
/**
 * In the XML, the "me:analysis" element is a child of the "me:mesmer" element.
 * Attributes include:
 * calculated
 * Child elements include:
 * me:description
 * And one or more sets of: 
 *  me:eigenvalueList
 *  me:populationList
 *  me:rateList
 */ parcelHelpers.export(exports, "Analysis", ()=>Analysis);
var _xmlMesmerJs = require("./xml_mesmer.js");
var _xmlJs = require("./xml.js");
class Eigenvalue extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'me:eigenvalue';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, Eigenvalue.tagName, value);
    }
}
class EigenvalueList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'me:eigenvalueList';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, eigenvalues){
        super(attributes, EigenvalueList.tagName);
        if (eigenvalues) eigenvalues.forEach((eigenvalue)=>{
            this.addNode(eigenvalue);
        });
    }
    /**
     * Add an eigenvalue.
     */ addEigenvalue(e) {
        this.addNode(e);
    }
}
class Pop extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'me:pop';
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, Pop.tagName, value);
    }
}
class Population extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'me:population';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, pops){
        super(attributes, Population.tagName);
    }
    /**
     * Add a pop.
     */ addPop(p) {
        this.addNode(p);
    }
}
class PopulationList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'me:populationList';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, populations){
        super(attributes, PopulationList.tagName);
        if (populations) populations.forEach((population)=>{
            this.addNode(population);
        });
    }
    /**
     * Add a population.
     */ addPopulation(p) {
        this.addNode(p);
    }
}
class FirstOrderLoss extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'me:firstOrderLoss';
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, FirstOrderLoss.tagName, value);
    }
}
class FirstOrderRate extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'me:firstOrderRate';
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, FirstOrderRate.tagName, value);
    }
}
class SecondOrderRate extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'me:secondOrderRate';
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, SecondOrderRate.tagName, value);
    }
}
class RateList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'me:rateList';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, firstOrderLosses, firstOrderRates, secondOrderRates){
        super(attributes, RateList.tagName);
        this.index = new Map();
        this.folIndex = new Map();
        if (firstOrderLosses) {
            let i = 0;
            firstOrderLosses.forEach((fol)=>{
                this.index.set(FirstOrderLoss.tagName + i.toString(), this.nodes.size);
                this.folIndex.set(this.folIndex.size, this.nodes.size);
                this.addNode(fol);
                i++;
            });
            this.fols = firstOrderLosses;
        } else this.fols = [];
        this.forIndex = new Map();
        if (firstOrderRates) {
            let i = 0;
            firstOrderRates.forEach((forr)=>{
                this.index.set(FirstOrderRate.tagName + i.toString(), this.nodes.size);
                this.forIndex.set(this.forIndex.size, this.nodes.size);
                this.addNode(forr);
                i++;
            });
            this.fors = firstOrderRates;
        } else this.fors = [];
        this.sorIndex = new Map();
        if (secondOrderRates) {
            let i = 0;
            secondOrderRates.forEach((sor)=>{
                this.index.set(SecondOrderRate.tagName + i.toString(), this.nodes.size);
                this.sorIndex.set(this.sorIndex.size, this.nodes.size);
                this.addNode(sor);
                i++;
            });
            this.sors = secondOrderRates;
        } else this.sors = [];
    }
    /**
     * Set temperature.
     * @param T The temperature.
     */ setTemperature(T) {
        this.attributes.set('T', T.toString());
    }
    /**
     * Set concentration.
     * @param conc The concentration.
     */ setConcentration(conc) {
        this.attributes.set('conc', conc.toString());
    }
    /**
     * Set bath gas.
     * @param bathGas The bath gas.
     */ setBathGas(bathGas) {
        this.attributes.set('bathGas', bathGas);
    }
    /**
     * Set units.
     * @param units The units.
     */ setUnits(units) {
        this.attributes.set('units', units);
    }
    /**
     * Add a first order loss.
     */ addFirstOrderLoss(f) {
        this.folIndex.set(this.folIndex.size, this.nodes.size);
        this.index.set(FirstOrderLoss.tagName + this.folIndex.size.toString(), this.nodes.size);
        this.fols.push(f);
        this.addNode(f);
    }
    /**
     * Add a first order rate.
     */ addFirstOrderRate(f) {
        this.forIndex.set(this.forIndex.size, this.nodes.size);
        this.index.set(FirstOrderRate.tagName + this.forIndex.size.toString(), this.nodes.size);
        this.fors.push(f);
        this.addNode(f);
    }
    /**
     * Add a second order rate.
     */ addSecondOrderRate(s) {
        this.sorIndex.set(this.sorIndex.size, this.nodes.size);
        this.index.set(SecondOrderRate.tagName + this.sorIndex.size.toString(), this.nodes.size);
        this.sors.push(s);
        this.addNode(s);
    }
}
class Analysis extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'me:analysis';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, description, els, pls, rls){
        super(attributes, RateList.tagName);
        this.index = new Map();
        if (description) {
            this.index.set((0, _xmlMesmerJs.Description).tagName, this.nodes.size);
            this.addNode(description);
        }
        this.elIndex = new Map();
        if (els) {
            els.forEach((el)=>{
                this.index.set(EigenvalueList.tagName, this.nodes.size);
                this.elIndex.set(this.elIndex.size, this.nodes.size);
                this.addNode(el);
            });
            this.els = els;
        } else this.els = [];
        this.plIndex = new Map();
        if (pls) {
            pls.forEach((pl)=>{
                this.index.set(PopulationList.tagName, this.nodes.size);
                this.plIndex.set(this.plIndex.size, this.nodes.size);
                this.addNode(pl);
            });
            this.pls = pls;
        } else this.pls = [];
        this.rlIndex = new Map();
        if (rls) {
            rls.forEach((rl)=>{
                this.index.set(RateList.tagName, this.nodes.size);
                this.rlIndex.set(this.rlIndex.size, this.nodes.size);
                this.addNode(rl);
            });
            this.rls = rls;
        } else this.rls = [];
    }
    /**
     * Get the description.
     */ getDescription() {
        if (this.index.has((0, _xmlMesmerJs.Description).tagName)) {
            let i = this.index.get((0, _xmlMesmerJs.Description).tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param description The description.
     */ setDescription(description) {
        if (this.index.has((0, _xmlMesmerJs.Description).tagName)) {
            let i = this.index.get((0, _xmlMesmerJs.Description).tagName);
            this.nodes.set(i, description);
        } else {
            this.index.set((0, _xmlMesmerJs.Description).tagName, this.nodes.size);
            this.addNode(description);
        }
    }
    /**
     * @param eigenvalueList The eigenvalue list.
     */ addEigenvalueList(eigenvalueList) {
        this.elIndex.set(this.elIndex.size, this.nodes.size);
        this.addNode(eigenvalueList);
        this.els.push(eigenvalueList);
    }
    /**
     * @param populationList The population list.
     */ addPopulationList(populationList) {
        this.plIndex.set(this.plIndex.size, this.nodes.size);
        this.addNode(populationList);
        this.pls.push(populationList);
    }
    /**
     * @param rateList The rate list.
     */ addRateList(rateList) {
        this.rlIndex.set(this.rlIndex.size, this.nodes.size);
        this.addNode(rateList);
        this.rls.push(rateList);
    }
}

},{"./xml_mesmer.js":"8G2m7","./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cZv1r":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A class for "me:bathGas".
 */ parcelHelpers.export(exports, "BathGas", ()=>BathGas);
/**
 * A class for "me:experimentalRate".
 * The attributes should include:
 * "ref1" string
 * "ref2" string
 * "refReaction" string
 * "error".
 */ parcelHelpers.export(exports, "ExperimentalRate", ()=>ExperimentalRate);
/**
 * A class for "me:experimentalYield".
 * The attributes should include:
 * "ref" string
 * "error" Big
 * "yieldTime" Big.
 */ parcelHelpers.export(exports, "ExperimentalYield", ()=>ExperimentalYield);
/**
 * A class for "me:experimentalEigenvalue".
 * The attributes should include:
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
 * P: Big
 * T: Big
 * And optionally:
 * percentExcessReactantConc: Big
 * excessReactantConc: string
 * precision: Big
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
var _bigJs = require("big.js");
var _bigJsDefault = parcelHelpers.interopDefault(_bigJs);
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
    /*
        if (!this.attributes.has(ExperimentalRate.s_ref1)) {
            console.error("ExperimentalRate.constructor: ref1 attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalRate.s_ref2)) {
            console.error("ExperimentalRate.constructor: ref2 attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalRate.s_refReaction)) {
            console.error("ExperimentalRate.constructor: refReaction attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalRate.s_error)) {
            console.error("ExperimentalRate.constructor: error attribute is missing.");
        }
        */ }
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
        return new (0, _bigJsDefault.default)(this.attributes.get(ExperimentalRate.s_error));
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
        return new (0, _bigJsDefault.default)(this.attributes.get(ExperimentalYield.s_error));
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
        return new (0, _bigJsDefault.default)(this.attributes.get(ExperimentalYield.s_yieldTime));
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
    /*
        if (!this.attributes.has(ExperimentalEigenvalue.s_EigenvalueID)) {
            console.error("ExperimentalEigenvalue.constructor: EigenvalueID attribute is missing.");
        }
        if (!this.attributes.has(ExperimentalEigenvalue.s_error)) {
            console.error("ExperimentalEigenvalue.constructor: error attribute is missing.");
        }
        */ }
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
        return new (0, _bigJsDefault.default)(this.attributes.get(ExperimentalEigenvalue.s_error));
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
        let p = this.attributes.get(PTpair.s_P);
        if (p !== undefined) return new (0, _bigJsDefault.default)(p);
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
        if (t !== undefined) return new (0, _bigJsDefault.default)(t);
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
            this.ptps = pTpairs;
        } else this.ptps = [];
    }
    /**
     * Get the PTpair at the given index.
     * 
     * @param i The index of the PTpair to return. 
     * @returns The PTpair at the given index or undefined if the index is out of range.
     */ get(i) {
        return this.ptps[i];
    }
    /**
     * Set the PTpair at the given index.
     * 
     * @param i The index.
     * @returns The PT pairs.
     */ set(i, pTpair) {
        this.nodes.set(i, pTpair);
        this.ptps[i] = pTpair;
    }
    /**
     * Add a PTpair.
     * 
     * @param pTPair The PTpair to add.
     * @returns The index of this.pTPairs where pTPair is added.
     */ add(pTpair) {
        this.addNode(pTpair);
        this.ptps.push(pTpair);
        return this.nodes.size - 1;
    }
    /**
     * Remove the PTpair at the given index.
     * 
     * @param i The index.
     */ remove(i) {
        this.nodes.delete(i);
        this.ptps.splice(i, 1);
    }
    /**
     * Initialise.
     * 
     * @param pTPair The PTpair to add.
     */ init(ptps) {
        this.clear();
        ptps.forEach((ptp)=>{
            this.addNode(ptp);
            this.ptps.push(ptp);
        });
    }
    /**
     * Clear.
     */ clear() {
        this.nodes.clear();
        this.ptps = [];
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
     */ constructor(attributes, id, bathGases, pTs){
        super(attributes, Conditions.tagName);
        this.id = id;
        this.index = new Map();
        this.bathGasesIndex = new Map();
        this.bathGases = new Map();
        if (bathGases != undefined) {
            this.index.set(BathGas.tagName, this.nodes.size);
            bathGases.forEach((bathGas)=>{
                this.bathGasesIndex.set(bathGas.value, this.nodes.size);
                this.addNode(bathGas);
                this.bathGases.set(bathGas, bathGases.size);
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
            let index = this.bathGases.size;
            this.bathGases.set(bathGas, index);
            this.bathGasesIndex.set(bathGas.value, this.nodes.size);
            this.addNode(bathGas);
            return index;
        } else return this.bathGases.get(bathGas);
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

},{"big.js":"91nMZ","./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fiNxW":[function(require,module,exports,__globalThis) {
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
 */ parcelHelpers.export(exports, "TestRateConstant", ()=>TestRateConstant);
/**
 * A class for "me:useTheSameCellNumberForAllConditions.
 */ parcelHelpers.export(exports, "UseTheSameCellNumberForAllConditions", ()=>UseTheSameCellNumberForAllConditions);
/**
 * A class for "me:ForceMacroDetailedBalance.
 */ parcelHelpers.export(exports, "ForceMacroDetailedBalance", ()=>ForceMacroDetailedBalance);
/**
 * A class for "me:hideInactive".
 */ parcelHelpers.export(exports, "HideInactive", ()=>HideInactive);
/**
 * A class for "me:calcMethod".
 * Expected to have an attribute "xsi_type" or "name" with one of the following values:
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
var _bigJs = require("big.js");
var _bigJsDefault = parcelHelpers.interopDefault(_bigJs);
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
    static{
        this.MarquardtDerivDeltaDefault = "1.e-03";
    }
    static{
        this.MarquardtTolerance = "1.e-03";
    }
    static{
        this.MarquardtLambda = "1.0";
    }
    static{
        this.MarquardtLambdaScale = "10.0";
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
        super(attributes, Tstep.tagName, value);
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
    static{
        this.s_Tmin = "Tmin";
    }
    static{
        this.s_Tmax = "Tmax";
    }
    static{
        this.s_Tstep = "Tstep";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, TestMicroRates.tagName);
        this.tMin = new (0, _bigJsDefault.default)(attributes.get(TestMicroRates.s_Tmin));
        this.tMax = new (0, _bigJsDefault.default)(attributes.get(TestMicroRates.s_Tmax));
        this.tStep = new (0, _bigJsDefault.default)(attributes.get(TestMicroRates.s_Tstep));
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
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) return this.nodes.get(i);
        return undefined;
    }
    /**
     * @param testRateConstant The testRateConstant.
     */ setTestRateConstants(testRateConstant) {
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) this.nodes.set(i, testRateConstant);
        else {
            this.index.set(TestRateConstant.tagName, this.nodes.size);
            this.addNode(testRateConstant);
        }
    }
    /**
     * Remove the testRateConstant.
     */ removeTestRateConstants() {
        let i = this.index.get(TestRateConstant.tagName);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(TestRateConstant.tagName);
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
     * @param maximumEvolutionTime The MaximumEvolutionTime.
     */ setMaximumEvolutionTime(maximumEvolutionTime) {
        let i = this.index.get(MaximumEvolutionTime.tagName);
        if (i != undefined) this.nodes.set(i, maximumEvolutionTime);
        else {
            this.index.set(MaximumEvolutionTime.tagName, this.nodes.size);
            this.addNode(maximumEvolutionTime);
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

},{"big.js":"91nMZ","./xml":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5YFPw":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Metadata.
 * In the XML, the "metadata" element is a child of the "metadataList" element.
 * For example:
 * <metadataList>
 *  <metadata name="dc:description" content="Experimental data for OH (Hydroxyl radical)"/>
 *  <metadata name="dc:source" content="http://cccbdb.nist.gov/"/>
 *  <metadata name="dc:contributor" content="Dr Reaction Kinetics"/>
 *  <metadata name="dc:date" content="20240311_090547"/>
 * </metadataList>
 */ parcelHelpers.export(exports, "Metadata", ()=>Metadata);
/**
 * DCTitle.
 * In the XML, the "dc:title" element is a child of the "metadataList" element.
 * For example:
 * <metadataList xmlns:dc="http://purl.org/dc/elements/1.1/">
 *  <dc:title>Title</dc:title>
 *  <dc:source>file.xml</dc:source>
 *  <dc:creator>Mesmer v7.0</dc:creator>
 *  <dc:date>20240311_090547</dc:date>
 *  <dc:contributor>Dr Reaction Kinetics</dc:contributor>
 * </metadataList>
 */ parcelHelpers.export(exports, "DCTitle", ()=>DCTitle);
/**
 * DC Source.
 */ parcelHelpers.export(exports, "DCSource", ()=>DCSource);
/**
 * DC Creator.
 */ parcelHelpers.export(exports, "DCCreator", ()=>DCCreator);
/**
 * DC Date.
 */ parcelHelpers.export(exports, "DCDate", ()=>DCDate);
/**
 * DC Contributor.
 */ parcelHelpers.export(exports, "DCContributor", ()=>DCContributor);
/**
 * In the XML, the "metadata" element is a child of the "mesmer" element.
 * Attributes include:
 * xmlns:dc
 * Child elements include:
 * dc:title
 * dc:source
 * dc:creator
 * dc:date
 * dc:contributor
 */ parcelHelpers.export(exports, "MetadataList", ()=>MetadataList);
var _xmlJs = require("./xml.js");
class Metadata extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'metadata';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, Metadata.tagName);
    }
    /**
     * Get string for label.
     */ getLabelText() {
        let label = '';
        this.attributes.forEach((value, key)=>{
            label += key + ': ' + value + ' ';
        });
        return label;
    }
}
class DCTitle extends (0, _xmlJs.StringNode) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'dc:title';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, DCTitle.tagName, value);
    }
}
class DCSource extends (0, _xmlJs.StringNode) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'dc:source';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, DCSource.tagName, value);
    }
}
class DCCreator extends (0, _xmlJs.StringNode) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'dc:creator';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, DCCreator.tagName, value);
    }
}
class DCDate extends (0, _xmlJs.StringNode) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'dc:date';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, DCDate.tagName, value);
    }
}
class DCContributor extends (0, _xmlJs.StringNode) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'dc:contributor';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, value){
        super(attributes, DCContributor.tagName, value);
    }
}
class MetadataList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * Tag name.
     */ this.tagName = 'metadataList';
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, title, source, creator, date, contributor){
        super(attributes, MetadataList.tagName);
        this.index = new Map();
        this.metadataIndex = new Map();
        if (title) {
            this.index.set(DCTitle.tagName, this.nodes.size);
            this.addNode(title);
        }
        if (source) {
            this.index.set(DCSource.tagName, this.nodes.size);
            this.addNode(source);
        }
        if (creator) {
            this.index.set(DCCreator.tagName, this.nodes.size);
            this.addNode(creator);
        }
        if (date) {
            this.index.set(DCDate.tagName, this.nodes.size);
            this.addNode(date);
        }
        if (contributor) {
            this.index.set(DCContributor.tagName, this.nodes.size);
            this.addNode(contributor);
        }
    }
    /**
     * Get the title.
     */ getTitle() {
        if (this.index.has(DCTitle.tagName)) {
            let i = this.index.get(DCTitle.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param title The title.
     */ setTitle(title) {
        if (this.index.has(DCTitle.tagName)) {
            let i = this.index.get(DCTitle.tagName);
            this.nodes.set(i, title);
        } else {
            this.index.set(DCTitle.tagName, this.nodes.size);
            this.addNode(title);
        }
    }
    /**
     * Get the source.
     */ getSource() {
        if (this.index.has(DCSource.tagName)) {
            let i = this.index.get(DCSource.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param source The source.
     */ setSource(source) {
        if (this.index.has(DCSource.tagName)) {
            let i = this.index.get(DCSource.tagName);
            this.nodes.set(i, source);
        } else {
            this.index.set(DCSource.tagName, this.nodes.size);
            this.addNode(source);
        }
    }
    /**
     * Get the creator.
     */ getCreator() {
        if (this.index.has(DCCreator.tagName)) {
            let i = this.index.get(DCCreator.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param creator The creator.
     */ setCreator(creator) {
        if (this.index.has(DCCreator.tagName)) {
            let i = this.index.get(DCCreator.tagName);
            this.nodes.set(i, creator);
        } else {
            this.index.set(DCCreator.tagName, this.nodes.size);
            this.addNode(creator);
        }
    }
    /**
     * Get the date.
     */ getDate() {
        if (this.index.has(DCDate.tagName)) {
            let i = this.index.get(DCDate.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param date The date.
     */ setDate(date) {
        if (this.index.has(DCDate.tagName)) {
            let i = this.index.get(DCDate.tagName);
            this.nodes.set(i, date);
        } else {
            this.index.set(DCDate.tagName, this.nodes.size);
            this.addNode(date);
        }
    }
    /**
     * Get the contributor.
     */ getContributor() {
        if (this.index.has(DCContributor.tagName)) {
            let i = this.index.get(DCContributor.tagName);
            return this.nodes.get(i);
        }
    }
    /**
     * @param contributor The contributor.
     */ setContributor(contributor) {
        if (this.index.has(DCContributor.tagName)) {
            let i = this.index.get(DCContributor.tagName);
            this.nodes.set(i, contributor);
        } else {
            this.index.set(DCContributor.tagName, this.nodes.size);
            this.addNode(contributor);
        }
    }
    /**
     * Add metadata.
     * @param metadata The metadata.
     */ addMetadata(metadata) {
        this.metadataIndex.set(this.metadataIndex.size, this.nodes.size);
        this.addNode(metadata);
    }
    /**
     * Get metadata.
     */ getMetadata() {
        let metadata = [];
        for(let i = 0; i < this.metadataIndex.size; i++){
            let j = this.metadataIndex.get(i);
            metadata.push(this.nodes.get(j));
        }
        return metadata;
    }
}

},{"./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gfUOc":[function(require,module,exports,__globalThis) {
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
     */ constructor(attributes, id, grainSize, automaticallySetMaxEne, energyAboveTheTopHill, maxTemperature){
        super(attributes, ModelParameters.tagName);
        this.id = id;
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
        console.log("getGrainSize");
        let i = this.index.get(GrainSize.tagName);
        if (i != undefined) return this.nodes.get(i);
        console.log("XgetGrainSize");
    }
    /**
     * @param grainSize The grain size.
     */ setGrainSize(grainSize) {
        console.log("setGrainSize");
        let i = this.index.get(GrainSize.tagName);
        if (i != undefined) this.nodes.set(i, grainSize);
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

},{"./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cg9tc":[function(require,module,exports,__globalThis) {
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
 * Atom attributes may include:
 * "elementType" - the element type of the atom. This should be a known element types.
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
 * This is for representing an unknown type of property that might be present in some loaded XML.
 */ parcelHelpers.export(exports, "PropertyScalarString", ()=>PropertyScalarString);
/**
 * In the XML, a "scalar" node has a "property" node parent.
 * The attributes may contain "units".
 */ parcelHelpers.export(exports, "PropertyScalarNumber", ()=>PropertyScalarNumber);
/**
 * In the XML, an "array" node has a "property" node parent.
 * The attributes may contain "units".
 * In the XML, an "array" node is a child of a "property" node.
 */ parcelHelpers.export(exports, "PropertyArray", ()=>PropertyArray);
/**
 * In the XML, a "matrix" node has a "property" node parent.
 * The attributes may contain:
 * "rows"
 * "matrixType" with known values [quareSymmetricLT].
 * "units" with known values [Hartree/Bohr2].
 * In the XML, an "array" node is a child of a "property" node.
 */ parcelHelpers.export(exports, "PropertyMatrix", ()=>PropertyMatrix);
/**
 * In the XML, a "property" node has a "propertyList" parent and has either a "scalar", "array", "matrix"
 * or other not yet implemented child node type).
 * So, the "property" nodes of a PropertyArray may be a "scalar", "array", or "matrix" type.
 * The attributes must contain "dictRef" which is a dictionary reference for a type of property.
 * The different kinds of "property" nodes are listed below from Table 1 of the Mesmer User Manual:
 * dictRef, value, units, Inserted from defaults.xml if absent
 * "me:ZPE", scalar, Mesmer.energyUnits, No
 * "me:Hf0", scalar, Mesmer.energyUnits, No
 * "me:HfAT0", scalar, Mesmer.energyUnits, No 
 * "me:Hf298", scalar, Mesmer.energyUnits, No
 * "me:rotConsts", array, Mesmer.frequencyUnits, No
 * "me:symmetryNumber", scalar, No units, Yes (1)
 * "me:TSOpticalSymmetryNumber", scalar, No units, Yes (1)
 * "me:frequenciesScaleFactor", scalar, No units, Yes (1.0)
 * "me:vibFreqs", array, cm-1, No
 * "me:MW", scalar, amu, No
 * "me:spinMultiplicity", scalar, No units, Yes (1)
 * "me:epsilon", scalar, K (fixed), Yes (50)
 * "me:sigma", scalar, Å (fixed), Yes (5)
 * "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2, No
 * "me:EinsteinAij", array, s-1 (fixed), No
 * "me:EinsteinBij", array, m3/J/s2 (fixed), No
 */ parcelHelpers.export(exports, "Property", ()=>Property);
/**
 * The Zero Potential Energy.
 * The child "scalar" node should have a "units" attribute (Mesmer.energyUnits).
 */ parcelHelpers.export(exports, "ZPE", ()=>ZPE);
/**
 * The Heat of Formation at 0K.
 * The child "scalar" node should have a "units" attribute (Mesmer.energyUnits).
 */ parcelHelpers.export(exports, "Hf0", ()=>Hf0);
/**
 * Is this different to Hf0?
 * The child "scalar" node should have a "units" attribute (Mesmer.energyUnits).
 */ parcelHelpers.export(exports, "HfAT0", ()=>HfAT0);
/**
 * The Heat of Formation at 298K.
 * The child "scalar" node should have a "units" attribute (Mesmer.energyUnits).
 */ parcelHelpers.export(exports, "Hf298", ()=>Hf298);
/**
 * The rotation constants.
 * The child "array" node should have a "units" attribute with options ["cm-1", "GHz", "amuA^2"]
 */ parcelHelpers.export(exports, "RotConsts", ()=>RotConsts);
/**
 * Rotational symmetry number.
 */ parcelHelpers.export(exports, "SymmetryNumber", ()=>SymmetryNumber);
/**
 * Transition state optical symmetry number.
 */ parcelHelpers.export(exports, "TSOpticalSymmetryNumber", ()=>TSOpticalSymmetryNumber);
/**
 * "me:frequenciesScaleFactor" property.
 */ parcelHelpers.export(exports, "FrequenciesScaleFactor", ()=>FrequenciesScaleFactor);
/**
 * The vibration frequencies.
 * The child "array" node should have a "units" attribute (known units=[cm-1]).
 */ parcelHelpers.export(exports, "VibFreqs", ()=>VibFreqs);
/**
 * The Molecular Weight.
 * The child "scalar" node should have a "units" attribute (known units=[amu]).
 */ parcelHelpers.export(exports, "MW", ()=>MW);
/**
 * The Spin Multiplicity.
 */ parcelHelpers.export(exports, "SpinMultiplicity", ()=>SpinMultiplicity);
/**
 * The Epsilon.
 * The child "scalar" node should have a "units" attribute K (fixed).
 */ parcelHelpers.export(exports, "Epsilon", ()=>Epsilon);
/**
 * The Sigma.
 * The child "scalar" node should have a "units" attribute Å (fixed).
 */ parcelHelpers.export(exports, "Sigma", ()=>Sigma);
/**
 * The Hessian.
 * The child "matrix" node should have a "units" attribute with options [kJ/mol/Å2, kcal/mol/Å2, Hartree/Å2]
 */ parcelHelpers.export(exports, "Hessian", ()=>Hessian);
/**
 * The Einstein Aij.
 * The child "array" node should have a "units" attribute s-1 (fixed).
 */ parcelHelpers.export(exports, "EinsteinAij", ()=>EinsteinAij);
/**
 * The Einstein Bij.
 * The child "array" node should have a "units" attribute m3/J/s2 (fixed).
 */ parcelHelpers.export(exports, "EinsteinBij", ()=>EinsteinBij);
/**
 * The electronic excitation.
 * The child "scalar" node should have a "units" attribute (Mesmer.frequencyUnits?).
 */ parcelHelpers.export(exports, "ElectronicExcitation", ()=>ElectronicExcitation);
/**
 * "me:imFreqs"
 */ parcelHelpers.export(exports, "ImFreqs", ()=>ImFreqs);
/**
 * In the XML, a "propertyList" node is a child node of a "molecule" node and has one or more "property" child node.
 * There can be no attributes.
 */ parcelHelpers.export(exports, "PropertyList", ()=>PropertyList);
/**
 * In the XML, a "me:deltaEDown" node is a child node of a "me:energyTransferModel" node.
 * The attributes may include:
 * "bathGas";
 * and other attributes of a RangeNode.
 */ parcelHelpers.export(exports, "DeltaEDown", ()=>DeltaEDown);
/**
 * In the XML, a "me:deltaEDown2" node is a child node of a "me:energyTransferModel" node.
 * The attributes may include:
 * "bathGas";
 * and other attributes of a RangeNode.
 */ parcelHelpers.export(exports, "DeltaEDown2", ()=>DeltaEDown2);
/**
 * In the XML, a "me:deltaEDownLinEne" node is a child node of a "me:energyTransferModel" node.
 * The attributes may include:
 * "referenceTemperature";
 * and other attributes of a RangeNode.
 */ parcelHelpers.export(exports, "DeltaEDownTExponent", ()=>DeltaEDownTExponent);
/**
 * In the XML, a "me:deltaEDownLinEne" node is a child node of a "me:energyTransferModel" node.
 */ parcelHelpers.export(exports, "DeltaEDownLinEne", ()=>DeltaEDownLinEne);
/**
 * In the XML, a "me:energyTransferModel" node is a child node of a "molecule" node.
 * The attributes are expected to include:
 * "xsi:type" with expected values ["me:ExponentialDown", "me:BiExponentialDown"].
 * It may have:
 * One or multiple child nodes of the following types:
 * "me:deltaEDown"
 * "me:deltaEDown2" (for "me:BiExponentialDown")
 * "me:deltaEDownTExponent"
 * "me:deltaEDownLinEne"
 * "me:deltaEDownTActivation"
 * Examples:
 * <moleculeList>
 *   <molecule id="Isomer1">
 *     <me:energyTransferModel xsi:type="me:ExponentialDown">
 *       <me:deltaEDown units="cm-1" lower="100" upper="400" stepsize="10">174</me:deltaEDown>
 *     </me:energyTransferModel>
 *   </molecule>
 *   <molecule id="Isomer2">
 *     <me:energyTransferModel xsi:type="me:ExponentialDown">
 *       <me:deltaEDown units="cm-1" derivedFrom="Isomer1:deltaEDown">174</me:deltaEDown>
 *     </me:energyTransferModel>
 *   </molecule>
 * </moleculeList>
 * <me:energyTransferModel xsi:type="me:ExponentialDown">
 *   <me:deltaEDown units="cm-1" lower="140.0" upper="220." stepsize="10.0">210.0</me:deltaEDown>
 *   <me:deltaEDownTExponent lower="0.0" upper="1.0" stepsize="0.01">0.6</me:deltaEDownTExponent>
 *   <me:deltaEDownLinEne lower="1.e-06" upper="1.0" stepsize="1.e-06">0.0006</me:deltaEDownLinEne>
 * </me:energyTransferModel>
 * <me:energyTransferModel xsi:type="me:ExponentialDown">
 *   <me:deltaEDown bathGas="Ar" units="cm-1" lower="20" upper="400" stepsize="10.0">47.9654</me:deltaEDown>
 *   <me:deltaEDownTExponent bathGas="Ar" referenceTemperature="298" lower="0" upper="2" stepsize="0.02" >1.37982</me:deltaEDownTExponent>
 *   <me:deltaEDownTActivation bathGas="Ar" units="K-1" lower="-1.0" upper="1.0" stepsize="1e-5" >-7.95961e-05 </me:deltaEDownTActivation>
 * </me:energyTransferModel>
 * <me:energyTransferModel xsi:type="me:BiExponentialDown">
 *  <me:deltaEDown units="cm-1">210.0</me:deltaEDown>
 *  <me:deltaEDown2 units="cm-1">500.0</me:deltaEDown2>
 *  <me:ratio>0.5</me:ratio>
 * </me:energyTransferModel>
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
 * In the XML, a "me:DistributionCalcMethod" node is a child node of a "molecule" node.
 * Attributes may include:
 * default (string)
 * name (string)
 */ parcelHelpers.export(exports, "DistributionCalcMethod", ()=>DistributionCalcMethod);
/**
 * For representing a "me:thermoValue"
 * T, H, S, G, Cp
 */ parcelHelpers.export(exports, "ThermoValue", ()=>ThermoValue);
/**
 * For representing a "me:thermoTable"
 * attributes:
 * unitsT="K" unitsH="kJ/mol" unitsS="J/mol/K" unitsG="kJ/mol" unitsCp="J/mol/K"
 */ parcelHelpers.export(exports, "ThermoTable", ()=>ThermoTable);
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
 * In the XML, a "me:qtot" node is a child node of a "me:densityOfStates" node.
 */ parcelHelpers.export(exports, "Qtot", ()=>Qtot);
/**
 * In the XML, a "me:sumc" node is a child node of a "me:densityOfStates" node.
 */ parcelHelpers.export(exports, "Sumc", ()=>Sumc);
/**
 * In the XML, a "me:sumg" node is a child node of a "me:densityOfStates" node.
 */ parcelHelpers.export(exports, "Sumg", ()=>Sumg);
/**
 * In the XML, a "me:densityOfStates" node is a child node of a "me:densityOfStatesList" node.
 * It is expected to contain the following child nodes:
 * me:t
 * me:qtot
 * me:sumc
 * me:sumg
 */ parcelHelpers.export(exports, "DensityOfStates", ()=>DensityOfStates);
/**
 * In the XML, a "me:densityOfStatesList" node is a child node of a "molecule" node.
 * It is expected to contain the following child nodes:
 * me:description
 * one or more "me:densityOfStates".
 * The attributes may include:
 * "calculated" which appears to be a date and time of calculation e.g. 20240311_090547.
 */ parcelHelpers.export(exports, "DensityOfStatesList", ()=>DensityOfStatesList);
/**
 * The attributes may include "units".
 * In the XML, a "me:States" node is a child node of a "molecule" node
 */ parcelHelpers.export(exports, "States", ()=>States);
/**
 * <me:State energy="0.0" degeneracy="4"/>
 * In the XML, a "me:State" node is a child node of a "me:States" node.
 */ parcelHelpers.export(exports, "State", ()=>State);
/**
 * The attributes may include "description" and "active" (and possibly others).
 * In the XML, a "molecule" node is a child node of a "moleculeList" node.
 */ parcelHelpers.export(exports, "Molecule", ()=>Molecule);
var _bigJs = require("big.js");
var _xmlRangeJs = require("./xml_range.js");
var _utilJs = require("./util.js");
var _xmlJs = require("./xml.js");
var _xmlMesmerJs = require("./xml_mesmer.js");
var _xmlMetadataJs = require("./xml_metadata.js");
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
     */ constructor(attributes, molecule){
        super(attributes, Atom.tagName);
        this.molecule = molecule;
    }
    /**
     * @returns True if the atom has coordinates.
     */ hasCoordinates() {
        if (this.attributes.get(Atom.s_x3) != undefined && this.attributes.get(Atom.s_y3) != undefined && this.attributes.get(Atom.s_z3) != undefined) return true;
        return false;
    }
    /**
     * @returns The id.
     */ getID() {
        return this.attributes.get(Atom.s_id);
    }
    /**
     * @param id The id.
     */ setID(id) {
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
     * @returns The x3 attribute value as a Big or undefined.
     */ getX3() {
        let x3 = this.attributes.get(Atom.s_x3);
        if (x3 != undefined) return new (0, _bigJs.Big)(x3);
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
     * @returns The y3 attribute value as a Big or undefined.
     */ getY3() {
        let y3 = this.attributes.get(Atom.s_y3);
        if (y3 != undefined) return new (0, _bigJs.Big)(y3);
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
     * @returns The z3 attribute value as a Big or undefined.
     */ getZ3() {
        let z3 = this.attributes.get(Atom.s_z3);
        if (z3 != undefined) return new (0, _bigJs.Big)(z3);
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
     */ addAtom(atom, aID) {
        //console.log('Adding atom...');
        if (aID == undefined) {
            let id = atom.getID();
            if (id == undefined) {
                id = this.getNextAtomID();
                atom.setID(id);
            } else if (this.atoms.has(id)) {
                let newID = this.getNextAtomID();
                console.warn('Atom with id ' + id + ' already exists, adding with id ' + newID);
                atom.setID(newID);
                id = newID;
            }
            aID = id;
        } else if (this.atoms.has(aID)) {
            //let newID: string = this.getNextAtomID();
            console.warn('Atom with id ' + aID + ' will be replaced');
            let i = this.index.get(aID);
            this.nodes.set(i, atom);
            this.atoms.set(aID, atom);
            return aID;
        }
        //console.log('Atom id: ' + id);
        this.index.set(aID, this.nodes.size);
        this.reverseIndex.set(this.nodes.size, aID);
        this.nodes.set(this.nodes.size, atom);
        this.atoms.set(aID, atom);
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
        */ return aID;
    }
    /**
     * @returns The atomId.
     */ getNextAtomID() {
        let i = 1;
        let id = "a" + i.toString();
        if (this.atoms.has(id)) while(this.atoms.has(id)){
            i++;
            id = "a" + i.toString();
        }
        return id;
    }
    /**
     * @param id The id of the atom to remove.
     */ removeAtom(id) {
        let i = this.index.get(id);
        if (i == undefined) throw new Error('Atom with id ' + id + ' does not exist!');
        console.log('Removing atom with id ' + id);
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
    static{
        /**
     * The order options.
     */ this.orderOptions = [
            "1",
            "1.5",
            "2",
            "2.5",
            "3",
            "3.5",
            "4",
            "4.5",
            "5",
            "5.5",
            "6"
        ];
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, molecule){
        super(attributes, Bond.tagName);
        this.molecule = molecule;
    }
    /**
     * @returns The atomRefs2.
     */ getAtomRefs2() {
        let atomRefs2 = this.attributes.get(Bond.s_atomRefs2);
        let atomRefs = atomRefs2?.split(" ") || [];
        if (atomRefs2 == undefined) return "a1 a1";
        return atomRefs2;
    }
    /**
     * @param atomRefs2 The atomRefs2 to set.
     */ setAtomRefs2(atomRefs2) {
        this.attributes.set(Bond.s_atomRefs2, atomRefs2);
    }
    /**
     * @returns The id.
     */ getID() {
        return this.attributes.get(Bond.s_id);
    }
    /**
     * @param id The id to set the attribute value referred to by "id".
     */ setID(id) {
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
     * @param bID The id of the bond to add if it already exists.
     * @returns The id of the bond.
     */ addBond(bond, bID) {
        if (bID == undefined) {
            let id = bond.getID();
            if (id == undefined) {
                id = this.getNextBondID();
                bond.setID(id);
            } else if (this.bonds.has(id)) {
                let newID = this.getNextBondID();
                console.log('Bond with id ' + id + ' already exists, adding with id ' + newID);
                bond.setID(newID);
                id = newID;
            }
            bID = id;
        } else if (this.bonds.has(bID)) {
            //let newID: string = this.getNextBondID();
            console.log('Bond with id ' + bID + ' will be replaced');
            let i = this.index.get(bID);
            this.nodes.set(i, bond);
            this.bonds.set(bID, bond);
            return bID;
        }
        //console.log('Bond id: ' + id);
        this.index.set(bID, this.nodes.size);
        this.reverseIndex.set(this.nodes.size, bID);
        this.nodes.set(this.nodes.size, bond);
        this.bonds.set(bID, bond);
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
        */ return bID;
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
        if (i == undefined) throw new Error('Bond with id ' + id + ' does not exist!');
        console.log('Removing bond with id ' + id);
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
class PropertyScalarString extends (0, _xmlJs.StringNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "scalar";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, PropertyScalarString.tagName, value);
    }
    /**
     * @returns The value.
     */ getValue() {
        return this.value;
    }
    /**
     * Sets the value.
     * @param val The value.
     */ setValue(val) {
        this.value = val;
    }
}
class PropertyScalarNumber extends (0, _xmlJs.NumberNode) {
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
    static{
        /**
     * The property dictionary references.
     */ this.propertyDictRefs = new Set([
            "me:ZPE",
            "me:Hf0",
            "me:HfAT0",
            "me:Hf298",
            "me:symmetryNumber",
            "me:TSOpticalSymmetryNumber",
            "me:frequenciesScaleFactor",
            "me:MW",
            "me:spinMultiplicity",
            "me:epsilon",
            "me:sigma"
        ]);
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, PropertyScalarNumber.tagName, value);
    }
    /**
     * This updates the units of the property. It does not do any unit conversion.
     * It simply updates the specified units of a property
     * @param units Updates the units of the property.
     */ updateUnits(units) {
        // Check the units are the same and if not replace the units...
        if (units) {
            let existingUnits = this.attributes.get(PropertyScalarNumber.s_units);
            if (existingUnits != undefined) {
                if (existingUnits != units) //console.log('Units are not the same, changing units...');
                this.attributes.set(PropertyScalarNumber.s_units, units);
            }
        }
    }
    /**
     * @returns The value.
     */ getValue() {
        return this.value;
    }
    /**
     * Sets the value.
     * @param val The value.
     */ setValue(val) {
        this.value = val;
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
    static{
        /**
     * The property dictionary references.
     */ this.propertyDictRefs = new Set([
            "me:rotConsts",
            "me:vibFreqs",
            "me:EinsteinAij",
            "me:EinsteinBij"
        ]);
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
                    console.log('Units changed from ' + existingUnits + ' to ' + units);
                }
            }
        }
    }
    /**
     * Sets the size of the array.
     * @param size The size of the array.
     */ setSize(size) {
        let values = [];
        for(let i = 0; i < size; i++)values.push(new (0, _bigJs.Big)(0));
        this.setValues(values);
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
    static{
        /**
     * The property dictionary references.
     */ this.propertyDictRefs = new Set([
            "me:hessian"
        ]);
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
                    console.log('Units changed from ' + existingUnits + ' to ' + units);
                }
            }
        }
    }
    /**
     * Sets the size of the array.
     * @param rows The number of rows in the matrix.
     * @param columns The number of columns in the matrix.
     */ setSize(rows, columns) {
        let values = [];
        for(let i = 0; i < rows; i++)for(let j = 0; j < columns; j++)values.push(new (0, _bigJs.Big)(0));
        this.setValues(values);
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
        if (dictRef == undefined) {
            // If there is no dictRef, then try setting this from the "title" attribute.
            let title = attributes.get("title");
            if (title == undefined) throw new Error(Property.s_dictRef + ' and title are undefined!');
            else {
                if (title == "MW") dictRef = "me:MW";
                else if (title == "Hf298") dictRef = "me:Hf298";
                else if (title == "Hf0") dictRef = "me:Hf0";
                else if (title == "program") dictRef = "program";
                else if (title == "basis") dictRef = "basis";
                else if (title == "method") dictRef = "method";
                else if (title == "File Format") dictRef = "File Format";
                else throw new Error('Title ' + title + 'not recognised!');
            }
        }
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
class Hf0 extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:Hf0";
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
class HfAT0 extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:HfAT0";
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
class Hf298 extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:Hf298";
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
class SymmetryNumber extends Property {
    static{
        /**
    * The dictionary reference.
    */ this.dictRef = "me:symmetryNumber";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class TSOpticalSymmetryNumber extends Property {
    static{
        /**
    * The dictionary reference.
    */ this.dictRef = "me:TSOpticalSymmetryNumber";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
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
class SpinMultiplicity extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:spinMultiplicity";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class Epsilon extends Property {
    static{
        /**
    * The dictionary reference.
    */ this.dictRef = "me:epsilon";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class Sigma extends Property {
    static{
        /**
    * The dictionary reference.
    */ this.dictRef = "me:sigma";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class Hessian extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:hessian";
    }
    static{
        /**
     * The units.
     */ this.unitOptions = [
            "kJ/mol/\xc52",
            "kcal/mol/\xc52",
            "Hartree/\xc52"
        ];
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class EinsteinAij extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:EinsteinAij";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class EinsteinBij extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:EinsteinBij";
    }
    /**
     * @param attributes The attributes.
     * @param property The property.
     */ constructor(attributes, property){
        super(attributes, property);
    }
}
class ElectronicExcitation extends Property {
    static{
        /**
     * The dictionary reference.
     */ this.dictRef = "me:electronicExcitation";
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
     * @returns The properties as a Map<string, Property> where each key is the dictRef of the Property value.
     */ getProperties() {
        let properties = new Map();
        this.nodes.forEach((node)=>{
            let p = node;
            properties.set(p.dictRef, p);
        });
        return properties;
    }
    /**
     * @param dictRef The dictRef of the property.
     * @returns The property.
     */ getProperty(dictRef) {
        let i = this.index.get(dictRef);
        if (i != undefined) return this.nodes.get(i);
        else //throw new Error('Property ' + dictRef + ' does not exist');
        return undefined;
    }
    /**
     * Set the property.
     * @param property The property.
     */ setProperty(property) {
        let i = this.index.get(property.dictRef);
        if (i == undefined) {
            console.log('Property ' + property.dictRef + ' does not exist, adding...');
            //console.log('property.toString() ' + property.toString());
            //console.log('property.getProperty().toString() ' + property.getProperty().toString());
            //console.log('mapToString(property.attributes) ' + mapToString(property.attributes));
            this.nodes.set(this.nodes.size, property);
            this.index.set(property.dictRef, this.nodes.size - 1);
        } else {
            console.log('Property ' + property.dictRef + ' already exists, updating...');
            this.nodes.set(i, property);
        }
    }
    /**
     * @param dictRef The dictRef of the property.
     */ removeProperty(dictRef) {
        let i = this.index.get(dictRef);
        if (i != undefined) {
            this.nodes.delete(i);
            this.index.delete(dictRef);
            let newIndex = new Map();
            this.index.forEach((value, key)=>{
                if (value > i) newIndex.set(key, value - 1);
                else newIndex.set(key, value);
            });
            this.index = newIndex;
        }
    }
}
class DeltaEDown extends (0, _xmlRangeJs.RangeNode) {
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
}
class DeltaEDown2 extends DeltaEDown {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDown2";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, value);
    }
}
class DeltaEDownTExponent extends (0, _xmlRangeJs.RangeNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDownTExponent";
    }
    static{
        /**
     * The referenceTemperature attribute key.
     */ this.s_referenceTemperature = "referenceTemperature";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, DeltaEDownTExponent.tagName, value);
    }
    /**
     * @returns The referenceTemperature.
     */ getReferenceTemperature() {
        return parseFloat((0, _utilJs.get)(this.attributes, DeltaEDownTExponent.s_referenceTemperature));
    }
    /**
     * @param referenceTemperature The referenceTemperature.
     */ setReferenceTemperature(referenceTemperature) {
        this.attributes.set(DeltaEDownTExponent.s_referenceTemperature, referenceTemperature.toString());
    }
}
class DeltaEDownLinEne extends (0, _xmlRangeJs.RangeNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:deltaEDownLinEne";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, DeltaEDownLinEne.tagName, value);
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
        if (index < 0 || index >= this.nodes.size) throw new Error('index out of range');
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
     * Add a DeltaEDown.
     * @param deltaEDown The DeltaEDown.
     * @returns The index of the DeltaEDown added.
     */ addDeltaEDown(deltaEDown) {
        this.nodes.set(this.nodes.size, deltaEDown);
        return this.nodes.size - 1;
    }
    /**
     * Remove a DeltaEDown.
     * @param index The index of the DeltaEDown to remove.
     */ removeDeltaEDown(index) {
        this.nodes.delete(index);
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
            "DefinedStatesRotors",
            "me:ClassicalRotors",
            "me:QMRotors",
            "me:DefinedStatesRotors"
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
            if (name == undefined) throw new Error('Neither xsi:type or name are defined.');
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
    }
    /**
     * @returns The angle.
     */ getAngle() {
        return this.attributes.get(PotentialPoint.s_angle);
    }
    /**
     * @param angle The angle of the PotentialPoint.
     */ setAngle(angle) {
        this.attributes.set(PotentialPoint.s_angle, angle.toString());
    }
    /**
     * @returns The potential.
     */ getPotential() {
        return this.attributes.get(PotentialPoint.s_potential);
    }
    /**
     * @param potential The potential of the PotentialPoint.
     */ setPotential(potential) {
        this.attributes.set(PotentialPoint.s_potential, potential.toString());
    }
}
class DistributionCalcMethod extends (0, _xmlJs.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:DistributionCalcMethod";
    }
    static{
        /**
     * The key for the default attribute.
     */ this.s_default = "default";
    }
    static{
        /**
     * The key for the name attribute.
     */ this.s_name = "name";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, DistributionCalcMethod.tagName);
    }
    /**
     * @returns The default.
     */ getDefault() {
        return this.attributes.get(DistributionCalcMethod.s_default);
    }
    /**
     * @param default The default.
     *
    setDefault(defaultValue: string): void {
        this.attributes.set(DistributionCalcMethod.s_default, defaultValue);
    }
    */ /**
     * @returns The name.
     */ getName() {
        return this.attributes.get(DistributionCalcMethod.s_name);
    }
}
class ThermoValue extends (0, _xmlJs.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:thermoValue";
    }
    static{
        /**
     * The key for the T attribute.
     */ this.s_T = "T";
    }
    static{
        /**
     * The key for the H attribute.
     */ this.s_H = "H";
    }
    static{
        /**
     * The key for the S attribute.
     */ this.s_S = "S";
    }
    static{
        /**
     * The key for the G attribute.
     */ this.s_G = "G";
    }
    static{
        /**
     * The key for the Cp attribute.
     */ this.s_Cp = "Cp";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, Atom.tagName);
    }
    /**
     * @returns The temperature.
     */ getT() {
        return new (0, _bigJs.Big)(this.attributes.get(ThermoValue.s_T));
    }
    /**
     * @param T The temperature.
     *
    setT(T: Big): void {
        this.attributes.set(ThermoValue.s_T, T.toString());
    }

    /**
     * @returns The enthalpy.
     */ getH() {
        return new (0, _bigJs.Big)(this.attributes.get(ThermoValue.s_H));
    }
    /**
     * @param H The enthalpy.
     *
    setH(H: Big): void {
        this.attributes.set(ThermoValue.s_H, H.toString());
    }

    /**
     * @returns The entropy.
     */ getS() {
        return new (0, _bigJs.Big)(this.attributes.get(ThermoValue.s_S));
    }
    /**
     * @param S The entropy.
     *
    setS(S: Big): void {
        this.attributes.set(ThermoValue.s_S, S.toString());
    }

    /**
     * @returns The Gibbs free energy.
     */ getG() {
        return new (0, _bigJs.Big)(this.attributes.get(ThermoValue.s_G));
    }
    /**
     * @param G The Gibbs free energy.
     *
    setG(G: Big): void {
        this.attributes.set(ThermoValue.s_G, G.toString());
    }

    /**
     * @returns The heat capacity.
     */ getCp() {
        return new (0, _bigJs.Big)(this.attributes.get(ThermoValue.s_Cp));
    }
    /**
     * @param Cp The heat capacity.
     *
    setCp(Cp: Big): void {
        this.attributes.set(ThermoValue.s_Cp, Cp.toString());
    }

    /**
     * @returns The ThermoValue as a string array.
     */ toStringArray() {
        return [
            this.getT().toString(),
            this.getH().toString(),
            this.getS().toString(),
            this.getG().toString(),
            this.getCp().toString()
        ];
    }
    /**
     * @returns The ThermoValue as a CSV string.
     */ toCSV() {
        //console.log(this.toStringArray());
        //console.log(this.toStringArray().join(","));
        return this.toStringArray().join(",");
    }
}
class ThermoTable extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:thermoTable";
    }
    static{
        /**
     * The key for the unitsT attribute.
     */ this.s_unitsT = "unitsT";
    }
    static{
        /**
     * The key for the unitsH attribute.
     */ this.s_unitsH = "unitsH";
    }
    static{
        /**
     * The key for the unitsS attribute.
     */ this.s_unitsS = "unitsS";
    }
    static{
        /**
     * The key for the unitsG attribute.
     */ this.s_unitsG = "unitsG";
    }
    static{
        /**
     * The key for the unitsCp attribute.
     */ this.s_unitsCp = "unitsCp";
    }
    /**
     * @param attributes The attributes.
     * @param tvs The ThermoValue array.
     */ constructor(attributes, tvs){
        super(attributes, ThermoTable.tagName);
        if (tvs != undefined) {
            tvs.forEach((tv)=>{
                this.addNode(tv);
            });
            this.tvs = tvs;
        } else this.tvs = [];
    }
    /**
     * Retrieves a ThermoValue from the tvs array at a specific index.
     * 
     * @param i The index of the ThermoValue to return. 
     * @returns The ThermoValue at the given index.
     * @throws IndexError if i is out of the bounds of the tvs array.
     * @throws TypeError if tvs is null or undefined.
     */ get(i) {
        return this.tvs[i];
    }
    /**
     * Set the ThermoValue in t.
     * 
     * @param i The index of the ThermoValue to set.
     * @returns The PT pairs.
     */ set(i, tv) {
        this.nodes.set(i, tv);
        this.tvs[i] = tv;
    }
    /**
     * Add a ThermoValue.
     * 
     * @param tv The ThermoValue to add.
     * @returns The index of this.pTPairs where pTPair is added.
     */ add(tv) {
        this.addNode(tv);
        this.tvs.push(tv);
        return this.nodes.size - 1;
    }
    /**
     * Remove the ThermoValue at the given index.
     * 
     * @param i The index.
     */ remove(i) {
        this.nodes.delete(i);
        this.tvs.splice(i, 1);
    }
    /**
     * Initialise tvs.
     * 
     * @param tvs The tvs to be set.
     */ init(tvs) {
        this.clear();
        tvs.forEach((tv)=>{
            this.addNode(tv);
            this.tvs.push(tv);
        });
    }
    /**
     * Clear.
     */ clear() {
        this.nodes.clear();
        this.tvs = [];
    }
    /**
     * @returns The ThermoTable header as a string array.
     */ getHeader() {
        return [
            "T (" + this.attributes.get(ThermoTable.s_unitsT) + ")",
            "H(T)-H(0) (" + this.attributes.get(ThermoTable.s_unitsH) + ")",
            "S(T) (" + this.attributes.get(ThermoTable.s_unitsS) + ")",
            "G(T) (" + this.attributes.get(ThermoTable.s_unitsG) + ")",
            "Cp(T) (" + this.attributes.get(ThermoTable.s_unitsCp) + ")"
        ];
    }
    /**
     * @returns The ThermoTable as a CSV string.
     */ toCSV() {
        let csv = this.getHeader().join(",") + "\n";
        this.tvs.forEach((tv)=>{
            csv += tv.toCSV() + "\n";
        });
        return csv;
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
        if (format == undefined) throw new Error(HinderedRotorPotential.s_format + ' is undefined!');
        this.format = format;
        let units = attributes.get(HinderedRotorPotential.s_units);
        if (units == undefined) throw new Error(HinderedRotorPotential.s_units + ' is undefined!');
        this.units = units;
        if (potentialPoints != undefined) potentialPoints.forEach((p)=>{
            this.nodes.set(this.nodes.size, p);
        });
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
        return this.attributes.get(HinderedRotorPotential.s_expansionSize);
    }
    /**
     * @param expansionSize The expansionSize of the HinderedRotorPotential.
     */ setExpansionSize(expansionSize) {
        console.log(expansionSize.toString());
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
class Qtot extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:qtot";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, Qtot.tagName, value);
    }
}
class Sumc extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sumc";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, Sumc.tagName, value);
    }
}
class Sumg extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:sumg";
    }
    /**
     * @param attributes The attributes.
     * @param value The value.
     */ constructor(attributes, value){
        super(attributes, Sumg.tagName, value);
    }
}
class DensityOfStates extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:densityOfStates";
    }
    static{
        /**
     * The header.
     */ this.header = [
            (0, _xmlMesmerJs.T).tagName,
            Qtot.tagName,
            Sumc.tagName,
            Sumg.tagName
        ];
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes){
        super(attributes, DensityOfStates.tagName);
        this.index = new Map();
    }
    /**
     * @returns The T.
     */ getT() {
        let i = this.index.get((0, _xmlMesmerJs.T).tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the T.
     * @param T The T.
     */ setT(T) {
        let i = this.index.get(T.tagName);
        if (i != undefined) this.nodes.set(i, T);
        else {
            this.nodes.set(this.nodes.size, T);
            this.index.set(T.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The Qtot.
     */ getQtot() {
        let i = this.index.get(Qtot.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the Qtot.
     * @param Qtot The Qtot.
     */ setQtot(Qtot) {
        let i = this.index.get(Qtot.tagName);
        if (i != undefined) this.nodes.set(i, Qtot);
        else {
            this.nodes.set(this.nodes.size, Qtot);
            this.index.set(Qtot.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The Sumc.
     */ getSumc() {
        let i = this.index.get(Sumc.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the Sumc.
     * @param Sumc The Sumc.
     */ setSumc(Sumc) {
        let i = this.index.get(Sumc.tagName);
        if (i != undefined) this.nodes.set(i, Sumc);
        else {
            this.nodes.set(this.nodes.size, Sumc);
            this.index.set(Sumc.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The Sumg.
     */ getSumg() {
        let i = this.index.get(Sumg.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the Sumg.
     * @param Sumg The Sumg.
     */ setSumg(Sumg) {
        let i = this.index.get(Sumg.tagName);
        if (i != undefined) this.nodes.set(i, Sumg);
        else {
            this.nodes.set(this.nodes.size, Sumg);
            this.index.set(Sumg.tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The density of states as a string array.
     */ toStringArray() {
        return [
            this.getT().value.toString(),
            this.getQtot().value.toString(),
            this.getSumc().value.toString(),
            this.getSumg().value.toString()
        ];
    }
}
class DensityOfStatesList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
    * The tag name.
    */ this.tagName = "me:densityOfStatesList";
    }
    /**
     * @param attributes The attributes.
     * @param description The description.
     * @param densityOfStates The densityOfStates.
     */ constructor(attributes, description, densityOfStates){
        super(attributes, DensityOfStatesList.tagName);
        this.index = new Map();
        this.dosIndex = new Map();
        if (description) {
            this.nodes.set(this.nodes.size, description);
            this.index.set((0, _xmlMesmerJs.Description).tagName, this.nodes.size - 1);
        }
        if (densityOfStates) {
            let i = 0;
            densityOfStates.forEach((dos)=>{
                this.dosIndex.set(i, this.nodes.size);
                this.nodes.set(this.nodes.size, dos);
                i++;
            });
        }
    }
    /**
     * @returns The description.
     */ getDescription() {
        let i = this.index.get((0, _xmlMesmerJs.Description).tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the description.
     * @param description The description.
     */ setDescription(description) {
        let i = this.index.get((0, _xmlMesmerJs.Description).tagName);
        if (i != undefined) this.nodes.set(i, description);
        else {
            this.nodes.set(this.nodes.size, description);
            this.index.set((0, _xmlMesmerJs.Description).tagName, this.nodes.size - 1);
        }
    }
    /**
     * @returns The density of states at the given index.
     */ getDensityOfStates(i) {
        let j = this.dosIndex.get(i);
        if (j != undefined) return this.nodes.get(j);
    }
    /**
     * Set the density of states at the given index.
     * @param i The index.
     * @param dos The density of states.
     */ setDensityOfStates(i, dos) {
        let j = this.dosIndex.get(i);
        if (j != undefined) this.nodes.set(j, dos);
        else {
            this.nodes.set(this.nodes.size, dos);
            this.dosIndex.set(i, this.nodes.size - 1);
        }
    }
    /**
     * Add the density of states.
     * @param dos The density of states.
     * @returns The index of the density of states added.
     */ addDensityOfStates(dos) {
        this.nodes.set(this.nodes.size, dos);
        let i = this.nodes.size - 1;
        this.dosIndex.set(i, this.nodes.size - 1);
        return i;
    }
    /**
     * Remove the density of states at the given index.
     * @param i The index.
     */ removeDensityOfStates(i) {
        let j = this.dosIndex.get(i);
        if (j != undefined) this.nodes.delete(j);
    }
    /**
     * @returns The density of states list as a CSV string.
     */ toCSV() {
        let csv = "";
        let header = DensityOfStates.header;
        csv += header.join(",") + "\n";
        this.nodes.forEach((dos)=>{
            csv += dos.toStringArray().join(",") + "\n";
        });
        return csv;
    }
}
class States extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:States";
    }
    /**
     * @param attributes The attributes.
     */ constructor(attributes, states){
        super(attributes, States.tagName);
        this.index = new Map();
        if (states) {
            let i = 0;
            states.forEach((state)=>{
                this.nodes.set(this.nodes.size, state); // Add the state to the nodes.
                this.index.set(state.id, i); // Add the index of the state to the index.
                i++;
            });
        }
    }
    /**
     * @returns The next id.
     */ getNextId() {
        let i = 0;
        while(this.index.has(i))i++;
        return i;
    }
    /**
     * @returns The states.
     */ getStates() {
        let states = [];
        this.nodes.forEach((node)=>{
            states.push(node);
        });
        return states;
    }
    /**
     * @param id The id of the state.
     * @returns The state at the given index.
     */ getState(id) {
        return this.nodes.get(this.index.get(id));
    }
    /**
     * Set the state at the given index.
     * @param i The index.
     * @param state The state.
     */ setState(i, state) {
        this.nodes.set(this.index.get(state.id), state);
    }
    /**
     * Add the state.
     * @param state The state.
     * @returns The index of the state added.
     */ addState(state) {
        let i;
        if (this.index.has(state.id)) {
            // A state with this id already exists, replace it.
            i = this.index.get(state.id);
            this.nodes.set(i, state);
        } else {
            // Add the state to the nodes.
            i = this.nodes.size;
            this.index.set(state.id, i);
            this.nodes.set(i, state);
        }
        return this.nodes.size - 1;
    }
    /**
     * Remove the state at the given index.
     * @param id The id of the state to remove.
     */ removeState(id) {
        console.log("Removing state with id " + id);
        let i = this.index.get(id);
        console.log("Removing state at index " + i);
        this.nodes.delete(i);
    }
}
class State extends (0, _xmlJs.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:State";
    }
    static{
        /**
     * The key for the energy attribute value.
     */ this.s_energy = "energy";
    }
    static{
        /**
     * The key for the degeneracy attribute value.
     */ this.s_degeneracy = "degeneracy";
    }
    /**
     * @param attributes The attributes.
     * @param id The index.
     */ constructor(attributes, id){
        super(attributes, State.tagName);
        this.id = id;
    }
    /**
     * @returns The energy of the state.
     */ getEnergy() {
        return new (0, _bigJs.Big)(this.attributes.get(State.s_energy));
    }
    /**
     * @param energy The energy of the state.
     */ setEnergy(energy) {
        this.attributes.set(State.s_energy, energy.toString());
    }
    /**
     * Remove the energy attribute. 
     */ removeEnergy() {
        this.attributes.delete(State.s_energy);
    }
    /**
     * @returns The degeneracy of the state.
     */ getDegeneracy() {
        return new (0, _bigJs.Big)(this.attributes.get(State.s_degeneracy));
    }
    /**
     * @param degeneracy The degeneracy of the state.
     */ setDegeneracy(degeneracy) {
        this.attributes.set(State.s_degeneracy, degeneracy.toString());
    }
    /**
     * Remove the degeneracy attribute. 
     */ removeDegeneracy() {
        this.attributes.delete(State.s_degeneracy);
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
     * This is either just the attribute id, or a composite of the attribute id and the molecule id.
     */ //label: string;
    /**
     * Create a molecule.
     * @param attributes The attributes. This will also include an "id".
     * Additional attributes may include: "description" and "active" (and possibly others), but these do not exist for all molecules.
     * @param id The molecule ID which is to be unique.
     * @param metadataList The metadata list.
     * @param atoms The atom or atoms.
     * @param bonds The bonds.
     * @param properties The properties.
     * @param energyTransferModel The energy transfer model.
     * @param dOSCMethod The method for calculating density of states.
     * @param extraDOSCMethods The extra DOSC methods for calculating density of states.
     * @param reservoirSize The reservoir size.
     * @param tt The thermo table.
     */ constructor(attributes, id, metadataList, atoms, bonds, properties, energyTransferModel, dOSCMethod, distributionCalcMethod, extraDOSCMethods, reservoirSize, tt, states){
        super(attributes, Molecule.tagName);
        //this.label = this.getID();
        this.index = new Map();
        this.edmindex = new Map();
        this.id = id;
        let i = 0;
        // MetadataList
        if (metadataList) {
            this.nodes.set(i, metadataList);
            this.index.set((0, _xmlMetadataJs.MetadataList).tagName, i);
            i++;
        }
        // Atoms
        if (atoms) {
            this.nodes.set(i, atoms);
            this.index.set(AtomArray.tagName, i);
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
            i++;
        }
        // DistributionCalcMethod
        if (distributionCalcMethod) {
            this.nodes.set(i, distributionCalcMethod);
            this.index.set(DistributionCalcMethod.tagName, i);
            i++;
        }
        // ExtraDOSCMethod
        if (extraDOSCMethods) extraDOSCMethods.forEach((edm)=>{
            this.nodes.set(i, edm);
            this.edmindex.set(i, i);
            i++;
        });
        // ReservoirSize
        if (reservoirSize) {
            this.nodes.set(i, reservoirSize);
            this.index.set(ReservoirSize.tagName, i);
            i++;
        }
        // ThermoTable
        if (tt) {
            this.nodes.set(i, tt);
            this.index.set(ThermoTable.tagName, i);
        }
        // States
        if (states) {
            this.nodes.set(i, states);
            this.index.set(States.tagName, i);
        }
    }
    /**
     * @returns The id of the molecule.
     */ getLabel() {
        //return this.getID() + " " + this.id.toString();
        return this.getID();
    }
    /**
     * @returns The id of the molecule.
     */ getID() {
        return this.attributes.get(Molecule.s_id);
    }
    /**
     * @param id The id of the molecule.
     */ setID(id) {
        this.attributes.set(Molecule.s_id, id);
    }
    /**
     * Get the description or the id of the molecule.
     * @returns The description of the molecule, or the id if it is not set.
     */ getDescription() {
        let description = this.attributes.get(Molecule.s_description);
        if (description != undefined) return description;
        return this.getID();
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
     * @returns The metadata list of the molecule.
     */ getMetadataList() {
        let i = this.index.get((0, _xmlMetadataJs.MetadataList).tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the metadata list.
     * @param metadataList The metadata list.
     */ setMetadataList(metadataList) {
        let i = this.index.get((0, _xmlMetadataJs.MetadataList).tagName);
        if (i == undefined) {
            this.index.set((0, _xmlMetadataJs.MetadataList).tagName, this.nodes.size);
            this.addNode(metadataList);
        } else this.nodes.set(i, metadataList);
    }
    /**
     * @returns The properties of the molecule.
     */ getPropertyList() {
        let i = this.index.get(PropertyList.tagName);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * @param properties The properties.
     */ setPropertyList(properties) {
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
        let pl = this.getPropertyList();
        if (pl != undefined) return pl.getProperty(dictRef);
    }
    /**
     * Set the property.
     * @param p The property.
     *
    setProperty(p: Property): void {
        console.log("setProperty " + p.toString() + " in Molecule.");
        this.getPropertyList()!.setProperty(p);
    }*/ /**
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
     * @returns The distribution calculation method of the molecule.
     */ getDistributionCalcMethod() {
        let i = this.index.get(DistributionCalcMethod.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the distribution calculation method.
     * @param distributionCalcMethod The distribution calculation method.
     */ setDistributionCalcMethod(distributionCalcMethod) {
        let i = this.index.get(DistributionCalcMethod.tagName);
        if (i == undefined) {
            this.index.set(DistributionCalcMethod.tagName, this.nodes.size);
            this.addNode(distributionCalcMethod);
        } else this.nodes.set(i, distributionCalcMethod);
    }
    /**
     * @returns The extra DOSC method of the molecule.
     */ getExtraDOSCMethod(index) {
        let i = this.edmindex.get(index);
        if (i != undefined) return this.nodes.get(i);
    }
    /**
     * Set the extra DOSC method.
     * @param extraDOSCMethod The extra DOSC method.
     */ setExtraDOSCMethod(index, extraDOSCMethod) {
        let i = this.edmindex.get(index);
        if (i == undefined) {
            this.edmindex.set(index, this.nodes.size);
            this.nodes.set(this.nodes.size, extraDOSCMethod);
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
     * @returns The density of states list of the molecule.
     */ getDensityOfStatesList() {
        let i = this.index.get(DensityOfStatesList.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the density of states list.
     * @param densityOfStatesList The density of states list.
     */ setDensityOfStatesList(densityOfStatesList) {
        let i = this.index.get(DensityOfStatesList.tagName);
        if (i == undefined) {
            this.index.set(DensityOfStatesList.tagName, this.nodes.size);
            this.addNode(densityOfStatesList);
        } else this.nodes.set(i, densityOfStatesList);
    }
    /**
     * @returns The thermo table of the molecule.
     */ getThermoTable() {
        let i = this.index.get(ThermoTable.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the thermo table.
     * @param tt The thermo table.
     */ setThermoTable(tt) {
        let i = this.index.get(ThermoTable.tagName);
        if (i == undefined) {
            this.index.set(ThermoTable.tagName, this.nodes.size);
            this.addNode(tt);
        } else this.nodes.set(i, tt);
    }
    /**
     * @returns The states of the molecule.
     */ getStates() {
        let i = this.index.get(States.tagName);
        if (i == undefined) return undefined;
        else return this.nodes.get(i);
    }
    /**
     * Set the states.
     * @param states The states.
     */ setStates(states) {
        let i = this.index.get(States.tagName);
        if (i == undefined) {
            this.index.set(States.tagName, this.nodes.size);
            this.addNode(states);
        } else this.nodes.set(i, states);
    }
    /**
     * Get the ZPE value of the molecule.
     */ getEnergy() {
        let p;
        p = this.getProperty(ZPE.dictRef);
        if (p == undefined) {
            p = this.getProperty(Hf0.dictRef);
            if (p == undefined) {
                p = this.getProperty(HfAT0.dictRef);
                if (p == undefined) {
                    p = this.getProperty(Hf298.dictRef);
                    if (p == undefined) return (0, _bigJs.Big)(0);
                }
            }
        }
        return p.getProperty().value;
    }
}

},{"big.js":"91nMZ","./xml_range.js":"bO3BS","./util.js":"f0Rnl","./xml.js":"7znDa","./xml_mesmer.js":"8G2m7","./xml_metadata.js":"5YFPw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bO3BS":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * An abstract class for a range.
 * The attributes may include:
 * "units"
 * "lower"
 * "upper"
 * "stepsize"
 */ parcelHelpers.export(exports, "RangeNode", ()=>RangeNode);
var _bigJs = require("big.js");
var _xml = require("./xml");
class RangeNode extends (0, _xml.NumberNode) {
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
     * @param tagName The tag name.
     * @param value The value.
     */ constructor(attributes, tagName, value){
        super(attributes, tagName, value);
    }
    /**
     * @param value The value of the Range.
     */ setValue(value) {
        this.value = value;
    }
    /**
     * @returns The units of the Range.
     */ getUnits() {
        return this.attributes.get(RangeNode.s_units);
    }
    /**
     * @param units The units of the Range.
     */ setUnits(units) {
        this.attributes.set(RangeNode.s_units, units);
    }
    /**
     * Remove the units attribute.
     */ removeUnits() {
        this.attributes.delete(RangeNode.s_units);
    }
    /**
     * @returns The lower of the Range.
     */ getLower() {
        let lower = this.attributes.get(RangeNode.s_lower);
        if (lower != undefined) return new (0, _bigJs.Big)(lower);
    }
    /**
     * @param lower The lower of the Range.
     */ setLower(lower) {
        this.attributes.set(RangeNode.s_lower, lower.toString());
    }
    /**
     * Remove the lower attribute.
     */ removeLower() {
        this.attributes.delete(RangeNode.s_lower);
    }
    /**
     * @returns The upper of the Range.
     */ getUpper() {
        let upper = this.attributes.get(RangeNode.s_upper);
        if (upper != undefined) return new (0, _bigJs.Big)(upper);
    }
    /**
     * @param upper The upper of the Range.
     */ setUpper(upper) {
        this.attributes.set(RangeNode.s_upper, upper.toString());
    }
    /**
     * Remove the upper attribute.
     */ removeUpper() {
        this.attributes.delete(RangeNode.s_upper);
    }
    /**
     * @returns The stepsize of the Range.
     */ getStepsize() {
        let stepsize = this.attributes.get(RangeNode.s_stepsize);
        if (stepsize != undefined) return new (0, _bigJs.Big)(stepsize);
    }
    /**
     * @param stepsize The stepsize of the Range.
     */ setStepsize(stepsize) {
        this.attributes.set(RangeNode.s_stepsize, stepsize.toString());
    }
    /**
     * Remove the stepsize attribute.
     */ removeStepsize() {
        this.attributes.delete(RangeNode.s_stepsize);
    }
}

},{"big.js":"91nMZ","./xml":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"66Fjc":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Create an add molecule button.
 * @param mlDiv The MoleculeList HTMLDivElement.
 * @param mIDM The IDManager for molecule divs.
 * @param molecules The molecules map.
 * @returns The add molecule button.
 */ parcelHelpers.export(exports, "getAddMoleculeButton", ()=>getAddMoleculeButton);
/**
 * Initialises the properties for a molecule.
 * @param deslect If true the button is clicked and the property removed.
 * @param m The molecule.
 * @param plDiv The PropertyList HTMLDivElement.
 * @param pl The PropertyList.
 */ parcelHelpers.export(exports, "initialiseProperties", ()=>initialiseProperties);
/**
 * 
 * @param p The property.
 * @param ps The property scalar number.
 */ parcelHelpers.export(exports, "setPropertyScalarNumber", ()=>setPropertyScalarNumber);
/**
 * Asks the user for the size and initialises values. 
 * @param dictRef The dictRef.
 * @param values The values to be initialised.
 */ parcelHelpers.export(exports, "setValues", ()=>setValues);
/**
 * 
 * @param p The property.
 * @param paom The property array.
 */ parcelHelpers.export(exports, "setPropertyArrayOrMatrix", ()=>setPropertyArrayOrMatrix);
/**
 * Create an add from library button.
 * @param mlDiv The MoleculeList HTMLDivElement.
 * @param amb The add molecule button.
 * @param molecules The molecules map.
 * @returns The add from library button.
 */ parcelHelpers.export(exports, "getAddFromLibraryButton", ()=>getAddFromLibraryButton);
/**
 * For setting the molecule ID.
 * 
 * @param ask If true, the user is prompted to enter the molecule ID. If false, the molecule ID is set to the mid parameter 
 * which must not be undefined.
 * @param mid The initial molecule ID before checks.
 * @param molecule The molecule to set the ID for.
 * @param molecules The molecules map.
 * @returns The molecule ID set.
 */ parcelHelpers.export(exports, "setMoleculeID", ()=>setMoleculeID);
/**
 * Parse XML and create HTMLDivElement for molecules.
 * @param xml The XML.
 * @returns The HTMLDivElement.
 */ parcelHelpers.export(exports, "processMoleculeList", ()=>processMoleculeList);
/**
 * @param pl The PropertyList.
 * @param xml The xml element.
 * @param plDiv The PropertyList div.
 * @param molecule The molecule.
 * @param boundary The boundary.
 * @param level The level.
 */ parcelHelpers.export(exports, "createPropertyAndDiv", ()=>createPropertyAndDiv);
/**
 * For processing a molecule property.
 * @param p The property.
 * @param units The possible units.
 * @param molecule The molecule.
 * @param element The element.
 * @param plDiv The PropertyList div.
 * @param textArea If true, a text area is created rather than an input.
 * @param boundary The boundary to go around components.
 * @param level The level of the component.
 */ parcelHelpers.export(exports, "processProperty", ()=>processProperty);
/**
 * For processing a molecule property.
 * @param p The property.
 * @param units The possible units.
 * @param molecule The molecule.
 * @param element The element.
 * @param plDiv The PropertyList div.
 * @param textArea If true, a text area is created rather than an input.
 * @param boundary The boundary to go around components.
 * @param level The level of the component.
 */ parcelHelpers.export(exports, "processPropertyString", ()=>processPropertyString);
/**
 * Creates a 3D viewer for the molecule and adds this to the moleculeDiv.
 * 
 * @param molecule The molecule.
 * @param moleculeDiv The molecule div.
 * @param boundary The margin for the viewer.
 * @param level The margin for the viewer container div.
 */ parcelHelpers.export(exports, "create3DViewer", ()=>create3DViewer);
/**
 * Add a Property.
 * @param dictRef The dictRef.
 * @param ps The PropertyScalar.
 * @param id The id.
 * @param boundary The boundary.
 * @param level The level. 
 * @returns A div element.
 */ parcelHelpers.export(exports, "addProperty1", ()=>addProperty1);
/**
 * Add a PropertyScalarNumber.
 * @param attributes The attributes.
 * @param mIDM The molecule IDManager.
 * @param value The value.
 * @param units The units.
 * @param pl The PropertyList.
 * @param p The Property.
 * @param plDiv The PropertyList div.
 * @param boundary The boundary.
 */ parcelHelpers.export(exports, "addPropertyScalarNumber1", ()=>addPropertyScalarNumber1);
/**
 * Process a numerical variable.
 * @param id The id.
 * @param mIDM The .
 * @param name The name of the variable.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param margin The margin.
 */ parcelHelpers.export(exports, "processNumberArrayOrMatrix", ()=>processNumberArrayOrMatrix);
/**
 * Set a molecule property array when the input value is changed.
 * @param setSize If true then the the size of the number array can be set.
 * @param dictRef The dictRef.
 * @param node The NumberArayNode.
 * @param ta The HTMLTextAreaElement.
 */ parcelHelpers.export(exports, "setNumberArrayNode", ()=>setNumberArrayNode);
var _bigJs = require("big.js");
var _bigJsDefault = parcelHelpers.interopDefault(_bigJs);
var _appJs = require("./app.js");
var _xmlConditionsJs = require("./xml_conditions.js");
var _htmlJs = require("./html.js");
var _xmlMesmerJs = require("./xml_mesmer.js");
var _xmlMetadataJs = require("./xml_metadata.js");
var _xmlMoleculeJs = require("./xml_molecule.js");
var _utilJs = require("./util.js");
var _xmlJs = require("./xml.js");
function getAddMoleculeButton(mlDiv, mIDM, molecules) {
    let addMoleculeButton = (0, _htmlJs.createButton)((0, _appJs.s_Add_sy_add), undefined, (0, _appJs.level1));
    mlDiv.appendChild(addMoleculeButton);
    addMoleculeButton.addEventListener('click', ()=>{
        let mid = setMoleculeID(true, undefined, undefined, molecules);
        if (mid == undefined) return;
        console.log("mid=" + mid);
        let m = new (0, _xmlMoleculeJs.Molecule)(new Map(), mid);
        m.setID(mid);
        molecules.set(mid, m);
        //m.label = mid;
        //addMolecule(m, molecules);
        m.setAtoms(new (0, _xmlMoleculeJs.AtomArray)(new Map()));
        m.setBonds(new (0, _xmlMoleculeJs.BondArray)(new Map()));
        let mDivID = mIDM.addID((0, _xmlMoleculeJs.Molecule).tagName, mid);
        let mDiv = (0, _htmlJs.createDiv)(mDivID);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = mIDM.addID(mDivID, (0, _appJs.s_container));
        let mcDiv = (0, _htmlJs.getCollapsibleDiv)(mcDivID, mlDiv, addMoleculeButton, mDiv, mid, (0, _appJs.boundary1), (0, _appJs.level1));
        // Add the molecule to the BathGas select elements.
        (0, _appJs.addOptionByClassName)((0, _xmlConditionsJs.BathGas).tagName, mid);
        // Add Edit ID button.
        addEditIDButton(m, molecules, mcDiv.querySelector((0, _htmlJs.s_button)), mIDM, mDiv, (0, _appJs.level1));
        // Add description.
        mDiv.appendChild(processDescription(mIDM.addID(mDivID, (0, _appJs.s_description)), mIDM, m.getDescription.bind(m), m.setDescription.bind(m), (0, _appJs.boundary1), (0, _appJs.level1)));
        // Add atomArray.
        let aaDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.AtomArray).tagName);
        let aaDiv = (0, _htmlJs.createDiv)(aaDivID);
        let aacDivID = mIDM.addID(aaDivID, (0, _appJs.s_container));
        let aacDiv = (0, _htmlJs.getCollapsibleDiv)(aacDivID, mDiv, null, aaDiv, (0, _xmlMoleculeJs.AtomArray).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
        aaDiv.appendChild(getAddAtomButton(mIDM, m, aaDiv, (0, _xmlMoleculeJs.Atom).tagName, (0, _appJs.boundary1), (0, _appJs.level1)));
        // Add bondArray.
        let baDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.BondArray).tagName);
        let baDiv = (0, _htmlJs.createDiv)(baDivID);
        let bacDivID = mIDM.addID(baDivID, (0, _appJs.s_container));
        let bacDiv = (0, _htmlJs.getCollapsibleDiv)(bacDivID, mDiv, null, baDiv, (0, _xmlMoleculeJs.BondArray).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
        baDiv.appendChild(getAddBondButton(mIDM, m, baDiv, (0, _xmlMoleculeJs.Bond).tagName, (0, _appJs.boundary1), (0, _appJs.level1)));
        create3DViewer(mIDM, m, mDiv, (0, _appJs.boundary1), (0, _appJs.level1));
        // Add properties.
        let plDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.PropertyList).tagName);
        let plDiv = (0, _htmlJs.createDiv)(plDivID);
        let plcDivID = mIDM.addID(plDivID, (0, _appJs.s_container));
        let plcDiv = (0, _htmlJs.getCollapsibleDiv)(plcDivID, mDiv, null, plDiv, (0, _xmlMoleculeJs.PropertyList).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
        let pl = m.getPropertyList();
        if (pl == undefined) {
            console.log("PropertyList is undefined for molecule " + m.getLabel());
            pl = new (0, _xmlMoleculeJs.PropertyList)(new Map());
            m.setPropertyList(pl);
        }
        console.log("pl.index.size" + pl.index.size);
        initialiseProperties(true, m, mIDM, plDiv, pl);
        // Add me:EnergyTransferModel.
        let etmDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.EnergyTransferModel).tagName);
        let etmDiv = (0, _htmlJs.createDiv)(etmDivID);
        let etmcDivID = mIDM.addID(etmDivID, (0, _appJs.s_container));
        let etmcDiv = (0, _htmlJs.getCollapsibleDiv)(etmcDivID, mDiv, null, etmDiv, (0, _xmlMoleculeJs.EnergyTransferModel).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
        let etm = m.getEnergyTransferModel();
        if (etm == undefined) {
            etm = new (0, _xmlMoleculeJs.EnergyTransferModel)(new Map());
            m.setEnergyTransferModel(etm);
        }
        console.log("etm.index.size" + etm.nodes.size);
        // Add an add me.deltaEDown button.
        let addDeltaEDownButton = (0, _htmlJs.createButton)((0, _appJs.s_Add_sy_add), (0, _utilJs.getID)(etmDivID, (0, _xmlMoleculeJs.DeltaEDown).tagName, (0, _appJs.s_Add_sy_add), (0, _htmlJs.s_button)), (0, _appJs.level1));
        etmDiv.appendChild(addDeltaEDownButton);
        addDeltaEDownButton.addEventListener('click', ()=>{
            let value = (0, _appJs.big0);
            let ded = new (0, _xmlMoleculeJs.DeltaEDown)(new Map(), value);
            let index = etm.addDeltaEDown(ded);
            let dedDivID = mIDM.addID(etmDivID, (0, _xmlMoleculeJs.DeltaEDown).tagName, etm.nodes.size);
            let dedDiv = (0, _htmlJs.createFlexDiv)(dedDivID);
            etmDiv.insertBefore(dedDiv, addDeltaEDownButton);
            let lwi = (0, _htmlJs.createLabelWithInput)((0, _xmlMoleculeJs.DeltaEDown).tagName, dedDivID, (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                let target = event.target;
                // Check the input is a number.
                if ((0, _utilJs.isNumeric)(target.value)) {
                    value = new (0, _bigJsDefault.default)(target.value);
                    ded.setValue(value);
                } else {
                    // Reset.
                    alert("Input is not a number, resetting...");
                    target.value = ded.value.toString() ?? (0, _appJs.s_undefined);
                }
                (0, _htmlJs.resizeInputElement)(target);
            }, ded.value.toString(), (0, _xmlMoleculeJs.DeltaEDown).tagName);
            dedDiv.appendChild(lwi);
            // Add a remove me.deltaEDown button.
            (0, _appJs.addRemoveButton)(dedDiv, (0, _appJs.boundary1), ()=>{
                etm.removeDeltaEDown(index);
                etmDiv.removeChild(dedDiv);
            });
        });
        /*
        // Add me:DOSCMethod.
        let doscm: DOSCMethod | undefined = m.getDOSCMethod();
        if (doscm == undefined) {
            doscm = new DOSCMethod(new Map());
            m.setDOSCMethod(doscm);
        }
        mDiv.appendChild(
            createLabelWithSelect(DOSCMethod.tagName, DOSCMethod.xsi_typeOptions, DOSCMethod.tagName,
                doscm.getXsiType(), mIDM.addID(mDivID, DOSCMethod.tagName), boundary1, level1));
        */ /*
        addDOSCMethod(m, mIDM, plDiv, pl);
        // Add me:ExtraDOSCMethod
        addExtraDOSCMethod(m, mIDM, plDiv, pl);
        // Add me:Periodicity
        addPeriodicity(m, mIDM, plDiv, pl);
        // Add me:PotentialPoint
        addPotentialPoint(m, mIDM, plDiv, pl);
        // Add me:ReservoirSize
        addReservoirSize(m, mIDM, plDiv, pl);
        */ // Add me:States
        let statesDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.States).tagName);
        let statesDiv = (0, _htmlJs.createDiv)(statesDivID);
        let statescDivID = mIDM.addID(statesDivID, (0, _appJs.s_container));
        let statescDiv = (0, _htmlJs.getCollapsibleDiv)(statescDivID, mDiv, null, statesDiv, (0, _xmlMoleculeJs.States).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
        let states = m.getStates();
        if (states == undefined) {
            states = new (0, _xmlMoleculeJs.States)(new Map());
            m.setStates(states);
        }
        console.log("states.index.size" + states.nodes.size);
        // Add an add me:State button.
        addAddStateButton(mIDM, statesDiv, states, statesDivID, (0, _appJs.level1));
        // Add a remove molecule button.
        (0, _appJs.addRemoveButton)(mDiv, (0, _appJs.level1), ()=>{
            removeMolecule(mlDiv, mcDiv, mIDM, molecules, mDivID, m);
        });
    });
    return addMoleculeButton;
}
/**
 * Adds an add state button.
 * @param mIDM The IDManager for molecule divs.
 * @param statesDiv The States HTMLDivElement.
 * @param states The States.
 * @param statesDivID The States div ID.
 * @param margin The margin.
 */ function addAddStateButton(mIDM, statesDiv, states, statesDivID, margin) {
    let addStateButton = (0, _htmlJs.createButton)((0, _appJs.s_Add_sy_add), (0, _utilJs.getID)(statesDivID, (0, _xmlMoleculeJs.State).tagName, (0, _appJs.s_Add_sy_add), (0, _htmlJs.s_button)), margin);
    statesDiv.appendChild(addStateButton);
    addStateButton.addEventListener('click', ()=>{
        let stateAttributes = new Map();
        stateAttributes.set((0, _xmlMoleculeJs.State).s_energy, "0");
        stateAttributes.set((0, _xmlMoleculeJs.State).s_degeneracy, "0");
        let stateId = states.getNextId();
        let state = new (0, _xmlMoleculeJs.State)(stateAttributes, stateId);
        console.log("stateId=" + stateId);
        let index = states.addState(state);
        let stateDivID = mIDM.addID(statesDivID, (0, _xmlMoleculeJs.State).tagName, state.id);
        let stateDiv = (0, _htmlJs.createFlexDiv)(stateDivID);
        statesDiv.insertBefore(stateDiv, addStateButton);
        // Add energy.
        let energyDivID = mIDM.addID(stateDivID, (0, _xmlMoleculeJs.State).s_energy);
        let energyDiv = (0, _htmlJs.createFlexDiv)(energyDivID);
        stateDiv.appendChild(energyDiv);
        let energyValue = state.getEnergy();
        let elwi = (0, _htmlJs.createLabelWithInput)((0, _xmlMoleculeJs.State).s_energy, energyDivID, (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
            let target = event.target;
            // Check the input is a number.
            if ((0, _utilJs.isNumeric)(target.value)) {
                energyValue = new (0, _bigJsDefault.default)(target.value);
                state.setEnergy(energyValue);
            } else {
                // Reset.
                alert("Input is not a number, resetting...");
                target.value = energyValue.toString() ?? (0, _appJs.s_undefined);
            }
            (0, _htmlJs.resizeInputElement)(target);
        }, energyValue.toString(), (0, _xmlMoleculeJs.State).s_energy);
        energyDiv.appendChild(elwi);
        // Add degeneracy.
        let degeneracyDivID = mIDM.addID(stateDivID, (0, _xmlMoleculeJs.State).s_degeneracy);
        let degeneracyDiv = (0, _htmlJs.createFlexDiv)(degeneracyDivID);
        stateDiv.appendChild(degeneracyDiv);
        let degeneracyValue = state.getDegeneracy();
        let dlwi = (0, _htmlJs.createLabelWithInput)((0, _xmlMoleculeJs.State).s_degeneracy, degeneracyDivID, (0, _appJs.boundary1), (0, _appJs.boundary1), (event)=>{
            let target = event.target;
            // Check the input is a number.
            if ((0, _utilJs.isNumeric)(target.value)) {
                degeneracyValue = new (0, _bigJsDefault.default)(target.value);
                state.setDegeneracy(degeneracyValue);
            } else {
                // Reset.
                alert("Input is not a number, resetting...");
                target.value = degeneracyValue.toString() ?? (0, _appJs.s_undefined);
            }
            (0, _htmlJs.resizeInputElement)(target);
        }, degeneracyValue.toString(), (0, _xmlMoleculeJs.State).s_degeneracy);
        degeneracyDiv.appendChild(dlwi);
        // Add a remove me:State button.
        (0, _appJs.addRemoveButton)(stateDiv, (0, _appJs.boundary1), ()=>{
            states.removeState(index);
            statesDiv.removeChild(stateDiv);
        });
    });
}
function initialiseProperties(deselect, m, mIDM, plDiv, pl) {
    // "me:ZPE", scalar, Mesmer.energyUnits.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.ZPE).dictRef, (0, _xmlMesmerJs.Mesmer).energyUnits);
    //console.log("pl.index.size" + pl.index.size);
    //console.log("Property " + m.getPropertyList()!.getProperty(ZPE.dictRef)?.toString);
    // "me:Hf0", scalar, Mesmer.energyUnits.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Hf0).dictRef, (0, _xmlMesmerJs.Mesmer).energyUnits);
    // "me:HfAT0", scalar, Mesmer.energyUnits.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.HfAT0).dictRef, (0, _xmlMesmerJs.Mesmer).energyUnits);
    // "me:Hf298", scalar, Mesmer.energyUnits.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Hf298).dictRef, (0, _xmlMesmerJs.Mesmer).energyUnits);
    // "me:rotConsts", array, Mesmer.frequencyUnits.
    addPropertyArray(deselect, false, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.RotConsts).dictRef, (0, _xmlMesmerJs.Mesmer).frequencyUnits);
    // "me:symmetryNumber", scalar, No units.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.SymmetryNumber).dictRef, undefined);
    // "me:TSOpticalSymmetryNumber", scalar, No units.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.TSOpticalSymmetryNumber).dictRef, undefined);
    // "me:frequenciesScaleFactor", scalar, No units.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.FrequenciesScaleFactor).dictRef, undefined);
    // "me:vibFreqs", array, cm-1.
    addPropertyArray(deselect, false, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.VibFreqs).dictRef, (0, _xmlMesmerJs.Mesmer).frequencyUnits);
    // "me:MW", scalar, amu.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.MW).dictRef, (0, _xmlMesmerJs.Mesmer).massUnits);
    // "me:spinMultiplicity", scalar, No units.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.SpinMultiplicity).dictRef, undefined);
    // "me:epsilon", scalar, K (fixed).
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Epsilon).dictRef, (0, _xmlMesmerJs.Mesmer).temperatureUnits);
    // "me:sigma", scalar, Å (fixed).
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Sigma).dictRef, (0, _xmlMesmerJs.Mesmer).lengthUnits);
    // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
    addPropertyMatrix(deselect, false, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Hessian).dictRef, (0, _xmlMesmerJs.Mesmer).hessianUnits);
    // "me:EinsteinAij", array, s-1 (fixed).
    addPropertyArray(deselect, false, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.EinsteinAij).dictRef, (0, _xmlMesmerJs.Mesmer).EinsteinAUnits);
    // "me:EinsteinBij", array, m3/J/s2 (fixed).
    addPropertyArray(deselect, false, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.EinsteinBij).dictRef, (0, _xmlMesmerJs.Mesmer).EinsteinBUnits);
    // "me:electronicExcitation">, scalar, cm-1.
    addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.ElectronicExcitation).dictRef, (0, _xmlMesmerJs.Mesmer).frequencyUnits);
}
/**
 * @param deselect If true the button is clicked and the propert removed.
 * @param m The molecule.
 * @param mIDM The molecule IDManager.
 * @param plDiv The PropertyList HTMLDivElement.
 * @param pl The PropertyList.
 * @param dictRef The dictRef.
 * @param units The units. 
 */ function addPropertyScalar(deselect, m, mIDM, plDiv, pl, dictRef, units) {
    let pAttributes;
    let psAttributes;
    let ps;
    let p;
    let div;
    pAttributes = new Map();
    pAttributes.set((0, _xmlMoleculeJs.Property).s_dictRef, dictRef);
    psAttributes = new Map();
    if (units != undefined) psAttributes.set((0, _xmlMoleculeJs.PropertyScalarNumber).s_units, units[0]);
    ps = new (0, _xmlMoleculeJs.PropertyScalarNumber)(psAttributes, (0, _appJs.big0));
    p = new (0, _xmlMoleculeJs.Property)(pAttributes, ps);
    m.getPropertyList().setProperty(p);
    console.log("pl.index.size" + pl.index.size);
    div = (0, _appJs.processNumber)(plDiv.id, mIDM, dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
    (0, _appJs.addAnyUnits)(units, psAttributes, div, div.querySelector((0, _appJs.s_input)), (0, _appJs.addRID)(plDiv.id, dictRef, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
    plDiv.appendChild(div);
    // Deselect
    if (deselect) {
        let b = div.querySelector((0, _htmlJs.s_button));
        b.click();
        pl.removeProperty(dictRef);
    }
    return div;
}
function setPropertyScalarNumber(dictRef, pl, ps, value) {
    if (pl.getProperty(dictRef) == undefined) {
        let pAttributes;
        let p;
        pAttributes = new Map();
        pAttributes.set((0, _xmlMoleculeJs.Property).s_dictRef, dictRef);
        p = new (0, _xmlMoleculeJs.Property)(pAttributes, ps);
        pl.setProperty(p);
        console.log("Set property " + dictRef);
    } else console.log("Property " + dictRef + " already exists.");
    //console.log("Value " + ps.getValue());
    ps.setValue.bind(ps)(value);
    if (dictRef == (0, _xmlMoleculeJs.ZPE).dictRef || dictRef == (0, _xmlMoleculeJs.Hf0).dictRef || dictRef == (0, _xmlMoleculeJs.HfAT0).dictRef || dictRef == (0, _xmlMoleculeJs.Hf298).dictRef) (0, _appJs.redrawReactionsDiagram)();
//console.log("Value " + ps.getValue());
}
/**
 * @param deselect If true the button is clicked and the propert removed.
 * @param m The molecule.
 * @param mIDM The molecule IDManager.
 * @param plDiv The PropertyList HTMLDivElement.
 * @param pl The PropertyList.
 * @param dictRef The dictRef.
 * @param units The units. 
 */ function addPropertyArray(deselect, setSize, m, mIDM, plDiv, pl, dictRef, units) {
    let pAttributes;
    let paAttributes;
    let pa;
    let p;
    let div;
    pAttributes = new Map();
    pAttributes.set((0, _xmlMoleculeJs.Property).s_dictRef, dictRef);
    paAttributes = new Map();
    if (units != undefined) paAttributes.set((0, _xmlMoleculeJs.PropertyScalarNumber).s_units, units[0]);
    // Init values.
    let values = [];
    if (setSize) setValues(dictRef, values);
    pa = new (0, _xmlMoleculeJs.PropertyArray)(paAttributes, values);
    p = new (0, _xmlMoleculeJs.Property)(pAttributes, pa);
    m.getPropertyList().setProperty(p);
    console.log("pl.index.size" + pl.index.size);
    div = processNumberArrayOrMatrix(plDiv, mIDM, dictRef, pa, pa.getValues.bind(pa), (values)=>setPropertyArrayOrMatrix(dictRef, pl, pa, values), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
    (0, _appJs.addAnyUnits)(units, paAttributes, div, div.querySelector((0, _appJs.s_input)), (0, _appJs.addRID)(plDiv.id, dictRef, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
    plDiv.appendChild(div);
    // Deselect
    if (deselect) {
        let b = div.querySelector((0, _htmlJs.s_button));
        b.click();
        pl.removeProperty(dictRef);
    }
}
function setValues(dictRef, values) {
    let n = (0, _appJs.getN)("Please enter the number of elements in the " + dictRef + " array");
    for(let i = 0; i < n; i++)values.push((0, _appJs.big0));
}
function setPropertyArrayOrMatrix(dictRef, pl, paom, values) {
    if (pl.getProperty(dictRef) == undefined) {
        let pAttributes;
        let p;
        pAttributes = new Map();
        pAttributes.set((0, _xmlMoleculeJs.Property).s_dictRef, dictRef);
        p = new (0, _xmlMoleculeJs.Property)(pAttributes, paom);
        //setValues(dictRef, values);
        pl.setProperty(p);
        console.log("Set property " + dictRef);
    } else console.log("Property " + dictRef + " already exists.");
    console.log("Value " + paom.getValues());
    paom.setValues.bind(paom)(values);
    console.log("Value " + paom.getValues());
}
/**
 * @param deselect If true the button is clicked and the propert removed.
 * @param m The molecule.
 * @param mIDM The molecule IDManager.
 * @param plDiv The PropertyList HTMLDivElement.
 * @param pl The PropertyList.
 * @param dictRef The dictRef.
 * @param units The units. 
 */ function addPropertyMatrix(deselect, setSize, m, mIDM, plDiv, pl, dictRef, units) {
    let pAttributes;
    let pmAttributes;
    let pm;
    let p;
    let div;
    pAttributes = new Map();
    pAttributes.set((0, _xmlMoleculeJs.Property).s_dictRef, dictRef);
    pmAttributes = new Map();
    if (units != undefined) pmAttributes.set((0, _xmlMoleculeJs.PropertyScalarNumber).s_units, units[0]);
    // Init values.
    let values = [];
    if (setSize) setValues(dictRef, values);
    pm = new (0, _xmlMoleculeJs.PropertyMatrix)(pmAttributes, values);
    p = new (0, _xmlMoleculeJs.Property)(pAttributes, pm);
    m.getPropertyList().setProperty(p);
    console.log("pl.index.size" + pl.index.size);
    div = processNumberArrayOrMatrix(plDiv, mIDM, dictRef, pm, pm.getValues.bind(pm), (values)=>setPropertyArrayOrMatrix(dictRef, pl, pm, values), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
    (0, _appJs.addAnyUnits)(units, pmAttributes, div, div.querySelector((0, _appJs.s_input)), (0, _appJs.addRID)(plDiv.id, dictRef, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
    plDiv.appendChild(div);
    // Deselect
    if (deselect) {
        let b = div.querySelector((0, _htmlJs.s_button));
        b.click();
        pl.removeProperty(dictRef);
    }
}
function getAddFromLibraryButton(mlDiv, amb, mIDM, molecules) {
    let addFromLibraryButton = (0, _htmlJs.createButton)((0, _appJs.s_Add_from_library), undefined, (0, _appJs.boundary1));
    mlDiv.appendChild(addFromLibraryButton);
    // Add event listener for the button.
    addFromLibraryButton.addEventListener('click', ()=>{
        // Create a select element to select a libraryMolecule.
        let selectDivID = mIDM.addID((0, _xmlMoleculeJs.Molecule).tagName, "div");
        (0, _appJs.remove)(selectDivID);
        let selectDiv = (0, _htmlJs.createDiv)(selectDivID, (0, _appJs.level1));
        if ((0, _appJs.libmols) == undefined) {
            alert("There are no additional molecules to add, please load data...");
            return;
        }
        let options = Array.from((0, _appJs.getMoleculeKeys)((0, _appJs.libmols)));
        if (options.length == 0) {
            alert("There are no additional molecules to add, please load data...");
            return;
        }
        console.log("options.length=" + options.length);
        (0, _appJs.addOrRemoveInstructions)(options, true);
        let selectID = mIDM.addID(selectDivID, (0, _htmlJs.s_select));
        (0, _appJs.remove)(selectID);
        let select = (0, _htmlJs.createSelectElement)(options, "Select molecule", (0, _appJs.s_selectOption), selectID, (0, _appJs.boundary1));
        select.classList.add((0, _xmlMoleculeJs.Molecule).tagName);
        selectDiv.appendChild(select);
        mlDiv.insertBefore(selectDiv, amb);
        (0, _appJs.selectAnotherOptionEventListener)(options, select);
        select.addEventListener('change', (event)=>{
            let target = event.target;
            let selectedOption = target.options[target.selectedIndex];
            let label = selectedOption.value;
            let molecule = (0, _appJs.libmols).get(label);
            //let molecule: Molecule = getMolecule(label, libmols)!;
            let mid = molecule.getID();
            while(true){
                mid = setMoleculeID(true, mid, molecule, molecules);
                if (mid != undefined) break;
            }
            molecules.set(mid, molecule);
            // Add molecule to the MoleculeList.
            let mDivID = mIDM.addID((0, _xmlMoleculeJs.Molecule).tagName, molecules.size);
            let moleculeDiv = (0, _htmlJs.createDiv)(mDivID);
            // Create collapsible Molecule HTMLDivElement.
            let mcDivID = mIDM.addID(mDivID, (0, _appJs.s_container));
            let mcDiv = (0, _htmlJs.getCollapsibleDiv)(mcDivID, mlDiv, amb, moleculeDiv, molecule.getLabel(), (0, _appJs.boundary1), (0, _appJs.level1));
            // Add the molecule to the BathGas select elements.
            (0, _appJs.addOptionByClassName)((0, _xmlConditionsJs.BathGas).tagName, molecule.getID());
            // Add edit Name button.
            addEditIDButton(molecule, molecules, mcDiv.querySelector((0, _htmlJs.s_button)), mIDM, moleculeDiv, (0, _appJs.level1));
            // Description
            moleculeDiv.appendChild(processDescription(mIDM.addID(mDivID, (0, _appJs.s_description)), mIDM, molecule.getDescription.bind(molecule), molecule.setDescription.bind(molecule), (0, _appJs.boundary1), (0, _appJs.level1)));
            // Create collapsible MetadataList HTMLDivElement.
            let mlistDivID = mIDM.addID(mDivID, (0, _xmlMetadataJs.MetadataList).tagName);
            let mlistDiv = (0, _htmlJs.createDiv)(mlistDivID, (0, _appJs.level1));
            //let mlistcDivID = mIDM.addID(mlistDivID, s_container);
            let mlistcDivID = (0, _utilJs.getID)(mlistDivID, (0, _appJs.s_container));
            let mlistcDiv = (0, _htmlJs.getCollapsibleDiv)(mlistcDivID, moleculeDiv, null, mlistDiv, (0, _xmlMetadataJs.MetadataList).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
            // Add metadata.
            let metadataList = molecule.getMetadataList();
            if (metadataList != undefined) metadataList.getMetadata().forEach((md)=>{
                let mdDiv = (0, _htmlJs.createDiv)();
                mlistDiv.appendChild(mdDiv);
                mdDiv.appendChild((0, _htmlJs.createLabel)(md.getLabelText(), (0, _appJs.boundary1)));
            });
            // Create collapsible AtomArray HTMLDivElement.
            let aaDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.AtomArray).tagName);
            let aaDiv = (0, _htmlJs.createDiv)(aaDivID);
            let aacDivID = mIDM.addID(aaDivID, (0, _appJs.s_container));
            let aacDiv = (0, _htmlJs.getCollapsibleDiv)(aacDivID, moleculeDiv, null, aaDiv, (0, _xmlMoleculeJs.AtomArray).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
            // Add atoms.
            let aa = molecule.getAtoms();
            if (aa != undefined) aa.atoms.forEach((a)=>{
                aaDiv.appendChild(addAtom(false, mIDM, molecule, aaDivID, aa, a, (0, _appJs.boundary1), (0, _appJs.level1)));
            });
            aaDiv.appendChild(getAddAtomButton(mIDM, molecule, aaDiv, (0, _xmlMoleculeJs.Atom).tagName, (0, _appJs.boundary1), (0, _appJs.level1)));
            // Create collapsible BondArray HTMLDivElement.
            let baDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.BondArray).tagName);
            let baDiv = (0, _htmlJs.createDiv)(baDivID);
            let bacDivID = mIDM.addID(baDivID, (0, _appJs.s_container));
            let bacDiv = (0, _htmlJs.getCollapsibleDiv)(bacDivID, moleculeDiv, null, baDiv, (0, _xmlMoleculeJs.BondArray).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
            // Add bonds.
            let ba = molecule.getBonds();
            if (ba != undefined) ba.bonds.forEach((b)=>{
                if (aa == undefined) throw new Error("Atoms are not defined for molecule " + molecule.getLabel());
                baDiv.appendChild(addBond(false, mIDM, molecule, baDivID, aa.atoms, ba, b, (0, _appJs.boundary1), (0, _appJs.level1)));
            });
            baDiv.appendChild(getAddBondButton(mIDM, molecule, baDiv, (0, _xmlMoleculeJs.Bond).tagName, (0, _appJs.boundary1), (0, _appJs.level1)));
            create3DViewer(mIDM, molecule, moleculeDiv, (0, _appJs.boundary1), (0, _appJs.level1));
            // Create collapsible Properties HTMLDivElement.
            let plDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.PropertyList).tagName);
            let plDiv = (0, _htmlJs.createDiv)(plDivID);
            let plcDivID = mIDM.addID(plDivID, (0, _appJs.s_container));
            let plcDiv = (0, _htmlJs.getCollapsibleDiv)(plcDivID, moleculeDiv, null, plDiv, (0, _xmlMoleculeJs.PropertyList).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
            let pl = molecule.getPropertyList();
            let properties = pl.getProperties();
            //console.log("properties.size=" + properties.size);
            let dictRefs = new Set(properties.keys());
            //console.log("Molecule " + molecule.getDescription());
            let pID;
            let deselect = true;
            // "me:ZPE", scalar, Mesmer.energyUnits.
            if (!dictRefs.has((0, _xmlMoleculeJs.ZPE).dictRef)) addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.ZPE).dictRef, (0, _xmlMesmerJs.Mesmer).energyUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.ZPE).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.ZPE).dictRef);
                let ps = p.getProperty();
                let div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                (0, _appJs.addAnyUnits)((0, _xmlMesmerJs.Mesmer).energyUnits, ps.attributes, div, div.querySelector((0, _appJs.s_input)), (0, _utilJs.getID)(pID, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
                plDiv.appendChild(div);
            }
            // "me:Hf0", scalar, Mesmer.energyUnits.
            if (!dictRefs.has((0, _xmlMoleculeJs.Hf0).dictRef)) addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Hf0).dictRef, (0, _xmlMesmerJs.Mesmer).energyUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.Hf0).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.Hf0).dictRef);
                let ps = p.getProperty();
                let div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                (0, _appJs.addAnyUnits)((0, _xmlMesmerJs.Mesmer).energyUnits, ps.attributes, div, div.querySelector((0, _appJs.s_input)), (0, _utilJs.getID)(pID, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
                plDiv.appendChild(div);
            }
            // "me:HfAT0", scalar, Mesmer.energyUnits.
            if (!dictRefs.has((0, _xmlMoleculeJs.HfAT0).dictRef)) addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.HfAT0).dictRef, (0, _xmlMesmerJs.Mesmer).energyUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.HfAT0).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.HfAT0).dictRef);
                let ps = p.getProperty();
                let div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                (0, _appJs.addAnyUnits)((0, _xmlMesmerJs.Mesmer).energyUnits, ps.attributes, div, div.querySelector((0, _appJs.s_input)), (0, _utilJs.getID)(pID, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
                plDiv.appendChild(div);
            }
            // "me:Hf298", scalar, Mesmer.energyUnits.
            if (!dictRefs.has((0, _xmlMoleculeJs.Hf298).dictRef)) addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Hf298).dictRef, (0, _xmlMesmerJs.Mesmer).energyUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.Hf298).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.Hf298).dictRef);
                let ps = p.getProperty();
                let div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                (0, _appJs.addAnyUnits)((0, _xmlMesmerJs.Mesmer).energyUnits, ps.attributes, div, div.querySelector((0, _appJs.s_input)), (0, _utilJs.getID)(pID, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
                plDiv.appendChild(div);
            }
            // "me:rotConsts", array, Mesmer.frequencyUnits.
            if (!dictRefs.has((0, _xmlMoleculeJs.RotConsts).dictRef)) addPropertyArray(deselect, false, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.RotConsts).dictRef, (0, _xmlMesmerJs.Mesmer).frequencyUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.RotConsts).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.RotConsts).dictRef);
                let pa = p.getProperty();
                let div = processNumberArrayOrMatrix(plDiv, mIDM, p.dictRef, pa, pa.getValues.bind(pa), (values)=>setPropertyArrayOrMatrix(p.dictRef, pl, pa, values), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                (0, _appJs.addAnyUnits)((0, _xmlMesmerJs.Mesmer).frequencyUnits, pa.attributes, div, div.querySelector((0, _appJs.s_input)), (0, _utilJs.getID)(pID, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
                plDiv.appendChild(div);
            }
            // "me:symmetryNumber", scalar, No units.
            if (!dictRefs.has((0, _xmlMoleculeJs.SymmetryNumber).dictRef)) addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.SymmetryNumber).dictRef, undefined);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.SymmetryNumber).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.SymmetryNumber).dictRef);
                let ps = p.getProperty();
                let div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                plDiv.appendChild(div);
            }
            // "me:TSOpticalSymmetryNumber", scalar, No units.
            if (!dictRefs.has((0, _xmlMoleculeJs.TSOpticalSymmetryNumber).dictRef)) addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.TSOpticalSymmetryNumber).dictRef, undefined);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.TSOpticalSymmetryNumber).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.TSOpticalSymmetryNumber).dictRef);
                let ps = p.getProperty();
                let div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                plDiv.appendChild(div);
            }
            // "me:frequenciesScaleFactor", scalar, No units.
            if (!dictRefs.has((0, _xmlMoleculeJs.FrequenciesScaleFactor).dictRef)) addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.FrequenciesScaleFactor).dictRef, undefined);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.FrequenciesScaleFactor).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.FrequenciesScaleFactor).dictRef);
                let ps = p.getProperty();
                let div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                plDiv.appendChild(div);
            }
            // "me:vibFreqs", array, cm-1.
            if (!dictRefs.has((0, _xmlMoleculeJs.VibFreqs).dictRef)) addPropertyArray(deselect, false, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.VibFreqs).dictRef, (0, _xmlMesmerJs.Mesmer).frequencyUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.VibFreqs).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.VibFreqs).dictRef);
                let pa = p.getProperty();
                let div = processNumberArrayOrMatrix(plDiv, mIDM, p.dictRef, pa, pa.getValues.bind(pa), (values)=>setPropertyArrayOrMatrix(p.dictRef, pl, pa, values), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                (0, _appJs.addAnyUnits)((0, _xmlMesmerJs.Mesmer).frequencyUnits, pa.attributes, div, div.querySelector((0, _appJs.s_input)), (0, _utilJs.getID)(pID, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
                plDiv.appendChild(div);
            }
            // "me:MW", scalar, amu.
            if (!dictRefs.has((0, _xmlMoleculeJs.MW).dictRef)) addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.MW).dictRef, (0, _xmlMesmerJs.Mesmer).massUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.MW).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.MW).dictRef);
                let ps = p.getProperty();
                let div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                (0, _appJs.addAnyUnits)((0, _xmlMesmerJs.Mesmer).massUnits, ps.attributes, div, div.querySelector((0, _appJs.s_input)), (0, _utilJs.getID)(pID, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
                plDiv.appendChild(div);
            }
            // "me:spinMultiplicity", scalar, No units.
            if (!dictRefs.has((0, _xmlMoleculeJs.SpinMultiplicity).dictRef)) addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.SpinMultiplicity).dictRef, undefined);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.SpinMultiplicity).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.SpinMultiplicity).dictRef);
                let ps = p.getProperty();
                let div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                plDiv.appendChild(div);
            }
            // "me:epsilon", scalar, K (fixed).
            if (!dictRefs.has((0, _xmlMoleculeJs.Epsilon).dictRef)) addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Epsilon).dictRef, (0, _xmlMesmerJs.Mesmer).temperatureUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.Epsilon).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.Epsilon).dictRef);
                let ps = p.getProperty();
                let div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                plDiv.appendChild(div);
            }
            // "me:sigma", scalar, Å (fixed).
            if (!dictRefs.has((0, _xmlMoleculeJs.Sigma).dictRef)) addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Sigma).dictRef, (0, _xmlMesmerJs.Mesmer).lengthUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.Sigma).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.Sigma).dictRef);
                let ps = p.getProperty();
                let div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                plDiv.appendChild(div);
            }
            // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
            if (!dictRefs.has((0, _xmlMoleculeJs.Hessian).dictRef)) addPropertyMatrix(deselect, false, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Hessian).dictRef, (0, _xmlMesmerJs.Mesmer).hessianUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.Hessian).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.Hessian).dictRef);
                let pm = p.getProperty();
                let div = processNumberArrayOrMatrix(plDiv, mIDM, p.dictRef, pm, pm.getValues.bind(pm), (values)=>setPropertyArrayOrMatrix(p.dictRef, pl, pm, values), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                (0, _appJs.addAnyUnits)((0, _xmlMesmerJs.Mesmer).hessianUnits, pm.attributes, div, div.querySelector((0, _appJs.s_input)), (0, _utilJs.getID)(pID, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
                plDiv.appendChild(div);
            }
            // "me:EinsteinAij", array, s-1 (fixed).
            if (!dictRefs.has((0, _xmlMoleculeJs.EinsteinAij).dictRef)) addPropertyArray(deselect, false, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.EinsteinAij).dictRef, (0, _xmlMesmerJs.Mesmer).EinsteinAUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.EinsteinAij).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.EinsteinAij).dictRef);
                let pa = p.getProperty();
                let div = processNumberArrayOrMatrix(plDiv, mIDM, p.dictRef, pa, pa.getValues.bind(pa), (values)=>setPropertyArrayOrMatrix(p.dictRef, pl, pa, values), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                (0, _appJs.addAnyUnits)((0, _xmlMesmerJs.Mesmer).EinsteinAUnits, pa.attributes, div, div.querySelector((0, _appJs.s_input)), (0, _utilJs.getID)(pID, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
                plDiv.appendChild(div);
            }
            // "me:EinsteinBij", array, m3/J/s2 (fixed).
            if (!dictRefs.has((0, _xmlMoleculeJs.EinsteinBij).dictRef)) addPropertyArray(deselect, false, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.EinsteinBij).dictRef, (0, _xmlMesmerJs.Mesmer).EinsteinBUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.EinsteinBij).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.EinsteinBij).dictRef);
                let pa = p.getProperty();
                let div = processNumberArrayOrMatrix(plDiv, mIDM, p.dictRef, pa, pa.getValues.bind(pa), (values)=>setPropertyArrayOrMatrix(p.dictRef, pl, pa, values), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                (0, _appJs.addAnyUnits)((0, _xmlMesmerJs.Mesmer).EinsteinBUnits, pa.attributes, div, div.querySelector((0, _appJs.s_input)), (0, _utilJs.getID)(pID, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
                plDiv.appendChild(div);
            }
            // "me:ElectronicExcitation", scalar, cm-1.
            if (!dictRefs.has((0, _xmlMoleculeJs.ElectronicExcitation).dictRef)) addPropertyScalar(deselect, molecule, mIDM, plDiv, pl, (0, _xmlMoleculeJs.ElectronicExcitation).dictRef, (0, _xmlMesmerJs.Mesmer).frequencyUnits);
            else {
                pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.ElectronicExcitation).dictRef);
                let p = pl.getProperty((0, _xmlMoleculeJs.ElectronicExcitation).dictRef);
                let ps = p.getProperty();
                let div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
                (0, _appJs.addAnyUnits)((0, _xmlMesmerJs.Mesmer).frequencyUnits, ps.attributes, div, div.querySelector((0, _appJs.s_input)), (0, _utilJs.getID)(pID, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, (0, _appJs.boundary1), (0, _appJs.boundary1));
                plDiv.appendChild(div);
            }
            /*
            // Add me:DOSCMethod.
            let doscm: DOSCMethod | undefined = molecule.getDOSCMethod();
            if (doscm == undefined) {
                doscm = new DOSCMethod(new Map());
                molecule.setDOSCMethod(doscm);
            }
            moleculeDiv.appendChild(
                createLabelWithSelect(DOSCMethod.tagName, DOSCMethod.xsi_typeOptions, DOSCMethod.tagName,
                doscm.getXsiType(), mIDM.addID(mDivID, DOSCMethod.tagName), boundary1, level1));
            */ // Organise States.
            let ssDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.State).tagName);
            let ssDiv = (0, _htmlJs.createDiv)(ssDivID);
            let sscDivID = mIDM.addID(ssDivID, (0, _appJs.s_container));
            let sscDiv = (0, _htmlJs.getCollapsibleDiv)(sscDivID, moleculeDiv, null, ssDiv, (0, _xmlMoleculeJs.States).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
            // Add states.
            let states = molecule.getStates();
            if (states != undefined) states.getStates().forEach((s)=>{
                console.log(s.toString());
                // Add state.
                let sDivID = (0, _utilJs.getID)(ssDivID, (0, _xmlMoleculeJs.State).tagName, s.id);
                let sDiv = (0, _htmlJs.createFlexDiv)(sDivID);
                ssDiv.appendChild(sDiv);
                // Add energy.
                let energyDivID = mIDM.addID(sDivID, (0, _xmlMoleculeJs.State).s_energy);
                let energy = s.getEnergy();
                let elwi = (0, _htmlJs.createLabelWithInput)((0, _xmlMoleculeJs.State).s_energy, energyDivID, (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                    let target = event.target;
                    // Check the input is a number.
                    if ((0, _utilJs.isNumeric)(target.value)) {
                        energy = new (0, _bigJsDefault.default)(target.value);
                        s.setEnergy(energy);
                    } else {
                        // Reset.
                        alert("Input is not a number, resetting...");
                        target.value = energy.toString() ?? (0, _appJs.s_undefined);
                    }
                    (0, _htmlJs.resizeInputElement)(target);
                }, energy.toString(), (0, _xmlMoleculeJs.State).s_energy);
                sDiv.appendChild(elwi);
                // Add degeneracy.
                let degeneracyDivID = mIDM.addID(sDivID, (0, _xmlMoleculeJs.State).s_degeneracy);
                let degeneracy = s.getDegeneracy();
                let dlwi = (0, _htmlJs.createLabelWithInput)((0, _xmlMoleculeJs.State).s_degeneracy, degeneracyDivID, (0, _appJs.boundary1), (0, _appJs.boundary1), (event)=>{
                    let target = event.target;
                    // Check the input is a number.
                    if ((0, _utilJs.isNumeric)(target.value)) {
                        degeneracy = new (0, _bigJsDefault.default)(target.value);
                        s.setDegeneracy(degeneracy);
                    } else {
                        // Reset.
                        alert("Input is not a number, resetting...");
                        target.value = degeneracy.toString() ?? (0, _appJs.s_undefined);
                    }
                    (0, _htmlJs.resizeInputElement)(target);
                }, degeneracy.toString(), (0, _xmlMoleculeJs.State).s_degeneracy);
                sDiv.appendChild(dlwi);
                // Add a remove state button.
                (0, _appJs.addRemoveButton)(sDiv, (0, _appJs.boundary1), ()=>{
                    states.removeState(s.id);
                    sDiv.remove();
                });
            /*
                    // Add a move up button.
                    sDiv.appendChild(getMoveUpButton(mIDM, molecule, ssDiv, State.tagName, sDiv, s));
                    // Add a move down button.
                    sDiv.appendChild(getMoveDownButton(mIDM, molecule, ssDiv, State.tagName, sDiv, s));
                    */ });
            // Add an add state button.
            //ssDiv.appendChild(getAddStateButton(mIDM, molecule, ssDiv, State.tagName, boundary1, level1));
            // Remove the select element.
            selectDiv.remove();
            // Add a remove molecule button.
            (0, _appJs.addRemoveButton)(moleculeDiv, (0, _appJs.level1), ()=>{
                removeMolecule(mlDiv, mcDiv, mIDM, molecules, mDivID, molecule);
            });
        });
    });
    return addFromLibraryButton;
}
function setMoleculeID(ask, mid, molecule, molecules) {
    let mid2;
    while(true){
        // Ask the user to specify the molecule ID.
        if (ask) mid2 = prompt("Please enter a name for the molecule", mid);
        else mid2 = mid;
        if (mid2 == null) //alert("The molecule ID cannot be null.");
        return undefined;
        else if (mid2 == "") alert("The molecule ID cannot be empty.");
        else if (molecules.has(mid2)) {
            //if (mid == mid2) {
            //    if (molecule != undefined) {
            //        molecule.setID(mid);
            //        molecules.set(mid, molecule);
            //    }
            //    return mid;
            //} else {
            alert("The molecule ID " + mid2 + " is already in use.");
            ask = true;
        //}
        } else {
            mid = mid2;
            if (molecule != undefined) {
                molecule.setID(mid);
                molecules.set(mid, molecule);
            }
            return mid;
        }
    }
}
/**
 * Adds a button to edit the molecule ID.
 * @param molecule The molecule.
 * @param molecules The molecules map.
 * @param button The button to add the event listener to.
 * @param mDiv 
 * @param level 
 */ function addEditIDButton(molecule, molecules, button, mIDM, mDiv, level) {
    let s_editName = (0, _appJs.sy_edit) + " Edit id";
    let editNameButtonID = mIDM.addID(mDiv.id, s_editName, (0, _htmlJs.s_button));
    let editNameButton = (0, _htmlJs.createButton)(s_editName, editNameButtonID, level);
    mDiv.appendChild(editNameButton);
    editNameButton.addEventListener('click', ()=>{
        let mid = molecule.getID();
        // Update the BathGas select elements.
        (0, _appJs.removeOptionByClassName)((0, _xmlConditionsJs.BathGas).tagName, molecule.getID());
        molecules.delete(mid);
        while(true){
            mid = setMoleculeID(true, mid, molecule, molecules);
            if (mid != undefined) break;
        }
        // Update the BathGas select elements.
        (0, _appJs.addOptionByClassName)((0, _xmlConditionsJs.BathGas).tagName, mid);
        button.textContent = molecule.getLabel() + " " + (0, _htmlJs.sy_upTriangle);
    });
}
/**
 * Process description.
 * @param id The id.
 * @param decription The description.
 * @param getter The getter function to call.
 * @param setter The setter function to call.
 * @param margin The boundary.
 */ function processDescription(id, mIDM, getter, setter, marginComponent, marginDiv) {
    let div = (0, _htmlJs.createFlexDiv)(undefined, marginDiv);
    let buttonTextContentSelected = (0, _appJs.s_description) + (0, _appJs.sy_selected);
    let buttonTextContentDeselected = (0, _appJs.s_description) + (0, _appJs.sy_deselected);
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, mIDM.addID(id, (0, _htmlJs.s_button)), marginComponent);
    div.appendChild(button);
    button.classList.add((0, _appJs.s_optionOn));
    button.classList.add((0, _appJs.s_optionOff));
    let inputId = mIDM.addID(id, (0, _appJs.s_description), (0, _appJs.s_input));
    let value = getter();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, _appJs.s_optionOn));
    } else {
        addDescription(div, inputId, value, setter, marginComponent);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle((0, _appJs.s_optionOff));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event)=>{
        if (document.getElementById(inputId) == null) {
            addDescription(div, inputId, value, setter, marginComponent);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, _appJs.s_optionOn));
        button.classList.toggle((0, _appJs.s_optionOff));
    });
    return div;
}
/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param value The description value.
 * @param setter The setter function to call.
 * @param margin The margin.
 */ function addDescription(div, id, value, setter, margin) {
    let valueString;
    if (value == undefined) valueString = "";
    else valueString = value;
    let input = (0, _htmlJs.createInput)("text", id, margin);
    input.addEventListener('change', (event)=>{
        let target = event.target;
        setter(target.value);
        console.log(id + " changed from " + value + " to " + target.value);
        (0, _htmlJs.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, _htmlJs.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * 
 * Creates and returns a button for adding a new atom. This will add a new atom div to the atomArrayDiv. The atom div added
 * will have: label (atom id); editable details (elementType, x3, y3, z3); and a remove button. Select elements that allow 
 * for selecting atoms are updated so options reflect any added or removed atoms.
 * 
 * @param molecule The molecule.
 * @param aaDiv The atom array div.
 * @param typeID The type incorporated into an id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The add bond button.
 */ function getAddAtomButton(mIDM, molecule, aaDiv, typeID, boundary, level) {
    // Create an add atom button.
    let button = (0, _htmlJs.createButton)((0, _appJs.s_Add_sy_add), mIDM.addID(aaDiv.id, "Add" + typeID + "Button"), level);
    button.addEventListener('click', ()=>{
        let attributes = new Map();
        let a = new (0, _xmlMoleculeJs.Atom)(attributes, molecule);
        //let aID: string = molecule.getAtoms().addAtom(a);
        aaDiv.insertBefore(addAtom(true, mIDM, molecule, aaDiv.id, molecule.getAtoms(), a, boundary, level), button);
    });
    return button;
}
/**
 * Adds metadata.
 * @param m The molecule.
 * @param md The metadata.
 * @param ml The metadata list.
 * @param mdDivID The metadata div id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The metadata div.
 */ function addMetadata(m, md, ml, mdDivID, boundary, level) {
    ml.addMetadata(md);
    let mdDiv = (0, _htmlJs.createFlexDiv)(mdDivID, level);
    mdDiv.appendChild((0, _htmlJs.createLabel)(m.getLabel(), boundary));
    return mdDiv;
}
/**
 * Adds an atom.
 * 
 * @param molecule The molecule.
 * @param a The atom to add.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns A new div for the atom.
 */ function addAtom(addToArray, mIDM, molecule, aaDivID, aa, a, boundary, level) {
    let aID;
    if (addToArray) aID = aa.addAtom(a, a.getID());
    else aID = a.getID();
    //let aDivID: string = mIDM.addID(aaDivID, aID);
    let aDivID = (0, _utilJs.getID)(aaDivID, aID);
    let aDiv = (0, _htmlJs.createFlexDiv)(aDivID, level);
    aDiv.appendChild((0, _htmlJs.createLabel)(aID, boundary));
    // elementType.
    processElementType(mIDM, a, aDiv, true, boundary);
    // Coordinates.
    processCoordinates(mIDM, a, aDiv, boundary, boundary);
    (0, _appJs.addRemoveButton)(aDiv, boundary, removeAtom, molecule, aID, mIDM);
    // Get elements with Bond.s_atomRefs2 className. These select elements are to be updated to include the new atom option.
    (0, _appJs.addOptionByClassName)((0, _xmlMoleculeJs.Bond).s_atomRefs2, aID);
    return aDiv;
}
/**
 * Remove an atom from the AtomArray.
 * @param molecule The molecule.
 * @param aID The atom id to remove.
 */ function removeAtom(molecule, aID, aIDs) {
    molecule.getAtoms().removeAtom(aID);
    aIDs.forEach((x)=>{
        console.log("Removing " + x);
        (0, _appJs.remove)(x);
    });
    (0, _appJs.removeOptionByClassName)((0, _xmlMoleculeJs.Bond).s_atomRefs2, aID);
    molecule.getBonds().bonds.forEach((bond)=>{
        let atomRefs2 = bond.getAtomRefs2();
        let atomRefs = atomRefs2.split(" ");
        if (atomRefs[0] == atomRefs[1]) {
            let bondId = bond.getID();
            //console.log("Removing bond " + bondId + " as it references atom " + id);
            molecule.getBonds().removeBond(bondId);
            (0, _appJs.removeOptionByClassName)((0, _xmlMoleculeJs.Bond).tagName, bondId);
            // remove the bondDiv element.
            let bID = (0, _utilJs.getID)((0, _xmlMoleculeJs.Molecule).tagName, molecule.id, (0, _xmlMoleculeJs.BondArray).tagName, bondId);
            let bondDiv = document.getElementById(bID);
            if (bondDiv == null) throw new Error("Bond div with id " + bID + " not found.");
            else bondDiv.remove();
        }
    });
}
/**
 * For processing the elementType of an Atom.
 * @param a The atom.
 * @param aDiv The atom div which is appended to.
 * @param first If true, an option is added with instructions for the selection.
 * @param margin The margin for the components.
 * @returns A HTMLDivElement containing the HTMLLabelElement and HTMLSelectElement elements.
 */ function processElementType(mIDM, a, aDiv, first, margin) {
    let elementType = a.getElementType();
    //console.log("Atom.s_elementType " + elementType);
    let selectTypes = (0, _xmlMesmerJs.Mesmer).elementTypes;
    // Select.
    if (elementType == undefined) {
        elementType = (0, _appJs.s_selectOption);
        (0, _appJs.addOrRemoveInstructions)(selectTypes, first);
    //console.log("Atom.s_elementTypes " + arrayToString(Atom.elementTypes));
    }
    //let id = mIDM.addID(aDiv.id, Atom.s_elementType);
    let id = (0, _utilJs.getID)(aDiv.id, (0, _xmlMoleculeJs.Atom).s_elementType);
    let lws = (0, _htmlJs.createLabelWithSelect)((0, _xmlMoleculeJs.Atom).s_elementType, selectTypes, (0, _xmlMoleculeJs.Atom).s_elementType, elementType, id, margin, margin);
    let select = lws.querySelector('select');
    select.addEventListener('change', (event)=>{
        let target = event.target;
        a.setElementType(target.value);
        (0, _htmlJs.resizeSelectElement)(target);
    });
    select.value = elementType;
    (0, _htmlJs.resizeSelectElement)(select);
    (0, _appJs.selectAnotherOptionEventListener)(selectTypes, select);
    aDiv.appendChild(lws);
    return lws;
}
/**
 * Process atom coordinates.
 * @param a The atom.
 * @param aDiv The atom div.
 * @param aIDs The atom ids.
 * @param marginComponent The margin for the components.
 * @param margin The margin.
 */ function processCoordinates(mIDM, a, aDiv, marginComponent, margin) {
    let id;
    //id = mIDM.addID(aDiv.id, Atom.s_x3);
    id = (0, _utilJs.getID)(aDiv.id, (0, _xmlMoleculeJs.Atom).s_x3);
    aDiv.appendChild((0, _appJs.processNumber)(id, mIDM, (0, _xmlMoleculeJs.Atom).s_x3, a.getX3.bind(a), a.setX3.bind(a), a.removeX3, marginComponent, margin));
    //id = mIDM.addID(aDiv.id, Atom.s_y3);
    id = (0, _utilJs.getID)(aDiv.id, (0, _xmlMoleculeJs.Atom).s_y3);
    aDiv.appendChild((0, _appJs.processNumber)(id, mIDM, (0, _xmlMoleculeJs.Atom).s_y3, a.getY3.bind(a), a.setY3.bind(a), a.removeY3, marginComponent, margin));
    //id = mIDM.addID(aDiv.id, Atom.s_z3);
    id = (0, _utilJs.getID)(aDiv.id, (0, _xmlMoleculeJs.Atom).s_z3);
    aDiv.appendChild((0, _appJs.processNumber)(id, mIDM, (0, _xmlMoleculeJs.Atom).s_z3, a.getZ3.bind(a), a.setZ3.bind(a), a.removeZ3, marginComponent, margin));
}
/**
 * Creates and returns a button for adding a new bond. This will add a new bond div to the bondArrayDiv. The bond div added
 * will have: label (bond id); editable details (atomRefs2 and order); and a remove button. Select elements that allow for 
 * selecting bonds are updated so options reflect any added or removed bonds.
 * 
 * @param molecule The molecule.
 * @param baDiv The bond array div.
 * @param typeID The type incorporated into an id.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The add bond button.
 */ function getAddBondButton(mIDM, molecule, baDiv, typeID, boundary, level) {
    // Create an add button.
    let id = mIDM.addID(baDiv.id, typeID, (0, _htmlJs.s_button));
    let button = (0, _htmlJs.createButton)((0, _appJs.s_Add_sy_add), id, level);
    button.addEventListener('click', ()=>{
        let atoms = molecule.getAtoms().atoms;
        if (atoms.size < 2) {
            alert("There must be at least 2 atoms to create a bond.");
            return;
        }
        let attributes = new Map();
        let atomRefs2 = Array.from(atoms.keys()).slice(0, 2).join(" ");
        attributes.set((0, _xmlMoleculeJs.Bond).s_atomRefs2, atomRefs2);
        let b = new (0, _xmlMoleculeJs.Bond)(attributes, molecule);
        baDiv.insertBefore(addBond(true, mIDM, molecule, baDiv.id, atoms, molecule.getBonds(), b, boundary, level), button);
    });
    baDiv.appendChild(button);
    return button;
}
/**
 * Add a bond.
 * @param molecule The molecule.
 * @param atoms The atoms.
 * @param b The bond.
 * @param boundary The margin for components.
 * @param level The margin for the div.
 * @returns The a new div for the bond.
 */ function addBond(addToArray, mIDM, molecule, baDivID, atoms, ba, b, boundary, level) {
    let bID;
    if (addToArray) bID = ba.addBond(b, b.getID());
    else bID = b.getID();
    let bDivID = (0, _utilJs.getID)(baDivID, bID);
    let bDiv = (0, _htmlJs.createFlexDiv)(bDivID, level);
    bDiv.appendChild((0, _htmlJs.createLabel)(bID, boundary));
    // atomRefs2.
    processAtomRefs2(mIDM, molecule, bDiv, b, boundary);
    // order.
    processOrder(mIDM, bDiv, b, boundary);
    // Add to the classlists so that bondDivs involving particular atoms can be found.
    Array.from(atoms.keys()).forEach((atomId)=>{
        bDiv.classList.add(atomId);
    });
    // Add remove button.
    let removeBond = (id)=>molecule.getBonds().removeBond(id);
    (0, _appJs.addRemoveButton)(bDiv, boundary, removeBond, bID);
    // Get elements with Bond className. These select elements are to be updated to include the new bond option.
    (0, _appJs.addOptionByClassName)((0, _xmlMoleculeJs.Bond).tagName, bID);
    return bDiv;
}
/**
 * For processing the atomRefs2 of a Bond.
 * 
 * @param molecule The molecule.
 * @param bDiv The bond div.
 * @param bond The bond.
 * @param inputId The input id.
 * @param margin The margin for the components.
 */ function processAtomRefs2(mIDM, molecule, bDiv, bond, margin) {
    //let id = mIDM.addID(bDiv.id, Bond.s_atomRefs2);
    let id = (0, _utilJs.getID)(bDiv.id, (0, _xmlMoleculeJs.Bond).s_atomRefs2);
    //bIDs.add(id);
    let atomRefs2 = bond.getAtomRefs2();
    let atomRefs = atomRefs2.split(" ");
    let atomRefOptions = Array.from(molecule.getAtoms().atoms.keys());
    // alws.
    //let alwsID: string = mIDM.addID(id, 0);
    let alwsID = (0, _utilJs.getID)(id, 0);
    //bIDs.add(alwsID);
    let alws = (0, _htmlJs.createLabelWithSelect)((0, _xmlMoleculeJs.Bond).s_atomRefs2 + "[0]", atomRefOptions, (0, _xmlMoleculeJs.Atom).tagName, atomRefs[0], alwsID, margin, margin);
    let aselect = alws.querySelector('select');
    aselect.classList.add((0, _xmlMoleculeJs.Bond).s_atomRefs2);
    aselect.addEventListener('change', (event)=>{
        let target = event.target;
        let atomRefs2 = target.value + " " + atomRefs[1];
        console.log((0, _xmlMoleculeJs.Bond).s_atomRefs2 + " changed to " + atomRefs2);
        bond.setAtomRefs2(atomRefs2);
        (0, _htmlJs.resizeSelectElement)(target);
    });
    aselect.value = atomRefs[0];
    (0, _htmlJs.resizeSelectElement)(aselect);
    bDiv.appendChild(alws);
    // blws.
    //let blwsID: string = mIDM.addID(id, 1);
    let blwsID = (0, _utilJs.getID)(id, 1);
    //bIDs.add(blwsID);
    let blws = (0, _htmlJs.createLabelWithSelect)((0, _xmlMoleculeJs.Bond).s_atomRefs2 + "[1]", atomRefOptions, (0, _xmlMoleculeJs.Atom).tagName, atomRefs[1], blwsID, margin, margin);
    let bselect = blws.querySelector('select');
    bselect.classList.add((0, _xmlMoleculeJs.Bond).s_atomRefs2);
    bselect.addEventListener('change', (event)=>{
        let target = event.target;
        let atomRefs2 = atomRefs[0] + " " + target.value;
        console.log((0, _xmlMoleculeJs.Bond).s_atomRefs2 + " changed to " + atomRefs2);
        bond.setAtomRefs2(atomRefs2);
        (0, _htmlJs.resizeSelectElement)(target);
    });
    bselect.value = atomRefs[1];
    (0, _htmlJs.resizeSelectElement)(bselect);
    bDiv.appendChild(blws);
}
/**
 * Process an order.
 * @param bondDiv The bond div.
 * @param bond The bond.
 * @param margin The margin for components.
 */ function processOrder(mIDM, bondDiv, bond, margin) {
    //let id = mIDM.addID(bondDiv.id, Bond.s_order);
    let id = (0, _utilJs.getID)(bondDiv.id, (0, _xmlMoleculeJs.Bond).s_order);
    let div = (0, _htmlJs.createFlexDiv)(undefined, margin);
    bondDiv.appendChild(div);
    let buttonTextContentSelected = (0, _xmlMoleculeJs.Bond).s_order + (0, _appJs.sy_selected);
    let buttonTextContentDeselected = (0, _xmlMoleculeJs.Bond).s_order + (0, _appJs.sy_deselected);
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, undefined, margin);
    div.appendChild(button);
    button.classList.add((0, _appJs.s_optionOn));
    button.classList.add((0, _appJs.s_optionOff));
    let value = bond.getOrder();
    if (value == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, _appJs.s_optionOn));
    } else {
        addOrder(div, bond, id, value, margin);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle((0, _appJs.s_optionOff));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event)=>{
        if (document.getElementById(id) == null) {
            if (value == undefined) value = 1;
            addOrder(div, bond, id, value, margin);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove any existing div.
            document.getElementById(id)?.remove();
            console.log("Removed " + id);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, _appJs.s_optionOn));
        button.classList.toggle((0, _appJs.s_optionOff));
    });
}
/**
 * @param div The div to add the input to.
 * @param bond The bond.
 * @param id The id.
 * @param value The order value.
 * @param boundary The boundary.
 */ function addOrder(div, bond, id, value, boundary) {
    let valueString = value.toString();
    let select = (0, _htmlJs.createSelectElement)((0, _xmlMoleculeJs.Bond).orderOptions, (0, _xmlMoleculeJs.Bond).s_order, valueString, id, boundary);
    select.addEventListener('change', (event)=>{
        let target = event.target;
        bond.setOrder(parseFloat(target.value));
        console.log((0, _xmlMoleculeJs.Bond).s_order + " changed from " + valueString + " to " + target.value);
        (0, _htmlJs.resizeSelectElement)(target);
    });
    select.value = valueString;
    (0, _htmlJs.resizeSelectElement)(select);
    select.id = id;
    div.appendChild(select);
}
/**
 * Process an order.
 * @param hrpDiv The HinderedRotorPotential div.
 * @param margin The margin for components.
 */ function processUseSineTerms(mIDM, hrpDiv, hrp, margin) {
    let id = mIDM.addID(hrpDiv.id, (0, _xmlMoleculeJs.HinderedRotorPotential).s_useSineTerms);
    let buttonTextContentSelected = (0, _xmlMoleculeJs.HinderedRotorPotential).s_useSineTerms + (0, _appJs.sy_selected);
    let buttonTextContentDeselected = (0, _xmlMoleculeJs.HinderedRotorPotential).s_useSineTerms + (0, _appJs.sy_deselected);
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, undefined, margin);
    hrpDiv.appendChild(button);
    button.classList.add((0, _appJs.s_optionOn));
    button.classList.add((0, _appJs.s_optionOff));
    if (hrp.getUseSineTerms() == true) {
        button.textContent = buttonTextContentSelected;
        button.classList.toggle((0, _appJs.s_optionOff));
    } else {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, _appJs.s_optionOn));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event)=>{
        if (hrp.getUseSineTerms() == false) {
            hrp.setUseSineTerms(true);
            button.textContent = buttonTextContentSelected;
        } else {
            hrp.setUseSineTerms(false);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, _appJs.s_optionOn));
        button.classList.toggle((0, _appJs.s_optionOff));
    });
}
function processMoleculeList(xml, mIDM, molecules) {
    // Create div to contain the molecules list.
    let mlDiv = (0, _htmlJs.createDiv)(undefined, (0, _appJs.boundary1));
    // Get the XML "moleculeList" element.
    let xml_ml = (0, _xmlJs.getSingularElement)(xml, (0, _xmlMesmerJs.MoleculeList).tagName);
    // Check the XML "moleculeList" element has one or more "molecule" elements and no other elements.
    let mlTagNames = new Set();
    xml_ml.childNodes.forEach(function(node) {
        mlTagNames.add(node.nodeName);
    });
    if (mlTagNames.size != 1) {
        if (!(mlTagNames.size == 2 && mlTagNames.has("#text"))) {
            console.error("moleculeListTagNames:");
            mlTagNames.forEach((x)=>console.error(x));
            console.warn("Additional tag names in moleculeList:");
        }
    }
    if (!mlTagNames.has((0, _xmlMoleculeJs.Molecule).tagName)) {
        console.warn("Expecting tags with \"" + (0, _xmlMoleculeJs.Molecule).tagName + "\" tagName but there are none! Please add molecules to the moleculeList.");
        // Add add molecule button.
        let amb = mlDiv.appendChild(getAddMoleculeButton(mlDiv, mIDM, molecules));
        // Add add from library button.
        mlDiv.appendChild(getAddFromLibraryButton(mlDiv, amb, mIDM, molecules));
        return mlDiv;
    }
    // Process the XML "molecule" elements.
    let xml_ms = xml_ml.getElementsByTagName((0, _xmlMoleculeJs.Molecule).tagName);
    let xml_msl = xml_ms.length;
    console.log("Number of molecules=" + xml_msl);
    //xml_molecules.forEach(function (xml_molecule) { // Cannot iterate over HTMLCollectionOf<Element> like this.
    for(let i = 0; i < xml_msl; i++){
        // Create a new Molecule.
        let mDivID = mIDM.addID((0, _xmlMoleculeJs.Molecule).tagName, i);
        let mDiv = (0, _htmlJs.createDiv)(mDivID);
        let attributes = (0, _xmlJs.getAttributes)(xml_ms[i]);
        let m = new (0, _xmlMoleculeJs.Molecule)(attributes, attributes.get((0, _xmlMoleculeJs.Molecule).s_id));
        (0, _appJs.addMolecule)(false, m, molecules);
        // Create collapsible Molecule HTMLDivElement.
        let mcDivID = mIDM.addID(mDivID, (0, _appJs.s_container));
        let mcDiv = (0, _htmlJs.getCollapsibleDiv)(mcDivID, mlDiv, null, mDiv, m.getLabel(), (0, _appJs.boundary1), (0, _appJs.level1));
        // Create a set of molecule tag names.
        let moleculeTagNames = new Set();
        let cns = xml_ms[i].childNodes;
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
        // Add edit Name button.
        addEditIDButton(m, molecules, mcDiv.querySelector((0, _htmlJs.s_button)), mIDM, mDiv, (0, _appJs.level1));
        // Description
        mDiv.appendChild(processDescription(mIDM.addID(mDivID, (0, _appJs.s_description)), mIDM, m.getDescription.bind(m), m.setDescription.bind(m), (0, _appJs.boundary1), (0, _appJs.level1)));
        // Init metadataList.
        //console.log("Init metadataList.");
        let xml_mls = xml_ms[i].getElementsByTagName((0, _xmlMetadataJs.MetadataList).tagName);
        if (xml_mls.length > 0) {
            if (xml_mls.length > 1) console.warn("Expecting 1 or 0 " + (0, _xmlMetadataJs.MetadataList).tagName + " but finding " + xml_mls.length + ". Loading the first of these...");
            // Create collapsible MetadataList HTMLDivElement.
            let mdlDivID = mIDM.addID(mDivID, (0, _xmlMetadataJs.MetadataList).tagName);
            let mdlDiv = (0, _htmlJs.createDiv)(mdlDivID);
            let mdlcDivID = mIDM.addID(mdlDivID, (0, _appJs.s_container));
            let mdlcDiv = (0, _htmlJs.getCollapsibleDiv)(mdlcDivID, mDiv, null, mdlDiv, (0, _xmlMetadataJs.MetadataList).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
            let xml_ml = xml_mls[0];
            let xml_ms = xml_ml.getElementsByTagName((0, _xmlMetadataJs.Metadata).tagName);
            let ml = new (0, _xmlMetadataJs.MetadataList)((0, _xmlJs.getAttributes)(xml_mls[0]));
            m.setMetadataList(ml);
            for(let j = 0; j < xml_ms.length; j++){
                // Create a new Metadata.
                let md = new (0, _xmlMetadataJs.Metadata)((0, _xmlJs.getAttributes)(xml_ms[j]));
                mdlDiv.appendChild(addMetadata(m, md, ml, mIDM.addID(mdlDivID, j), (0, _appJs.boundary1), (0, _appJs.level1)));
            }
            moleculeTagNames.delete((0, _xmlMetadataJs.MetadataList).tagName);
        }
        // Init atoms.
        let xml_aas = xml_ms[i].getElementsByTagName((0, _xmlMoleculeJs.AtomArray).tagName);
        // Create collapsible AtomArray HTMLDivElement.
        let aaDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.AtomArray).tagName);
        let aaDiv = (0, _htmlJs.createDiv)(aaDivID);
        let aacDivID = mIDM.addID(aaDivID, (0, _appJs.s_container));
        let aacDiv = (0, _htmlJs.getCollapsibleDiv)(aacDivID, mDiv, null, aaDiv, (0, _xmlMoleculeJs.AtomArray).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
        // There should be at least one atom!
        // Atoms may be in AtomArrays or not.
        // If any AtomArray elements have attributes, there will be a console warning.
        // There will be a single AtomArray containing any Atoms.
        let aa = new (0, _xmlMoleculeJs.AtomArray)(new Map());
        m.setAtoms(aa);
        for(let j = 0; j < xml_aas.length; j++){
            let aaa = (0, _xmlJs.getAttributes)(xml_aas[j]);
            if (aaa.size > 0) console.warn("AtomArray attributes lost/ignored: " + (0, _utilJs.mapToString)(aaa));
        }
        let xml_as = xml_ms[i].getElementsByTagName((0, _xmlMoleculeJs.Atom).tagName);
        for(let j = 0; j < xml_as.length; j++)aaDiv.appendChild(addAtom(true, mIDM, m, aaDivID, aa, new (0, _xmlMoleculeJs.Atom)((0, _xmlJs.getAttributes)(xml_as[j]), m), (0, _appJs.boundary1), (0, _appJs.level1)));
        aaDiv.appendChild(getAddAtomButton(mIDM, m, aaDiv, (0, _xmlMoleculeJs.Atom).tagName, (0, _appJs.boundary1), (0, _appJs.level1)));
        moleculeTagNames.delete((0, _xmlMoleculeJs.Atom).tagName);
        // Init bonds.
        let xml_bas = xml_ms[i].getElementsByTagName((0, _xmlMoleculeJs.BondArray).tagName);
        // Create collapsible BondArray HTMLDivElement.
        let baDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.BondArray).tagName);
        let baDiv = (0, _htmlJs.createDiv)(baDivID);
        let bacDivID = mIDM.addID(baDivID, (0, _appJs.s_container));
        let bacDiv = (0, _htmlJs.getCollapsibleDiv)(bacDivID, mDiv, null, baDiv, (0, _xmlMoleculeJs.BondArray).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
        // Bonds may be in BondArrays or not.
        // If any BondArray elements have attributes, there will be a console warning.
        // There will be a single BondArray containing any Bonds.
        let ba = new (0, _xmlMoleculeJs.BondArray)(new Map());
        m.setBonds(ba);
        for(let j = 0; j < xml_bas.length; j++){
            let baa = (0, _xmlJs.getAttributes)(xml_bas[j]);
            if (baa.size > 0) console.warn("BondArray attributes lost/ignored: " + (0, _utilJs.mapToString)(baa));
        }
        let xml_bs = xml_ms[i].getElementsByTagName((0, _xmlMoleculeJs.Bond).tagName);
        for(let j = 0; j < xml_bs.length; j++){
            // Load those bonds that have an id attribute first.
            let b_attributes = (0, _xmlJs.getAttributes)(xml_bs[j]);
            if (b_attributes.has((0, _xmlMoleculeJs.Bond).s_id)) baDiv.appendChild(addBond(true, mIDM, m, baDivID, m.getAtoms().atoms, ba, new (0, _xmlMoleculeJs.Bond)((0, _xmlJs.getAttributes)(xml_bs[j]), m), (0, _appJs.boundary1), (0, _appJs.level1)));
        }
        // Load those bonds that do not have an id attribute.
        for(let j = 0; j < xml_bs.length; j++){
            let b_attributes = (0, _xmlJs.getAttributes)(xml_bs[j]);
            if (!b_attributes.has((0, _xmlMoleculeJs.Bond).s_id)) baDiv.appendChild(addBond(true, mIDM, m, baDivID, m.getAtoms().atoms, ba, new (0, _xmlMoleculeJs.Bond)((0, _xmlJs.getAttributes)(xml_bs[j]), m), (0, _appJs.boundary1), (0, _appJs.level1)));
        }
        baDiv.appendChild(getAddBondButton(mIDM, m, baDiv, (0, _xmlMoleculeJs.Bond).tagName, (0, _appJs.boundary1), (0, _appJs.level1)));
        moleculeTagNames.delete((0, _xmlMoleculeJs.Bond).tagName);
        // Add a viewer for the molecule.
        // Create collapsible viewer HTMLDivElement.
        let viewerDivID = mIDM.addID(mDivID, (0, _appJs.s_viewer));
        let viewerDiv = (0, _htmlJs.createDiv)(viewerDivID);
        let viewercDivID = mIDM.addID(viewerDivID, (0, _appJs.s_container));
        let viewercDiv = (0, _htmlJs.getCollapsibleDiv)(viewercDivID, mDiv, null, viewerDiv, (0, _appJs.s_viewer), (0, _appJs.boundary1), (0, _appJs.level1));
        create3DViewer(mIDM, m, viewerDiv, (0, _appJs.boundary1), (0, _appJs.level1));
        // Init properties.
        let xml_pls = xml_ms[i].getElementsByTagName((0, _xmlMoleculeJs.PropertyList).tagName);
        // Create a new collapsible div for the PropertyList.
        let plDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.PropertyList).tagName);
        let plDiv = (0, _htmlJs.createDiv)(plDivID);
        let plcDivID = mIDM.addID(plDivID, (0, _appJs.s_container));
        let plcDiv = (0, _htmlJs.getCollapsibleDiv)(plcDivID, mDiv, null, plDiv, (0, _xmlMoleculeJs.PropertyList).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
        // Properties may be in a PropertyList or not.
        if (xml_pls.length > 1) console.warn("Expecting 1 or 0 " + (0, _xmlMoleculeJs.PropertyList).tagName + " but finding " + xml_pls.length + ". Loading the first of these...");
        let dictRefs = new Set();
        let dictRefMap = new Map();
        let pl;
        let xml_ps;
        if (xml_pls.length > 0) {
            pl = new (0, _xmlMoleculeJs.PropertyList)((0, _xmlJs.getAttributes)(xml_pls[0]));
            xml_ps = xml_pls[0].getElementsByTagName((0, _xmlMoleculeJs.Property).tagName);
            // Init dictRefs
            for(let j = 0; j < xml_ps.length; j++){
                let p = new (0, _xmlMoleculeJs.Property)((0, _xmlJs.getAttributes)(xml_ps[j]));
                dictRefs.add(p.dictRef);
                dictRefMap.set(p.dictRef, j);
            }
        } else pl = new (0, _xmlMoleculeJs.PropertyList)(new Map());
        m.setPropertyList(pl);
        moleculeTagNames.delete((0, _xmlMoleculeJs.PropertyList).tagName);
        let pID;
        let deselect = false;
        // "me:ZPE", scalar, Mesmer.energyUnits.
        if (!dictRefs.has((0, _xmlMoleculeJs.ZPE).dictRef)) addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.ZPE).dictRef, (0, _xmlMesmerJs.Mesmer).energyUnits);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.ZPE).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.ZPE).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        // Get button from div and click
        //let button: HTMLButtonElement = plDiv.querySelector(s_button) as HTMLButtonElement;
        //button.click();
        /*
            let p: Property = pl.getProperty(ZPE.dictRef) as Property;
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.energyUnits, ps.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */ }
        // "me:Hf0", scalar, Mesmer.energyUnits.
        if (!dictRefs.has((0, _xmlMoleculeJs.Hf0).dictRef)) {
            let div = addPropertyScalar(true, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Hf0).dictRef, (0, _xmlMesmerJs.Mesmer).energyUnits);
        // Click the button.
        //let b: HTMLButtonElement = div.querySelector(s_button)!;
        //b!.click();
        //pl.removeProperty(SpinMultiplicity.dictRef);
        } else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.Hf0).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.Hf0).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let p: Property = pl.getProperty(Hf0.dictRef) as Property;
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.energyUnits, ps.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */ }
        // "me:HfAT0", scalar, Mesmer.energyUnits.
        if (!dictRefs.has((0, _xmlMoleculeJs.HfAT0).dictRef)) addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.HfAT0).dictRef, (0, _xmlMesmerJs.Mesmer).energyUnits);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.HfAT0).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.HfAT0).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.energyUnits, ps.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */ }
        // "me:Hf298", scalar, Mesmer.energyUnits.
        if (!dictRefs.has((0, _xmlMoleculeJs.Hf298).dictRef)) addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Hf298).dictRef, (0, _xmlMesmerJs.Mesmer).energyUnits);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.Hf298).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.Hf298).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.energyUnits, ps.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */ }
        // "me:rotConsts", array, Mesmer.frequencyUnits.
        if (!dictRefs.has((0, _xmlMoleculeJs.RotConsts).dictRef)) addPropertyArray(deselect, false, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.RotConsts).dictRef, (0, _xmlMesmerJs.Mesmer).frequencyUnits);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.RotConsts).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.RotConsts).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let pa: PropertyArray = p.getProperty() as PropertyArray;
            let div: HTMLDivElement = processNumberArrayOrMatrix(plDiv.id, mIDM, p.dictRef, pa, pa.getValues.bind(pa),
                (values: Big[]) => setPropertyArrayOrMatrix(p.dictRef, pl, pa, values),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.frequencyUnits, pa.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */ }
        // "me:symmetryNumber", scalar, No units.
        if (!dictRefs.has((0, _xmlMoleculeJs.SymmetryNumber).dictRef)) addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.SymmetryNumber).dictRef, undefined);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.SymmetryNumber).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.SymmetryNumber).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            plDiv.appendChild(div);
            */ }
        // "me:TSOpticalSymmetryNumber", scalar, No units.
        if (!dictRefs.has((0, _xmlMoleculeJs.TSOpticalSymmetryNumber).dictRef)) addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.TSOpticalSymmetryNumber).dictRef, undefined);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.TSOpticalSymmetryNumber).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.TSOpticalSymmetryNumber).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            plDiv.appendChild(div);
            */ }
        // "me:frequenciesScaleFactor", scalar, No units.
        if (!dictRefs.has((0, _xmlMoleculeJs.FrequenciesScaleFactor).dictRef)) addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.FrequenciesScaleFactor).dictRef, undefined);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.FrequenciesScaleFactor).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.FrequenciesScaleFactor).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            plDiv.appendChild(div);
            */ }
        // "me:vibFreqs", array, cm-1.
        if (!dictRefs.has((0, _xmlMoleculeJs.VibFreqs).dictRef)) addPropertyArray(deselect, false, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.VibFreqs).dictRef, (0, _xmlMesmerJs.Mesmer).frequencyUnits);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.VibFreqs).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.VibFreqs).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let pa: PropertyArray = p.getProperty() as PropertyArray;
            let div: HTMLDivElement = processNumberArrayOrMatrix(plDiv.id, mIDM, p.dictRef, pa, pa.getValues.bind(pa),
                (values: Big[]) => setPropertyArrayOrMatrix(p.dictRef, pl, pa, values),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.frequencyUnits, pa.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */ }
        // "me:MW", scalar, amu.
        if (!dictRefs.has((0, _xmlMoleculeJs.MW).dictRef)) addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.MW).dictRef, (0, _xmlMesmerJs.Mesmer).massUnits);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.MW).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.MW).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.massUnits, ps.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */ }
        // "me:spinMultiplicity", scalar, No units.
        if (!dictRefs.has((0, _xmlMoleculeJs.SpinMultiplicity).dictRef)) {
            let div = addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.SpinMultiplicity).dictRef, undefined);
            // Click the button.
            let b = div.querySelector((0, _htmlJs.s_button));
            b.click();
            pl.removeProperty((0, _xmlMoleculeJs.SpinMultiplicity).dictRef);
        } else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.SpinMultiplicity).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.SpinMultiplicity).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            plDiv.appendChild(div);
            */ }
        // "me:epsilon", scalar, K (fixed).
        if (!dictRefs.has((0, _xmlMoleculeJs.Epsilon).dictRef)) addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Epsilon).dictRef, (0, _xmlMesmerJs.Mesmer).temperatureUnits);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.Epsilon).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.Epsilon).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            plDiv.appendChild(div);
            */ }
        // "me:sigma", scalar, Å (fixed).
        if (!dictRefs.has((0, _xmlMoleculeJs.Sigma).dictRef)) addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Sigma).dictRef, (0, _xmlMesmerJs.Mesmer).lengthUnits);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.Sigma).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.Sigma).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            plDiv.appendChild(div);
            */ }
        // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
        if (!dictRefs.has((0, _xmlMoleculeJs.Hessian).dictRef)) addPropertyMatrix(deselect, false, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.Hessian).dictRef, (0, _xmlMesmerJs.Mesmer).hessianUnits);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.Hessian).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.Hessian).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let pm: PropertyMatrix = p.getProperty() as PropertyMatrix;
            let div: HTMLDivElement = processNumberArrayOrMatrix(plDiv.id, mIDM, p.dictRef, pm, pm.getValues.bind(pm),
                (values: Big[]) => setPropertyArrayOrMatrix(p.dictRef, pl, pm, values),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.hessianUnits, pm.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */ }
        // "me:EinsteinAij", array, s-1 (fixed).
        if (!dictRefs.has((0, _xmlMoleculeJs.EinsteinAij).dictRef)) addPropertyArray(deselect, false, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.EinsteinAij).dictRef, (0, _xmlMesmerJs.Mesmer).EinsteinAUnits);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.EinsteinAij).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.EinsteinAij).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let pa: PropertyArray = p.getProperty() as PropertyArray;
            let div: HTMLDivElement = processNumberArrayOrMatrix(plDiv.id, mIDM, p.dictRef, pa, pa.getValues.bind(pa),
                (values: Big[]) => setPropertyArrayOrMatrix(p.dictRef, pl, pa, values),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.EinsteinAUnits, pa.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */ }
        // "me:EinsteinBij", array, m3/J/s2 (fixed).
        if (!dictRefs.has((0, _xmlMoleculeJs.EinsteinBij).dictRef)) addPropertyArray(deselect, false, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.EinsteinBij).dictRef, (0, _xmlMesmerJs.Mesmer).EinsteinBUnits);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.EinsteinBij).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.EinsteinBij).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let pa: PropertyArray = p.getProperty() as PropertyArray;
            let div: HTMLDivElement = processNumberArrayOrMatrix(plDiv.id, mIDM, p.dictRef, pa, pa.getValues.bind(pa),
                (values: Big[]) => setPropertyArrayOrMatrix(p.dictRef, pl, pa, values),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.EinsteinBUnits, pa.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */ }
        // "me:electronicExcitation", scalar, cm-1.
        if (!dictRefs.has((0, _xmlMoleculeJs.ElectronicExcitation).dictRef)) addPropertyScalar(deselect, m, mIDM, plDiv, pl, (0, _xmlMoleculeJs.ElectronicExcitation).dictRef, (0, _xmlMesmerJs.Mesmer).frequencyUnits);
        else {
            pID = (0, _utilJs.getID)(plDiv.id, (0, _xmlMoleculeJs.ElectronicExcitation).dictRef);
            let j = dictRefMap.get((0, _xmlMoleculeJs.ElectronicExcitation).dictRef);
            let p = createPropertyAndDiv(pl, xml_ps[j], plDiv, m, mIDM, (0, _appJs.boundary1), (0, _appJs.level1));
        /*
            let ps: PropertyScalarNumber = p.getProperty() as PropertyScalarNumber;
            let div: HTMLDivElement = processNumber(pID, mIDM, p.dictRef, ps.getValue.bind(ps),
                (value: Big) => setPropertyScalarNumber(p.dictRef, pl, ps, value),
                () => pl.removeProperty(p.dictRef), boundary1, level1);
            addAnyUnits(Mesmer.frequencyUnits, ps.attributes, div, div.querySelector(s_input) as HTMLElement,
                getID(pID, PropertyScalarNumber.s_units), p.dictRef, boundary1, boundary1);
            plDiv.appendChild(div);
            */ }
        moleculeTagNames.delete((0, _xmlMoleculeJs.PropertyList).tagName);
        moleculeTagNames.delete((0, _xmlMoleculeJs.Property).tagName);
        // Organise EnergyTransferModel.
        let xml_etms = xml_ms[i].getElementsByTagName((0, _xmlMoleculeJs.EnergyTransferModel).tagName);
        if (xml_etms.length > 0) {
            if (xml_etms.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMoleculeJs.EnergyTransferModel).tagName + " but finding " + xml_etms.length + "!");
            let etm = new (0, _xmlMoleculeJs.EnergyTransferModel)((0, _xmlJs.getAttributes)(xml_etms[0]));
            processEnergyTransferModel(mIDM, etm, m, xml_etms[0], mDiv);
            moleculeTagNames.delete((0, _xmlMoleculeJs.EnergyTransferModel).tagName);
        }
        // Organise DOSCMethod.
        let xml_dms = xml_ms[i].getElementsByTagName((0, _xmlMoleculeJs.DOSCMethod).tagName);
        if (xml_dms.length > 0) {
            if (xml_dms.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMoleculeJs.DOSCMethod).tagName + " but finding " + xml_dms.length + "!");
            let doscm = new (0, _xmlMoleculeJs.DOSCMethod)((0, _xmlJs.getAttributes)(xml_dms[0]));
            mDiv.appendChild((0, _htmlJs.createLabelWithSelect)((0, _xmlMoleculeJs.DOSCMethod).tagName, (0, _xmlMoleculeJs.DOSCMethod).xsi_typeOptions, (0, _xmlMoleculeJs.DOSCMethod).tagName, doscm.getXsiType(), mIDM.addID(mDivID, (0, _xmlMoleculeJs.DOSCMethod).tagName), (0, _appJs.boundary1), (0, _appJs.level1)));
            moleculeTagNames.delete((0, _xmlMoleculeJs.DOSCMethod).tagName);
        }
        // Organise DistributionCalcMethod. (Output only)
        let xml_dcms = xml_ms[i].getElementsByTagName((0, _xmlMoleculeJs.DistributionCalcMethod).tagName);
        if (xml_dcms.length > 0) {
            if (xml_dcms.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMoleculeJs.DistributionCalcMethod).tagName + " but finding " + xml_dcms.length + "!");
            let dcmAttributes = (0, _xmlJs.getAttributes)(xml_dcms[0]);
            let dcm = new (0, _xmlMoleculeJs.DistributionCalcMethod)(dcmAttributes);
            m.setDistributionCalcMethod(dcm);
            let dcmDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.DistributionCalcMethod).tagName);
            let dcmDiv = (0, _htmlJs.createDiv)(dcmDivID);
            mDiv.appendChild(dcmDiv);
            // Create label.
            dcmDiv.appendChild((0, _htmlJs.createLabel)((0, _xmlMoleculeJs.DistributionCalcMethod).tagName + " " + (0, _utilJs.mapToString)(dcmAttributes), (0, _appJs.level1)));
            moleculeTagNames.delete((0, _xmlMoleculeJs.DistributionCalcMethod).tagName);
        }
        // Organise DensityOfStatesList. (Output only)
        let xml_dosl = xml_ms[i].getElementsByTagName((0, _xmlMoleculeJs.DensityOfStatesList).tagName);
        if (xml_dosl.length > 0) {
            if (xml_dosl.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMoleculeJs.DensityOfStatesList).tagName + " but finding " + xml_dosl.length + "!");
            let dosl = new (0, _xmlMoleculeJs.DensityOfStatesList)((0, _xmlJs.getAttributes)(xml_dosl[0]));
            m.setDensityOfStatesList(dosl);
            // Create collapsible div.
            let doslDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.DensityOfStatesList).tagName);
            let doslDiv = (0, _htmlJs.createDiv)(doslDivID);
            let doslcDivID = mIDM.addID(doslDivID, (0, _appJs.s_container));
            let doslcDiv = (0, _htmlJs.getCollapsibleDiv)(doslcDivID, mDiv, null, doslDiv, (0, _xmlMoleculeJs.DensityOfStatesList).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
            let xml_dos = xml_dosl[0].getElementsByTagName((0, _xmlMoleculeJs.DensityOfStates).tagName);
            // Organise Description.
            let xml_ds = xml_dosl[0].getElementsByTagName((0, _xmlMesmerJs.Description).tagName);
            if (xml_ds.length > 0) {
                if (xml_ds.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMesmerJs.Description).tagName + " but finding " + xml_ds.length + "!");
                let ds = new (0, _xmlMesmerJs.Description)((0, _xmlJs.getAttributes)(xml_ds[0]), (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_ds[0])));
                dosl.setDescription(ds);
            }
            // Organise DensityOfStates.
            //console.log("xml_dos.length=" + xml_dos.length);
            if (xml_dos.length == 0) throw new Error("Expecting 1 or more " + (0, _xmlMoleculeJs.DensityOfStates).tagName + " but finding 0!");
            else {
                let t = (0, _htmlJs.createTable)(mIDM.addID(doslDivID, (0, _appJs.s_table)), (0, _appJs.level1));
                (0, _htmlJs.addTableHeaderRow)(t, (0, _xmlMoleculeJs.DensityOfStates).header);
                // Append the table to the div.
                doslDiv.appendChild(t);
                for(let j = 0; j < xml_dos.length; j++){
                    //console.log("j=" + j);
                    let dos = new (0, _xmlMoleculeJs.DensityOfStates)((0, _xmlJs.getAttributes)(xml_dos[j]));
                    dosl.addDensityOfStates(dos);
                    let dosDivID = mIDM.addID(doslDivID, j);
                    let dosDiv = (0, _htmlJs.createFlexDiv)(dosDivID, (0, _appJs.level1));
                    doslDiv.appendChild(dosDiv);
                    // T.
                    let xml_t = xml_dos[j].getElementsByTagName((0, _xmlMesmerJs.T).tagName);
                    if (xml_t.length != 1) throw new Error("Expecting 1 " + (0, _xmlMesmerJs.T).tagName + " but finding " + xml_t.length + "!");
                    else {
                        let t = new (0, _xmlMesmerJs.T)((0, _xmlJs.getAttributes)(xml_t[0]), new (0, _bigJsDefault.default)((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_t[0]))));
                        dos.setT(t);
                    //dosDiv.appendChild(createLabel(t.value.toString(), boundary1));
                    }
                    // qtot.
                    let xml_qtot = xml_dos[j].getElementsByTagName((0, _xmlMoleculeJs.Qtot).tagName);
                    if (xml_qtot.length != 1) throw new Error("Expecting 1 " + (0, _xmlMoleculeJs.Qtot).tagName + " but finding " + xml_qtot.length + "!");
                    else {
                        let qtot = new (0, _xmlMoleculeJs.Qtot)((0, _xmlJs.getAttributes)(xml_qtot[0]), new (0, _bigJsDefault.default)((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_qtot[0]))));
                        dos.setQtot(qtot);
                    //dosDiv.appendChild(createLabel(Qtot.tagName + " " + qtot.value.toString(), boundary1));
                    }
                    // sumc.
                    let xml_sumc = xml_dos[j].getElementsByTagName((0, _xmlMoleculeJs.Sumc).tagName);
                    if (xml_sumc.length != 1) throw new Error("Expecting 1 " + (0, _xmlMoleculeJs.Sumc).tagName + " but finding " + xml_sumc.length + "!");
                    else {
                        let sumc = new (0, _xmlMoleculeJs.Sumc)((0, _xmlJs.getAttributes)(xml_sumc[0]), new (0, _bigJsDefault.default)((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_sumc[0]))));
                        dos.setSumc(sumc);
                    //dosDiv.appendChild(createLabel(sumc.value.toString(), boundary1));
                    }
                    // sumg.
                    let xml_sumg = xml_dos[j].getElementsByTagName((0, _xmlMoleculeJs.Sumg).tagName);
                    if (xml_sumg.length != 1) throw new Error("Expecting 1 " + (0, _xmlMoleculeJs.Sumg).tagName + " but finding " + xml_sumg.length + "!");
                    else {
                        let sumg = new (0, _xmlMoleculeJs.Sumg)((0, _xmlJs.getAttributes)(xml_sumg[0]), new (0, _bigJsDefault.default)((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_sumg[0]))));
                        dos.setSumg(sumg);
                    //dosDiv.appendChild(createLabel(sumg.value.toString(), boundary1));
                    }
                    (0, _htmlJs.addTableRow)(t, dos.toStringArray());
                //console.log("dos: " + dos.toString());
                }
                (0, _appJs.addSaveAsCSVButton)(dosl.toCSV, doslDiv, t, m.getID() + "_" + (0, _xmlMoleculeJs.DensityOfStatesList).tagName, (0, _appJs.level1));
            }
            moleculeTagNames.delete((0, _xmlMoleculeJs.DensityOfStatesList).tagName);
        }
        // Organise ThermoTable. (Output only)
        let tttn = (0, _xmlMoleculeJs.ThermoTable).tagName;
        let xml_tts = xml_ms[i].getElementsByTagName(tttn);
        if (xml_tts.length > 0) {
            if (xml_tts.length > 1) throw new Error("Expecting 1 or 0 " + tttn + " but finding " + xml_tts.length + "!");
            let tt = new (0, _xmlMoleculeJs.ThermoTable)((0, _xmlJs.getAttributes)(xml_tts[0]));
            // Create collapsible div.
            let ttDivId = mIDM.addID(mDivID, (0, _xmlMoleculeJs.ThermoTable).tagName);
            let ttDiv = (0, _htmlJs.createDiv)(ttDivId);
            let ttcDivId = mIDM.addID(ttDivId, (0, _appJs.s_container));
            let ttcDiv = (0, _htmlJs.getCollapsibleDiv)(ttcDivId, mDiv, null, ttDiv, tttn, (0, _appJs.boundary1), (0, _appJs.level1));
            let tvs;
            let tvtn = (0, _xmlMoleculeJs.ThermoValue).tagName;
            let xml_tvs = xml_tts[0].getElementsByTagName(tvtn);
            if (xml_tvs.length == 0) throw new Error("Expecting 1 or more " + tvtn + " but finding 0!");
            else {
                tvs = [];
                let t = (0, _htmlJs.createTable)(mIDM.addID(ttDivId, (0, _appJs.s_table)), (0, _appJs.level1));
                (0, _htmlJs.addTableHeaderRow)(t, tt.getHeader());
                for(let j = 0; j < xml_tvs.length; j++){
                    let tv = new (0, _xmlMoleculeJs.ThermoValue)((0, _xmlJs.getAttributes)(xml_tvs[j]));
                    tvs.push(tv);
                    (0, _htmlJs.addTableRow)(t, tv.toStringArray());
                }
                // Append the table to the div.
                ttDiv.appendChild(t);
                tt.init(tvs);
                (0, _appJs.addSaveAsCSVButton)(tt.toCSV.bind(tt), ttDiv, t, mIDM.addID(m.getID(), (0, _xmlMoleculeJs.ThermoTable).tagName), (0, _appJs.level1));
            }
            m.setThermoTable(tt);
            moleculeTagNames.delete(tvtn);
            moleculeTagNames.delete(tttn);
        }
        // Organise ExtraDOSCMethod.
        let xml_edms = xml_ms[i].getElementsByTagName((0, _xmlMoleculeJs.ExtraDOSCMethod).tagName);
        if (xml_edms.length > 0) for(let j = 0; j < xml_edms.length; j++){
            let edm = new (0, _xmlMoleculeJs.ExtraDOSCMethod)((0, _xmlJs.getAttributes)(xml_edms[j]));
            // Create collapsible ExtraDOSCMethod HTMLDivElement.
            let edmDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.ExtraDOSCMethod).tagName, j);
            let edmDiv = (0, _htmlJs.createDiv)(edmDivID);
            let edmcDivID = mIDM.addID(edmDivID, (0, _appJs.s_container));
            let edmcDiv = (0, _htmlJs.getCollapsibleDiv)(edmcDivID, mDiv, null, edmDiv, (0, _xmlMoleculeJs.ExtraDOSCMethod).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
            // Read bondRef.
            let xml_brs = xml_edms[j].getElementsByTagName((0, _xmlMoleculeJs.BondRef).tagName);
            if (xml_brs.length > 0) {
                if (xml_brs.length != 1) throw new Error("Expecting only 1 bondRef, but there are " + xml_brs.length);
                let bids = m.getBonds().getBondIds();
                let br = new (0, _xmlMoleculeJs.BondRef)((0, _xmlJs.getAttributes)(xml_brs[0]), (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_brs[0])));
                let lws = (0, _htmlJs.createLabelWithSelect)((0, _xmlMoleculeJs.BondRef).tagName, bids, (0, _xmlMoleculeJs.BondRef).tagName, br.value, mIDM.addID(edmDivID, (0, _xmlMoleculeJs.BondRef).tagName), (0, _appJs.boundary1), (0, _appJs.level1));
                let select = lws.getElementsByTagName("select")[0];
                select.classList.add((0, _xmlMoleculeJs.Bond).tagName);
                edmDiv.appendChild(lws);
            }
            // Read hinderedRotorPotential.
            let xml_hrps = xml_edms[j].getElementsByTagName((0, _xmlMoleculeJs.HinderedRotorPotential).tagName);
            if (xml_hrps.length > 0) {
                if (xml_hrps.length != 1) throw new Error("Expecting only 1 HinderedRotorPotential, but there are " + xml_hrps.length);
                let hrpAttributes = (0, _xmlJs.getAttributes)(xml_hrps[0]);
                let hrp = new (0, _xmlMoleculeJs.HinderedRotorPotential)(hrpAttributes);
                // Create collapsible HinderedRotorPotential HTMLDivElement.
                let hrpDivID = mIDM.addID(edmDivID, (0, _xmlMoleculeJs.HinderedRotorPotential).tagName);
                let hrpDiv = (0, _htmlJs.createDiv)(hrpDivID);
                let hrpcDivID = mIDM.addID(hrpDivID, (0, _appJs.s_container));
                let hrpcDiv = (0, _htmlJs.getCollapsibleDiv)(hrpcDivID, edmDiv, null, hrpDiv, (0, _xmlMoleculeJs.HinderedRotorPotential).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
                // Format.
                let lws = (0, _htmlJs.createLabelWithSelect)((0, _xmlMoleculeJs.HinderedRotorPotential).s_format, (0, _xmlMoleculeJs.HinderedRotorPotential).formats, (0, _xmlMoleculeJs.HinderedRotorPotential).tagName, hrp.getFormat(), mIDM.addID(hrpDivID, (0, _xmlMoleculeJs.HinderedRotorPotential).s_format), (0, _appJs.boundary1), (0, _appJs.level1));
                hrpDiv.appendChild(lws);
                // Units.
                (0, _appJs.addAnyUnits)((0, _xmlMesmerJs.Mesmer).energyUnits, hrpAttributes, hrpDiv, lws, mIDM.addID(hrpDivID, (0, _xmlMoleculeJs.HinderedRotorPotential).s_units), (0, _xmlMoleculeJs.HinderedRotorPotential).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
                // ExpansionSize.
                let es = hrp.getExpansionSize() ?? (0, _appJs.s_undefined);
                hrpDiv.appendChild((0, _htmlJs.createLabelWithInput)("text", mIDM.addID(hrpDivID, (0, _xmlMoleculeJs.HinderedRotorPotential).s_expansionSize), (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                    let target = event.target;
                    // Check the input is a number.
                    try {
                        console.log("Setting " + (0, _xmlMoleculeJs.HinderedRotorPotential).s_expansionSize + " to " + target.value);
                        hrp.setExpansionSize(new (0, _bigJsDefault.default)(target.value));
                    } catch (e) {
                        alert("Invalid value, resetting...");
                        target.value = hrp.getExpansionSize() ?? (0, _appJs.s_undefined);
                    }
                    (0, _htmlJs.resizeInputElement)(target);
                }, es, (0, _xmlMoleculeJs.HinderedRotorPotential).s_expansionSize));
                // Add useSineTerms.
                processUseSineTerms(mIDM, hrpDiv, hrp, (0, _appJs.level1));
                // Load PotentialPoints.
                // Create collapsible HinderedRotorPotential PotentialPoint HTMLDivElement.
                let ppsDivID = mIDM.addID(hrpDivID, (0, _xmlMoleculeJs.PotentialPoint).tagName);
                let ppsDiv = (0, _htmlJs.createDiv)(ppsDivID);
                let ppscDivID = mIDM.addID(ppsDivID, (0, _appJs.s_container));
                let ppscDiv = (0, _htmlJs.getCollapsibleDiv)(ppscDivID, mDiv, null, ppsDiv, "PotentialPoints", (0, _appJs.boundary1), (0, _appJs.level1));
                hrpDiv.appendChild(ppscDiv);
                let pps = [];
                let xml_pps = xml_hrps[0].getElementsByTagName((0, _xmlMoleculeJs.PotentialPoint).tagName);
                for(let k = 0; k < xml_pps.length; k++){
                    let pp = new (0, _xmlMoleculeJs.PotentialPoint)((0, _xmlJs.getAttributes)(xml_pps[k]));
                    pps.push(pp);
                    let ppDivID = mIDM.addID(ppsDivID, k);
                    let ppDiv = (0, _htmlJs.createFlexDiv)(ppDivID, (0, _appJs.level1));
                    ppsDiv.appendChild(ppDiv);
                    let l = (0, _htmlJs.createLabel)((0, _xmlMoleculeJs.PotentialPoint).tagName + " " + k, (0, _appJs.boundary1));
                    ppDiv.appendChild(l);
                    // Process angle
                    let a = pp.getAngle() ?? (0, _appJs.s_undefined);
                    let anglelwi = (0, _htmlJs.createLabelWithInput)("text", mIDM.addID(ppDivID, (0, _xmlMoleculeJs.PotentialPoint).s_angle), (0, _appJs.boundary1), (0, _appJs.boundary1), (event)=>{
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, _utilJs.isNumeric)(target.value)) {
                            let value = new (0, _bigJsDefault.default)(target.value);
                            pp.setAngle(value);
                        } else {
                            // Reset the input to the current value.
                            alert("Angle input is not a number, resetting...");
                            target.value = pp.getAngle() ?? (0, _appJs.s_undefined);
                        }
                        (0, _htmlJs.resizeInputElement)(target);
                    }, a, (0, _xmlMoleculeJs.PotentialPoint).s_angle);
                    ppDiv.appendChild(anglelwi);
                    // Create a new div element for the potential.
                    let potentialLabel = (0, _htmlJs.createLabel)((0, _xmlMoleculeJs.PotentialPoint).s_potential, (0, _appJs.boundary1));
                    ppDiv.appendChild(potentialLabel);
                    let potentialInputElementId = mIDM.addID(ppDivID, (0, _xmlMoleculeJs.PotentialPoint).s_potential);
                    let potentialInputElement = (0, _htmlJs.createInput)("text", potentialInputElementId, (0, _appJs.boundary1));
                    ppDiv.appendChild(potentialInputElement);
                    let p = pp.getPotential() ?? (0, _appJs.s_undefined);
                    potentialInputElement.addEventListener('change', (event)=>{
                        let target = event.target;
                        // Check the input is a number.
                        if ((0, _utilJs.isNumeric)(target.value)) {
                            let value = new (0, _bigJsDefault.default)(target.value);
                            pp.setPotential(value);
                            console.log("Set " + (0, _xmlMoleculeJs.PotentialPoint).tagName + " to " + value.toExponential());
                        } else {
                            // Reset the input to the current value.
                            alert("Potential input is not a number, resetting...");
                            potentialInputElement.value = pp.getPotential() ?? (0, _appJs.s_undefined);
                        }
                        (0, _htmlJs.resizeInputElement)(potentialInputElement);
                    });
                    potentialInputElement.value = p;
                    (0, _htmlJs.resizeInputElement)(potentialInputElement);
                }
                //ppsDiv.appendChild(ppDiv);
                hrp.setPotentialPoints(pps);
                edm.setHinderedRotorPotential(hrp);
            }
            // Read periodicities.
            let xml_periodicities = xml_edms[j].getElementsByTagName((0, _xmlMoleculeJs.Periodicity).tagName);
            if (xml_periodicities.length > 0) {
                if (xml_periodicities.length != 1) throw new Error("Expecting only 1 Periodicity, but there are " + xml_periodicities.length);
                let valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_periodicities[0]));
                let periodicity = new (0, _xmlMoleculeJs.Periodicity)((0, _xmlJs.getAttributes)(xml_periodicities[0]), new (0, _bigJsDefault.default)(valueString));
                edm.setPeriodicity(periodicity);
                let lwi = (0, _htmlJs.createLabelWithInput)("text", mIDM.addID(edmDivID, (0, _xmlMoleculeJs.Periodicity).tagName), (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                    let target = event.target;
                    valueString = target.value;
                    if ((0, _utilJs.isNumeric)(valueString)) {
                        let value = new (0, _bigJsDefault.default)(valueString);
                        periodicity.value = value;
                        edm.getPeriodicity().value = value;
                        console.log("Set " + (0, _xmlMoleculeJs.Periodicity).tagName + " to " + value);
                    } else {
                        // Reset the input to the current value.
                        alert("Periodicity input is not a number, resetting...");
                        target.value = periodicity.value.toExponential();
                    }
                }, valueString, (0, _xmlMoleculeJs.Periodicity).tagName);
                edmDiv.appendChild(lwi);
            }
            m.setExtraDOSCMethod(j, edm);
            moleculeTagNames.delete((0, _xmlMoleculeJs.ExtraDOSCMethod).tagName);
        }
        // Organise ReservoirSize.
        moleculeTagNames.delete((0, _xmlMoleculeJs.ReservoirSize).tagName);
        let xml_ReservoirSize = xml_ms[i].getElementsByTagName((0, _xmlMoleculeJs.ReservoirSize).tagName);
        if (xml_ReservoirSize.length > 0) {
            if (xml_ReservoirSize.length != 1) throw new Error("Expecting only 1 reservoirSize, but there are " + xml_ReservoirSize.length);
            let valueString = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_ReservoirSize[0]));
            let value = new (0, _bigJsDefault.default)(valueString);
            let reservoirSizeAttributes = (0, _xmlJs.getAttributes)(xml_ReservoirSize[0]);
            let reservoirSize = new (0, _xmlMoleculeJs.ReservoirSize)(reservoirSizeAttributes, value);
            m.setReservoirSize(reservoirSize);
            let inputDiv = (0, _htmlJs.createLabelWithInput)("number", m.getID() + "_" + (0, _xmlMoleculeJs.ReservoirSize).tagName, (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                let target = event.target;
                reservoirSize.value = new (0, _bigJsDefault.default)(target.value);
                (0, _htmlJs.resizeInputElement)(target);
            }, valueString, (0, _xmlMoleculeJs.ReservoirSize).tagName);
            mDiv.appendChild(inputDiv);
        }
        // Organise States.
        let xml_states = xml_ms[i].getElementsByTagName((0, _xmlMoleculeJs.States).tagName);
        let ssDivID = mIDM.addID(mDivID, (0, _xmlMoleculeJs.State).tagName);
        let ssDiv = (0, _htmlJs.createDiv)(ssDivID);
        let sscDivID = mIDM.addID(ssDivID, (0, _appJs.s_container));
        let sscDiv = (0, _htmlJs.getCollapsibleDiv)(sscDivID, mDiv, null, ssDiv, (0, _xmlMoleculeJs.States).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
        if (xml_states.length > 0) {
            if (xml_states.length > 1) throw new Error("Expecting 1 or 0 " + (0, _xmlMoleculeJs.States).tagName + " but finding " + xml_states.length + "!");
            let ss = new (0, _xmlMoleculeJs.States)((0, _xmlJs.getAttributes)(xml_states[0]));
            //let state: State[] = [];
            let xml_ss = xml_states[0].getElementsByTagName((0, _xmlMoleculeJs.State).tagName);
            for(let j = 0; j < xml_ss.length; j++){
                let s = new (0, _xmlMoleculeJs.State)((0, _xmlJs.getAttributes)(xml_ss[j]), j);
                //state.push(s);
                ss.addState(s);
            //let sDivID = mIDM.addID(ssDivID, State.tagName, j);
            //let sDiv: HTMLDivElement = createDiv(sDivID, level1);
            //ssDiv.appendChild(sDiv);
            }
            m.setStates(ss);
            moleculeTagNames.delete((0, _xmlMoleculeJs.State).tagName);
        }
        // Check for unexpected tags.
        moleculeTagNames.delete("#text");
        if (moleculeTagNames.size > 0) {
            console.warn("There are additional unexpected moleculeTagNames:");
            moleculeTagNames.forEach((x)=>console.warn(x));
        //throw new Error("Unexpected tags in molecule.");
        }
        // Add a remove molecule button.
        (0, _appJs.addRemoveButton)(mDiv, (0, _appJs.level1), ()=>{
            removeMolecule(mlDiv, mcDiv, mIDM, molecules, mDivID, m);
        });
    }
    // Create an add molecule button.
    let mb = getAddMoleculeButton(mlDiv, mIDM, molecules);
    // Create add from library button.
    let lb = getAddFromLibraryButton(mlDiv, mb, mIDM, molecules);
    return mlDiv;
}
/**
 * Remove a molecule.
 * @param mlDiv The MoleculeList div.
 * @param mcDiv The MoleculeContainer div.
 * @param mIDM The molecule IDManager.
 * @param molecules The molecules.
 * @param mDivID The molecule div ID.
 * @param m The molecule.
 */ function removeMolecule(mlDiv, mcDiv, mIDM, molecules, mDivID, m) {
    mlDiv.removeChild(mcDiv);
    //mlDiv.removeChild(mDiv);
    mIDM.removeIDs(mDivID);
    mIDM.removeIDs((0, _utilJs.getID)(mDivID, (0, _appJs.s_description)));
    mIDM.removeIDs((0, _utilJs.getID)(mDivID, (0, _xmlMoleculeJs.AtomArray).tagName));
    mIDM.removeIDs((0, _utilJs.getID)(mDivID, (0, _xmlMoleculeJs.BondArray).tagName));
    mIDM.removeIDs((0, _utilJs.getID)(mDivID, (0, _appJs.s_viewer)));
    mIDM.removeIDs((0, _utilJs.getID)(mDivID, (0, _xmlMoleculeJs.PropertyList).tagName));
    molecules.delete(m.getID());
}
function createPropertyAndDiv(pl, xml, plDiv, molecule, mIDM, boundary, level) {
    let p = new (0, _xmlMoleculeJs.Property)((0, _xmlJs.getAttributes)(xml));
    //console.log("p.dictRef " + p.dictRef);
    if (p.dictRef == (0, _xmlMoleculeJs.ZPE).dictRef) // "me:ZPE", scalar, Mesmer.energyUnits.
    processProperty(pl, p, (0, _xmlMesmerJs.Mesmer).energyUnits, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.Hf0).dictRef) // "me:Hf0", scalar, Mesmer.energyUnits.
    processProperty(pl, p, (0, _xmlMesmerJs.Mesmer).energyUnits, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.HfAT0).dictRef) // "me:HfAT0", scalar, Mesmer.energyUnits.
    processProperty(pl, p, (0, _xmlMesmerJs.Mesmer).energyUnits, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.Hf298).dictRef) // "me:Hf298", scalar, Mesmer.energyUnits.
    processProperty(pl, p, (0, _xmlMesmerJs.Mesmer).energyUnits, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.RotConsts).dictRef) // "me:rotConsts", array, Mesmer.frequencyUnits.
    processProperty(pl, p, (0, _xmlMesmerJs.Mesmer).frequencyUnits, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.SymmetryNumber).dictRef) // "me:symmetryNumber", scalar, No units.
    processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.TSOpticalSymmetryNumber).dictRef) // "me:TSOpticalSymmetryNumber", scalar, No units.
    processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.FrequenciesScaleFactor).dictRef) // "me:frequenciesScaleFactor", scalar, No units.
    processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.VibFreqs).dictRef) // "me:vibFreqs", array, cm-1.
    processProperty(pl, p, (0, _xmlMesmerJs.Mesmer).frequencyUnits, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.MW).dictRef) // "me:MW", scalar, amu.
    processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.SpinMultiplicity).dictRef) // "me:spinMultiplicity", scalar, No units.
    processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.Epsilon).dictRef) // "me:epsilon", scalar, K (fixed).
    processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.Sigma).dictRef) // "me:sigma", scalar, Å (fixed).
    processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.Hessian).dictRef) // "me:hessian", matrix, kJ/mol/Å2 or kcal/mol/Å2 or Hartree/Å2.
    processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.EinsteinAij).dictRef) // "me:EinsteinAij", array, s-1 (fixed).
    processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    else if (p.dictRef == (0, _xmlMoleculeJs.EinsteinBij).dictRef) // "me:EinsteinBij", array, m3/J/s2 (fixed).
    processProperty(pl, p, undefined, molecule, mIDM, xml, plDiv, boundary, level);
    else processPropertyString(pl, p, molecule, xml, plDiv, boundary, level);
    pl.setProperty(p);
    return p;
}
function processProperty(pl, p, units, molecule, mIDM, element, plDiv, boundary, level) {
    let pID = mIDM.addID((0, _utilJs.getID)(plDiv.id, p.dictRef));
    let div;
    // PropertyScalar.
    let scalarNodes = element.getElementsByTagName((0, _xmlMoleculeJs.PropertyScalarNumber).tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) throw new Error("Expecting 1 " + (0, _xmlMoleculeJs.PropertyScalarNumber).tagName + " but finding " + scalarNodes.length + "!");
        let inputString = (0, _xmlJs.getInputString)(scalarNodes[0]);
        let value = new (0, _bigJsDefault.default)(inputString);
        let psAttributes = (0, _xmlJs.getAttributes)(scalarNodes[0]);
        // Add PropertyScalarNumber.
        let ps = new (0, _xmlMoleculeJs.PropertyScalarNumber)(psAttributes, value);
        p.setProperty(ps);
        ps.setValue = (function(value) {
            ps.value = value;
            if (p.dictRef == (0, _xmlMoleculeJs.ZPE).dictRef || p.dictRef == (0, _xmlMoleculeJs.Hf0).dictRef || p.dictRef == (0, _xmlMoleculeJs.HfAT0).dictRef || p.dictRef == (0, _xmlMoleculeJs.Hf298).dictRef) // Update the molecule energy diagram.
            (0, _appJs.redrawReactionsDiagram)();
        }).bind(ps);
        div = (0, _appJs.processNumber)(pID, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
        (0, _appJs.addAnyUnits)(units, psAttributes, div, div.querySelector((0, _appJs.s_input)), mIDM.addID(pID, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, boundary, boundary);
        plDiv.appendChild(div);
    // click
    //let button: HTMLButtonElement = div.querySelector('button') as HTMLButtonElement;
    //button.click();
    } else {
        // PropertyArray.
        let arrayNodes = element.getElementsByTagName((0, _xmlMoleculeJs.PropertyArray).tagName);
        if (arrayNodes.length > 0) {
            if (arrayNodes.length != 1) throw new Error("Expecting 1 " + (0, _xmlMoleculeJs.PropertyArray).tagName + " but finding " + arrayNodes.length + "!");
            let inputString = (0, _xmlJs.getInputString)(arrayNodes[0]);
            if (inputString == "") {
                console.warn("inputString is empty setting to 0!");
                inputString = "0";
            }
            let values = (0, _utilJs.toNumberArray)(inputString.split(/\s+/));
            let paAttributes = (0, _xmlJs.getAttributes)(arrayNodes[0]);
            let pa = new (0, _xmlMoleculeJs.PropertyArray)(paAttributes, values);
            p.setProperty(pa);
            div = processNumberArrayOrMatrix(plDiv, mIDM, p.dictRef, pa, pa.getValues.bind(pa), pa.setValues, ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
            (0, _appJs.addAnyUnits)(units, paAttributes, div, div.querySelector((0, _appJs.s_textarea)), mIDM.addID(pID, (0, _xmlMoleculeJs.PropertyArray).s_units), p.dictRef, boundary, boundary);
            plDiv.appendChild(div);
        } else {
            // PropertyMatrix.
            let matrixNodes = element.getElementsByTagName((0, _xmlMoleculeJs.PropertyMatrix).tagName);
            if (matrixNodes.length > 0) {
                if (matrixNodes.length != 1) throw new Error("Expecting 1 " + (0, _xmlMoleculeJs.PropertyMatrix).tagName + " but finding " + matrixNodes.length + "!");
                //addPropertyMatrix(false, molecule, mIDM, plDiv, pl, p.dictRef, units);
                let inputString = (0, _xmlJs.getInputString)(matrixNodes[0]);
                let values = (0, _utilJs.toNumberArray)(inputString.split(/\s+/));
                let pmAttributes = (0, _xmlJs.getAttributes)(matrixNodes[0]);
                let pm = new (0, _xmlMoleculeJs.PropertyMatrix)(pmAttributes, values);
                p.setProperty(pm);
                let label = p.dictRef;
                // Create a new div element for the input.
                let inputDiv = (0, _htmlJs.createLabelWithTextArea)(pID, boundary, level, (event)=>{
                    let target = event.target;
                    setNumberArrayNode(false, p.dictRef, pm, target);
                }, inputString, label);
                let ta = inputDiv.querySelector('textarea');
                ta.value = inputString;
                (0, _htmlJs.resizeTextAreaElement)(ta);
                ta.addEventListener('change', (event)=>{
                    let target = event.target;
                    inputString = target.value;
                    pm = p.getProperty();
                    values = (0, _utilJs.toNumberArray)(inputString.split(/\s+/));
                    pm.values = values;
                    console.log("Set " + p.dictRef + " of " + molecule.getLabel() + " to " + inputString);
                    //resizeInputElement(inputElement);
                    (0, _htmlJs.resizeTextAreaElement)(ta);
                });
                (0, _appJs.addAnyUnits)(units, pmAttributes, inputDiv, ta, mIDM.addID(pID, (0, _xmlMoleculeJs.PropertyArray).s_units), p.dictRef, boundary, boundary);
                plDiv.appendChild(inputDiv);
            } else throw new Error("Expecting " + (0, _xmlMoleculeJs.PropertyScalarNumber).tagName + ", " + (0, _xmlMoleculeJs.PropertyArray).tagName + " or " + (0, _xmlMoleculeJs.PropertyMatrix).tagName + " but finding none!");
        }
    }
}
function processPropertyString(pl, p, molecule, element, plDiv, boundary, level) {
    // This is for storing the IDs of the components so that if property is removed and readded, the IDs are available and there is no confuion...
    let pIDs = new Set();
    // PropertyScalarString.
    let scalarNodes = element.getElementsByTagName((0, _xmlMoleculeJs.PropertyScalarString).tagName);
    if (scalarNodes.length > 0) {
        if (scalarNodes.length != 1) throw new Error("Expecting 1 " + (0, _xmlMoleculeJs.PropertyScalarString).tagName + " but finding " + scalarNodes.length + "!");
        let inputString = (0, _xmlJs.getInputString)(scalarNodes[0]);
        let psAttributes = (0, _xmlJs.getAttributes)(scalarNodes[0]);
        // Add PropertyScalarNumber.
        let ps = new (0, _xmlMoleculeJs.PropertyScalarString)(psAttributes, inputString);
        p.setProperty(ps);
        ps.setValue = (function(value) {
            ps.value = value;
            //console.log("Set " + p.dictRef + " of " + molecule.getLabel() + " to " + value);
            if (p.dictRef == (0, _xmlMoleculeJs.ZPE).dictRef || p.dictRef == (0, _xmlMoleculeJs.Hf0).dictRef || p.dictRef == (0, _xmlMoleculeJs.HfAT0).dictRef || p.dictRef == (0, _xmlMoleculeJs.Hf298).dictRef) // Update the molecule energy diagram.
            (0, _appJs.redrawReactionsDiagram)();
        }).bind(ps);
        let div = (0, _appJs.processString)((0, _appJs.addRID)(plDiv.id, p.dictRef), pIDs, p.dictRef, ps.getValue.bind(ps), ps.setValue, ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
        plDiv.appendChild(div);
    } else console.log("Expecting " + (0, _xmlMoleculeJs.PropertyScalarString).tagName + " but finding none!");
}
/**
 * For processing a molecule energy transfer model.
 * @param etm The energy transfer model.
 * @param molecule The molecule.
 * @param element The element.
 * @param moleculeDiv The molecule div.
 */ function processEnergyTransferModel(mIDM, etm, molecule, element, moleculeDiv) {
    let xml_deltaEDowns = element.getElementsByTagName((0, _xmlMoleculeJs.DeltaEDown).tagName);
    if (xml_deltaEDowns.length > 0) {
        // Create a new collapsible div for the energyTransferModel.
        let etmdivID = mIDM.addID(moleculeDiv.id, (0, _xmlMoleculeJs.EnergyTransferModel).tagName);
        let etmDiv = document.createElement("div");
        let etmcDivID = mIDM.addID(etmdivID, (0, _appJs.s_container));
        let etmcDiv = (0, _htmlJs.getCollapsibleDiv)(etmcDivID, moleculeDiv, null, etmDiv, (0, _xmlMoleculeJs.EnergyTransferModel).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
        let deltaEDowns = [];
        for(let k = 0; k < xml_deltaEDowns.length; k++){
            let inputString = (0, _xmlJs.getInputString)(xml_deltaEDowns[k]);
            let value = new (0, _bigJsDefault.default)(inputString);
            let deltaEDownAttributes = (0, _xmlJs.getAttributes)(xml_deltaEDowns[k]);
            let deltaEDown = new (0, _xmlMoleculeJs.DeltaEDown)(deltaEDownAttributes, value);
            deltaEDowns.push(deltaEDown);
            let label = (0, _xmlMoleculeJs.DeltaEDown).tagName;
            // Create a new div element for the input.
            let id = mIDM.addID(etmdivID, (0, _xmlMoleculeJs.DeltaEDown).tagName, k);
            let inputDiv = (0, _htmlJs.createLabelWithInput)("number", id, (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                let target = event.target;
                (0, _appJs.setNumberNode)(deltaEDown, target);
                inputString = target.value;
                deltaEDowns[k].setValue(new (0, _bigJsDefault.default)(inputString));
                console.log("Set " + id + " to " + inputString);
                (0, _htmlJs.resizeInputElement)(target);
            }, inputString, label);
            etmDiv.appendChild(inputDiv);
            let unitsLabel = document.createElement('label');
            unitsLabel.textContent = "units cm-1";
            inputDiv.appendChild(unitsLabel);
        }
        etm.setDeltaEDowns(deltaEDowns);
        molecule.setEnergyTransferModel(etm);
    }
}
function create3DViewer(mIDM, molecule, moleculeDiv, boundary, level) {
    // Add a 3Dmol.js viewer.
    // Create a new div for the viewer.
    let viewerContainerDivID = mIDM.addID(moleculeDiv.id, (0, _appJs.s_viewer), (0, _appJs.s_container));
    let viewerContainerDiv = (0, _htmlJs.createDiv)(viewerContainerDivID, level);
    moleculeDiv.appendChild(viewerContainerDiv);
    let viewerDivID = mIDM.addID(moleculeDiv.id, (0, _appJs.s_viewer));
    let showAtomLabels = false;
    let showBondLabels = false;
    // Create the GLViewer viewer.
    function createViewer(position, rotation, zoomLevel, showAtomLabels, showBondLabels) {
        let viewerDiv = (0, _htmlJs.createDiv)(viewerDivID, boundary);
        viewerDiv.className = "mol-container";
        viewerContainerDiv.appendChild(viewerDiv);
        let config = {
            backgroundColor: 'grey'
        };
        let viewer = $3Dmol.createViewer(viewerDiv, config);
        // Set the viewer style to stick and ball.
        viewer.setStyle({
            stick: {}
        });
        // Create a 3Dmol viewer control to turn labels on and off.
        molecule.getAtoms().atoms.forEach(function(atom) {
            let et = atom.getElementType();
            let color;
            if (et == undefined) color = 'Purple';
            else color = (0, _xmlMesmerJs.Mesmer).atomColors.get(et) || 'Purple';
            //let am: number = Mesmer.atomMasses.get(atom.getElementType()) || 1;
            let radius;
            if (et == undefined) radius = 100;
            else radius = (0, _xmlMesmerJs.Mesmer).atomRadii.get(atom.getElementType()) || 100;
            let ax = atom.getX3()?.toNumber() || 0;
            let ay = atom.getY3()?.toNumber() || 0;
            let az = atom.getZ3()?.toNumber() || 0;
            //viewer.addSphere({ center: { x: ax, y: ay, z: az }, radius: 0.3 * am / 10.0, color: color });
            viewer.addSphere({
                center: {
                    x: ax,
                    y: ay,
                    z: az
                },
                radius: radius / 110.0,
                color: color
            });
            //viewer.addSphere({ center: { x: ax, y: ay, z: az }, radius: (radius * (am ** (1 / 3.0))) / 275.0, color: color });
            if (showAtomLabels) viewer.addLabel(atom.getID(), {
                position: {
                    x: ax,
                    y: ay,
                    z: az
                }
            });
        });
        //console.log("molecule.getBonds().bonds.size " + molecule.getBonds().bonds.size);
        molecule.getBonds().bonds.forEach(function(bond) {
            //console.log("bond.atomRefs2 " + bond.getAtomRefs2());
            let ids = bond.getAtomRefs2().split(" ");
            let aa = molecule.getAtoms();
            let a0 = aa.getAtom(ids[0]);
            let a1 = aa.getAtom(ids[1]);
            let order = bond.getOrder() || 1;
            let color = (0, _xmlMesmerJs.Mesmer).bondColors.get(order) || 'Purple';
            // a0.
            let a0x = a0.getX3()?.toNumber() || 0;
            let a0y = a0.getY3()?.toNumber() || 0;
            let a0z = a0.getZ3()?.toNumber() || 0;
            // a1.
            let a1x = a1.getX3()?.toNumber() || 0;
            let a1y = a1.getY3()?.toNumber() || 0;
            let a1z = a1.getZ3()?.toNumber() || 0;
            viewer.addCylinder({
                start: {
                    x: a0x,
                    y: a0y,
                    z: a0z
                },
                end: {
                    x: a1x,
                    y: a1y,
                    z: a1z
                },
                radius: 0.06 * order,
                color: color
            });
            if (showBondLabels) viewer.addLabel(bond.getID(), {
                position: {
                    x: (a0x + a1x) / 2,
                    y: (a0y + a1y) / 2,
                    z: (a0z + a1z) / 2
                }
            });
        });
        if (position != undefined) {
            console.log("position", position);
            viewer.position = position;
        } else console.log("position", viewer.position);
        if (rotation != undefined) {
            console.log("rotation", rotation);
            viewer.rotation = rotation;
        } else console.log("rotation", viewer.rotation);
        if (zoomLevel != undefined) {
            console.log("zoom", zoomLevel);
            viewer.zoomLevel = zoomLevel;
        } else console.log("zoom", viewer.zoomLevel);
        viewer.zoomTo();
        viewer.render();
        //viewer.zoom(0.8, 2000);
        return viewer;
    }
    // Add a redraw button.
    let redrawButton = (0, _htmlJs.createButton)("Draw/Redraw", undefined);
    let viewer;
    redrawButton.addEventListener('click', ()=>{
        (0, _appJs.remove)(viewerDivID);
        if (viewer == undefined) viewer = createViewer(undefined, undefined, undefined, showAtomLabels, showBondLabels);
        else viewer = createViewer(viewer.position, viewer.rotation, viewer.zoom, showAtomLabels, showBondLabels);
    });
    viewerContainerDiv.appendChild(redrawButton);
    // Helper function to create a label button for hiding or showing labels on the viewer.
    function createLabelButton(label, id, showState, updateState) {
        let button = (0, _htmlJs.createButton)((showState ? "Hide " : "Show ") + label, id, boundary);
        button.addEventListener('click', ()=>{
            if (showState) {
                button.textContent = "Show " + label;
                showState = false;
            } else {
                button.textContent = "Hide " + label;
                showState = true;
            }
            let position = viewer.position;
            let rotation = viewer.rotation;
            let zoomLevel = viewer.zoomLevel;
            updateState(showState);
            (0, _appJs.remove)(viewerDivID);
            viewer = createViewer(position, rotation, zoomLevel, showAtomLabels, showBondLabels);
        });
        return button;
    }
    // Atom Labels.
    let s_Atom_Labels = "Atom Labels";
    let atomLabelbutton = createLabelButton(s_Atom_Labels, mIDM.addID(viewerDivID, s_Atom_Labels), showAtomLabels, (newState)=>showAtomLabels = newState);
    viewerContainerDiv.appendChild(atomLabelbutton);
    // Bond Labels.
    let s_Bond_Labels = "Bond Labels";
    let bondLabelbutton = createLabelButton(s_Bond_Labels, mIDM.addID(viewerDivID, s_Bond_Labels), showBondLabels, (newState)=>showBondLabels = newState);
    viewerContainerDiv.appendChild(bondLabelbutton);
    // Add a save button to save the viewer as an image.
    let saveButton = (0, _htmlJs.createButton)("Save as PNG", mIDM.addID(viewerDivID, (0, _appJs.s_save)), (0, _appJs.boundary1));
    saveButton.addEventListener('click', ()=>{
        //viewer.pngURI({ backgroundColor: 'white', download: true });
        let canvas = viewer.pngURI();
        let a = document.createElement('a');
        a.href = canvas;
        let title = (0, _appJs.mesmer).getTitle()?.value;
        a.download = title.replace(/[^a-z0-9]/gi, '_') + 'mol.png';
        document.body.appendChild(a); // Append the anchor to the body.
        a.click(); // Programmatically click the anchor to trigger the download.
        document.body.removeChild(a); // Remove the anchor from the body after triggering the download.
        console.log('Save Image');
    });
    viewerContainerDiv.appendChild(saveButton);
}
function addProperty1(dictRef, ps, id, boundary, level) {
    let pDiv = (0, _htmlJs.createFlexDiv)(id, level);
    pDiv.appendChild((0, _htmlJs.createLabel)(dictRef, boundary));
    // value.
    let value = ps.getValue();
    //let value: string = ps.value;
    let valueInputId = (0, _appJs.addRID)(id, (0, _appJs.s_input));
    let valueInput = (0, _htmlJs.createInput)("text", valueInputId, boundary);
    pDiv.appendChild(valueInput);
    valueInput.addEventListener('change', (event)=>{
        let target = event.target;
        ps.setValue(new (0, _bigJsDefault.default)(target.value));
        //ps.value = target.value;
        (0, _htmlJs.resizeInputElement)(target);
    });
    valueInput.value = value.toString();
    (0, _htmlJs.resizeInputElement)(valueInput);
    return pDiv;
}
function addPropertyScalarNumber1(attributes, mIDM, value, units, pl, p, plDiv, boundary) {
    let ps = p.getProperty();
    ps.setValue = (function(value) {
        ps.value = value;
        if (p.dictRef == (0, _xmlMoleculeJs.ZPE).dictRef || p.dictRef == (0, _xmlMoleculeJs.Hf0).dictRef || p.dictRef == (0, _xmlMoleculeJs.HfAT0).dictRef || p.dictRef == (0, _xmlMoleculeJs.Hf298).dictRef) // Update the molecule energy diagram.
        (0, _appJs.redrawReactionsDiagram)();
    }).bind(ps);
    ps.value = value;
    if (p.dictRef == (0, _xmlMoleculeJs.ZPE).dictRef || p.dictRef == (0, _xmlMoleculeJs.Hf0).dictRef || p.dictRef == (0, _xmlMoleculeJs.HfAT0).dictRef || p.dictRef == (0, _xmlMoleculeJs.Hf298).dictRef) // Update the molecule energy diagram.
    (0, _appJs.redrawReactionsDiagram)();
    let id = (0, _appJs.addRID)(plDiv.id, p.dictRef);
    console.log("div ID " + id);
    let div = (0, _appJs.processNumber)(id, mIDM, p.dictRef, ps.getValue.bind(ps), (value)=>setPropertyScalarNumber(p.dictRef, pl, ps, value), ()=>pl.removeProperty(p.dictRef), (0, _appJs.boundary1), (0, _appJs.level1));
    console.log("unitsID " + (0, _appJs.addRID)(id, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units));
    (0, _appJs.addAnyUnits)(units, attributes, div, div.querySelector((0, _appJs.s_input)), (0, _utilJs.getID)(id, (0, _xmlMoleculeJs.PropertyScalarNumber).s_units), p.dictRef, boundary, boundary);
    plDiv.appendChild(div);
}
function processNumberArrayOrMatrix(plDiv, mIDM, name, pa, getter, setter, remover, marginComponent, margin) {
    let divID = (0, _utilJs.getID)(plDiv.id, name);
    let div = (0, _htmlJs.createFlexDiv)(divID, margin);
    let buttonTextContentSelected = name + (0, _appJs.sy_selected);
    let buttonTextContentDeselected = name + (0, _appJs.sy_deselected);
    //let id: string = mIDM.addID(plDiv.id, name);
    //let idb = mIDM.addID(divID, s_button);
    let idb = (0, _utilJs.getID)(divID, (0, _htmlJs.s_button));
    let button = (0, _htmlJs.createButton)(buttonTextContentDeselected, idb, marginComponent);
    div.appendChild(button);
    button.classList.add((0, _appJs.s_optionOn));
    button.classList.add((0, _appJs.s_optionOff));
    //let inputId: string = mIDM.addID(divID, s_input)
    let inputId = (0, _utilJs.getID)(divID, (0, _appJs.s_input));
    let values = getter();
    if (values == undefined) {
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, _appJs.s_optionOn));
    } else {
        addNumberArray(div, inputId, name, values, pa, getter, setter, marginComponent);
        //plDiv.appendChild(div);
        button.textContent = buttonTextContentSelected;
        button.classList.toggle((0, _appJs.s_optionOff));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event)=>{
        if (document.getElementById(inputId) == null) {
            addNumberArray(div, inputId, name, values, pa, getter, setter, marginComponent);
            //plDiv.appendChild(div);
            button.textContent = buttonTextContentSelected;
        } else {
            // Remove existing.
            document.getElementById(inputId)?.remove();
            remover();
            console.log("Removed " + inputId);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, _appJs.s_optionOn));
        button.classList.toggle((0, _appJs.s_optionOff));
    });
    return div;
}
/**
 * @param div The div to add the input to.
 * @param id The id.
 * @param name The name of the input.
 * @param values The numerical values.
 * @param paom The PropertyArray or PropertyMatrix.
 * @param getter The getter function.
 * @param setter The setter function.
 * @param boundary The boundary for the text area.
 */ function addNumberArray(div, id, name, values, paom, getter, setter, boundary) {
    let valueString;
    if (values == undefined) valueString = "";
    else valueString = (0, _utilJs.bigArrayToString)(values);
    let ta = (0, _htmlJs.createTextArea)(id, boundary);
    ta.addEventListener('change', (event)=>{
        let target = event.target;
        let values = setNumberArrayNode(true, name, paom, ta);
        try {
            setter(values);
            console.log(name + " changed from " + valueString + " to " + target.value);
        } catch (e) {
            alert("Input invalid, resetting...");
            target.value = getter().toString();
        }
        (0, _htmlJs.resizeTextAreaElement)(target);
    });
    ta.value = valueString;
    (0, _htmlJs.resizeTextAreaElement)(ta);
    div.appendChild(ta);
}
/**
 * @param inputString The input string.
 * @param defaultValues The default values.
 * @returns The input string converted to a numerical Big[] or the defaultValues.
 */ function toBigArray(inputString, defaultValues) {
    let inputStrings = inputString.split(/\s+/);
    let values = [];
    let success = true;
    inputStrings.forEach(function(value) {
        if (!(0, _utilJs.isNumeric)(value)) success = false;
        else values.push(new (0, _bigJsDefault.default)(value));
    });
    if (!success) {
        alert("An input is not a number, resetting...");
        return defaultValues;
    }
    return values;
}
function setNumberArrayNode(setSize, dictRef, node, ta) {
    let inputString = ta.value.trim();
    let originalValues = (0, _utilJs.arrayToString)(node.values, " ");
    //if (node.getValues().length == 0) {
    //let values: Big[] = [];
    //setValues(dictRef, values);
    //node.setValues(values);
    //}
    if (inputString == "") {
        alert("Empty input resetting...");
        ta.value = originalValues;
        return node.values;
    }
    let values = toBigArray(inputString, node.values);
    //console.log("propertyArray=" + propertyArray);
    if (values.length == node.values.length) {
        node.setValues(values);
        console.log("Changed " + node.tagName + " from: \"" + originalValues + "\" to: \"" + (0, _utilJs.arrayToString)(node.values, " ") + "\"");
    //console.log("molecule=" + molecule);
    } else if (setSize) {
        //let values: Big[] = [];
        //setValues(dictRef, values);
        node.setValues(values);
        console.log("Changed " + node.tagName + " from: \"" + originalValues + "\" to: \"" + (0, _utilJs.arrayToString)(node.values, " ") + "\"");
    } else {
        alert("Expecting " + node.values.length + " values for, but finding " + values.length + " resetting...");
        ta.value = originalValues;
    }
    return node.values;
}

},{"big.js":"91nMZ","./app.js":"dPB9w","./xml_conditions.js":"cZv1r","./html.js":"aLPSL","./xml_mesmer.js":"8G2m7","./xml_metadata.js":"5YFPw","./xml_molecule.js":"cg9tc","./util.js":"f0Rnl","./xml.js":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d6DU0":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Defaults are stored in a defaults.xml file. MESMER version 7.0 has the following:
 * <me:activationEnergy units="kJ/mol" default="NEEDS TO BE CHECKED**">0.0</me:activationEnergy>
 * <me:preExponential default="NEEDS TO BE CHECKED**">6.00e-12</me:preExponential>
 * <property dictRef="me:spinMultiplicity" default="true">
 *  <scalar>1</scalar>
 * </property>
 * <property dictRef="me:symmetryNumber" default="true">
 *  <scalar>1</scalar>
 * </property>
 * <property dictRef="me:frequenciesScaleFactor" default="true">
 *  <scalar>1</scalar>
 * </property>
 * <property dictRef="me:epsilon" default="true">
 *  <scalar>50.0</scalar>
 * </property>
 * <property dictRef="me:sigma" default="true">
 *  <scalar>5.0</scalar>
 * </property>
 * <me:deltaEDown default="NEEDS TO BE CHECKED**">130.0</me:deltaEDown>
 * <property dictRef="me:deltaEDownTExponent" default="true">
 *  <scalar referenceTemperature="298">0.0</scalar>
 * </property>
 * <molecule spinMultiplicity="1" default="true"/>
 * <molecule me:type="deficientReactant excessReactant modelled transitionState sink"
 *           default="is unsatisfactory. Choose one from list: "></molecule>
 * <molecule role="deficientReactant excessReactant modelled transitionState sink"
 *           default="is unsatisfactory. Choose one from list: "></molecule>
 * <property dictRef="me:MW" default="IS UNSATISFACTORY. A VALUE NEEDS TO BE PROVIDED**">
 *  <scalar>0.0</scalar>
 * </property>
 * <me:MCRCMethod default="NEEDS TO BE CHECKED. COULD BE** " name="RRKM"/>
 * <me:DOSCMethod default="true" name="ClassicalRotors"/>
 * <me:DOSCType default="true">external</me:DOSCType>
 * <me:DistributionCalcMethod default="true" name="Boltzmann"/>
 * <me:excessReactantConc default="NEEDS TO BE CHECKED**">2.25e+16</me:excessReactantConc>
 * <me:PTpair units="PPCC" precision="d" P="1.01E17" T="299" timeUnits ="microsec" default="true"/>
 * <me:PTset units="PPCC" precision="d" default="true"/>
 * <me:bathgas default="true">He</me:bathgas>
 * <me:TInfinity default="true">298</me:TInfinity>
 * <me:grainSize units="cm-1" default="true">100</me:grainSize>
 * <me:energyAboveTheTopHill units="kT" default="true">25</me:energyAboveTheTopHill>
 * <me:calcMethod default="true" name="simpleCalc"/>
 * <me:fittingTolerance default="true">0.01</me:fittingTolerance>
 * <me:fittingIterations default="true">10</me:fittingIterations>
 * <me:energyTransferModel name="ExponentialDown" default="true"/>
 * <me:FragmentDist name="Prior" default="true"/>
 * <me:MarquardtDerivDelta default="true">1.e-03</me:MarquardtDerivDelta>
 * <me:MarquardtTolerance default="true">1.e-03</me:MarquardtTolerance>
 * <me:MarquardtLambda default="true">1.0</me:MarquardtLambda>
 * <me:MarquardtLambdaScale default="true">10.0</me:MarquardtLambdaScale>
 * <me:ConstraintFactor default="true">1.0</me:ConstraintFactor>
 * <me:ConstraintAddand default="true">0.0</me:ConstraintAddand>
 * <me:sensitivityAnalysisSamples default="true">256</me:sensitivityAnalysisSamples>
 * <me:sensitivityGenerateData default="true">true</me:sensitivityGenerateData>
 * <me:chebMinConc units="particles per cubic centimeter" default="true"/>
 * <me:calcMethod units="kJ/mol" default="true"/>
 * <me:Tmin default="true">200</me:Tmin>
 * <me:Tmax default="true">1500</me:Tmax>
 * <me:Tstep default="true">50</me:Tstep>
 * <me:Tmid default="true">1000</me:Tmid>
 * <me:shortestTimeOfInterest default="true">1.0e-11</me:shortestTimeOfInterest>
 * <me:MaximumEvolutionTime default="true">1.0e+05</me:MaximumEvolutionTime>
 * <me:errorPropagationSamples default="true">300</me:errorPropagationSamples>
 * <property dictRef="me:Hf298">
 *  <scalar units="kJ/mol" default="true"/>
 * </property>
 * <property dictRef="me:Hf0">
 *  <scalar units="kJ/mol" default="true"/>
 * </property>
 * <property dictRef="me:ZPE">
 *  <scalar units="kJ/mol" default="true"/>
 * </property>
 * <me:RMS_SOC_element units="cm-1" default="true">10.0</me:RMS_SOC_element>
 * <me:GradientDifferenceMagnitude units="a.u./Bohr" default="true">0.1</me:GradientDifferenceMagnitude>
 * <me:GradientReducedMass units="a.m.u." default="true">16.0</me:GradientReducedMass>
 * <me:AverageSlope units="a.u./Bohr" default="true">0.1</me:AverageSlope>
 * <me:ForceMacroDetailedBalance default="true">true</me:ForceMacroDetailedBalance>
 * <me:testMicroRates Tmin = "100" Tmax = "2000" Tstep = "100" default="true"/>
 * <me:experimentalRate error ="0.0" default="true"/>
 */ parcelHelpers.export(exports, "Defaults", ()=>Defaults);
var _util = require("./util");
var _xml = require("./xml");
class Defaults {
    /**
     * Construct a new M_Defaults object.
     */ constructor(){
        /**
     * TagName.
     */ this.tagName = 'defaults';
        this.values = new Map();
        this.attributess = new Map();
    }
    /**
     * Read the defaults.xml file.
     */ readFile() {
        // Create a file input element to prompt the user to select the default.xml file.
        let input = document.createElement('input');
        input.type = 'file';
        let self = this;
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
                let contents = '';
                reader.onload = function(e) {
                    if (e.target == null) throw new Error('Event target is null');
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
                            //console.log('contents ' + contents);
                            let parser = new DOMParser();
                            let xml = parser.parseFromString(contents, "text/xml");
                            self.parse(xml);
                        }
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
     * Parses the xml loading data into attributess and values.
     * @param xml The XML document.
     */ parse(xml) {
        // Process the XML.
        let xml_defaults = (0, _xml.getSingularElement)(xml, this.tagName);
        let attributes = (0, _xml.getAttributes)(xml_defaults);
        console.log("Default attributes: " + (0, _util.mapToString)(attributes));
        let children = xml_defaults.children;
        console.log("children.length=" + children.length);
        for(let i = 0; i < children.length; i++){
            let child = children[i];
            let tagName = child.tagName;
            console.log("tagName=" + tagName);
            let attributes = (0, _xml.getAttributes)(child);
            this.attributess.set(tagName, attributes);
            console.log("Attributes: " + (0, _util.mapToString)(attributes));
            if (tagName == 'property') {
                let dictRef = child.getAttribute('dictRef');
                try {
                    let xml_scalar = (0, _xml.getSingularElement)(child, 'scalar');
                    let v = xml_scalar.innerHTML;
                    if (v != null) {
                        console.log("v=" + v);
                        this.values.set(dictRef, v);
                    } else console.log("v is null");
                } catch (e) {
                    console.log("Error: " + e);
                }
            } else {
                //let v: string | null = child.nodeValue;
                //let v: string | null = child.nodeName;
                let v = child.innerHTML;
                if (v != null) {
                    console.log("v=" + v);
                    this.values.set(tagName, v);
                } else console.log("v is null");
            }
        }
        // Some tests.
        console.log("values: " + (0, _util.mapToString)(this.values));
        this.attributess.forEach((value, key)=>{
            console.log("key=" + key + " value=" + (0, _util.mapToString)(value));
        });
    }
}

},{"./util":"f0Rnl","./xml":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bQ6KF":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Create an add reaction button.
 */ parcelHelpers.export(exports, "getAddReactionButton", ()=>getAddReactionButton);
/**
 * Parse XML and create HTMLDivElement for reactions.
 * @param xml The XML document.
 * @param rIDM The IDManager for the reaction list.
 * @param rb The reaction button.
 * @param reactions The reactions map.
 * @param molecules The molecules map.
 */ parcelHelpers.export(exports, "processReactionList", ()=>processReactionList);
var _bigJs = require("big.js");
var _bigJsDefault = parcelHelpers.interopDefault(_bigJs);
var _appJs = require("./app.js");
var _htmlJs = require("./html.js");
var _xmlMesmerJs = require("./xml_mesmer.js");
var _xmlMoleculeJs = require("./xml_molecule.js");
var _xmlReactionJs = require("./xml_reaction.js");
var _utilJs = require("./util.js");
var _xmlJs = require("./xml.js");
var _xmlConditionsJs = require("./xml_conditions.js");
function getAddReactionButton(rIDM, rlDiv, reactions, molecules) {
    let rb = (0, _htmlJs.createButton)((0, _appJs.s_Add_sy_add), (0, _appJs.addRID)((0, _xmlReactionJs.Reaction).tagName, "add", (0, _htmlJs.s_button)), (0, _appJs.level1));
    rlDiv.appendChild(rb);
    rb.addEventListener('click', ()=>{
        let reactionAttributes = new Map();
        // Get Reaction ID.
        let rl = (0, _appJs.mesmer).getReactionList();
        let i = rl.getNextReactionID();
        console.log("Next Reaction ID=" + i);
        reactionAttributes.set((0, _xmlReactionJs.Reaction).s_id, "R" + i);
        let r = new (0, _xmlReactionJs.Reaction)(reactionAttributes);
        reactions.set(r.id, r);
        // Add to mesmer.
        rl.addReaction(r);
        let rDivID = rIDM.addID((0, _xmlReactionJs.Reaction).tagName, r.id);
        let rDiv = (0, _htmlJs.createDiv)(rDivID);
        rlDiv.appendChild(rDiv);
        // Create collapsible content.
        let rcDivID = rIDM.addID(rDivID, (0, _appJs.s_container));
        let rcDiv = (0, _htmlJs.getCollapsibleDiv)(rcDivID, rlDiv, rb, rDiv, r.getLabel(), (0, _appJs.boundary1), (0, _appJs.level1));
        let rcb = rcDiv.querySelector('button');
        // Create collapsible content for reactants.
        let rsDivID = rIDM.addID(rDivID, (0, _xmlReactionJs.Reactant).tagName);
        let rsDiv = (0, _htmlJs.createDiv)(rsDivID);
        let rscDivID = rIDM.addID(rsDivID, (0, _appJs.s_container));
        let rscDiv = (0, _htmlJs.getCollapsibleDiv)(rscDivID, rDiv, null, rsDiv, (0, _appJs.s_Reactants), (0, _appJs.boundary1), (0, _appJs.level1));
        let reactants = new Map();
        r.setReactants(reactants);
        addAddReactantButton(r, rcb, rIDM, rDivID, rsDiv, molecules, reactants);
        // Create collapsible content for products.
        let psDivID = rIDM.addID(rDivID, (0, _xmlReactionJs.Product).tagName);
        let psDiv = (0, _htmlJs.createDiv)(psDivID);
        let pscDivID = rIDM.addID(psDivID, (0, _appJs.s_container));
        let pscDiv = (0, _htmlJs.getCollapsibleDiv)(pscDivID, rDiv, null, psDiv, (0, _appJs.s_Products), (0, _appJs.boundary1), (0, _appJs.level1));
        let products = new Map();
        r.setProducts(products);
        addAddProductButton(r, rcb, rIDM, rDivID, psDiv, molecules, products);
        // Create collapsible content for transition states.
        let tsDivID = rIDM.addID(rDivID, (0, _xmlReactionJs.TransitionState).tagName);
        let tsDiv = (0, _htmlJs.createDiv)(tsDivID);
        let tscDivID = rIDM.addID(tsDivID, (0, _appJs.s_container));
        let tscDiv = (0, _htmlJs.getCollapsibleDiv)(tscDivID, rDiv, null, tsDiv, (0, _appJs.s_Transition_States), (0, _appJs.boundary1), (0, _appJs.level1));
        let transitionStates = new Map();
        r.setTransitionStates(transitionStates);
        addAddTransitionStateButton(rIDM, rDivID, tsDiv, molecules, transitionStates);
        // Create collapsible content for MCRCMethod.
        let mmDivId = rIDM.addID(rDivID, (0, _xmlReactionJs.MCRCMethod).tagName);
        let mmDiv = (0, _htmlJs.createDiv)(mmDivId);
        let mmcDivId = rIDM.addID(mmDivId, (0, _appJs.s_container));
        let mmcDiv = (0, _htmlJs.getCollapsibleDiv)(mmcDivId, rDiv, null, mmDiv, (0, _xmlReactionJs.MCRCMethod).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
        //rDiv.appendChild(mmcDiv);
        let mmAttributes = new Map();
        mmAttributes.set("xsi:type", (0, _xmlReactionJs.MesmerILT).xsiType);
        let mm = new (0, _xmlReactionJs.MesmerILT)(mmAttributes);
        r.setMCRCMethod(mm);
        let inputString;
        let value;
        {
            // Get value from defaults.
            if ((0, _appJs.defaults) != undefined) {
                inputString = (0, _appJs.defaults).values.get((0, _xmlReactionJs.PreExponential).tagName) ?? "";
                if (inputString == "") inputString = "6.00e-12";
            } else inputString = "6.00e-12";
            value = new (0, _bigJsDefault.default)(inputString);
            let peAttributes = new Map();
            let pe = new (0, _xmlReactionJs.PreExponential)(peAttributes, value);
            mm.setPreExponential(pe);
            let lwi = (0, _htmlJs.createLabelWithInput)("number", (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.PreExponential).tagName, (0, _appJs.s_input)), (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                let target = event.target;
                (0, _appJs.setNumberNode)(pe, target);
            }, inputString, (0, _xmlReactionJs.PreExponential).tagName);
            mmDiv.appendChild(lwi);
            let input = lwi.querySelector('input');
            input.value = inputString;
            (0, _htmlJs.resizeInputElement)(input);
            input.addEventListener('change', (event)=>{
                let target = event.target;
                inputString = target.value;
                pe.value = new (0, _bigJsDefault.default)(inputString);
                console.log((0, _xmlReactionJs.PreExponential).tagName + " changed to " + inputString);
                (0, _htmlJs.resizeInputElement)(input);
            });
            (0, _appJs.addAnyUnits)(undefined, peAttributes, lwi, null, (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.PreExponential).tagName), (0, _xmlReactionJs.PreExponential).tagName, (0, _appJs.boundary1), (0, _appJs.boundary1));
            mmDiv.appendChild(lwi);
        }
        {
            // Get value from defaults.
            if ((0, _appJs.defaults) != undefined) {
                inputString = (0, _appJs.defaults).values.get((0, _xmlReactionJs.ActivationEnergy).tagName) ?? "";
                if (inputString == "") inputString = "0.0";
            } else inputString = "0.0";
            value = new (0, _bigJsDefault.default)(inputString);
            let aeAttributes = new Map();
            let ae = new (0, _xmlReactionJs.ActivationEnergy)(aeAttributes, value);
            mm.setActivationEnergy(ae);
            // Create a new div element for the input.
            let lwi = (0, _htmlJs.createLabelWithInput)("number", (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.ActivationEnergy).tagName, (0, _appJs.s_input)), (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                let target = event.target;
                (0, _appJs.setNumberNode)(ae, target);
            }, inputString, (0, _xmlReactionJs.ActivationEnergy).tagName);
            let input = lwi.querySelector('input');
            input.value = inputString;
            (0, _htmlJs.resizeInputElement)(input);
            input.addEventListener('change', (event)=>{
                let target = event.target;
                inputString = target.value;
                ae.value = new (0, _bigJsDefault.default)(inputString);
                console.log((0, _xmlReactionJs.ActivationEnergy).tagName + " changed to " + inputString);
                (0, _htmlJs.resizeInputElement)(input);
            });
            (0, _appJs.addAnyUnits)(undefined, aeAttributes, lwi, null, (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.ActivationEnergy).tagName), (0, _xmlReactionJs.ActivationEnergy).tagName, (0, _appJs.boundary1), (0, _appJs.boundary1));
            mmDiv.appendChild(lwi);
        }
        {
            // Get value from defaults.
            if ((0, _appJs.defaults) != undefined) {
                inputString = (0, _appJs.defaults).values.get((0, _xmlReactionJs.TInfinity).tagName) ?? "";
                if (inputString == "") inputString = "298";
            } else inputString = "298";
            value = new (0, _bigJsDefault.default)(inputString);
            let tiAttributes = new Map();
            let ti = new (0, _xmlReactionJs.TInfinity)(tiAttributes, value);
            mm.setTInfinity(ti);
            // Create a new div element for the input.
            let lwi = (0, _htmlJs.createLabelWithInput)("number", (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.TInfinity).tagName, (0, _appJs.s_input)), (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                let target = event.target;
                (0, _appJs.setNumberNode)(ti, target);
            }, inputString, (0, _xmlReactionJs.TInfinity).tagName);
            let input = lwi.querySelector('input');
            input.value = inputString;
            (0, _htmlJs.resizeInputElement)(input);
            input.addEventListener('change', (event)=>{
                let target = event.target;
                inputString = target.value;
                ti.value = new (0, _bigJsDefault.default)(inputString);
                console.log((0, _xmlReactionJs.TInfinity).tagName + " changed to " + inputString);
                (0, _htmlJs.resizeInputElement)(input);
            });
            (0, _appJs.addAnyUnits)(undefined, tiAttributes, lwi, null, (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.TInfinity).tagName), (0, _xmlReactionJs.TInfinity).tagName, (0, _appJs.boundary1), (0, _appJs.boundary1));
            mmDiv.appendChild(lwi);
        }
        {
            // Get value from defaults.
            if ((0, _appJs.defaults) != undefined) {
                inputString = (0, _appJs.defaults).values.get((0, _xmlReactionJs.NInfinity).tagName) ?? "";
                if (inputString == "") inputString = "0.08";
            } else inputString = "0.08";
            value = new (0, _bigJsDefault.default)(inputString);
            let niAttributes = new Map();
            let ni = new (0, _xmlReactionJs.NInfinity)(niAttributes, value);
            mm.setNInfinity(ni);
            // Create a new div element for the input.
            let lwi = (0, _htmlJs.createLabelWithInput)("number", (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.NInfinity).tagName, (0, _appJs.s_input)), (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                let target = event.target;
                (0, _appJs.setNumberNode)(ni, target);
            }, inputString, (0, _xmlReactionJs.NInfinity).tagName);
            mmDiv.appendChild(lwi);
            let input = lwi.querySelector('input');
            input.value = inputString;
            (0, _htmlJs.resizeInputElement)(input);
            input.addEventListener('change', (event)=>{
                let target = event.target;
                inputString = target.value;
                ni.value = new (0, _bigJsDefault.default)(inputString);
                console.log((0, _xmlReactionJs.NInfinity).tagName + " set to " + inputString);
                (0, _htmlJs.resizeInputElement)(input);
            });
            (0, _appJs.addAnyUnits)(undefined, niAttributes, lwi, null, (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.NInfinity).tagName), (0, _xmlReactionJs.NInfinity).tagName, (0, _appJs.boundary1), (0, _appJs.boundary1));
            mmDiv.appendChild(lwi);
        }
        // ExcessReactantConc.
        let ercDivId = rIDM.addID(rDivID, (0, _xmlReactionJs.ExcessReactantConc).tagName);
        let ercDiv = (0, _htmlJs.createDiv)(ercDivId);
        // Get default value.
        if ((0, _appJs.defaults) != undefined) {
            inputString = (0, _appJs.defaults).values.get((0, _xmlReactionJs.ExcessReactantConc).tagName) ?? "";
            if (inputString == "") inputString = "2.25e+16";
        } else inputString = "2.25e+16";
        value = new (0, _bigJsDefault.default)(inputString);
        let erc = new (0, _xmlReactionJs.ExcessReactantConc)(new Map(), value);
        r.setExcessReactantConc(erc);
        // Create a new div element for the input.
        let lwi = (0, _htmlJs.createLabelWithInput)("number", (0, _appJs.addRID)(ercDivId, (0, _xmlReactionJs.ExcessReactantConc).tagName, (0, _appJs.s_input)), (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
            let target = event.target;
            (0, _appJs.setNumberNode)(erc, target);
        }, inputString, (0, _xmlReactionJs.ExcessReactantConc).tagName);
        let input = lwi.querySelector('input');
        input.value = inputString;
        (0, _htmlJs.resizeInputElement)(input);
        input.addEventListener('change', (event)=>{
            let target = event.target;
            let inputString = target.value;
            erc.value = new (0, _bigJsDefault.default)(inputString);
            console.log((0, _xmlReactionJs.ExcessReactantConc).tagName + " changed to " + inputString);
            (0, _htmlJs.resizeInputElement)(input);
        });
        (0, _appJs.addAnyUnits)(undefined, new Map(), lwi, null, (0, _appJs.addRID)(ercDivId, (0, _xmlReactionJs.ExcessReactantConc).tagName), (0, _xmlReactionJs.ExcessReactantConc).tagName, (0, _appJs.boundary1), (0, _appJs.boundary1));
        ercDiv.appendChild(lwi);
        rDiv.appendChild(ercDiv);
        // Add a remove reaction button.
        (0, _appJs.addRemoveButton)(rDiv, (0, _appJs.level1), ()=>{
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
 */ function addAddReactantButton(r, rcb, rIDM, rDivID, rsDiv, molecules, reactants) {
    // Add an add button to add a reactant.
    let addReactantButton = (0, _htmlJs.createButton)((0, _appJs.s_Add_sy_add), rIDM.addID(rDivID, (0, _xmlReactionJs.Reactant).tagName, (0, _htmlJs.s_button)), (0, _appJs.level1));
    rsDiv.appendChild(addReactantButton);
    addReactantButton.addEventListener('click', ()=>{
        if (molecules.size === 0) {
            // Instruct user to add a molecule.
            alert("Please add a molecule to the moleculeList first.");
            return;
        }
        //let reactantDivID: string = rIDM.addID(rDivID, Reactant.tagName, mid);
        //let reactantDiv: HTMLDivElement = createDiv(reactantDivID);
        let reactantDiv = (0, _htmlJs.createFlexDiv)(undefined);
        rsDiv.insertBefore(reactantDiv, addReactantButton);
        // Create a selector to select a molecule as a reactant.
        let selectReactant = (0, _htmlJs.createSelectElement)((0, _appJs.getMoleculeKeys)(molecules), (0, _htmlJs.s_select), "", (0, _utilJs.getID)(rDivID, (0, _xmlReactionJs.Reactant).tagName, (0, _htmlJs.s_select)), (0, _appJs.level1));
        // Have the select element update options if new molecules are added.
        selectReactant.classList.add((0, _xmlConditionsJs.BathGas).tagName);
        reactantDiv.appendChild(selectReactant);
        // Add an event listener to the select element.
        selectReactant.addEventListener('click', (event)=>{
            if (selectReactant.options.length === 1) {
                // If there is only one option then select it.
                alert("As there is only one molecule it will be selected.");
                selectReactant.selectedIndex = 0;
                selectReactant.dispatchEvent(new Event('change'));
            }
        });
        selectReactant.addEventListener('change', (event)=>{
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
            reactantDiv.id = rIDM.addID(rDivID, (0, _xmlReactionJs.Reactant).tagName, mid);
            rmAttributes.set((0, _xmlReactionJs.ReactionMolecule).s_ref, mid);
            let rm = new (0, _xmlReactionJs.ReactionMolecule)(rmAttributes);
            let reactant = new (0, _xmlReactionJs.Reactant)(new Map(), rm);
            reactants.set(mid, reactant);
            r.addReactant(reactant);
            // Update the collapsible button label with the molecule name.
            rcb.textContent = r.getLabel();
            console.log("ReactionLabel=" + r.getLabel());
            // Create a new div for the role selector.
            let lws = (0, _htmlJs.createLabelWithSelect)(rm.getRef() + " role", (0, _xmlReactionJs.Reactant).roleOptions, "Role", rm.getRole(), (0, _utilJs.getID)(rDivID, (0, _htmlJs.s_select)), (0, _appJs.boundary1), (0, _appJs.level1));
            let select = lws.querySelector('select');
            select?.addEventListener('change', (event)=>{
                let target = event.target;
                rm.setRole(target.value);
                console.log("Set Role to " + target.value);
                (0, _htmlJs.resizeSelectElement)(target);
            });
            reactantDiv.appendChild(lws);
            // Remove the select element.
            reactantDiv.removeChild(selectReactant);
            // Add a remove button to remove the reactant.
            let rrb = (0, _appJs.addRemoveButton)(reactantDiv, (0, _appJs.boundary1), ()=>{
                rsDiv.removeChild(reactantDiv);
                reactants.delete(mid);
                r.removeReactant(mid);
                // Redraw the reaction diagram.
                (0, _appJs.redrawReactionsDiagram)();
            });
            // Redraw the reaction diagram.
            (0, _appJs.redrawReactionsDiagram)();
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
 */ function addAddProductButton(r, rcb, rIDM, rDivID, psDiv, molecules, products) {
    // Add an add button to add a product.
    let addProductButton = (0, _htmlJs.createButton)((0, _appJs.s_Add_sy_add), rIDM.addID(rDivID, (0, _xmlReactionJs.Product).tagName, (0, _htmlJs.s_button)), (0, _appJs.level1));
    psDiv.appendChild(addProductButton);
    addProductButton.addEventListener('click', ()=>{
        if (molecules.size === 0) {
            // Instruct user to add a molecule.
            alert("Please add a molecule to the moleculeList first.");
            return;
        }
        //let productDivID: string = rIDM.addID(rDivID, Product.tagName, mid);
        //let productDiv: HTMLDivElement = createDiv(productDivID);
        let productDiv = (0, _htmlJs.createFlexDiv)(undefined);
        psDiv.insertBefore(productDiv, addProductButton);
        // Create a selector to select a molecule as a product.
        let selectProduct = (0, _htmlJs.createSelectElement)((0, _appJs.getMoleculeKeys)(molecules), (0, _htmlJs.s_select), "", (0, _utilJs.getID)(rDivID, (0, _xmlReactionJs.Product).tagName, (0, _htmlJs.s_select)), (0, _appJs.level1));
        // Have the select element update options if new molecules are added.
        selectProduct.classList.add((0, _xmlConditionsJs.BathGas).tagName);
        productDiv.appendChild(selectProduct);
        // Add an event listener to the select element.
        selectProduct.addEventListener('click', (event)=>{
            if (selectProduct.options.length === 1) {
                // If there is only one option then select it.
                alert("As there is only one molecule it will be selected.");
                selectProduct.selectedIndex = 0;
                selectProduct.dispatchEvent(new Event('change'));
            }
        });
        selectProduct.addEventListener('change', (event)=>{
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
            productDiv.id = rIDM.addID(rDivID, (0, _xmlReactionJs.Product).tagName, mid);
            rmAttributes.set((0, _xmlReactionJs.ReactionMolecule).s_ref, mid);
            let rm = new (0, _xmlReactionJs.ReactionMolecule)(rmAttributes);
            let product = new (0, _xmlReactionJs.Product)(new Map(), rm);
            products.set(mid, product);
            r.addProduct(product);
            // Update the collapsible button label with the molecule name.
            rcb.textContent = r.getLabel();
            console.log("ReactionLabel=" + r.getLabel());
            // Create a new div for the role selector.
            let lws = (0, _htmlJs.createLabelWithSelect)(rm.getRef() + " role", (0, _xmlReactionJs.Product).roleOptions, "Role", rm.getRole(), (0, _utilJs.getID)(rDivID, (0, _htmlJs.s_select)), (0, _appJs.boundary1), (0, _appJs.level1));
            let select = lws.querySelector('select');
            select?.addEventListener('change', (event)=>{
                let target = event.target;
                rm.setRole(target.value);
                console.log("Set Role to " + target.value);
                (0, _htmlJs.resizeSelectElement)(target);
            });
            productDiv.appendChild(lws);
            // Remove the select element.
            productDiv.removeChild(selectProduct);
            // Add a remove button to remove the product.
            let prb = (0, _appJs.addRemoveButton)(productDiv, (0, _appJs.boundary1), ()=>{
                psDiv.removeChild(productDiv);
                products.delete(mid);
                r.removeProduct(mid);
                // Redraw the reaction diagram.
                (0, _appJs.redrawReactionsDiagram)();
            });
            // Redraw the reaction diagram.
            (0, _appJs.redrawReactionsDiagram)();
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
 */ function addAddTransitionStateButton(rIDM, rDivID, tsDiv, molecules, transitionStates) {
    // Add an add button to add a transition state.
    let addTSButton = (0, _htmlJs.createButton)((0, _appJs.s_Add_sy_add), rIDM.addID(rDivID, (0, _xmlReactionJs.TransitionState).tagName, (0, _htmlJs.s_button)), (0, _appJs.level1));
    tsDiv.appendChild(addTSButton);
    addTSButton.addEventListener('click', ()=>{
        if (molecules.size === 0) {
            // Instruct user to add a molecule.
            alert("Please add a molecule to the moleculeList first.");
            return;
        }
        let ts2Div = (0, _htmlJs.createFlexDiv)(undefined);
        tsDiv.insertBefore(ts2Div, addTSButton);
        // Create a selector to select a molecule as a reactant.
        let selectTS = (0, _htmlJs.createSelectElement)((0, _appJs.getMoleculeKeys)(molecules), (0, _htmlJs.s_select), "", (0, _utilJs.getID)(rDivID, (0, _xmlReactionJs.TransitionState).tagName, (0, _htmlJs.s_select)), (0, _appJs.level1));
        // Have the select element update options if new molecules are added.
        selectTS.classList.add((0, _xmlConditionsJs.BathGas).tagName);
        ts2Div.appendChild(selectTS);
        // Add an event listener to the select element.
        selectTS.addEventListener('click', (event)=>{
            if (selectTS.options.length === 1) {
                // If there is only one option then select it.
                alert("As there is only one molecule it will be selected.");
                selectTS.selectedIndex = 0;
                selectTS.dispatchEvent(new Event('change'));
            }
        });
        selectTS.addEventListener('change', (event)=>{
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
            ts2Div.id = rIDM.addID(rDivID, (0, _xmlReactionJs.TransitionState).tagName, mid);
            rmAttributes.set((0, _xmlReactionJs.ReactionMolecule).s_ref, mid);
            let rm = new (0, _xmlReactionJs.ReactionMolecule)(rmAttributes);
            let reactant = new (0, _xmlReactionJs.TransitionState)(new Map(), rm);
            transitionStates.set(mid, reactant);
            // Create a label for the Transition State role.
            let label = (0, _htmlJs.createLabel)(rm.getRef() + " role " + (0, _xmlReactionJs.TransitionState).role, (0, _appJs.level1));
            ts2Div.appendChild(label);
            // Remove the select element.
            ts2Div.removeChild(selectTS);
            // Add a remove button to remove the transition state.
            let rrb = (0, _appJs.addRemoveButton)(ts2Div, (0, _appJs.boundary1), ()=>{
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
 */ function removeReaction(rlDiv, rcDiv, rIDM, rDivID, reactions, r) {
    rlDiv.removeChild(rcDiv);
    rIDM.removeIDs(rDivID);
    rIDM.removeIDs((0, _utilJs.getID)(rDivID, (0, _appJs.s_container)));
    rIDM.removeIDs((0, _utilJs.getID)(rDivID, (0, _xmlReactionJs.Reactant).tagName));
    reactions.delete(r.id);
    (0, _appJs.mesmer).getReactionList().removeReaction(r.id);
}
function processReactionList(xml, rIDM, rsDivID, reactions, molecules) {
    let bid = (0, _utilJs.getID)(rsDivID, (0, _htmlJs.s_button));
    let rcb = document.querySelector(bid);
    // Create div to contain the reaction list.
    let rlDiv = (0, _htmlJs.createDiv)(undefined, (0, _appJs.boundary1));
    // Get the XML "reactionList" element.
    let xml_reactionList = (0, _xmlJs.getSingularElement)(xml, (0, _xmlMesmerJs.ReactionList).tagName);
    // Check the XML "reactionList" element has one or more "reaction" elements and no other elements.
    let reactionListTagNames = new Set();
    xml_reactionList.childNodes.forEach(function(node) {
        reactionListTagNames.add(node.nodeName);
    });
    if (reactionListTagNames.size > 0) {
        if (reactionListTagNames.size != 1) {
            if (!(reactionListTagNames.size == 2 && reactionListTagNames.has("#text") || reactionListTagNames.size == 3 && reactionListTagNames.has("#text") && reactionListTagNames.has("#comment"))) {
                console.error("reactionListTagNames:");
                reactionListTagNames.forEach((x)=>console.error(x));
                throw new Error("Additional tag names in reactionList:");
            }
        }
        if (!reactionListTagNames.has((0, _xmlReactionJs.Reaction).tagName)) throw new Error("Expecting tags with \"" + (0, _xmlReactionJs.Reaction).tagName + "\" tagName but there are none!");
        // Process the XML "reaction" elements.
        let xml_reactions = xml_reactionList.getElementsByTagName((0, _xmlReactionJs.Reaction).tagName);
        let xml_reactions_length = xml_reactions.length;
        console.log("Number of reactions=" + xml_reactions_length);
        //xml_reactions.forEach(function (xml_reaction) { // Cannot iterate over HTMLCollectionOf<Element> like this.
        for(let i = 0; i < xml_reactions.length; i++){
            // Set attributes.
            let reactionAttributes = (0, _xmlJs.getAttributes)(xml_reactions[i]);
            // Create reaction.
            let reaction = new (0, _xmlReactionJs.Reaction)(reactionAttributes);
            reactions.set(reaction.id, reaction);
            let reactionTagNames = new Set();
            let cns = xml_reactions[i].childNodes;
            // Create a new div for the reaction.
            let reactionDivID = (0, _appJs.addRID)((0, _xmlReactionJs.Reaction).tagName, i);
            let reactionDiv = (0, _htmlJs.createDiv)(reactionDivID);
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
            // Reactions typically have one or more reactant and product. They may also have one or more "me:transitionState" and other things...
            // Load reactants.
            let xml_reactants = xml_reactions[i].getElementsByTagName((0, _xmlReactionJs.Reactant).tagName);
            reactionTagNames.delete((0, _xmlReactionJs.Reactant).tagName);
            //console.log("xml_reactants.length=" + xml_reactants.length);
            // Create a new collapsible div for the reactants.
            let rsDivID = rIDM.addID(reactionDivID, (0, _xmlReactionJs.Reactant).tagName);
            let rsDiv = (0, _htmlJs.createDiv)(rsDivID);
            let rscDivID = (0, _utilJs.getID)(rsDivID, (0, _appJs.s_container));
            let rscDiv = (0, _htmlJs.getCollapsibleDiv)(rscDivID, reactionDiv, null, rsDiv, (0, _appJs.s_Reactants), (0, _appJs.boundary1), (0, _appJs.level1));
            let reactants = new Map();
            if (xml_reactants.length > 0) {
                for(let j = 0; j < xml_reactants.length; j++){
                    let reactantDivID = (0, _utilJs.getID)(rsDivID, (0, _xmlReactionJs.Reactant).tagName, j);
                    let reactantDiv = (0, _htmlJs.createFlexDiv)(reactantDivID);
                    rsDiv.appendChild(reactantDiv);
                    let xml_molecule = (0, _xmlJs.getFirstElement)(xml_reactants[j], (0, _xmlMoleculeJs.Molecule).tagName);
                    let rmAttributes = (0, _xmlJs.getAttributes)(xml_molecule);
                    let molecule = new (0, _xmlReactionJs.ReactionMolecule)(rmAttributes);
                    let reactant = new (0, _xmlReactionJs.Reactant)((0, _xmlJs.getAttributes)(xml_reactants[j]), molecule);
                    reactants.set(molecule.getRef(), reactant);
                    // Create a new div for the role.
                    let lws = (0, _htmlJs.createLabelWithSelect)(molecule.getRef() + " role", (0, _xmlReactionJs.Reactant).roleOptions, "Role", molecule.getRole(), rIDM.addID(reactantDivID, (0, _htmlJs.s_select)), (0, _appJs.boundary1), (0, _appJs.level1));
                    lws.querySelector('select')?.addEventListener('change', (event)=>{
                        let target = event.target;
                        molecule.setRole(target.value);
                        console.log("Set Role to " + target.value);
                        (0, _htmlJs.resizeSelectElement)(target);
                    });
                    reactantDiv.appendChild(lws);
                    // Add a remove button to remove the reactant.
                    let rrb = (0, _appJs.addRemoveButton)(reactantDiv, (0, _appJs.boundary1), ()=>{
                        rsDiv.removeChild(reactantDiv);
                        rIDM.removeIDs(reactantDivID);
                        reactants.delete(molecule.getRef());
                    });
                }
                reaction.setReactants(reactants);
            }
            addAddReactantButton(reaction, rcb, rIDM, reactionDivID, rsDiv, molecules, reactants);
            // Load products.
            let xml_products = xml_reactions[i].getElementsByTagName((0, _xmlReactionJs.Product).tagName);
            reactionTagNames.delete((0, _xmlReactionJs.Product).tagName);
            //console.log("xml_products.length=" + xml_products.length);
            // Create collapsible div for the products.
            let psDivID = rIDM.addID(reactionDivID, (0, _xmlReactionJs.Product).tagName);
            let psDiv = (0, _htmlJs.createFlexDiv)(psDivID);
            let pscDivID = (0, _utilJs.getID)(psDivID, (0, _appJs.s_container));
            let pscDiv = (0, _htmlJs.getCollapsibleDiv)(pscDivID, reactionDiv, null, psDiv, (0, _appJs.s_Products), (0, _appJs.boundary1), (0, _appJs.level1));
            //let products: Product[] = [];
            let products = new Map();
            if (xml_products.length > 0) {
                for(let j = 0; j < xml_products.length; j++){
                    let xml_molecule = (0, _xmlJs.getFirstElement)(xml_products[j], (0, _xmlMoleculeJs.Molecule).tagName);
                    let molecule = new (0, _xmlReactionJs.ReactionMolecule)((0, _xmlJs.getAttributes)(xml_molecule));
                    let product = new (0, _xmlReactionJs.Product)((0, _xmlJs.getAttributes)(xml_products[j]), molecule);
                    //products.push(product);
                    products.set(molecule.getRef(), product);
                    let lws = (0, _htmlJs.createLabelWithSelect)(molecule.getRef() + " role", (0, _xmlReactionJs.Product).roleOptions, molecule.getRole(), molecule.getRef(), rIDM.addID(psDivID, j, "Role"), (0, _appJs.boundary1), (0, _appJs.level1));
                    let select = lws.querySelector('select');
                    select.value = molecule.getRole();
                    select.addEventListener('change', (event)=>{
                        let target = event.target;
                        molecule.setRole(target.value);
                        console.log("Set Role to " + target.value);
                        (0, _htmlJs.resizeSelectElement)(target);
                    });
                    (0, _htmlJs.resizeSelectElement)(select);
                    psDiv.appendChild(lws);
                    // Add a remove button to remove the product.
                    let prb = (0, _appJs.addRemoveButton)(psDiv, (0, _appJs.boundary1), ()=>{
                        psDiv.removeChild(lws);
                        rIDM.removeIDs(psDivID);
                        products.delete(molecule.getRef());
                    });
                }
                reaction.setProducts(products);
            }
            addAddProductButton(reaction, rcb, rIDM, reactionDivID, psDiv, molecules, products);
            // Create a new collapsible div for the reaction.
            let reactioncDivID = (0, _appJs.addRID)(reactionDivID, (0, _appJs.s_container));
            let reactioncDiv = (0, _htmlJs.getCollapsibleDiv)(reactioncDivID, rlDiv, null, reactionDiv, reaction.getLabel(), (0, _appJs.boundary1), (0, _appJs.level1));
            // Load tunneling.
            let xml_tunneling = xml_reactions[i].getElementsByTagName((0, _xmlReactionJs.Tunneling).tagName);
            if (xml_tunneling.length > 0) {
                if (xml_tunneling.length > 1) throw new Error("Expecting 1 " + (0, _xmlReactionJs.Tunneling).tagName + " but finding " + xml_tunneling.length + "!");
                let tunneling = new (0, _xmlReactionJs.Tunneling)((0, _xmlJs.getAttributes)(xml_tunneling[0]));
                reaction.setTunneling(tunneling);
                let lws = (0, _htmlJs.createLabelWithSelect)((0, _xmlReactionJs.Tunneling).tagName, (0, _xmlReactionJs.Tunneling).options, (0, _appJs.s_Tunneling), tunneling.getName(), (0, _appJs.addRID)(reactionDivID, (0, _xmlReactionJs.Tunneling).tagName), (0, _appJs.boundary1), (0, _appJs.level1));
                lws.querySelector('select')?.addEventListener('change', (event)=>{
                    let target = event.target;
                    tunneling.setName(target.value);
                    console.log("Set Tunneling to " + target.value);
                    (0, _htmlJs.resizeSelectElement)(target);
                });
                reactionDiv.appendChild(lws);
            }
            // Load transition states.
            let xml_transitionStates = xml_reactions[i].getElementsByTagName((0, _xmlReactionJs.TransitionState).tagName);
            //console.log("xml_transitionStates.length=" + xml_transitionStates.length);
            // Create collapsible div.
            let tsDivID = (0, _appJs.addRID)(reactionDivID, (0, _xmlReactionJs.TransitionState).tagName);
            let tsDiv = (0, _htmlJs.createDiv)(tsDivID);
            let tscDivID = (0, _appJs.addRID)(tsDivID, (0, _appJs.s_container));
            let tscDiv = (0, _htmlJs.getCollapsibleDiv)(tscDivID, reactionDiv, null, tsDiv, (0, _appJs.s_Transition_States), (0, _appJs.boundary1), (0, _appJs.level1));
            let transitionStates = new Map();
            if (xml_transitionStates.length > 0) {
                for(let j = 0; j < xml_transitionStates.length; j++){
                    let xml_molecule = (0, _xmlJs.getFirstElement)(xml_transitionStates[j], (0, _xmlMoleculeJs.Molecule).tagName);
                    let molecule = new (0, _xmlReactionJs.ReactionMolecule)((0, _xmlJs.getAttributes)(xml_molecule));
                    let transitionState = new (0, _xmlReactionJs.TransitionState)((0, _xmlJs.getAttributes)(xml_transitionStates[j]), molecule);
                    transitionStates.set(molecule.getRef(), transitionState);
                    // Create a label for the Transition State role.
                    let label = (0, _htmlJs.createLabel)(molecule.getRef() + " role " + (0, _xmlReactionJs.TransitionState).role, (0, _appJs.level1));
                    tsDiv.appendChild(label);
                }
                reaction.setTransitionStates(transitionStates);
            }
            addAddTransitionStateButton(rIDM, reactionDivID, tsDiv, molecules, transitionStates);
            // Load MCRCMethod.
            //console.log("Load MCRCMethod...");
            let xml_MCRCMethod = xml_reactions[i].getElementsByTagName((0, _xmlReactionJs.MCRCMethod).tagName);
            //console.log("xml_MCRCMethod=" + xml_MCRCMethod);
            //console.log("xml_MCRCMethod.length=" + xml_MCRCMethod.length);
            if (xml_MCRCMethod.length > 0) {
                if (xml_MCRCMethod.length > 1) throw new Error("Expecting 1 " + (0, _xmlReactionJs.MCRCMethod).tagName + " but finding " + xml_MCRCMethod.length + "!");
                else {
                    let mm;
                    let mmAttributes = (0, _xmlJs.getAttributes)(xml_MCRCMethod[0]);
                    let type = mmAttributes.get("xsi:type");
                    if (type == undefined) // If there is no xsi:type search for a name.
                    type = mmAttributes.get("name");
                    let mmDivId = (0, _appJs.addRID)(reactionDivID, (0, _xmlReactionJs.MCRCMethod).tagName);
                    let mmDiv = (0, _htmlJs.createDiv)(mmDivId);
                    if (type == (0, _xmlReactionJs.MesmerILT).xsiType || type == (0, _xmlReactionJs.MesmerILT).xsiType2) {
                        // Create a collapsible div.
                        let mmcDivId = (0, _appJs.addRID)(mmDivId, (0, _appJs.s_container));
                        let mmcDiv = (0, _htmlJs.getCollapsibleDiv)(mmcDivId, reactionDiv, null, mmDiv, (0, _xmlReactionJs.MCRCMethod).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
                        reactionDiv.appendChild(mmcDiv);
                        //console.log(MCRCMethod.tagName + " name=" + name);
                        mm = new (0, _xmlReactionJs.MesmerILT)(mmAttributes);
                        //console.log(MCRCMethod.tagName + "xsi:type=" + type);
                        let xml_pe = xml_MCRCMethod[0].getElementsByTagName((0, _xmlReactionJs.PreExponential).tagName);
                        if (xml_pe != null) {
                            if (xml_pe[0] != null) {
                                let inputString = (0, _xmlJs.getInputString)(xml_pe[0]);
                                let value = new (0, _bigJsDefault.default)(inputString);
                                let peAttributes = (0, _xmlJs.getAttributes)(xml_pe[0]);
                                let pe = new (0, _xmlReactionJs.PreExponential)(peAttributes, value);
                                mm.setPreExponential(pe);
                                // Create a new div element for the input.
                                let lwi = (0, _htmlJs.createLabelWithInput)("number", (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.PreExponential).tagName, (0, _appJs.s_input)), (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                                    let target = event.target;
                                    (0, _appJs.setNumberNode)(pe, target);
                                }, inputString, (0, _xmlReactionJs.PreExponential).tagName);
                                mmDiv.appendChild(lwi);
                                let input = lwi.querySelector('input');
                                input.value = inputString;
                                (0, _htmlJs.resizeInputElement)(input);
                                input.addEventListener('change', (event)=>{
                                    let target = event.target;
                                    inputString = target.value;
                                    pe.value = new (0, _bigJsDefault.default)(inputString);
                                    console.log((0, _xmlReactionJs.PreExponential).tagName + " changed to " + inputString);
                                    (0, _htmlJs.resizeInputElement)(input);
                                });
                                (0, _appJs.addAnyUnits)(undefined, peAttributes, lwi, null, (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.PreExponential).tagName), (0, _xmlReactionJs.PreExponential).tagName, (0, _appJs.boundary1), (0, _appJs.boundary1));
                                mmDiv.appendChild(lwi);
                            }
                        }
                        //console.log("preExponential " + preExponential);
                        let xml_ae = xml_MCRCMethod[0].getElementsByTagName((0, _xmlReactionJs.ActivationEnergy).tagName);
                        if (xml_ae != null) {
                            if (xml_ae[0] != null) {
                                let inputString = (0, _xmlJs.getInputString)(xml_ae[0]);
                                let value = new (0, _bigJsDefault.default)(inputString);
                                let aeAttributes = (0, _xmlJs.getAttributes)(xml_ae[0]);
                                let ae = new (0, _xmlReactionJs.ActivationEnergy)(aeAttributes, value);
                                mm.setActivationEnergy(ae);
                                // Create a new div element for the input.
                                let lwi = (0, _htmlJs.createLabelWithInput)("number", (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.ActivationEnergy).tagName, (0, _appJs.s_input)), (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                                    let target = event.target;
                                    (0, _appJs.setNumberNode)(ae, target);
                                }, inputString, (0, _xmlReactionJs.ActivationEnergy).tagName);
                                let input = lwi.querySelector('input');
                                input.value = inputString;
                                (0, _htmlJs.resizeInputElement)(input);
                                input.addEventListener('change', (event)=>{
                                    let target = event.target;
                                    inputString = target.value;
                                    ae.value = new (0, _bigJsDefault.default)(inputString);
                                    console.log((0, _xmlReactionJs.ActivationEnergy).tagName + " changed to " + inputString);
                                    (0, _htmlJs.resizeInputElement)(input);
                                });
                                (0, _appJs.addAnyUnits)(undefined, aeAttributes, lwi, null, (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.ActivationEnergy).tagName), (0, _xmlReactionJs.ActivationEnergy).tagName, (0, _appJs.boundary1), (0, _appJs.boundary1));
                                mmDiv.appendChild(lwi);
                            }
                        }
                        //console.log("activationEnergy " + activationEnergy);
                        let xml_ti = xml_MCRCMethod[0].getElementsByTagName((0, _xmlReactionJs.TInfinity).tagName);
                        if (xml_ti != null) {
                            if (xml_ti[0] != null) {
                                let inputString = (0, _xmlJs.getInputString)(xml_ti[0]);
                                let value = new (0, _bigJsDefault.default)(inputString);
                                let tiAttributes = (0, _xmlJs.getAttributes)(xml_ti[0]);
                                let ti = new (0, _xmlReactionJs.TInfinity)(tiAttributes, value);
                                mm.setTInfinity(ti);
                                // Create a new div element for the input.
                                let lwi = (0, _htmlJs.createLabelWithInput)("number", (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.TInfinity).tagName, (0, _appJs.s_input)), (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                                    let target = event.target;
                                    (0, _appJs.setNumberNode)(ti, target);
                                }, inputString, (0, _xmlReactionJs.TInfinity).tagName);
                                let input = lwi.querySelector('input');
                                input.value = inputString;
                                (0, _htmlJs.resizeInputElement)(input);
                                input.addEventListener('change', (event)=>{
                                    let target = event.target;
                                    inputString = target.value;
                                    ti.value = new (0, _bigJsDefault.default)(inputString);
                                    console.log((0, _xmlReactionJs.TInfinity).tagName + " changed to " + inputString);
                                    (0, _htmlJs.resizeInputElement)(input);
                                });
                                (0, _appJs.addAnyUnits)(undefined, tiAttributes, lwi, null, (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.TInfinity).tagName), (0, _xmlReactionJs.TInfinity).tagName, (0, _appJs.boundary1), (0, _appJs.boundary1));
                                mmDiv.appendChild(lwi);
                            }
                        }
                        //console.log("tInfinity " + tInfinity);
                        let xml_ni = xml_MCRCMethod[0].getElementsByTagName((0, _xmlReactionJs.NInfinity).tagName);
                        if (xml_ni != null) {
                            if (xml_ni[0] != null) {
                                let inputString = (0, _xmlJs.getInputString)(xml_ni[0]);
                                let value = new (0, _bigJsDefault.default)(inputString);
                                let niAttributes = (0, _xmlJs.getAttributes)(xml_ni[0]);
                                let ni = new (0, _xmlReactionJs.NInfinity)(niAttributes, value);
                                mm.setNInfinity(ni);
                                // Create a new div element for the input.
                                let lwi = (0, _htmlJs.createLabelWithInput)("number", (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.NInfinity).tagName, (0, _appJs.s_input)), (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                                    let target = event.target;
                                    (0, _appJs.setNumberNode)(ni, target);
                                }, inputString, (0, _xmlReactionJs.NInfinity).tagName);
                                mmDiv.appendChild(lwi);
                                let inputElement = lwi.querySelector('input');
                                inputElement.value = inputString;
                                (0, _htmlJs.resizeInputElement)(inputElement);
                                inputElement.addEventListener('change', (event)=>{
                                    let target = event.target;
                                    inputString = target.value;
                                    ni.value = new (0, _bigJsDefault.default)(inputString);
                                    console.log((0, _xmlReactionJs.NInfinity).tagName + " set to " + inputString);
                                    (0, _htmlJs.resizeInputElement)(inputElement);
                                });
                                (0, _appJs.addAnyUnits)(undefined, niAttributes, lwi, null, (0, _appJs.addRID)(mmDivId, (0, _xmlReactionJs.NInfinity).tagName), (0, _xmlReactionJs.NInfinity).tagName, (0, _appJs.boundary1), (0, _appJs.boundary1));
                                mmDiv.appendChild(lwi);
                            }
                        }
                    } else {
                        mm = new (0, _xmlReactionJs.MCRCMethod)(mmAttributes);
                        let mCRCMethodLabel = document.createElement('label');
                        mCRCMethodLabel.textContent = (0, _xmlReactionJs.MCRCMethod).tagName + ": " + type;
                        Object.assign(mCRCMethodLabel.style, (0, _appJs.level1));
                        mmDiv.appendChild(mCRCMethodLabel);
                        reactionDiv.appendChild(mmDiv);
                    }
                    reaction.setMCRCMethod(mm);
                }
            }
            // me:excessReactantConc
            let xml_erc = xml_reactions[i].getElementsByTagName((0, _xmlReactionJs.ExcessReactantConc).tagName);
            //console.log("n_me:excessReactantConc=" + xml_erc.length);
            if (xml_erc.length > 0) {
                if (xml_erc.length > 1) throw new Error("Expecting 1 " + (0, _xmlReactionJs.ExcessReactantConc).tagName + " but finding " + xml_erc.length + "!");
                let value = new (0, _bigJsDefault.default)((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_erc[0])));
                let erc = new (0, _xmlReactionJs.ExcessReactantConc)((0, _xmlJs.getAttributes)(xml_erc[0]), value);
                reaction.setExcessReactantConc(erc);
                let id = (0, _appJs.addRID)(reactionDivID, (0, _xmlReactionJs.ExcessReactantConc).tagName);
                let lwi = (0, _htmlJs.createLabelWithInput)("number", id, (0, _appJs.boundary1), (0, _appJs.level1), (event)=>{
                    let target = event.target;
                    (0, _appJs.setNumberNode)(erc, target);
                }, value.toExponential(), (0, _xmlReactionJs.ExcessReactantConc).tagName);
                reactionDiv.appendChild(lwi);
            }
            // me:canonicalRateList
            let xml_crl = xml_reactions[i].getElementsByTagName((0, _xmlReactionJs.CanonicalRateList).tagName);
            //console.log("n_me:canonicalRateList=" + xml_crl.length);
            if (xml_crl.length > 0) {
                if (xml_crl.length > 1) throw new Error("Expecting 1 " + (0, _xmlReactionJs.CanonicalRateList).tagName + " but finding " + xml_crl.length + "!");
                let clr_attributes = (0, _xmlJs.getAttributes)(xml_crl[0]);
                let crl = new (0, _xmlReactionJs.CanonicalRateList)(clr_attributes);
                reaction.setCanonicalRateList(crl);
                // Create a new collapsible div for the canonicalRateList.
                let crlDivID = (0, _appJs.addRID)(reactionDivID, (0, _xmlReactionJs.CanonicalRateList).tagName);
                let crlDiv = (0, _htmlJs.createDiv)(crlDivID);
                let crlcDivID = (0, _appJs.addRID)(crlDivID, (0, _appJs.s_container));
                let crlcDiv = (0, _htmlJs.getCollapsibleDiv)(crlcDivID, reactionDiv, null, crlDiv, (0, _xmlReactionJs.CanonicalRateList).tagName, (0, _appJs.boundary1), (0, _appJs.level1));
                reactionDiv.appendChild(crlcDiv);
                //let id = addID(reaction.id, CanonicalRateList.tagName);
                // me:description.
                let xml_d = xml_crl[0].getElementsByTagName((0, _xmlMesmerJs.Description).tagName);
                //console.log("xml_d.length=" + xml_d.length);
                if (xml_d.length > 0) {
                    if (xml_d.length > 1) throw new Error("Expecting 1 " + (0, _xmlMesmerJs.Description).tagName + " but finding " + xml_d.length + "!");
                    let description = (0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_d[0]));
                    //console.log("description=" + description);
                    crl.setDescription(new (0, _xmlMesmerJs.Description)((0, _xmlJs.getAttributes)(xml_d[0]), description));
                    let l = (0, _htmlJs.createLabel)(description + " (" + (0, _utilJs.mapToString)(clr_attributes) + ")", (0, _appJs.boundary1));
                    let ldiv = (0, _htmlJs.createDiv)(undefined, (0, _appJs.level1));
                    ldiv.appendChild(l);
                    crlDiv.appendChild(ldiv);
                }
                // me:kinf.
                let xml_k = xml_crl[0].getElementsByTagName((0, _xmlReactionJs.Kinf).tagName);
                //console.log("xml_k.length=" + xml_k.length);
                if (xml_k.length > 0) {
                    // Create a table for the kinf.
                    let t = (0, _htmlJs.createTable)((0, _appJs.addRID)(crlDivID, (0, _xmlReactionJs.Kinf).tagName, (0, _appJs.s_table)), (0, _appJs.level1));
                    crlDiv.appendChild(t);
                    for(let j = 0; j < xml_k.length; j++){
                        let k = new (0, _xmlReactionJs.Kinf)((0, _xmlJs.getAttributes)(xml_k[j]));
                        crl.addKinf(k);
                        // T.
                        let xml_T = xml_k[j].getElementsByTagName((0, _xmlMesmerJs.T).tagName);
                        //console.log("xml_T.length=" + xml_T.length);
                        if (xml_T.length > 0) {
                            if (xml_T.length > 1) throw new Error("Expecting 1 " + (0, _xmlMesmerJs.T).tagName + " but finding " + xml_T.length + "!");
                            let value = new (0, _bigJsDefault.default)((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_T[0])));
                            k.setT(new (0, _xmlMesmerJs.T)((0, _xmlJs.getAttributes)(xml_T[0]), value));
                        }
                        // Val.
                        let xml_Val = xml_k[j].getElementsByTagName((0, _xmlReactionJs.Val).tagName);
                        //console.log("xml_Val.length=" + xml_Val.length);
                        if (xml_Val.length > 0) {
                            if (xml_Val.length > 1) throw new Error("Expecting 1 " + (0, _xmlReactionJs.Val).tagName + " but finding " + xml_Val.length + "!");
                            let value = new (0, _bigJsDefault.default)((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_Val[0])));
                            k.setVal(new (0, _xmlReactionJs.Val)((0, _xmlJs.getAttributes)(xml_Val[0]), value));
                        }
                        // Rev.
                        let xml_Rev = xml_k[j].getElementsByTagName((0, _xmlReactionJs.Rev).tagName);
                        //console.log("xml_Rev.length=" + xml_Rev.length);
                        if (xml_Rev.length > 0) {
                            if (xml_Rev.length > 1) throw new Error("Expecting 1 " + (0, _xmlReactionJs.Rev).tagName + " but finding " + xml_Rev.length + "!");
                            let value = new (0, _bigJsDefault.default)((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_Rev[0])));
                            k.setRev(new (0, _xmlReactionJs.Rev)((0, _xmlJs.getAttributes)(xml_Rev[0]), value));
                        }
                        // Keq.
                        let xml_Keq = xml_k[j].getElementsByTagName((0, _xmlReactionJs.Keq).tagName);
                        //console.log("xml_Keq.length=" + xml_Keq.length);
                        if (xml_Keq.length > 0) {
                            if (xml_Keq.length > 1) throw new Error("Expecting 1 " + (0, _xmlReactionJs.Keq).tagName + " but finding " + xml_Keq.length + "!");
                            let value = new (0, _bigJsDefault.default)((0, _xmlJs.getNodeValue)((0, _xmlJs.getFirstChildNode)(xml_Keq[0])));
                            k.setKeq(new (0, _xmlReactionJs.Keq)((0, _xmlJs.getAttributes)(xml_Keq[0]), value));
                        }
                        if (j == 0) // It maybe that only the first kinf contains unit details!
                        (0, _htmlJs.addTableHeaderRow)(t, k.getHeader());
                        (0, _htmlJs.addTableRow)(t, k.toStringArray());
                    }
                    (0, _appJs.addSaveAsCSVButton)(crl.toCSV.bind(crl), crlDiv, t, reaction.id + "_" + (0, _xmlReactionJs.CanonicalRateList).tagName, (0, _appJs.level1));
                }
            }
            // Add a remove reaction button.
            (0, _appJs.addRemoveButton)(reactionDiv, (0, _appJs.level1), ()=>{
                removeReaction(rlDiv, reactioncDiv, rIDM, reactionDivID, reactions, reaction);
            });
        }
    } else console.warn("No reaction elements found! Please add a reaction in reactionList.");
    // Add a button to add a reaction.
    //getAddReactionButton(rIDM, rlDiv, reactions, molecules);
    return rlDiv;
}

},{"big.js":"91nMZ","./app.js":"dPB9w","./html.js":"aLPSL","./xml_mesmer.js":"8G2m7","./xml_molecule.js":"cg9tc","./xml_reaction.js":"1VvKr","./util.js":"f0Rnl","./xml.js":"7znDa","./xml_conditions.js":"cZv1r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1VvKr":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A reference to a molecule, not to be confused with a Molecule.
 * The attribute "ref" is the same as a Molecule ID for a molecule in the XML "moleculeList".
 * The attribute "role" is the role of the molecule in the reaction. Expected values are:
 * ["deficientReactant", "excessReactant", "modelled", "transitionState", "sink"], but this may depend 
 * on whether the molecule is a reactant, product or transition state.
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
 * In the XML, the "me:val" node is a child of a "me:kinf" node.
 */ parcelHelpers.export(exports, "Val", ()=>Val);
/**
 * In the XML, the "me:rev" node is a child of a "me:kinf" node.
 */ parcelHelpers.export(exports, "Rev", ()=>Rev);
/**
 * In the XML, the "me:val" node is a child of a "me:kinf" node.
 */ parcelHelpers.export(exports, "Keq", ()=>Keq);
/**
 * In the XML, the "me:kinf" node is a child of a "me:canonicalRateList" node.
 */ parcelHelpers.export(exports, "Kinf", ()=>Kinf);
/**
 * In the XML, the "me:canonicalRateList" node is a child of a "reaction" node.
 */ parcelHelpers.export(exports, "CanonicalRateList", ()=>CanonicalRateList);
/**
 * A class for representing a reaction.
 */ parcelHelpers.export(exports, "Reaction", ()=>Reaction);
var _bigJs = require("big.js");
var _xmlMoleculeJs = require("./xml_molecule.js");
var _xmlJs = require("./xml.js");
var _xmlMesmerJs = require("./xml_mesmer.js");
var _appJs = require("./app.js");
class ReactionMolecule extends (0, _xmlJs.TagWithAttributes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "molecule";
    }
    static{
        /**
     * The ref string.
     */ this.s_ref = "ref";
    }
    static{
        /**
     * The role string.
     */ this.s_role = "role";
    }
    /**
     * @param attributes The attributes.
     * @param tagName The tag name.
     * @param molecule The molecule (an abbreviated molecule).
     */ constructor(attributes){
        super(attributes, ReactionMolecule.tagName);
        this.ref = attributes.get(ReactionMolecule.s_ref);
        this.role = attributes.get(ReactionMolecule.s_role);
    }
    /**
     * @returns The ref attribute.
     */ getRef() {
        return this.ref;
    }
    /**
     * @param ref The ref attribute.
     */ setRef(ref) {
        this.ref = ref;
        this.attributes.set("ref", ref);
    }
    /**
     * @returns The role attribute.
     */ getRole() {
        return this.role;
    }
    /**
     * @param role The role of the molecule in the reaction.
     */ setRole(role) {
        this.role = role;
        this.attributes.set("role", role);
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
     */ this.s_deficientReactant = "deficientReactant";
    }
    static{
        this.s_excessReactant = "excessReactant";
    }
    static{
        this.s_modelled = "modelled";
    }
    static{
        this.roleOptions = [
            Reactant.s_deficientReactant,
            Reactant.s_excessReactant,
            Reactant.s_modelled
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
    static{
        /**
     * The role.
     */ this.role = "transitionState";
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
class Val extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:val";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, Val.tagName, value);
    }
}
class Rev extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:rev";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, Rev.tagName, value);
    }
}
class Keq extends (0, _xmlJs.NumberNode) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:Keq";
    }
    /**
     * @param attributes The attributes. 
     * @param value The value of the factor.
     */ constructor(attributes, value){
        super(attributes, Keq.tagName, value);
    }
}
class Kinf extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:kinf";
    }
    /**
     * @param attributes The attributes.
     * @param t The t.
     * @param val The val.
     * @param rev The rev.
     * @param Keq The Keq.
     */ constructor(attributes, t, val, rev, keq){
        super(attributes, Kinf.tagName);
        this.index = new Map();
        if (t != undefined) {
            this.index.set((0, _xmlMesmerJs.T).tagName, this.nodes.size);
            this.addNode(t);
        }
        if (val != undefined) {
            this.index.set(Val.tagName, this.nodes.size);
            this.addNode(val);
        }
        if (rev != undefined) {
            this.index.set(Rev.tagName, this.nodes.size);
            this.addNode(rev);
        }
        if (keq != undefined) {
            this.index.set(Keq.tagName, this.nodes.size);
            this.addNode(keq);
        }
    }
    /**
     * @returns The T node or undefined if it does not exist.
     */ getT() {
        let i = this.index.get((0, _xmlMesmerJs.T).tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param t The T node.
     */ setT(t) {
        let i = this.index.get((0, _xmlMesmerJs.T).tagName);
        if (i == undefined) {
            this.index.set((0, _xmlMesmerJs.T).tagName, this.nodes.size);
            this.addNode(t);
        } else this.nodes.set(i, t);
    }
    /**
     * @returns The Val node or undefined if it does not exist.
     */ getVal() {
        let i = this.index.get(Val.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param val The Val node.
     */ setVal(val) {
        let i = this.index.get(Val.tagName);
        if (i == undefined) {
            this.index.set(Val.tagName, this.nodes.size);
            this.addNode(val);
        } else this.nodes.set(i, val);
    }
    /**
     * @returns The Rev node or undefined if it does not exist.
     */ getRev() {
        let i = this.index.get(Rev.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param rev The Rev node.
     */ setRev(rev) {
        let i = this.index.get(Rev.tagName);
        if (i == undefined) {
            this.index.set(Rev.tagName, this.nodes.size);
            this.addNode(rev);
        } else this.nodes.set(i, rev);
    }
    /**
     * @returns The Keq node or undefined if it does not exist.
     */ getKeq() {
        let i = this.index.get(Keq.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param keq The Keq node.
     */ setKeq(keq) {
        let i = this.index.get(Keq.tagName);
        if (i == undefined) {
            this.index.set(Keq.tagName, this.nodes.size);
            this.addNode(keq);
        } else this.nodes.set(i, keq);
    }
    /**
    * The header.
    */ getHeader() {
        let header = [];
        header.push("T (" + this.getT()?.attributes.get("units") + ")");
        header.push("kf (" + this.getVal()?.attributes.get("units") + ")");
        header.push("krev (" + this.getRev()?.attributes.get("units") + ")");
        header.push("Keq (" + this.getKeq()?.attributes.get("units") + ")");
        return header;
    }
    /**
     * @returns The Kinf as a string[].
     */ toStringArray() {
        let t = this.getT();
        let val = this.getVal();
        let rev = this.getRev();
        let keq = this.getKeq();
        //return [t.getValue().toString(), val.getValue().toString(), rev.getValue().toString(), keq.getValue().toString()];
        return [
            t.value.toString(),
            val.value.toString(),
            rev.value.toString(),
            keq.value.toString()
        ];
    }
    /**
     * @returns The Kinf as a CSV string.
     */ toCSV() {
        return this.toStringArray().join(",");
    }
}
class CanonicalRateList extends (0, _xmlJs.NodeWithNodes) {
    static{
        /**
     * The tag name.
     */ this.tagName = "me:canonicalRateList";
    }
    /**
     * @param attributes The attributes.
     * @param canonicalRate The canonical rate.
     */ constructor(attributes, description, kinfs){
        super(attributes, CanonicalRateList.tagName);
        this.index = new Map();
        this.kinfIndex = new Map();
        if (description != undefined) {
            this.index.set((0, _xmlMesmerJs.Description).tagName, this.nodes.size);
            this.addNode(description);
        }
        if (kinfs != undefined) kinfs.forEach((kinf)=>{
            this.kinfIndex.set(this.nodes.size, this.nodes.size);
            this.addNode(kinf);
        });
    }
    /**
     * @returns The Description node or undefined if it does not exist.
     */ getDescription() {
        let i = this.index.get((0, _xmlMesmerJs.Description).tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * @param description The Description node.
     */ setDescription(description) {
        let i = this.index.get((0, _xmlMesmerJs.Description).tagName);
        if (i == undefined) {
            this.index.set((0, _xmlMesmerJs.Description).tagName, this.nodes.size);
            this.addNode(description);
        } else this.nodes.set(i, description);
    }
    /**
     * @returns The Kinf nodes.
     */ getKinfs() {
        return Array.from(this.kinfIndex.values()).map((index)=>this.nodes.get(index));
    }
    /**
     * @param kinf The Kinf node.
     */ addKinf(kinf) {
        this.kinfIndex.set(this.kinfIndex.size, this.nodes.size);
        this.addNode(kinf);
    }
    /**
     * @returns The CanonicalRateList as a CSV string.
     */ toCSV() {
        let csv = "";
        let first = true;
        this.getKinfs().forEach((k)=>{
            if (first) {
                first = false;
                csv += k.getHeader().join(",") + "\n";
            }
            csv += k.toCSV() + "\n";
        });
        return csv;
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
     * @param canonicalRateList The canonical rate list (optional).
     */ constructor(attributes, reactants, products, tunneling, transitionStates, mCRCMethod, excessReactantConc, canonicalRateList){
        super(attributes, Reaction.tagName);
        this.index = new Map();
        this.reactantsIndex = new Map();
        this.productsIndex = new Map();
        this.transitionStatesIndex = new Map();
        let id = attributes.get(Reaction.s_id);
        if (id == undefined) throw new Error(Reaction.s_id + ' is undefined!');
        this.id = id;
        if (reactants != undefined) {
            reactants.forEach((r, key)=>{
                this.reactantsIndex.set(r.getMolecule().getRef(), this.nodes.size);
                this.addNode(r);
            });
            this.index.set(Reactant.tagName, this.reactantsIndex);
        }
        if (products != undefined) {
            products.forEach((p, key)=>{
                this.productsIndex.set(p.getMolecule().getRef(), this.nodes.size);
                this.addNode(p);
            });
            this.index.set(Product.tagName, this.productsIndex);
        }
        if (tunneling != undefined) {
            this.index.set(Tunneling.tagName, this.nodes.size);
            this.addNode(tunneling);
        }
        if (transitionStates != undefined) {
            transitionStates.forEach((t, key)=>{
                this.transitionStatesIndex.set(t.getMolecule().getRef(), this.nodes.size);
                this.addNode(t);
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
        if (canonicalRateList != undefined) {
            this.index.set(CanonicalRateList.tagName, this.nodes.size);
            this.addNode(canonicalRateList);
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
            map.set(this.nodes.get(v).getRef(), v);
            map.set(node.tagName, this.nodes.size);
            this.index.set(tagName, map);
        }
    }
    /**
     * @returns The reactants.
     */ getReactants() {
        let i = this.index.get(Reactant.tagName);
        if (i == undefined) return new Map();
        let reactants = new Map();
        if (i instanceof Map) i.forEach((index, ref)=>{
            reactants.set(ref, this.nodes.get(index));
        });
        else {
            let r = this.nodes.get(i);
            reactants.set(r.getMolecule().getRef(), r);
        }
        return reactants;
    }
    /**
     * Set the reactants.
     */ setReactants(reactants) {
        reactants.forEach((reactant, key)=>{
            this.reactantsIndex.set(reactant.getMolecule().getRef(), this.nodes.size);
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
        this.reactantsIndex.set(reactant.getMolecule().getRef(), this.nodes.size);
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
        /*
        let i: Map<string, number> | number | undefined = this.index.get(Product.tagName);
        if (i == undefined) {
            return [];
        }
        if (i instanceof Map) {
            return Array.from(i.values()).map(index => this.nodes.get(index) as Product);
        } else {
            return [this.nodes.get(i) as Product];
        }*/ let i = this.index.get(Product.tagName);
        if (i == undefined) return new Map();
        let products = new Map();
        if (i instanceof Map) i.forEach((index, ref)=>{
            products.set(ref, this.nodes.get(index));
        });
        else {
            let r = this.nodes.get(i);
            products.set(r.getMolecule().getRef(), r);
        }
        return products;
    }
    /**
     * Set the products.
     */ setProducts(products) {
        products.forEach((product, key)=>{
            this.productsIndex.set(product.getMolecule().getRef(), this.nodes.size);
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
        this.productsIndex.set(product.getMolecule().getRef(), this.nodes.size);
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
        if (i == undefined) return new Map();
        let transitionStates = new Map();
        if (i instanceof Map) i.forEach((index, ref)=>{
            transitionStates.set(ref, this.nodes.get(index));
        });
        else {
            let r = this.nodes.get(i);
            transitionStates.set(r.getMolecule().getRef(), r);
        }
        return transitionStates;
    }
    /**
     * Set the transition states.
     */ setTransitionStates(transitionStates) {
        transitionStates.forEach((transitionState, key)=>{
            this.transitionStatesIndex.set(transitionState.getMolecule().getRef(), this.nodes.size);
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
        this.transitionStatesIndex.set(transitionState.getMolecule().getRef(), this.nodes.size);
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
     * @returns The canonical rate list or undefined if it does not exist.
     */ getCanonicalRateList() {
        let i = this.index.get(CanonicalRateList.tagName);
        if (i == undefined) return undefined;
        return this.nodes.get(i);
    }
    /**
     * Set the canonical rate list or create it if it is undefined.
     */ setCanonicalRateList(canonicalRateList) {
        let i = this.index.get(CanonicalRateList.tagName);
        if (i == undefined) {
            this.index.set(CanonicalRateList.tagName, this.nodes.size);
            this.addNode(canonicalRateList);
        } else {
            if (i instanceof Map) throw new Error("CanonicalRateList is a map and it is assumed there would be only 1!");
            else this.nodes.set(i, canonicalRateList);
        }
    }
    /**
     * Get the label of the reactants.
     * @returns The label of the reactants.
     */ getReactantsLabel() {
        return Array.from(this.getReactants().values()).map((reactant)=>reactant.getMolecule().getRef()).join(' + ');
    }
    /**
     * Returns the label for the products.
     * @returns The label for the products.
     */ getProductsLabel() {
        //return this.getProducts().map(product => product.getMolecule().getRef()).join(' + ');
        return Array.from(this.getProducts().values()).map((product)=>product.getMolecule().getRef()).join(' + ');
    }
    /**
     * Get the label of the reaction.
     * @returns The label of the reaction.
     */ getLabel() {
        let label = this.id + ' (' + this.getReactantsLabel() + ' -> ' + this.getProductsLabel() + ')';
        return label;
    }
    /**
     * Returns the total energy of all reactants or products.
     * @param retrieveMolecule A function to retrieve a molecule.
     * @param molecules The molecules.
     * @param items Either the reactants or products.
     * @returns The total energy of all reactants or products.
     */ getTotalEnergy(retrieveMolecule, molecules, items) {
        return Array.from(items.values()).map((item)=>{
            let ref = item.getMolecule().getRef();
            let molecule = retrieveMolecule(ref, molecules);
            if (molecule == undefined) {
                console.log("Molecule with ref " + ref + " not found!");
                alert("Molecule with ref " + ref + " not found. Please add it to the list of molecules. \
                 In the meantime it will be treated as having an energy of 0.");
                return 0, _appJs.big0;
            }
            return molecule.getEnergy();
        }).reduce((a, b)=>a.add(b), new (0, _bigJs.Big)(0));
    }
    /**
     * Returns the total energy of all reactants.
     * @param retrieveMolecule A function to retrieve a molecule.
     * @param molecules The molecules.
     * @returns The total energy of all reactants.
     */ getReactantsEnergy(retrieveMolecule, molecules) {
        return this.getTotalEnergy(retrieveMolecule, molecules, this.getReactants());
    }
    /**
     * Returns the total energy of all products.
     * @param retrieveMolecule A function to retrieve a molecule.
     * @param molecules The molecules.
     * @returns The total energy of all products.
     */ getProductsEnergy(retrieveMolecule, molecules) {
        return this.getTotalEnergy(retrieveMolecule, molecules, this.getProducts());
    }
    /**
     * Checks all energy units are the same and returns the energy units.
     * @param retrieveMolecule A function to retrieve a molecule.
     * @param molecules The molecules.
     * @param items Either the reactants or products.
     * @returns The energy units.
     */ getEnergyUnits(retrieveMolecule, molecules, items) {
        let unitsSet = new Set();
        Array.from(items.values()).map((item)=>{
            let ref = item.getMolecule().getRef();
            let molecule = retrieveMolecule(ref, molecules);
            if (molecule == undefined) {
                console.log("molecule with ref " + ref + " not found");
                alert("Molecule with ref " + ref + " not found. Please add it to the list of molecules. \
                     In the meantime it will be treated as having an energy of 0.");
                return "";
            } else {
                let pZPE = molecule.getProperty("me:ZPE");
                let units = pZPE?.attributes.get((0, _xmlMoleculeJs.PropertyScalarNumber).s_units);
                unitsSet.add(units ? units : "");
            }
        });
        if (unitsSet.size > 1) {
            console.log("Warning: Not all molecules have the same units");
            return "";
        } else return Array.from(unitsSet)[0]; // Return the only unit in the set
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

},{"big.js":"91nMZ","./xml_molecule.js":"cg9tc","./xml.js":"7znDa","./xml_mesmer.js":"8G2m7","./app.js":"dPB9w","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jmz8t":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Parse xml to initialise conditions.
 * @param xml The XML document.
 * @returns The conditions div.
 */ parcelHelpers.export(exports, "processConditions", ()=>processConditions);
/**
 * Create an add conditions button and append it to conditionssDiv.
 * @param conditionssDiv The conditionss div.
 * @param conditionsDivIDs The conditions IDs.
 * @param molecules The molecules.
 * @returns The button.
 */ parcelHelpers.export(exports, "createAddConditionsButton", ()=>createAddConditionsButton);
var _bigJs = require("big.js");
var _bigJsDefault = parcelHelpers.interopDefault(_bigJs);
var _app = require("./app");
var _xmlConditions = require("./xml_conditions");
var _html = require("./html");
var _xmlMesmer = require("./xml_mesmer");
var _util = require("./util");
var _xml = require("./xml");
function processConditions(xml, conditionsIDs, molecules) {
    console.log((0, _xmlConditions.Conditions).tagName);
    // Create a div for the conditionss.
    let conditionssDiv = (0, _html.createDiv)(undefined, (0, _app.boundary1));
    // Get the XML "me:conditions" element.
    let xml_conditionss = xml.getElementsByTagName((0, _xmlConditions.Conditions).tagName);
    for(let i = 0; i < xml_conditionss.length; i++){
        let xml_conditions = xml_conditionss[i];
        // Create a collapsible div for each conditions.
        let cDivID = (0, _app.addRID)((0, _xmlConditions.Conditions).tagName, i.toString());
        let cDiv = (0, _html.createDiv)(cDivID, (0, _app.boundary1));
        let ccDivID = (0, _app.addRID)(cDivID, (0, _app.s_container));
        let ccDiv = (0, _html.getCollapsibleDiv)(ccDivID, conditionssDiv, null, cDiv, (0, _xmlConditions.Conditions).tagName + " " + i.toString(), (0, _app.boundary1), (0, _app.level1));
        let conditions = addConditions((0, _xml.getAttributes)(xml_conditions), i);
        handleBathGases(conditions, cDiv, xml_conditions, conditionsIDs, molecules);
        handlePTs(conditions, cDiv, xml_conditions, conditionsIDs, molecules);
        // Add a remove conditions button.
        let removeButton = (0, _app.addRemoveButton)(cDiv, (0, _app.level1), (0, _app.mesmer).removeConditions.bind((0, _app.mesmer)), i);
        removeButton.addEventListener('click', (event)=>{
            // Remove the conditions.
            (0, _app.remove)(ccDivID);
            conditionsIDs.removeIDs(cDivID);
        });
    }
    // Create an add button to add a conditions.
    createAddConditionsButton(conditionssDiv, conditionsIDs, molecules);
    return conditionssDiv;
}
/**
 * @param conditions The conditions.
 * @param cDiv The conditions div.
 * @param conditionsIndex The conditions index.
 * @param xml_conditions The XML conditions.
 */ function handleBathGases(conditions, cDiv, xml_conditions, conditionsIDs, molecules) {
    // Bath Gases
    // Create a collapsible div.
    let bsDivID = conditionsIDs.addID(cDiv.id, (0, _xmlConditions.BathGas).tagName);
    let bsDiv = (0, _html.createDiv)(bsDivID);
    let bscDivID = conditionsIDs.addID(cDiv.id, (0, _xmlConditions.BathGas).tagName, (0, _app.s_container));
    let bscDiv = (0, _html.getCollapsibleDiv)(bscDivID, cDiv, null, bsDiv, (0, _xmlConditions.BathGas).tagName, (0, _app.boundary1), (0, _app.level1));
    // Add add button.
    let addBathGasButton = (0, _html.createButton)((0, _app.s_Add_sy_add), conditionsIDs.addID(cDiv.id, (0, _xmlConditions.BathGas).tagName, (0, _html.s_button)), (0, _app.level1));
    bsDiv.appendChild(addBathGasButton);
    addBathGasButton.addEventListener('click', ()=>{
        let bathGas = new (0, _xmlConditions.BathGas)(new Map(), (0, _app.s_selectOption));
        let bathGasIndex = conditions.addBathGas(bathGas);
        let div = (0, _html.createFlexDiv)(undefined, (0, _app.level1));
        let id = conditionsIDs.addID(cDiv.id, (0, _xmlConditions.BathGas).tagName, bathGasIndex.toString());
        let select = createSelectElementBathGas(Array.from((0, _app.getMoleculeKeys)(molecules)), bathGas, true, id);
        select.classList.add((0, _xmlConditions.BathGas).tagName);
        div.appendChild(select);
        (0, _app.addRemoveButton)(div, (0, _app.boundary1), (bathGas)=>{
            bsDiv.removeChild(div);
            conditionsIDs.removeIDs(id), conditions.removeBathGas(bathGas);
        });
        bsDiv.insertBefore(div, addBathGasButton);
    });
    // Process any "bathGas" elements that are immediate children of xml_conditions.
    if (xml_conditions != null) {
        let xml_bathGases = Array.from(xml_conditions.children).filter((child)=>child.tagName === (0, _xmlConditions.BathGas).tagName);
        if (xml_bathGases.length > 0) for(let i = 0; i < xml_bathGases.length; i++){
            let attributes = (0, _xml.getAttributes)(xml_bathGases[i]);
            let moleculeID = (0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml_bathGases[i]));
            let bathGas = new (0, _xmlConditions.BathGas)(attributes, moleculeID);
            //console.log("bathGas " + bathGas.toString());
            let bathGasIndex = conditions.addBathGas(bathGas);
            let id = conditionsIDs.addID(cDiv.id, (0, _xmlConditions.BathGas).tagName, bathGasIndex.toString());
            let div = (0, _html.createFlexDiv)(id, (0, _app.level1));
            div.appendChild(createSelectElementBathGas(Array.from((0, _app.getMoleculeKeys)(molecules)), bathGas, false, id));
            (0, _app.addRemoveButton)(div, (0, _app.boundary1), (bathGas)=>{
                bsDiv.removeChild(div);
                conditionsIDs.removeIDs(id);
                conditions.removeBathGas(bathGas);
            });
            bsDiv.insertBefore(div, addBathGasButton);
        }
        else {
            let div = (0, _html.createFlexDiv)(undefined, (0, _app.level1));
            let id = conditionsIDs.addID(cDiv.id, (0, _xmlConditions.BathGas).tagName, 0);
            div.appendChild(createSelectElementBathGas(Array.from((0, _app.getMoleculeKeys)(molecules)), undefined, false, id));
            (0, _app.addRemoveButton)(div, (0, _app.boundary1), (bathGas)=>{
                bsDiv.removeChild(div);
                conditionsIDs.removeIDs(id);
                conditions.removeBathGas(bathGas);
            });
            bsDiv.insertBefore(div, addBathGasButton);
        }
    }
}
/**
 * 
 * @param conditions 
 * @param cDiv
 * @param xml_conditions 
 * @param level 
 * @param nextLevel 
 */ function handlePTs(conditions, cDiv, xml_conditions, conditionsIDs, molecules) {
    // PTs
    let moleculeKeys = (0, _app.getMoleculeKeys)(molecules);
    // Create collapsible div.
    let pTsDivId = conditionsIDs.addID(cDiv.id, (0, _xmlConditions.PTs).tagName);
    let pTsDiv = (0, _html.createDiv)(pTsDivId);
    let pTscDivId = conditionsIDs.addID(cDiv.id, pTsDivId, (0, _app.s_container));
    let pTscDiv = (0, _html.getCollapsibleDiv)(pTscDivId, cDiv, null, pTsDiv, (0, _xmlConditions.PTs).tagName, (0, _app.boundary1), (0, _app.level1));
    let pTs = new (0, _xmlConditions.PTs)(new Map());
    if (xml_conditions) {
        let xml_PTss = xml_conditions.getElementsByTagName((0, _xmlConditions.PTs).tagName);
        if (xml_PTss.length > 0) {
            if (xml_PTss.length > 1) throw new Error("Expecting 1 " + (0, _xmlConditions.PTs).tagName + " but finding " + xml_PTss.length + "!");
            let attributes = (0, _xml.getAttributes)(xml_PTss[0]);
            let xml_PTpairs = xml_PTss[0].getElementsByTagName((0, _xmlConditions.PTpair).tagName);
            if (xml_PTpairs.length == 0) console.warn("Expecting 1 or more " + (0, _xmlConditions.PTpair).tagName + " but finding 0! Please add some PTpairs in " + (0, _xmlConditions.Conditions).tagName + " " + conditions.id + ".");
            else {
                pTs = new (0, _xmlConditions.PTs)(attributes);
                for(let i = 0; i < xml_PTpairs.length; i++){
                    let pTpairAttributes = (0, _xml.getAttributes)(xml_PTpairs[i]);
                    //console.log("pTpairAttributes=" + mapToString(pTpairAttributes));
                    let pTpair = new (0, _xmlConditions.PTpair)(pTpairAttributes);
                    pTs.add(pTpair);
                    // BathGas.
                    let xml_bathGass = xml_PTpairs[i].getElementsByTagName((0, _xmlConditions.BathGas).tagName);
                    if (xml_bathGass.length > 0) {
                        if (xml_bathGass.length > 1) console.warn("xml_bathGass.length=" + xml_bathGass.length);
                        pTpair.setBathGas(new (0, _xmlConditions.BathGas)((0, _xml.getAttributes)(xml_bathGass[0]), (0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml_bathGass[0]))));
                    }
                    // ExperimentRate.
                    let xml_ers = xml_PTpairs[i].getElementsByTagName((0, _xmlConditions.ExperimentalRate).tagName);
                    if (xml_ers.length > 0) {
                        if (xml_ers.length > 1) console.warn("xml_experimentRates.length=" + xml_ers.length);
                        pTpair.setExperimentalRate(new (0, _xmlConditions.ExperimentalRate)((0, _xml.getAttributes)(xml_ers[0]), new (0, _bigJsDefault.default)((0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml_ers[0])).trim())));
                    }
                    // ExperimentalYield.
                    let xml_eys = xml_PTpairs[i].getElementsByTagName((0, _xmlConditions.ExperimentalYield).tagName);
                    if (xml_eys.length > 0) {
                        if (xml_eys.length > 1) console.warn("xml_experimentalYields.length=" + xml_eys.length);
                        pTpair.setExperimentalYield(new (0, _xmlConditions.ExperimentalYield)((0, _xml.getAttributes)(xml_eys[0]), new (0, _bigJsDefault.default)((0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml_eys[0])).trim())));
                    }
                    // ExperimentalEigenvalue.
                    let xml_ees = xml_PTpairs[i].getElementsByTagName((0, _xmlConditions.ExperimentalEigenvalue).tagName);
                    if (xml_ees.length > 0) {
                        if (xml_ees.length > 1) console.warn("xml_experimentalEigenvalues.length=" + xml_ees.length);
                        pTpair.setExperimentalEigenvalue(new (0, _xmlConditions.ExperimentalEigenvalue)((0, _xml.getAttributes)(xml_ees[0]), new (0, _bigJsDefault.default)((0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml_ees[0])).trim())));
                    }
                    // Create pTpairDiv.
                    pTsDiv.appendChild(createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, i, moleculeKeys, (0, _app.level1)));
                }
            }
        }
    }
    conditions.setPTs(pTs);
    // Create a buttons div for the add, add from spreadsheet and remove all buttons.
    let pTsButtonsDiv = (0, _html.createDiv)(undefined, (0, _app.level1));
    pTsDiv.appendChild(pTsButtonsDiv);
    // Create an add button to add a new PTpair.
    let addButton = (0, _html.createButton)((0, _app.s_Add_sy_add), undefined, (0, _app.boundary1));
    pTsButtonsDiv.appendChild(addButton);
    // Add event listener to the addButton.
    addButton.addEventListener('click', ()=>{
        // Create a new PTpair.
        let pTpairAttributes = new Map();
        pTpairAttributes.set("units", "Torr");
        let pTpair = new (0, _xmlConditions.PTpair)(pTpairAttributes);
        let pTpairIndex = pTs.add(pTpair);
        console.log("Added new pTpair pTpairIndex=" + pTpairIndex);
        // Create a new div for the PTpair.
        pTsDiv.insertBefore(createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, pTpairIndex, moleculeKeys, (0, _app.level1)), pTsButtonsDiv);
    });
    // Create an add from spreadsheet button to add multiple PTPairs.
    let addMultipleButton = (0, _html.createButton)((0, _app.s_Add_from_spreadsheet), undefined, (0, _app.boundary1));
    pTsButtonsDiv.appendChild(addMultipleButton);
    // Add event listener to the addMultipleButton.
    addMultipleButton.addEventListener('click', ()=>{
        // Add a new text input for the user to paste the PTPairs.
        let div = (0, _html.createFlexDiv)(undefined, (0, _app.level1));
        let addFromSpreadsheetId = (0, _app.addRID)((0, _xmlConditions.PTs).tagName, "addFromSpreadsheet");
        let input = (0, _html.createInput)("text", addFromSpreadsheetId, (0, _app.level1));
        div.appendChild(input);
        pTsDiv.insertBefore(div, pTsButtonsDiv);
        // Add an event listener to the inputElement.
        input.addEventListener('change', ()=>{
            console.log("inputElement.value=" + input.value);
            console.log("inputElement.value.length=" + input.value.length);
            if (input.value.length > 0) {
                let pTpairsArray = input.value.split(" ");
                // Is there a header?
                let index = new Map();
                pTpairsArray[0].split("\t").forEach((value, i)=>{
                    index.set(value, i);
                });
                console.log("pTpairsArray.length=" + pTpairsArray.length);
                for(let i = 1; i < pTpairsArray.length; i++){
                    let pTpairArray = pTpairsArray[i].split("\t");
                    let pIndex = index.get("P");
                    let p = new (0, _bigJsDefault.default)(pTpairArray[pIndex]);
                    let unitsIndex = index.get("units");
                    let pTpairAttributes = new Map();
                    if (index.has("units")) {
                        let units = pTpairArray[unitsIndex];
                        pTpairAttributes.set("units", units);
                    }
                    let pTpair = new (0, _xmlConditions.PTpair)(pTpairAttributes);
                    pTs.add(pTpair);
                    let tIndex = index.get("T");
                    let t = new (0, _bigJsDefault.default)(pTpairArray[tIndex]);
                    pTpair.setP(p);
                    pTpair.setT(t);
                    if (index.has((0, _xmlConditions.PTpair).s_excessReactantConc)) {
                        let excessReactantConIndex = index.get((0, _xmlConditions.PTpair).s_excessReactantConc);
                        let excessReactantConc = pTpairArray[excessReactantConIndex];
                        pTpairAttributes.set((0, _xmlConditions.PTpair).s_excessReactantConc, excessReactantConc);
                    }
                    if (index.has((0, _xmlConditions.PTpair).s_percentExcessReactantConc)) {
                        let percentExcessReactantConIndex = index.get((0, _xmlConditions.PTpair).s_percentExcessReactantConc);
                        let percentExcessReactantConc = pTpairArray[percentExcessReactantConIndex];
                        pTpairAttributes.set((0, _xmlConditions.PTpair).s_percentExcessReactantConc, percentExcessReactantConc);
                    }
                    if (index.has((0, _xmlConditions.PTpair).s_precision)) {
                        console.log("index.has(PTpair.s_precision)");
                        let precisionIndex = index.get((0, _xmlConditions.PTpair).s_precision);
                        let precision = pTpairArray[precisionIndex];
                        pTpairAttributes.set((0, _xmlConditions.PTpair).s_precision, precision);
                    //console.log("precision=" + precision);
                    }
                    if (index.has((0, _xmlConditions.BathGas).tagName)) {
                        let bathGasIndex = index.get((0, _xmlConditions.BathGas).tagName);
                        let bathGas = pTpairArray[bathGasIndex];
                        pTpair.setBathGas(new (0, _xmlConditions.BathGas)(new Map(), bathGas));
                    }
                    if (index.has((0, _xmlConditions.ExperimentalRate).tagName)) {
                        let eri = index.get((0, _xmlConditions.ExperimentalRate).tagName);
                        let er = pTpairArray[eri];
                        if (er.length > 0) {
                            pTpairAttributes.set((0, _xmlConditions.ExperimentalRate).tagName, er);
                            pTpair.setExperimentalRate(new (0, _xmlConditions.ExperimentalRate)(new Map(), new (0, _bigJsDefault.default)(er)));
                            // Set the attributes of the experimentalRate.
                            // ref1.
                            let err1i = index.get((0, _xmlConditions.ExperimentalRate).tagName + "_" + (0, _xmlConditions.ExperimentalRate).s_ref1);
                            let err1 = pTpairArray[err1i];
                            pTpair.getExperimentalRate()?.setRef1(err1);
                            // ref2.
                            let err2i = index.get((0, _xmlConditions.ExperimentalRate).tagName + "_" + (0, _xmlConditions.ExperimentalRate).s_ref2);
                            let err2 = pTpairArray[err2i];
                            pTpair.getExperimentalRate()?.setRef2(err2);
                            // refReaction.
                            let errri = index.get((0, _xmlConditions.ExperimentalRate).tagName + "_" + (0, _xmlConditions.ExperimentalRate).s_refReaction);
                            let errr = pTpairArray[errri];
                            pTpair.getExperimentalRate()?.setRefReaction(errr);
                            // error.
                            let erei = index.get((0, _xmlConditions.ExperimentalRate).tagName + "_" + (0, _xmlConditions.ExperimentalRate).s_error);
                            let ere = pTpairArray[erei];
                            pTpair.getExperimentalRate()?.setError(new (0, _bigJsDefault.default)(ere));
                        }
                    }
                    if (index.has((0, _xmlConditions.ExperimentalYield).tagName)) {
                        let eyi = index.get((0, _xmlConditions.ExperimentalYield).tagName);
                        let ey = pTpairArray[eyi];
                        if (ey.length > 0) {
                            pTpair.setExperimentalYield(new (0, _xmlConditions.ExperimentalYield)(new Map(), new (0, _bigJsDefault.default)(ey)));
                            // Set the attributes of the experimentalYield.
                            // ref.
                            let eyri = index.get((0, _xmlConditions.ExperimentalYield).tagName + "_" + (0, _xmlConditions.ExperimentalYield).s_ref);
                            let eyr = pTpairArray[eyri];
                            pTpair.getExperimentalYield()?.setRef(eyr);
                            // yieldTime.
                            let eyyti = index.get((0, _xmlConditions.ExperimentalYield).tagName + "_" + (0, _xmlConditions.ExperimentalYield).s_yieldTime);
                            let eyyt = pTpairArray[eyyti];
                            pTpair.getExperimentalYield()?.setYieldTime(new (0, _bigJsDefault.default)(eyyt));
                            // error.
                            let eyei = index.get((0, _xmlConditions.ExperimentalYield).tagName + "_" + (0, _xmlConditions.ExperimentalYield).s_error);
                            let eye = pTpairArray[eyei];
                            pTpair.getExperimentalYield()?.setError(new (0, _bigJsDefault.default)(eye));
                        }
                    }
                    if (index.has((0, _xmlConditions.ExperimentalEigenvalue).tagName)) {
                        let eei = index.get((0, _xmlConditions.ExperimentalEigenvalue).tagName);
                        let ee = pTpairArray[eei];
                        if (ee.length > 0) {
                            pTpair.setExperimentalEigenvalue(new (0, _xmlConditions.ExperimentalEigenvalue)(new Map(), new (0, _bigJsDefault.default)(ee)));
                            // Set the attributes of the experimentalEigenvalue.
                            // EigenvalueID.
                            let eeeidi = index.get((0, _xmlConditions.ExperimentalEigenvalue).tagName + "_" + (0, _xmlConditions.ExperimentalEigenvalue).s_EigenvalueID);
                            let eeeid = pTpairArray[eeeidi];
                            pTpair.getExperimentalEigenvalue()?.setEigenvalueID(eeeid);
                            // error.
                            let eeei = index.get((0, _xmlConditions.ExperimentalEigenvalue).tagName + "_" + (0, _xmlConditions.ExperimentalEigenvalue).s_error);
                            let eee = pTpairArray[eeei];
                            pTpair.getExperimentalEigenvalue()?.setError(new (0, _bigJsDefault.default)(eee));
                        }
                    }
                    //console.log("pTpair=" + pTpair);
                    let pTpairIndex = pTs.ptps.length - 1;
                    // Create a new div for the PTpair.
                    pTsDiv.insertBefore(createPTpairDiv(pTs, pTsDiv, pTpair, cDiv.id, pTpairIndex, moleculeKeys, (0, _app.level1)), pTsButtonsDiv);
                }
                pTsDiv.removeChild(div);
            }
        });
    });
    // Add a remove all button.
    let removeAllButton = (0, _html.createButton)("Remove All", undefined, (0, _app.boundary1));
    pTsButtonsDiv.appendChild(removeAllButton);
    removeAllButton.addEventListener('click', ()=>{
        pTs.clear();
        // Remove all elements before the pTsButtonsDiv.
        let child = pTsDiv.firstChild;
        while(child != null && child != pTsButtonsDiv){
            let nextSibling = child.nextSibling;
            pTsDiv.removeChild(child);
            child = nextSibling;
        }
    });
}
function createAddConditionsButton(conditionssDiv, conditionsDivIDs, molecules) {
    let button = (0, _html.createButton)((0, _app.s_Add_sy_add), undefined, (0, _app.level1));
    conditionssDiv.appendChild(button);
    button.addEventListener('click', (event)=>{
        let i = (0, _app.mesmer).getNextConditionsID();
        console.log("Add Conditions " + i.toString());
        // Create collapsible div.
        let cDivID = conditionsDivIDs.addID((0, _xmlConditions.Conditions).tagName, i.toString());
        let cDiv = (0, _html.createDiv)(cDivID, (0, _app.boundary1));
        let ccDivID = (0, _app.addRID)(cDivID, (0, _app.s_container));
        // ElementToInsert before is element after the conditions div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, _util.getID)((0, _xmlConditions.Conditions).tagName, (i - 1).toString(), (0, _app.s_container)));
            let nextElementSibling = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of conditionssDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == conditionssDiv) elementToInsertBefore = nextElementSibling;
                else elementToInsertBefore = button;
            } else elementToInsertBefore = button;
        } else elementToInsertBefore = button;
        let ccDiv = (0, _html.getCollapsibleDiv)(ccDivID, conditionssDiv, elementToInsertBefore, cDiv, (0, _xmlConditions.Conditions).tagName + " " + i.toString(), (0, _app.boundary1), (0, _app.level1));
        // Add the conditions
        let conditions = addConditions(new Map(), i);
        handleBathGases(conditions, cDiv, null, conditionsDivIDs, molecules);
        handlePTs(conditions, cDiv, null, conditionsDivIDs, molecules);
        // Add a remove conditions button.
        let removeButton = (0, _app.addRemoveButton)(cDiv, (0, _app.level1), (0, _app.mesmer).removeConditions.bind((0, _app.mesmer)), i);
        removeButton.addEventListener('click', (event)=>{
            // Remove the conditions.
            (0, _app.remove)(ccDivID);
            conditionsDivIDs.removeIDs(cDivID);
        });
    });
    return button;
}
/**
 * Add and return a new conditions.
 */ function addConditions(attributes, i) {
    let conditions = new (0, _xmlConditions.Conditions)(attributes, i);
    (0, _app.mesmer).addConditions(conditions);
    return conditions;
}
/**
 * @param pTs The PTs.
 * @param pTsDiv The PTs div.
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param pTIndex The index.
 * @param moleculeKeys The molecule keys.
 * @param level The level.
 */ function createPTpairDiv(pTs, pTsDiv, pTpair, cDivID, pTIndex, moleculeKeys, level) {
    let pTpairDiv = (0, _html.createFlexDiv)((0, _app.addRID)(pTsDiv.id, pTIndex), level);
    addPorT(pTpairDiv, (0, _xmlConditions.PTpair).s_P, pTpair.getP.bind(pTpair), pTpair.setP.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    (0, _app.addAnyUnits)((0, _xmlMesmer.Mesmer).pressureUnits, pTpair.attributes, pTpairDiv, null, (0, _xmlConditions.PTpair).tagName, (0, _xmlConditions.PTpair).tagName, (0, _app.boundary1), (0, _app.level1));
    addPorT(pTpairDiv, (0, _xmlConditions.PTpair).s_T, pTpair.getT.bind(pTpair), pTpair.setT.bind(pTpair)); // The binding is necessary to maintain the correct "this".
    //let id: string = conditionsIDs.addID(cDivID, pTsDiv.id, pTIndex.toString());
    // ExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_excessReactantConc, addID(id, PTpair.s_excessReactantConc),
    //    [pTpair], createExcessReactantConcInputElement);
    //addExcessReactantConc(pTpairDiv, pTpair, pTIndex);
    addAttribute(pTpairDiv, pTpair, (0, _xmlConditions.PTpair).s_excessReactantConc, createExcessReactantConcInputElement);
    //addAttribute(    pTpairDiv,     pTpair,    pTIndex,     PTpair.s_excessReactantConc,     createExcessReactantConcInputElement,
    //(pTpair, attribute) => pTpair.attributes.has(attribute),    (pTpair, attribute) => null);
    // PercentExcessReactantConc.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_percentExcessReactantConc);
    addPercentExcessReactantConc(pTpairDiv, pTpair);
    // Precision.
    //addButtonWithToggle(pTpairDiv, pTpair, PTpair.s_precision, addID(id, PTpair.s_precision),
    //    [pTpair], createPrecisionSelectElement);
    //addPrecision(pTpairDiv, pTpair, pTIndex);
    addAttribute(pTpairDiv, pTpair, (0, _xmlConditions.PTpair).s_precision, createPrecisionSelectElement);
    //addAttribute(    pTpairDiv,     pTpair,    pTIndex,     PTpair.s_precision, createPrecisionSelectElement,
    //    (pTpair, attribute) => pTpair.attributes.has(attribute),    (pTpair, attribute) => null);
    // BathGas.
    //addButtonWithToggle(pTpairDiv, pTpair, BathGas.tagName, addID(id, BathGas.tagName),
    //    [pTpair, moleculeKeys, true], createBathGasSelectElement);
    addBathGas(pTpairDiv, pTpair, moleculeKeys);
    /*
    addAttribute(pTpairDiv, pTpair, pTIndex, BathGas.tagName, createBathGasSelectElement,
        (pTpair, attribute) => pTpair.getBathGas() !== undefined,  (pTpair, attribute) => pTpair.getBathGas(), moleculeKeys
    );
    */ // ExperimentalRate.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalRate.tagName, addID(id, ExperimentalRate.tagName),
    //    [undefined, pTpair, pTIndex], addExperimentalRateDetails);
    //addExperimentalRate(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, pTIndex, (0, _xmlConditions.ExperimentalRate).tagName, (pTpair)=>pTpair.getExperimentalRate(), createExperimentalRateDetails);
    // ExperimentalYield.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalYield.tagName, addID(id, ExperimentalYield.tagName),
    //    [undefined, pTpair, pTIndex], addExperimentalYieldDetails);
    //addExperimentalYield(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, pTIndex, (0, _xmlConditions.ExperimentalYield).tagName, (pTpair)=>pTpair.getExperimentalYield(), createExperimentalYieldDetails);
    // ExperimentalEigenvalue.
    //addButtonWithToggle(pTpairDiv, pTpair, ExperimentalEigenvalue.tagName, addID(id, ExperimentalEigenvalue.tagName),
    //   [undefined, pTpair, pTIndex], addExperimentalEigenvalueDetails);
    //addExperimentalEigenvalue(pTpairDiv, pTpair, pTIndex);
    addExperimentalElement(pTpairDiv, pTpair, pTIndex, (0, _xmlConditions.ExperimentalEigenvalue).tagName, (pTpair)=>pTpair.getExperimentalEigenvalue(), createExperimentalEigenvalueDetails);
    // Function to be used to remove a PTpair.
    let removePTpair = (pTpairDiv, i, pTpair)=>{
        pTsDiv.removeChild(pTpairDiv);
        if (i !== undefined) pTs.remove(i);
        pTpair.removeBathGas();
    };
    (0, _app.addRemoveButton)(pTpairDiv, (0, _app.boundary1), removePTpair, pTpairDiv, pTIndex, pTpair);
    return pTpairDiv;
}
/**
 * @param pTpairDiv The pTpair div.
 * @param name The name ("P" or "T").
 * @param getter The getter method.
 * @param setter The setter method.
 */ function addPorT(pTpairDiv, name, getter, setter) {
    let lwi = (0, _html.createLabelWithInput)("text", (0, _xmlConditions.PTpair).tagName + "_" + name, (0, _app.boundary1), (0, _app.level0), (event)=>{
        let target = event.target;
        try {
            setter(new (0, _bigJsDefault.default)(target.value));
            console.log(`Set ${name} to ${target.value}`);
        } catch (e) {
            alert("Invalid input, resetting...");
            input.value = getValue(getter);
        }
        (0, _html.resizeInputElement)(target);
    }, getValue(getter), name);
    let input = lwi.querySelector('input');
    input.value = getValue(getter);
    (0, _html.resizeInputElement)(input);
    pTpairDiv.appendChild(lwi);
}
function getValue(getter) {
    let value = getter();
    if (value !== undefined) return value.toString();
    else return "";
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 */ function addPercentExcessReactantConc(pTpairDiv, pTpair) {
    let id = (0, _app.addRID)(pTpairDiv.id, (0, _xmlConditions.PTpair).s_percentExcessReactantConc);
    let div = (0, _html.createDiv)(id, (0, _app.boundary1));
    pTpairDiv.appendChild(div);
    let attribute = (0, _xmlConditions.PTpair).s_percentExcessReactantConc;
    let buttonTextContentSelected = attribute + (0, _app.sy_selected);
    let buttonTextContentDeselected = attribute + (0, _app.sy_deselected);
    let button = (0, _html.createButton)(buttonTextContentDeselected, (0, _app.addRID)(id, (0, _html.s_button)), (0, _app.boundary1));
    div.appendChild(button);
    button.classList.add((0, _app.s_optionOn));
    button.classList.add((0, _app.s_optionOff));
    if (pTpair.attributes.get(attribute)?.toLowerCase() == "true") {
        button.classList.toggle((0, _app.s_optionOff));
        button.textContent = buttonTextContentSelected;
    } else {
        button.classList.toggle((0, _app.s_optionOn));
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event)=>{
        button.classList.toggle((0, _app.s_optionOn));
        button.classList.toggle((0, _app.s_optionOff));
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            pTpair.attributes.set(attribute, "true");
        } else {
            button.textContent = buttonTextContentDeselected;
            pTpair.attributes.delete(attribute);
        }
    });
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param conditionsIndex The conditions index.
 * @param pTIndex The pTindex.
 * @param attribute The attribute.
 * @param createInputElement The function to create the input element.
 */ function addAttribute(pTpairDiv, pTpair, attribute, createInputElement) {
    let id = (0, _app.addRID)(pTpairDiv.id, attribute);
    let div = (0, _html.createDiv)(id, (0, _app.boundary1));
    pTpairDiv.appendChild(div);
    let buttonTextContentSelected = attribute + (0, _app.sy_selected);
    let buttonTextContentDeselected = attribute + (0, _app.sy_deselected);
    let button = (0, _html.createButton)(buttonTextContentDeselected, (0, _app.addRID)(id, (0, _html.s_button)), (0, _app.boundary1));
    div.appendChild(button);
    button.classList.add((0, _app.s_optionOn));
    button.classList.add((0, _app.s_optionOff));
    let iid = (0, _app.addRID)(id, (0, _app.s_input));
    if (pTpair.attributes.has(attribute)) {
        button.classList.toggle((0, _app.s_optionOff));
        button.textContent = buttonTextContentSelected;
        let input = createInputElement(iid, pTpair);
        div.insertBefore(input, button.nextSibling);
    } else {
        button.classList.toggle((0, _app.s_optionOn));
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event)=>{
        button.classList.toggle((0, _app.s_optionOn));
        button.classList.toggle((0, _app.s_optionOff));
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            let input = createInputElement(iid, pTpair);
            div.insertBefore(input, button.nextSibling);
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the input element.
            (0, _app.remove)(iid);
        }
    });
}
/**
 * @param pTpairDiv The PTpair div.
 * @param pTpair The PTpair.
 * @param i The index.
 * @param moleculeKeys The molecule keys.
 */ function addBathGas(pTpairDiv, pTpair, moleculeKeys) {
    let id = (0, _app.addRID)(pTpairDiv.id, (0, _xmlConditions.BathGas).tagName);
    let div = (0, _html.createDiv)(id, (0, _app.boundary1));
    pTpairDiv.appendChild(div);
    let tagName = (0, _xmlConditions.BathGas).tagName;
    let buttonTextContentSelected = tagName + (0, _app.sy_selected);
    let buttonTextContentDeselected = tagName + (0, _app.sy_deselected);
    let button = (0, _html.createButton)(buttonTextContentDeselected, (0, _app.addRID)(id, (0, _html.s_button)), (0, _app.boundary1));
    div.appendChild(button);
    button.classList.add((0, _app.s_optionOn));
    button.classList.add((0, _app.s_optionOff));
    let iid = (0, _app.addRID)(id, (0, _app.s_input));
    let bathGas = pTpair.getBathGas();
    if (bathGas == undefined) {
        button.classList.toggle((0, _app.s_optionOn));
        button.textContent = buttonTextContentDeselected;
    } else {
        button.classList.toggle((0, _app.s_optionOff));
        button.textContent = buttonTextContentSelected;
        if (moleculeKeys.has(bathGas.value) == false) console.warn("moleculeKeys does not contain " + bathGas.value);
        div.appendChild(createBathGasSelectElement(iid, pTpair, bathGas, false, moleculeKeys));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event)=>{
        button.classList.toggle((0, _app.s_optionOn));
        button.classList.toggle((0, _app.s_optionOff));
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(createBathGasSelectElement(iid, pTpair, bathGas, false, moleculeKeys));
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the select element.
            (0, _app.remove)(iid);
        }
    });
}
/**
 * 
 * @param pTpairDiv 
 * @param pTpair 
 * @param conditionsIndex 
 * @param pTIndex 
 * @param tagName 
 * @param getAttribute 
 * @param createElement 
 */ function addExperimentalElement(pTpairDiv, pTpair, pTIndex, tagName, getAttribute, createElement) {
    let id = (0, _app.addRID)(pTpairDiv.id, tagName);
    let div = (0, _html.createDiv)(id, (0, _app.boundary1));
    pTpairDiv.appendChild(div);
    let buttonTextContentSelected = tagName + (0, _app.sy_selected);
    let buttonTextContentDeselected = tagName + (0, _app.sy_deselected);
    let button = (0, _html.createButton)(buttonTextContentDeselected, (0, _app.addRID)(id, (0, _html.s_button)), (0, _app.boundary1));
    div.appendChild(button);
    button.classList.add((0, _app.s_optionOn));
    button.classList.add((0, _app.s_optionOff));
    let iid = (0, _app.addRID)(id, (0, _app.s_input));
    if (getAttribute(pTpair) == undefined) {
        button.classList.toggle((0, _app.s_optionOn));
        button.textContent = buttonTextContentDeselected;
    } else {
        button.classList.toggle((0, _app.s_optionOff));
        button.textContent = buttonTextContentSelected;
        div.appendChild(createElement(iid, pTpair, pTIndex));
    }
    // Add event listener for the button.
    button.addEventListener('click', (event)=>{
        button.classList.toggle((0, _app.s_optionOn));
        button.classList.toggle((0, _app.s_optionOff));
        if (button.textContent === buttonTextContentDeselected) {
            button.textContent = buttonTextContentSelected;
            div.appendChild(createElement(iid, pTpair, pTIndex));
        } else {
            button.textContent = buttonTextContentDeselected;
            // Remove the element.
            (0, _app.remove)(iid);
        }
    });
}
/**
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A select element.
 */ function createPrecisionSelectElement(id, pTpair) {
    let value;
    if (pTpair.attributes.has((0, _xmlConditions.PTpair).s_precision)) value = pTpair.attributes.get((0, _xmlConditions.PTpair).s_precision);
    else value = (0, _xmlMesmer.Mesmer).precisionOptions[0];
    let select = (0, _html.createSelectElement)((0, _xmlMesmer.Mesmer).precisionOptions, (0, _xmlConditions.PTpair).s_precision, value, id, (0, _app.boundary1));
    select.addEventListener('change', (event)=>{
        let target = event.target;
        pTpair.setPrecision(target.value);
        console.log("Set " + (0, _xmlConditions.PTpair).s_precision + " to " + target.value);
        (0, _html.resizeSelectElement)(target);
    });
    (0, _html.resizeSelectElement)(select);
    return select;
}
/**
 * @param id The id for the HTMLInputElement created.
 * @param pTpair The PTpair.
 * @returns An HTMLInputElement.
 */ function createExcessReactantConcInputElement(id, pTpair) {
    let input = (0, _html.createInput)("number", id, (0, _app.boundary1));
    let value;
    if (pTpair.attributes.has((0, _xmlConditions.PTpair).s_excessReactantConc)) value = pTpair.attributes.get((0, _xmlConditions.PTpair).s_excessReactantConc);
    else value = NaN.toString();
    console.log((0, _xmlConditions.PTpair).s_excessReactantConc + "=" + value);
    input.value = value;
    input.addEventListener('change', (event)=>{
        let target = event.target;
        pTpair.setExcessReactantConc(target.value);
        console.log("Set " + (0, _xmlConditions.PTpair).s_excessReactantConc + " to " + target.value);
        (0, _html.resizeInputElement)(target);
    });
    (0, _html.resizeInputElement)(input);
    return input;
}
/**
 * @param pTpair The PTpair.
 * @param id The id.
 * @param bathGas The bath gas.
 * @returns A select element.
 */ function createBathGasSelectElement(id, pTpair, bathGas, first, moleculeKeys) {
    //console.log("createBathGasSelectElement");
    //console.log("pTpair " + pTpair.toString());
    let select = createSelectElementBathGas(Array.from(moleculeKeys), bathGas, first, id);
    //select.id = id;
    select.addEventListener('change', (event)=>{
        let target = event.target;
        pTpair.setBathGas(new (0, _xmlConditions.BathGas)(new Map(), target.value));
        console.log("Set bathGas to " + target.value);
        (0, _html.resizeSelectElement)(target);
    });
    (0, _html.resizeSelectElement)(select);
    return select;
}
/**
 * @param options The options.
 * @param bathGas The bath gas.
 * @param first True if this is the first selection, flase otherwise?
 * @param id The id used to generate other ids.
 */ function createSelectElementBathGas(options, bathGas, first, id) {
    let value;
    if (first) options.push((0, _app.s_selectOption));
    else {
        // remove selectAnotherOption if it is present.
        let index = options.indexOf((0, _app.s_selectOption));
        if (index > -1) options.splice(index, 1);
    }
    if (bathGas == undefined) {
        bathGas = new (0, _xmlConditions.BathGas)(new Map(), (0, _app.s_selectOption));
        value = (0, _app.s_selectOption);
    } else value = bathGas.value;
    let select = (0, _html.createSelectElement)(options, (0, _xmlConditions.BathGas).tagName, value, (0, _app.addRID)(id, (0, _html.s_select)), (0, _app.boundary1));
    select.classList.add((0, _xmlConditions.BathGas).tagName);
    (0, _app.selectAnotherOptionEventListener)(options, select);
    // Add event listener to selectElement.
    select.addEventListener('change', (event)=>{
        let target = event.target;
        bathGas.value = target.value;
        console.log("Added " + target.value + " as " + (0, _xmlConditions.BathGas).tagName);
        (0, _html.resizeSelectElement)(target);
    });
    select.value = value;
    (0, _html.resizeSelectElement)(select);
    return select;
}
/**
 * Create a div for the experimental rate details.
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A div.
 */ function createExperimentalRateDetails(id, pTpair) {
    return addExperimentalDetails(pTpair, id, (pTpair)=>pTpair.getExperimentalRate(), (pTpair, value)=>pTpair.setExperimentalRate(value), (0, _xmlConditions.ExperimentalRate), [
        {
            tagName: (0, _xmlConditions.ExperimentalRate).tagName,
            type: "number",
            eventHandler: (event, target)=>(0, _app.setNumberNode)(pTpair.getExperimentalRate(), target),
            valueGetter: ()=>pTpair.getExperimentalRate().value.toString()
        },
        {
            tagName: (0, _xmlConditions.ExperimentalRate).tagName + "_" + (0, _xmlConditions.ExperimentalRate).s_ref1,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalRate()?.setRef1(target.value),
            valueGetter: ()=>pTpair.getExperimentalRate().getRef1()
        },
        {
            tagName: (0, _xmlConditions.ExperimentalRate).tagName + "_" + (0, _xmlConditions.ExperimentalRate).s_ref2,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalRate()?.setRef2(target.value),
            valueGetter: ()=>pTpair.getExperimentalRate().getRef2()
        },
        {
            tagName: (0, _xmlConditions.ExperimentalRate).tagName + "_" + (0, _xmlConditions.ExperimentalRate).s_refReaction,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalRate()?.setRefReaction(target.value),
            valueGetter: ()=>pTpair.getExperimentalRate().getRefReaction()
        },
        {
            tagName: (0, _xmlConditions.ExperimentalRate).tagName + "_" + (0, _xmlConditions.ExperimentalRate).s_error,
            type: "number",
            eventHandler: (event, target)=>pTpair.getExperimentalRate()?.setError(new (0, _bigJsDefault.default)(target.value)),
            valueGetter: ()=>pTpair.getExperimentalRate().getError().toString()
        }
    ]);
}
/**
 * Create a div for the experimental yield details.
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A div.
 */ function createExperimentalYieldDetails(id, pTpair) {
    return addExperimentalDetails(pTpair, id, (pTpair)=>pTpair.getExperimentalYield(), (pTpair, value)=>pTpair.setExperimentalYield(value), (0, _xmlConditions.ExperimentalYield), [
        {
            tagName: (0, _xmlConditions.ExperimentalYield).tagName,
            type: "number",
            eventHandler: (event, target)=>(0, _app.setNumberNode)(pTpair.getExperimentalYield(), target),
            valueGetter: ()=>pTpair.getExperimentalYield().value.toString()
        },
        {
            tagName: (0, _xmlConditions.ExperimentalYield).tagName + "_" + (0, _xmlConditions.ExperimentalYield).s_ref,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalYield()?.setRef(target.value),
            valueGetter: ()=>pTpair.getExperimentalYield().getRef()
        },
        {
            tagName: (0, _xmlConditions.ExperimentalYield).tagName + "_" + (0, _xmlConditions.ExperimentalYield).s_yieldTime,
            type: "number",
            eventHandler: (event, target)=>pTpair.getExperimentalYield()?.setYieldTime(new (0, _bigJsDefault.default)(target.value)),
            valueGetter: ()=>pTpair.getExperimentalYield().getYieldTime().toString()
        },
        {
            tagName: (0, _xmlConditions.ExperimentalYield).tagName + "_" + (0, _xmlConditions.ExperimentalYield).s_error,
            type: "number",
            eventHandler: (event, target)=>pTpair.getExperimentalYield()?.setError(new (0, _bigJsDefault.default)(target.value)),
            valueGetter: ()=>pTpair.getExperimentalYield().getError().toString()
        }
    ]);
}
/**
 * Create a div for the experimental eigenvalue.
 * @param id The id.
 * @param pTpair The PTpair.
 * @returns A div.
 */ function createExperimentalEigenvalueDetails(id, pTpair) {
    return addExperimentalDetails(pTpair, id, (pTpair)=>pTpair.getExperimentalEigenvalue(), (pTpair, value)=>pTpair.setExperimentalEigenvalue(value), (0, _xmlConditions.ExperimentalEigenvalue), [
        {
            tagName: (0, _xmlConditions.ExperimentalEigenvalue).tagName,
            type: "number",
            eventHandler: (event, target)=>(0, _app.setNumberNode)(pTpair.getExperimentalEigenvalue(), target),
            valueGetter: ()=>pTpair.getExperimentalEigenvalue().value.toString()
        },
        {
            tagName: (0, _xmlConditions.ExperimentalEigenvalue).tagName + "_" + (0, _xmlConditions.ExperimentalEigenvalue).s_EigenvalueID,
            type: "text",
            eventHandler: (event, target)=>pTpair.getExperimentalEigenvalue()?.setEigenvalueID(target.value),
            valueGetter: ()=>pTpair.getExperimentalEigenvalue().getEigenvalueID()
        },
        {
            tagName: (0, _xmlConditions.ExperimentalEigenvalue).tagName + "_" + (0, _xmlConditions.ExperimentalEigenvalue).s_error,
            type: "number",
            eventHandler: (event, target)=>pTpair.getExperimentalEigenvalue()?.setError(new (0, _bigJsDefault.default)(target.value)),
            valueGetter: ()=>pTpair.getExperimentalEigenvalue().getError().toString()
        }
    ]);
}
/**
 * @param pTpair The PTpair.
 * @param id The id.
 * @param getExperimental The getter.
 * @param setExperimental The setter.
 * @param ExperimentalClass The class.
 * @param details The details.
 * @returns HTMLDivElement.
 */ function addExperimentalDetails(pTpair, id, getExperimental, setExperimental, ExperimentalClass, details) {
    let div = (0, _html.createDiv)(undefined, (0, _app.boundary1));
    div.id = id;
    let experimental = getExperimental(pTpair);
    if (experimental == undefined) {
        experimental = new ExperimentalClass(new Map(), (0, _app.big0));
        setExperimental(pTpair, experimental);
    }
    for (let detail of details){
        let detailId = id + "_" + detail.tagName;
        div.appendChild((0, _html.createLabelWithInput)(detail.type, detailId, (0, _app.boundary1), (0, _app.level0), (event)=>{
            let target = event.target;
            detail.eventHandler(event, target);
            console.log("Set " + detail.tagName + " to " + target.value);
            (0, _html.resizeInputElement)(target);
        }, detail.valueGetter(), detail.label || ""));
    }
    return div;
}

},{"big.js":"91nMZ","./app":"dPB9w","./xml_conditions":"cZv1r","./html":"aLPSL","./xml_mesmer":"8G2m7","./util":"f0Rnl","./xml":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7ORr8":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Parses xml to initialise modelParameters.
 * @param xml The XML document.
 */ parcelHelpers.export(exports, "processModelParameters", ()=>processModelParameters);
/**
 * Create an add modelParameters button.
 * @param mpsDiv The modelParameters div.
 * @param mpIDM The modelParameters IDs.
 * @returns A button.
 */ parcelHelpers.export(exports, "createAddModelParametersButton", ()=>createAddModelParametersButton);
var _bigJs = require("big.js");
var _bigJsDefault = parcelHelpers.interopDefault(_bigJs);
var _app = require("./app");
var _xmlControl = require("./xml_control");
var _html = require("./html");
var _xmlMesmer = require("./xml_mesmer");
var _xmlModelParameters = require("./xml_modelParameters");
var _util = require("./util");
var _xml = require("./xml");
function processModelParameters(xml, mpIDM) {
    console.log((0, _xmlModelParameters.ModelParameters).tagName);
    // Create a div for the modelParameterss.
    let mpsDiv = (0, _html.createDiv)(undefined, (0, _app.boundary1));
    let xml_mps = xml.getElementsByTagName((0, _xmlModelParameters.ModelParameters).tagName);
    for(let i = 0; i < xml_mps.length; i++){
        // Create a collapsible div for the model parameters.
        let mpDivID = mpIDM.addID((0, _xmlModelParameters.ModelParameters).tagName, i.toString());
        let mpDiv = (0, _html.createDiv)(mpDivID, (0, _app.boundary1));
        let mpcDivID = mpIDM.addID(mpDivID, (0, _app.s_container));
        let mpcDiv = (0, _html.getCollapsibleDiv)(mpcDivID, mpsDiv, null, mpDiv, (0, _xmlModelParameters.ModelParameters).tagName + " " + i.toString(), (0, _app.boundary1), (0, _app.level1));
        let mp = addModelParameters((0, _xml.getAttributes)(xml_mps[i]), i);
        processGrainSize(mp, xml_mps[i], mpDiv, mpIDM);
        //setGrainSize(mp, xml_mps[i], mpDiv);
        processModelParametersN(mp, mpIDM, xml_mps[i], mpDiv, (0, _xmlControl.AutomaticallySetMaxEne), mp.setAutomaticallySetMaxEne, mp.removeAutomaticallySetMaxEne.bind(mp));
        processModelParametersN(mp, mpIDM, xml_mps[i], mpDiv, (0, _xmlModelParameters.EnergyAboveTheTopHill), mp.setEnergyAboveTheTopHill, mp.removeEnergyAboveTheTopHill.bind(mp));
        processModelParametersN(mp, mpIDM, xml_mps[i], mpDiv, (0, _xmlModelParameters.MaxTemperature), mp.setMaxTemperature, mp.removeMaxTemperature.bind(mp));
        // Add a remove modelParameters button.
        let removeButton = (0, _app.addRemoveButton)(mpDiv, (0, _app.level1), (0, _app.mesmer).removeModelParameters.bind((0, _app.mesmer)), i);
        removeButton.addEventListener('click', (event)=>{
            // Remove the modelParameters.
            (0, _app.remove)(mpcDivID);
            mpIDM.removeIDs(mpDivID);
        });
    }
    // Create an add button to add a modelParameters.
    createAddModelParametersButton(mpsDiv, mpIDM);
    return mpsDiv;
}
/**
 * Add and return a new modelParameters.
 */ function addModelParameters(attributes, i) {
    let mp = new (0, _xmlModelParameters.ModelParameters)(attributes, i);
    (0, _app.mesmer).addModelParameters(mp);
    return mp;
}
/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */ function processGrainSize(mps, xml_mps, mpsDiv, modelParametersIDs) {
    let tagName = (0, _xmlModelParameters.GrainSize).tagName;
    let id = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div = (0, _html.createFlexDiv)(id, (0, _app.level1));
    mpsDiv.appendChild(div);
    let buttonTextContentSelected = tagName + (0, _app.sy_selected);
    let buttonTextContentDeselected = tagName + (0, _app.sy_deselected);
    let button = (0, _html.createButton)(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, (0, _html.s_button)), (0, _app.boundary1));
    button.classList.add((0, _app.s_optionOn));
    button.classList.add((0, _app.s_optionOff));
    div.appendChild(button);
    let idi = modelParametersIDs.addID(mpsDiv.id, tagName, (0, _app.s_input));
    let gs;
    let valueString;
    if (xml_mps != null) {
        let xml = xml_mps.getElementsByTagName(tagName);
        if (xml.length == 1) {
            valueString = (0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml[0]));
            let value = new (0, _bigJsDefault.default)(Number(valueString));
            gs = new (0, _xmlModelParameters.GrainSize)((0, _xml.getAttributes)(xml[0]), value);
            button.textContent = buttonTextContentSelected;
            createInputModelParameters(mps, div, gs, idi, valueString, mps.setGrainSize, (0, _xmlMesmer.Mesmer).energyUnits);
            button.classList.toggle((0, _app.s_optionOff));
        } else {
            gs = getDefaultGrainsize(tagName);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle((0, _app.s_optionOn));
        }
    } else {
        gs = getDefaultGrainsize(tagName);
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, _app.s_optionOn));
    }
    // Add event listener for the button.
    button.addEventListener('click', ()=>{
        // Check if the GrainSize already exists
        if (!mps.index.has((0, _xmlModelParameters.GrainSize).tagName)) {
            createInputModelParameters(mps, div, gs, idi, valueString, mps.setGrainSize, (0, _xmlMesmer.Mesmer).energyUnits);
            button.textContent = buttonTextContentSelected;
        } else {
            mps.removeGrainSize();
            document.getElementById(idi)?.remove();
            document.getElementById((0, _util.getID)(idi, (0, _app.s_units)))?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, _app.s_optionOn));
        button.classList.toggle((0, _app.s_optionOff));
    });
}
/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */ function setGrainSize(mps, xml_mps, mpsDiv, modelParametersIDs) {
    let tagName = (0, _xmlModelParameters.GrainSize).tagName;
    let div = addGrainSize(mps, mpsDiv, modelParametersIDs);
    // Save the current display style of the div
    let originalDisplay = div.style.display;
    // Make the div visible
    div.style.display = "block";
    let input = div.querySelector('input');
    // restore the original display style
    div.style.display = originalDisplay;
    //let input: HTMLInputElement = document.getElementById(getID(mpsDiv.id, tagName, s_input)) as HTMLInputElement;
    let xml = xml_mps.getElementsByTagName(tagName);
    if (xml.length > 0) {
        if (xml.length > 1) console.warn("More than one GrainSize found in XML. The first is used!");
        let valueString = (0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml[0]));
        let value = new (0, _bigJsDefault.default)(valueString);
        mps.getGrainSize().value = value;
        if (input !== null) {
            input.value = valueString;
            (0, _html.resizeInputElement)(input);
        } else console.warn("GrainSize input element not found.");
    }
}
/**
 * @param mps The model parameters.
 * @param xml_mps The XML model parameters.
 * @param mpsDiv The model parameters div.
 */ function addGrainSize(mps, mpsDiv, modelParametersIDs) {
    let tagName = (0, _xmlModelParameters.GrainSize).tagName;
    let id = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div = (0, _html.createFlexDiv)(id, (0, _app.level1));
    mpsDiv.appendChild(div);
    let buttonTextContentSelected = tagName + (0, _app.sy_selected);
    let buttonTextContentDeselected = tagName + (0, _app.sy_deselected);
    let button = (0, _html.createButton)(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, (0, _html.s_button)), (0, _app.boundary1));
    button.classList.add((0, _app.s_optionOn));
    button.classList.add((0, _app.s_optionOff));
    div.appendChild(button);
    let idi = modelParametersIDs.addID(mpsDiv.id, tagName, (0, _app.s_input));
    let gs;
    button.textContent = buttonTextContentDeselected;
    button.classList.toggle((0, _app.s_optionOn));
    // Add event listener for the button.
    button.addEventListener('click', ()=>{
        // Check if the GrainSize already exists
        if (!mps.index.has((0, _xmlModelParameters.GrainSize).tagName)) {
            console.log("Adding GrainSize input");
            gs = getDefaultGrainsize(tagName);
            mps.setGrainSize(gs);
            createInputModelParameters(mps, div, gs, idi, gs.value.toString(), mps.setGrainSize, (0, _xmlMesmer.Mesmer).energyUnits);
            button.textContent = buttonTextContentSelected;
        } else {
            console.log("Removing GrainSize input");
            mps.removeGrainSize();
            document.getElementById(idi)?.remove();
            document.getElementById((0, _util.getID)(idi, (0, _app.s_units)))?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, _app.s_optionOn));
        button.classList.toggle((0, _app.s_optionOff));
    });
    //button.click();
    return div;
}
function getDefaultGrainsize(tagName) {
    let value;
    let attributes;
    if ((0, _app.defaults) != undefined) {
        let valueString = (0, _app.defaults).values.get(tagName) ?? "";
        if (valueString == "") value = (0, _app.big0);
        else value = new (0, _bigJsDefault.default)(valueString);
        attributes = (0, _app.defaults).attributess.get(tagName) ?? new Map();
    } else {
        console.log(tagName + " set using hardcoded default.");
        value = new (0, _bigJsDefault.default)(101);
        attributes = new Map();
        attributes.set((0, _app.s_units), "cm-1");
    }
    return new (0, _xmlModelParameters.GrainSize)(attributes, value);
}
/**
 * Process numerical modelParameters.
 * @param mps The ModelParameters.
 * @param mpsDiv The modelParameters div.
 * @param xml_mps The xml modelParameters.
 */ function processModelParametersN(mps, modelParametersIDs, xml_mps, mpsDiv, mpt, setModelParameter, removeModelParameter) {
    let tagName = mpt.tagName;
    let id = modelParametersIDs.addID(mpsDiv.id, tagName);
    let div = (0, _html.createFlexDiv)(id, (0, _app.level1));
    mpsDiv.appendChild(div);
    let buttonTextContentSelected = tagName + (0, _app.sy_selected);
    let buttonTextContentDeselected = tagName + (0, _app.sy_deselected);
    let button = (0, _html.createButton)(tagName, modelParametersIDs.addID(mpsDiv.id, tagName, (0, _html.s_button)), (0, _app.boundary1));
    button.classList.add((0, _app.s_optionOn));
    button.classList.add((0, _app.s_optionOff));
    div.appendChild(button);
    let idi = modelParametersIDs.addID(mpsDiv.id, tagName, (0, _app.s_input));
    let mp;
    let valueString;
    if (xml_mps != null) {
        let xml = xml_mps.getElementsByTagName(tagName);
        if (xml.length == 1) {
            valueString = (0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml[0]));
            let value = new (0, _bigJsDefault.default)(valueString);
            mp = new mpt((0, _xml.getAttributes)(xml[0]), value);
            button.textContent = buttonTextContentSelected;
            createInputModelParameters(mps, div, mp, idi, valueString, setModelParameter, undefined);
            button.classList.toggle((0, _app.s_optionOff));
        } else {
            valueString = "";
            mp = new mpt(new Map(), (0, _app.big0));
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle((0, _app.s_optionOn));
        }
    } else {
        valueString = "";
        mp = new mpt(new Map(), (0, _app.big0));
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, _app.s_optionOn));
    }
    // Add event listener for the button.
    button.addEventListener('click', ()=>{
        // Check if the ModelParameter already exists
        if (!mps.index.has(tagName)) {
            createInputModelParameters(mps, div, mp, idi, valueString, setModelParameter, undefined);
            button.textContent = buttonTextContentSelected;
        } else {
            //valueString = mp.value.toExponential();
            removeModelParameter();
            (0, _app.remove)(idi);
            modelParametersIDs.removeIDs(idi);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, _app.s_optionOn));
        button.classList.toggle((0, _app.s_optionOff));
    });
}
/**
 * @param mps The model parameters.
 * @param div The div.
 * @param element The element.
 * @param id The id.
 * @param ids The id for the units select.
 * @param valueString The value string.
 * @param setElementMethod The method to set the element.
 * @param units The units.
 */ function createInputModelParameters(mps, div, element, id, valueString, setElementMethod, units) {
    setElementMethod.call(mps, element);
    let input = (0, _html.createInput)("text", id, (0, _app.boundary1));
    div.appendChild(input);
    input.addEventListener('change', (event)=>{
        let target = event.target;
        (0, _app.setNumberNode)(element, target);
        (0, _html.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, _html.resizeInputElement)(input);
    (0, _app.addAnyUnits)(units, element.attributes, div, input, (0, _util.getID)(id, (0, _app.s_units)), element.constructor.tagName, (0, _app.boundary1), (0, _app.boundary1));
}
function createAddModelParametersButton(mpsDiv, mpIDM) {
    let button = (0, _html.createButton)((0, _app.s_Add_sy_add), undefined, (0, _app.level1));
    let tn = (0, _xmlModelParameters.ModelParameters).tagName;
    mpsDiv.appendChild(button);
    button.addEventListener('click', (event)=>{
        let i = (0, _app.mesmer).getNextModelParametersID();
        console.log("Add " + tn + i.toString());
        // Create collapsible div.
        let mpDivID = (0, _app.addRID)(tn, i.toString());
        let mpDiv = (0, _html.createDiv)(mpDivID, (0, _app.boundary1));
        let mpcDivID = (0, _app.addRID)(mpDivID, (0, _app.s_container));
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, _util.getID)(tn, (i - 1).toString(), (0, _app.s_container)));
            let nextElementSibling = aboveElement.nextElementSibling;
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == mpsDiv) elementToInsertBefore = nextElementSibling;
                else elementToInsertBefore = button;
            } else elementToInsertBefore = button;
        } else elementToInsertBefore = button;
        let mpcDiv = (0, _html.getCollapsibleDiv)(mpcDivID, mpsDiv, elementToInsertBefore, mpDiv, tn + " " + i.toString(), (0, _app.boundary1), (0, _app.level1));
        // Add the modelParameters.
        let mp = addModelParameters(new Map(), i);
        addGrainSize(mp, mpDiv, mpIDM);
        processModelParametersN(mp, mpIDM, null, mpDiv, (0, _xmlControl.AutomaticallySetMaxEne), mp.setAutomaticallySetMaxEne, mp.removeAutomaticallySetMaxEne);
        processModelParametersN(mp, mpIDM, null, mpDiv, (0, _xmlModelParameters.EnergyAboveTheTopHill), mp.setEnergyAboveTheTopHill, mp.removeEnergyAboveTheTopHill);
        processModelParametersN(mp, mpIDM, null, mpDiv, (0, _xmlModelParameters.MaxTemperature), mp.setMaxTemperature, mp.removeMaxTemperature);
        // Add a remove modelParameters button.
        let removeButton = (0, _app.addRemoveButton)(mpDiv, (0, _app.level1), (0, _app.mesmer).removeModelParameters.bind((0, _app.mesmer)), i);
        removeButton.addEventListener('click', (event)=>{
            // Remove the modelParameters.
            (0, _app.remove)(mpcDivID);
            mpIDM.removeIDs(mpDivID);
        });
    });
    return button;
}

},{"big.js":"91nMZ","./app":"dPB9w","./xml_control":"fiNxW","./html":"aLPSL","./xml_mesmer":"8G2m7","./xml_modelParameters":"gfUOc","./util":"f0Rnl","./xml":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1hXD4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
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
 */ parcelHelpers.export(exports, "processControl", ()=>processControl);
/**
 * Create an add control button and append to controlsDiv.
 * @param controlsDiv The controls div.
 * @param controlIDM The control IDs.
 * @returns A button.
 */ parcelHelpers.export(exports, "createAddControlButton", ()=>createAddControlButton);
var _bigJs = require("big.js");
var _bigJsDefault = parcelHelpers.interopDefault(_bigJs);
var _app = require("./app");
var _xmlControl = require("./xml_control");
var _html = require("./html");
var _xmlMesmer = require("./xml_mesmer");
var _util = require("./util");
var _xml = require("./xml");
function processControl(xml, controlIDM) {
    console.log((0, _xmlControl.Control).tagName);
    // Create a div for the controls.
    let controlsDiv = (0, _html.createDiv)(undefined, (0, _app.boundary1));
    // Get the XML "me:control" element.
    let xml_controls = xml.getElementsByTagName((0, _xmlControl.Control).tagName);
    for(let i = 0; i < xml_controls.length; i++){
        //console.log("Control " + i);
        let xml_control = xml_controls[i];
        // Create a collapsible divfor the control.
        let cDivID = controlIDM.addID((0, _xmlControl.Control).tagName, i.toString());
        let cDiv = (0, _html.createDiv)(cDivID, (0, _app.boundary1));
        controlsDiv.appendChild(cDiv);
        let ccDivID = controlIDM.addID(cDivID, (0, _app.s_container));
        let ccDiv = (0, _html.getCollapsibleDiv)(ccDivID, controlsDiv, null, cDiv, (0, _xmlControl.Control).tagName + " " + i.toString(), (0, _app.boundary1), (0, _app.level1));
        let control = addControl((0, _xml.getAttributes)(xml_control), i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        getControlOptionsSimple(control).forEach((option)=>{
            handleControl(control, cDiv, controlIDM, onOffControls, xml_control, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, _html.createFlexDiv)(undefined, (0, _app.level1));
        let orderedOnOffControls = new Map([
            ...onOffControls.entries()
        ].sort());
        orderedOnOffControls.forEach((button)=>{
            onOffControlsDiv.appendChild(button);
        });
        cDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleTestMicroRates(control, cDiv, controlIDM, null, (0, _app.level1));
        handleCalcMethod(control, cDiv, controlIDM, xml_control, (0, _app.level1));
        getControlItems(control).forEach((item)=>{
            handleControl(control, cDiv, controlIDM, onOffControls, xml_control, (0, _app.level1), item.class, item.setMethod, item.removeMethod, true);
        });
        // me:ForceMacroDetailedBalance
        let xml_fdb = xml_control.getElementsByTagName((0, _xmlControl.ForceMacroDetailedBalance).tagName);
        if (xml_fdb.length == 1) {
            let fdb = new (0, _xmlControl.ForceMacroDetailedBalance)();
            control.setForceMacroDetailedBalance(fdb);
            let fdbDiv = (0, _html.createFlexDiv)(controlIDM.addID(cDivID, (0, _xmlControl.ForceMacroDetailedBalance).tagName), (0, _app.level1));
            cDiv.appendChild(fdbDiv);
            let fdbl = (0, _html.createLabel)((0, _xmlControl.ForceMacroDetailedBalance).tagName, (0, _app.boundary1));
            fdbDiv.appendChild(fdbl);
        }
        // Add a remove control button.
        let removeButton = (0, _app.addRemoveButton)(cDiv, (0, _app.level1), (0, _app.mesmer).removeControl.bind((0, _app.mesmer)), i);
        removeButton.addEventListener('click', (event)=>{
            // Remove the control.
            (0, _app.remove)(ccDivID);
            controlIDM.removeIDs(cDivID);
            let divCmId = (0, _util.getID)(cDivID, (0, _xmlControl.CalcMethod).tagName);
            controlIDM.removeIDs(divCmId);
            let divCmDetailsId = (0, _util.getID)(divCmId, "details");
            controlIDM.removeIDs(divCmDetailsId);
            let divCmDetailsSelectId = (0, _util.getID)(divCmDetailsId, "select");
            controlIDM.removeIDs(divCmDetailsSelectId);
        });
    }
    // Create an add button to add a control.
    createAddControlButton(controlsDiv, controlIDM);
    return controlsDiv;
}
/**
 * @param control The control.
 * @return An array of the on/off control options.
 */ function getControlOptionsSimple(control) {
    return [
        {
            class: (0, _xmlControl.CalculateRateCoefficientsOnly),
            setMethod: control.setCalculateRateCoefficientsOnly,
            removeMethod: control.removeCalculateRateCoefficientsOnly
        },
        {
            class: (0, _xmlControl.PrintCellDOS),
            setMethod: control.setPrintCellDOS,
            removeMethod: control.removePrintCellDOS
        },
        {
            class: (0, _xmlControl.PrintCellTransitionStateFlux),
            setMethod: control.setPrintCellTransitionStateFlux,
            removeMethod: control.removePrintCellTransitionStateFlux
        },
        {
            class: (0, _xmlControl.PrintReactionOperatorColumnSums),
            setMethod: control.setPrintReactionOperatorColumnSums,
            removeMethod: control.removePrintReactionOperatorColumnSums
        },
        {
            class: (0, _xmlControl.PrintGrainBoltzmann),
            setMethod: control.setPrintGrainBoltzmann,
            removeMethod: control.removePrintGrainBoltzmann
        },
        {
            class: (0, _xmlControl.PrintGrainDOS),
            setMethod: control.setPrintGrainDOS,
            removeMethod: control.removePrintGrainDOS
        },
        {
            class: (0, _xmlControl.PrintGrainkbE),
            setMethod: control.setPrintGrainkbE,
            removeMethod: control.removePrintGrainkbE
        },
        {
            class: (0, _xmlControl.PrintGrainkfE),
            setMethod: control.setPrintGrainkfE,
            removeMethod: control.removePrintGrainkfE
        },
        {
            class: (0, _xmlControl.PrintTSsos),
            setMethod: control.setPrintTSsos,
            removeMethod: control.removePrintTSsos
        },
        {
            class: (0, _xmlControl.PrintGrainedSpeciesProfile),
            setMethod: control.setPrintGrainedSpeciesProfile,
            removeMethod: control.removePrintGrainedSpeciesProfile
        },
        {
            class: (0, _xmlControl.PrintGrainTransitionStateFlux),
            setMethod: control.setPrintGrainTransitionStateFlux,
            removeMethod: control.removePrintGrainTransitionStateFlux
        },
        {
            class: (0, _xmlControl.PrintReactionOperatorSize),
            setMethod: control.setPrintReactionOperatorSize,
            removeMethod: control.removePrintReactionOperatorSize
        },
        {
            class: (0, _xmlControl.PrintSpeciesProfile),
            setMethod: control.setPrintSpeciesProfile,
            removeMethod: control.removePrintSpeciesProfile
        },
        {
            class: (0, _xmlControl.PrintPhenomenologicalEvolution),
            setMethod: control.setPrintPhenomenologicalEvolution,
            removeMethod: control.removePrintPhenomenologicalEvolution
        },
        {
            class: (0, _xmlControl.PrintTunnelingCoefficients),
            setMethod: control.setPrintTunnelingCoefficients,
            removeMethod: control.removePrintTunnelingCoefficients
        },
        {
            class: (0, _xmlControl.PrintCrossingCoefficients),
            setMethod: control.setPrintCrossingCoefficients,
            removeMethod: control.removePrintCrossingCoefficients
        },
        {
            class: (0, _xmlControl.TestDOS),
            setMethod: control.setTestDOS,
            removeMethod: control.removeTestDOS
        },
        {
            class: (0, _xmlControl.TestRateConstant),
            setMethod: control.setTestRateConstants,
            removeMethod: control.removeTestRateConstants
        },
        {
            class: (0, _xmlControl.UseTheSameCellNumberForAllConditions),
            setMethod: control.setUseTheSameCellNumberForAllConditions,
            removeMethod: control.removeUseTheSameCellNumberForAllConditions
        },
        //{ class: HideInactive, setMethod: control.setHideInactive, removeMethod: control.removeHideInactive }
        {
            class: (0, _xmlControl.ForceMacroDetailedBalance),
            setMethod: control.setForceMacroDetailedBalance,
            removeMethod: control.removeForceMacroDetailedBalance
        }
    ];
}
/**
 * @param control The control.
 * @return An array of the control items.
 */ function getControlItems(control) {
    return [
        {
            class: (0, _xmlControl.Eigenvalues),
            setMethod: control.setEigenvalues,
            removeMethod: control.removeEigenvalues
        },
        {
            class: (0, _xmlControl.ShortestTimeOfInterest),
            setMethod: control.setShortestTimeOfInterest,
            removeMethod: control.removeShortestTimeOfInterest
        },
        {
            class: (0, _xmlControl.MaximumEvolutionTime),
            setMethod: control.setMaximumEvolutionTime,
            removeMethod: control.removeMaximumEvolutionTime
        },
        {
            class: (0, _xmlControl.AutomaticallySetMaxEne),
            setMethod: control.setAutomaticallySetMaxEne,
            removeMethod: control.removeAutomaticallySetMaxEne
        },
        {
            class: (0, _xmlControl.DiagramEnergyOffset),
            setMethod: control.setDiagramEnergyOffset,
            removeMethod: control.removeDiagramEnergyOffset
        }
    ];
}
function createAddControlButton(controlsDiv, controlIDM) {
    let button = (0, _html.createButton)((0, _app.s_Add_sy_add), undefined, (0, _app.level1));
    controlsDiv.appendChild(button);
    button.addEventListener('click', (event)=>{
        let i = (0, _app.mesmer).getNextControlID();
        console.log("Add Control " + i.toString());
        let cDivID = controlIDM.addID((0, _xmlControl.Control).tagName, i.toString());
        let cDiv = (0, _html.createDiv)(cDivID, (0, _app.boundary1));
        // ElementToInsert before is element after the control div with the previous index.
        let elementToInsertBefore;
        if (i > 0) {
            let aboveElement = document.getElementById((0, _util.getID)((0, _xmlControl.Control).tagName, (i - 1).toString(), (0, _app.s_container)));
            let nextElementSibling = aboveElement.nextElementSibling;
            // If nextElementSibling is not a child of controlsDiv the element.
            if (nextElementSibling != null) {
                if (nextElementSibling.parentElement == controlsDiv) elementToInsertBefore = nextElementSibling;
                else elementToInsertBefore = button;
            } else elementToInsertBefore = button;
        } else elementToInsertBefore = button;
        // Create a collapsible div for each conditions.
        let ccDivID = controlIDM.addID(cDivID, (0, _app.s_container));
        let ccDiv = (0, _html.getCollapsibleDiv)(ccDivID, controlsDiv, elementToInsertBefore, cDiv, (0, _xmlControl.Control).tagName + " " + i.toString(), (0, _app.boundary1), (0, _app.level1));
        // Add the control
        let control = addControl(new Map(), i);
        // Create a map of the on/off control options. The keys are the tag names and the values are the buttons.
        let onOffControls = new Map();
        getControlOptionsSimple(control).forEach((option)=>{
            handleControl(control, cDiv, controlIDM, onOffControls, null, null, option.class, option.setMethod, option.removeMethod);
        });
        // Create a div for the on/off controls.
        let onOffControlsDiv = (0, _html.createFlexDiv)(undefined, (0, _app.level1));
        let orderedOnOffControls = new Map([
            ...onOffControls.entries()
        ].sort());
        orderedOnOffControls.forEach((button)=>{
            onOffControlsDiv.appendChild(button);
        });
        cDiv.appendChild(onOffControlsDiv);
        // Controls with additional things to set.
        handleTestMicroRates(control, cDiv, controlIDM, null, (0, _app.level1));
        handleCalcMethod(control, cDiv, controlIDM, null, (0, _app.level1));
        getControlItems(control).forEach((item)=>{
            handleControl(control, cDiv, controlIDM, onOffControls, null, (0, _app.level1), item.class, item.setMethod, item.removeMethod, true);
        });
        // Add a remove control button.
        let removeButton = (0, _app.addRemoveButton)(cDiv, (0, _app.level1), (0, _app.mesmer).removeControl.bind((0, _app.mesmer)), i);
        removeButton.addEventListener('click', (event)=>{
            // Remove the control.
            (0, _app.remove)(ccDivID);
            controlIDM.removeIDs(cDivID);
            let divCmId = (0, _util.getID)(cDivID, (0, _xmlControl.CalcMethod).tagName);
            controlIDM.removeIDs(divCmId);
            let divCmDetailsId = (0, _util.getID)(divCmId, "details");
            controlIDM.removeIDs(divCmDetailsId);
            let divCmDetailsSelectId = (0, _util.getID)(divCmDetailsId, "select");
            controlIDM.removeIDs(divCmDetailsSelectId);
        });
    });
    return button;
}
/**
 * Add and return a new control.
 */ function addControl(attributes, i) {
    let control = new (0, _xmlControl.Control)(attributes, i);
    (0, _app.mesmer).addControl(control);
    return control;
}
/**
 * @param control The control.
 * @param div The div.
 * @param obj The object.
 * @param setControlMethod The set control method. 
 * @param id The id for the input.
 * @param valueString The value string.
 */ function createInputControlItem(control, div, obj, setControlMethod, id, valueString) {
    setControlMethod.call(control, obj);
    let input = (0, _html.createInput)("number", id, (0, _app.boundary1));
    input.addEventListener('change', (event)=>{
        let target = event.target;
        (0, _app.setNumberNode)(obj, target);
        (0, _html.resizeInputElement)(target);
    });
    input.value = valueString;
    (0, _html.resizeInputElement)(input);
    div.appendChild(input);
}
/**
 * 
 * @param control The control.
 * @param cDiv The control div.
 * @param onOffControls The on/off controls.
 * @param xml_control The xml control.
 * @param ControlClass The control class.
 * @param setControlMethod The set control method.
 * @param removeControlMethod The remove control method.
 */ function handleControl(control, cDiv, controlIDs, onOffControls, xml_control, level, ControlClass, setControlMethod, removeControlMethod, handleInput = false) {
    let tagName = ControlClass.tagName;
    let buttonTextContentSelected = tagName + (0, _app.sy_selected);
    let buttonTextContentDeselected = tagName + (0, _app.sy_deselected);
    let button = (0, _html.createButton)(buttonTextContentDeselected, undefined, (0, _app.boundary1));
    button.classList.add((0, _app.s_optionOn));
    button.classList.add((0, _app.s_optionOff));
    if (onOffControls) onOffControls.set(tagName, button);
    let controlInstance;
    let div;
    let id;
    if (level) {
        id = controlIDs.addID(cDiv.id, tagName);
        div = (0, _html.createFlexDiv)(id, level);
        cDiv.appendChild(div);
        div.appendChild(button);
        id = controlIDs.addID(cDiv.id, id, (0, _app.s_input));
    }
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            if (handleInput) {
                let valueString = (0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(xml[0]));
                let value;
                // Deal with the special case of eigenvalues, which can take either numerical or string values.
                value = valueString == "all" ? new (0, _bigJsDefault.default)(0) : new (0, _bigJsDefault.default)(valueString);
                controlInstance = new ControlClass((0, _xml.getAttributes)(xml[0]), value);
                createInputControlItem(control, div, controlInstance, setControlMethod, id, valueString);
            } else {
                controlInstance = new ControlClass((0, _xml.getAttributes)(xml[0]));
                setControlMethod.call(control, controlInstance);
            }
            button.textContent = buttonTextContentSelected;
            button.classList.toggle((0, _app.s_optionOff));
        } else {
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle((0, _app.s_optionOn));
        }
    } else {
        controlInstance = new ControlClass(new Map());
        button.textContent = buttonTextContentDeselected;
        button.classList.toggle((0, _app.s_optionOn));
    }
    button.addEventListener('click', (event)=>{
        if (!control.index.has(tagName)) {
            if (handleInput) createInputControlItem(control, div, controlInstance, setControlMethod, id, "");
            else setControlMethod.call(control, controlInstance);
            button.textContent = buttonTextContentSelected;
        } else {
            if (handleInput) (0, _app.remove)(id);
            removeControlMethod.call(control);
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, _app.s_optionOn));
        button.classList.toggle((0, _app.s_optionOff));
    });
}
/**
 * @param control The control.
 * @param cDiv The control div.
 * @param xml_control The xml control. 
 * @param level The level.
 */ function handleCalcMethod(control, cDiv, controlIDM, xml_control, level) {
    //console.log("handleCalcMethod " + (xml_control == null));
    let div = (0, _html.createFlexDiv)(undefined, level);
    cDiv.appendChild(div);
    let tagName = (0, _xmlControl.CalcMethod).tagName;
    let buttonTextContentSelected = tagName + (0, _app.sy_selected);
    let buttonTextContentDeselected = tagName + (0, _app.sy_deselected);
    let button = (0, _html.createButton)(buttonTextContentDeselected, undefined, (0, _app.boundary1));
    div.appendChild(button);
    button.classList.add((0, _app.s_optionOn));
    button.classList.add((0, _app.s_optionOff));
    // Add the div for the CalcMethod.
    let divCmId = controlIDM.addID(cDiv.id, tagName);
    let divCm = (0, _html.createFlexDiv)(divCmId, (0, _app.boundary1));
    div.appendChild(divCm);
    let options = (0, _xmlControl.CalcMethod).options;
    let divCmDetailsId = controlIDM.addID(divCmId, "details");
    let divCmDetailsSelectId = controlIDM.addID(divCmDetailsId, "select");
    let cm;
    let first = true;
    if (xml_control != null) {
        //let xml: HTMLCollectionOf<Element> = xml_control.getElementsByTagNameNS("http://www.chem.leeds.ac.uk/mesmer", "calcMethod");
        let xml = xml_control.getElementsByTagName(tagName);
        //console.log("xml.length " + xml.length);
        if (xml.length > 0) {
            if (xml.length > 1) throw new Error("More than one CalcMethod element.");
            let attributes = (0, _xml.getAttributes)(xml[0]);
            let xsi_type = attributes.get("xsi:type");
            cm = getCalcMethod(controlIDM, control, divCm, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
            control.setCalcMethod(cm);
            button.classList.toggle((0, _app.s_optionOff));
            button.textContent = buttonTextContentSelected;
        } else {
            button.classList.toggle((0, _app.s_optionOn));
            button.textContent = buttonTextContentDeselected;
        }
    } else {
        button.classList.toggle((0, _app.s_optionOn));
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event)=>{
        // Check if the CalcMethod already exists
        if (!control.index.has(tagName)) {
            if (first) {
                if (options[options.length - 1] != (0, _app.s_selectOption)) options.push((0, _app.s_selectOption));
            }
            // Remove select.
            //remove(divCmId);
            controlIDM.removeIDs(divCmDetailsId);
            controlIDM.removeIDs(divCmDetailsSelectId);
            // Create the select element.
            let select = createSelectElementCalcMethod(controlIDM, control, div, options, tagName, (0, _app.s_selectOption), divCmDetailsId, divCmDetailsSelectId);
            divCm.appendChild(select);
            button.textContent = buttonTextContentSelected;
            button.classList.toggle((0, _app.s_optionOn));
            button.classList.toggle((0, _app.s_optionOff));
        } else if (control.getCalcMethod() != null) {
            control.removeCalcMethod();
            // Remove any existing div.
            //remove(divCmId);
            controlIDM.removeIDs(divCmDetailsId);
            //console.log("remove(divCmDetailsSelectId) " + divCmDetailsSelectId);
            //console.log("button.textContent " + button.textContent);
            controlIDM.removeIDs(divCmDetailsSelectId);
            button.textContent = buttonTextContentDeselected;
            button.classList.toggle((0, _app.s_optionOn));
            button.classList.toggle((0, _app.s_optionOff));
        }
    });
}
/**
 * Process "me:testMicroRates".
 * @param control The control.
 * @param cDiv The control div.
 * @param xml_control The xml control.
 * @param level The level.
 */ function handleTestMicroRates(control, cDiv, controlIDM, xml_control, level) {
    let tagName = (0, _xmlControl.TestMicroRates).tagName;
    let divID = controlIDM.addID(cDiv.id, tagName);
    let div = (0, _html.createFlexDiv)(divID, level);
    cDiv.appendChild(div);
    let buttonTextContentSelected = tagName + (0, _app.sy_selected);
    let buttonTextContentDeselected = tagName + (0, _app.sy_deselected);
    let button = (0, _html.createButton)(tagName, controlIDM.addID(cDiv.id, tagName, (0, _html.s_button)), (0, _app.boundary1));
    div.appendChild(button);
    button.classList.add((0, _app.s_optionOn));
    button.classList.add((0, _app.s_optionOff));
    let idTmax = controlIDM.addID(cDiv.id, tagName, (0, _xmlControl.Tmax).tagName);
    let idTmin = controlIDM.addID(cDiv.id, tagName, (0, _xmlControl.Tmin).tagName);
    let idTstep = controlIDM.addID(cDiv.id, tagName, (0, _xmlControl.Tstep).tagName);
    if (xml_control) {
        let xml = xml_control.getElementsByTagName(tagName);
        if (xml.length == 1) {
            createTestMicroRates(control, div, xml, idTmax, idTmin, idTstep);
            button.classList.toggle((0, _app.s_optionOff));
            button.textContent = buttonTextContentSelected;
        } else {
            button.classList.toggle((0, _app.s_optionOn));
            button.textContent = buttonTextContentDeselected;
        }
    } else {
        button.classList.toggle((0, _app.s_optionOn));
        button.textContent = buttonTextContentDeselected;
    }
    // Add event listener for the button.
    button.addEventListener('click', (event)=>{
        // Check if the TestMicroRates already exists
        if (!control.index.has(tagName)) {
            createTestMicroRates(control, div, null, idTmax, idTmin, idTstep);
            button.textContent = buttonTextContentSelected;
        } else {
            control.removeTestMicroRates();
            // Remove any existing Tmax.
            document.getElementById(idTmax)?.remove();
            // Remove any existing Tmin.
            document.getElementById(idTmin)?.remove();
            // Remove any existing Tstep.
            document.getElementById(idTstep)?.remove();
            button.textContent = buttonTextContentDeselected;
        }
        button.classList.toggle((0, _app.s_optionOn));
        button.classList.toggle((0, _app.s_optionOff));
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
    if (xml_tmr != null && xml_tmr.length > 0) {
        if (xml_tmr.length > 1) throw new Error("More than one TestMicroRates element.");
        attributes = (0, _xml.getAttributes)(xml_tmr[0]);
        tmr = new (0, _xmlControl.TestMicroRates)(attributes);
    } else {
        attributes = new Map();
        // Set some default values.
        attributes.set((0, _xmlControl.TestMicroRates).s_Tmax, "2000"); // These should load from some kind of default...
        attributes.set((0, _xmlControl.TestMicroRates).s_Tmin, "100");
        attributes.set((0, _xmlControl.TestMicroRates).s_Tstep, "100");
        tmr = new (0, _xmlControl.TestMicroRates)(attributes);
    }
    control.setTestMicroRates(tmr);
    // Tmax.
    let tMax = tmr.getTmax();
    let tMaxlwi = (0, _html.createLabelWithInput)("text", (0, _util.getID)(idTmax, "input"), (0, _app.boundary1), (0, _app.level0), (event)=>{
        let target = event.target;
        // Check the value is a number.
        try {
            tmr.setTmax(new (0, _bigJsDefault.default)(target.value));
            console.log("Set " + (0, _xmlControl.TestMicroRates).s_Tmax + " to " + target.value);
        } catch (e) {
            alert("Invalid input, resetting...");
            target.value = tMax.toString();
        }
        (0, _html.resizeInputElement)(target);
    }, tMax.toString(), (0, _xmlControl.TestMicroRates).s_Tmax);
    tMaxlwi.id = idTmax;
    (0, _html.resizeInputElement)(tMaxlwi.querySelector('input'));
    div.appendChild(tMaxlwi);
    // Tmin.
    let tMin = tmr.getTmin();
    let tMinlwi = (0, _html.createLabelWithInput)("number", (0, _util.getID)(idTmin + "input"), (0, _app.boundary1), (0, _app.level0), (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _util.isNumeric)(target.value)) {
            tmr.setTmin(new (0, _bigJsDefault.default)(target.value));
            console.log("Set " + (0, _xmlControl.TestMicroRates).s_Tmin + " to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = tMin.toString();
        }
        (0, _html.resizeInputElement)(target);
    }, tMin.toString(), (0, _xmlControl.TestMicroRates).s_Tmin);
    tMinlwi.id = idTmin;
    (0, _html.resizeInputElement)(tMinlwi.querySelector('input'));
    div.appendChild(tMinlwi);
    // Tstep.
    let tStep = tmr.getTstep();
    let tSteplwi = (0, _html.createLabelWithInput)("text", (0, _util.getID)(idTstep + "input"), (0, _app.boundary1), (0, _app.level0), (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _util.isNumeric)(target.value)) {
            tmr.setTstep(new (0, _bigJsDefault.default)(target.value));
            console.log("Set " + (0, _xmlControl.TestMicroRates).s_Tstep + " to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = tStep.toString();
        }
        (0, _html.resizeInputElement)(target);
    }, tStep.toString(), (0, _xmlControl.TestMicroRates).s_Tstep);
    tSteplwi.id = idTstep;
    (0, _html.resizeInputElement)(tSteplwi.querySelector('input'));
    div.appendChild(tSteplwi);
}
/**
 * Get the CalcMethod from the XML.
 * @param control The control.
 * @param divCm The div cm.
 * @param xml The xml.
 * @param options The options.
 * @param attributes The attributes.
 * @param tagName The tag name.
 * @param xsi_type The xsi:type.
 * @param divCmDetailsId The div cm details id.
 * @param divCmDetailsSelectId The div cm details select id.
 * @returns The CalcMethod.
 */ function getCalcMethod(controlIDM, control, divCm, xml, options, attributes, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId) {
    //console.log("getCalcMethod");
    let cm;
    // Create the select element.
    let select = createSelectElementCalcMethod(controlIDM, control, divCm, options, tagName, xsi_type, divCmDetailsId, divCmDetailsSelectId);
    // Set the select element to the correct value.
    select.value = xsi_type;
    divCm.appendChild(select);
    // Add the details div.
    let divCmDetails = (0, _html.createFlexDiv)(divCmDetailsId, (0, _app.boundary1));
    divCm.appendChild(divCmDetails);
    if (xsi_type == (0, _xmlControl.CalcMethodSimpleCalc).xsi_type || xsi_type == (0, _xmlControl.CalcMethodSimpleCalc).xsi_type2) //console.log("CalcMethodSimpleCalc");
    cm = new (0, _xmlControl.CalcMethodSimpleCalc)(attributes);
    else if (xsi_type == (0, _xmlControl.CalcMethodGridSearch).xsi_type || xsi_type == (0, _xmlControl.CalcMethodGridSearch).xsi_type2) cm = new (0, _xmlControl.CalcMethodGridSearch)(attributes);
    else if (xsi_type == (0, _xmlControl.CalcMethodFitting).xsi_type || xsi_type == (0, _xmlControl.CalcMethodFitting).xsi_type2) {
        let cmf = new (0, _xmlControl.CalcMethodFitting)(attributes);
        cm = cmf;
        // FittingIterations.
        let fi_xml = xml[0].getElementsByTagName((0, _xmlControl.FittingIterations).tagName);
        if (fi_xml.length > 0) {
            if (fi_xml.length == 1) {
                let value = new (0, _bigJsDefault.default)((0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(fi_xml[0])));
                let fittingIterations = new (0, _xmlControl.FittingIterations)((0, _xml.getAttributes)(fi_xml[0]), value);
                cmf.setFittingIterations(fittingIterations);
            } else throw new Error("More than one FittingIterations element.");
        }
        processCalcMethodFitting(divCmDetails, cmf);
    } else if (xsi_type == (0, _xmlControl.CalcMethodMarquardt).xsi_type || xsi_type == (0, _xmlControl.CalcMethodMarquardt).xsi_type2) {
        let cmm = new (0, _xmlControl.CalcMethodMarquardt)(attributes);
        cm = cmm;
        function processElement(xml, ClassConstructor, setterMethod) {
            let tagName = (0, _xmlControl.MarquardtIterations).tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = new (0, _bigJsDefault.default)((0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(elementXml[0])));
                    let instance = new ClassConstructor((0, _xml.getAttributes)(elementXml[0]), value);
                    setterMethod(instance);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        processElement(xml, (0, _xmlControl.MarquardtIterations), cmm.setMarquardtIterations.bind(cmm));
        processElement(xml, (0, _xmlControl.MarquardtTolerance), cmm.setMarquardtTolerance.bind(cmm));
        processElement(xml, (0, _xmlControl.MarquardtDerivDelta), cmm.setMarquardtDerivDelta.bind(cmm));
        processCalcMethodMarquardt(divCmDetails, cmm);
    } else if (xsi_type == (0, _xmlControl.CalcMethodAnalyticalRepresentation).xsi_type || xsi_type == (0, _xmlControl.CalcMethodAnalyticalRepresentation).xsi_type2) {
        let cmar = new (0, _xmlControl.CalcMethodAnalyticalRepresentation)(attributes);
        cm = cmar;
        function processElement1(xml, ClassConstructor, setterMethod, isNumber) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = (0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(elementXml[0]));
                    if (isNumber) {
                        if (value != undefined) {
                            if (value != "" && value != "NaN") value = new (0, _bigJsDefault.default)(value);
                        }
                    }
                    let instance = new ClassConstructor((0, _xml.getAttributes)(elementXml[0]), value);
                    setterMethod(instance);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        processElement1(xml, (0, _xmlControl.Format), cmar.setFormat.bind(cmar), false);
        processElement1(xml, (0, _xmlControl.Precision), cmar.setPrecision.bind(cmar), false);
        processElement1(xml, (0, _xmlControl.ChebNumTemp), cmar.setChebNumTemp.bind(cmar), true);
        processElement1(xml, (0, _xmlControl.ChebNumConc), cmar.setChebNumConc.bind(cmar), true);
        processElement1(xml, (0, _xmlControl.ChebMaxTemp), cmar.setChebMaxTemp.bind(cmar), true);
        processElement1(xml, (0, _xmlControl.ChebMinTemp), cmar.setChebMinTemp.bind(cmar), true);
        processElement1(xml, (0, _xmlControl.ChebMaxConc), cmar.setChebMaxConc.bind(cmar), true);
        processElement1(xml, (0, _xmlControl.ChebMinConc), cmar.setChebMinConc.bind(cmar), true);
        processElement1(xml, (0, _xmlControl.ChebTExSize), cmar.setChebTExSize.bind(cmar), true);
        processElement1(xml, (0, _xmlControl.ChebPExSize), cmar.setChebPExSize.bind(cmar), true);
        processCalcMethodAnalyticalRepresentation(divCmDetails, cmar);
    } else if (xsi_type == (0, _xmlControl.CalcMethodThermodynamicTable).xsi_type || xsi_type == (0, _xmlControl.CalcMethodThermodynamicTable).xsi_type2) {
        let cmtt = new (0, _xmlControl.CalcMethodThermodynamicTable)(attributes);
        cm = cmtt;
        function processElement2(xml, ClassConstructor, setterMethod) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = new (0, _bigJsDefault.default)((0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(elementXml[0])));
                    let instance = new ClassConstructor((0, _xml.getAttributes)(elementXml[0]), value);
                    setterMethod(instance);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        processElement2(xml, (0, _xmlControl.Tmin), cmtt.setTmin.bind(cmtt));
        processElement2(xml, (0, _xmlControl.Tmid), cmtt.setTmid.bind(cmtt));
        processElement2(xml, (0, _xmlControl.Tmax), cmtt.setTmax.bind(cmtt));
        processElement2(xml, (0, _xmlControl.Tstep), cmtt.setTstep.bind(cmtt));
        processCalcMethodThermodynamicTable(divCmDetails, cmtt);
    } else if (xsi_type == (0, _xmlControl.CalcMethodSensitivityAnalysis).xsi_type || xsi_type == (0, _xmlControl.CalcMethodSensitivityAnalysis).xsi_type2) {
        let cmsa = new (0, _xmlControl.CalcMethodSensitivityAnalysis)(attributes);
        cm = cmsa;
        function processElement3(xml, ClassConstructor, setterMethod) {
            let tagName = ClassConstructor.tagName;
            let elementXml = xml[0].getElementsByTagName(tagName);
            if (elementXml.length > 0) {
                if (elementXml.length == 1) {
                    let value = (0, _xml.getNodeValue)((0, _xml.getFirstChildNode)(elementXml[0]));
                    if (value != undefined) value = new (0, _bigJsDefault.default)(value);
                    let instance = new ClassConstructor((0, _xml.getAttributes)(elementXml[0]), value);
                    setterMethod(instance);
                } else throw new Error(`More than one ${tagName} element.`);
            }
        }
        processElement3(xml, (0, _xmlControl.SensitivityAnalysisSamples), cmsa.setSensitivityAnalysisSamples.bind(cmsa));
        processElement3(xml, (0, _xmlControl.SensitivityAnalysisOrder), cmsa.setSensitivityAnalysisOrder.bind(cmsa));
        processElement3(xml, (0, _xmlControl.SensitivityNumVarRedIters), cmsa.setSensitivityNumVarRedIters.bind(cmsa));
        processElement3(xml, (0, _xmlControl.SensitivityVarRedMethod), cmsa.setSensitivityVarRedMethod.bind(cmsa));
        processCalcMethodSensitivityAnalysis(divCmDetails, cmsa);
    } else {
        // If there is a name attribute instead, try this in place of the xsi:type.
        let name = attributes.get("name");
        if (name != undefined && name !== xsi_type) {
            attributes.set("xsi:type", name);
            console.warn(`Using name attribute as xsi:type: ${name}`);
            return getCalcMethod(controlIDM, control, divCm, xml, options, attributes, tagName, name, divCmDetailsId, divCmDetailsSelectId);
        } else throw new Error(`Unable to determine calculation method for xsi_type: ${xsi_type}`);
    }
    return cm;
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodFitting.
 */ function processCalcMethodFitting(divCmDetails, cm) {
    // FittingIterations.
    let fi = cm.getFittingIterations() || new (0, _xmlControl.FittingIterations)(new Map(), (0, _app.big0));
    cm.setFittingIterations(fi);
    divCmDetails.appendChild((0, _html.createLabelWithInput)("number", (0, _util.getID)(divCmDetails.id, (0, _xmlControl.FittingIterations).tagName, (0, _app.s_input)), (0, _app.boundary1), (0, _app.level0), (event)=>{
        let target = event.target;
        // Check the value is a number.
        if ((0, _util.isNumeric)(target.value)) {
            fi.value = new (0, _bigJsDefault.default)(target.value);
            console.log("Set FittingIterations to " + target.value);
        } else {
            alert("Value is not numeric, resetting...");
            target.value = fi.value.toString();
        }
        (0, _html.resizeInputElement)(target);
    }, fi.value.toString(), (0, _xmlControl.FittingIterations).tagName));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodMarquardt.
 */ function processCalcMethodMarquardt(divCmDetails, cm) {
    function createLabelWithInputForObject(obj, divCmDetails, boundary, level) {
        let id = (0, _util.getID)(divCmDetails.id, obj.tagName, (0, _app.s_input));
        let value = obj.value.toString();
        let labelTextContent = obj.tagName;
        let inputHandler = (event)=>{
            let target = event.target;
            // Check the value is a number.
            if ((0, _util.isNumeric)(target.value)) {
                obj.value = new (0, _bigJsDefault.default)(target.value);
                console.log("Set " + obj.tagName + " to " + target.value);
            } else {
                alert("Value is not numeric, resetting...");
                target.value = obj.value.toString();
            }
            (0, _html.resizeInputElement)(target);
        };
        divCmDetails.appendChild((0, _html.createLabelWithInput)("number", id, boundary, level, inputHandler, value, labelTextContent));
    }
    // MarquardtIterations.
    let mi = cm.getMarquardtIterations() || new (0, _xmlControl.MarquardtIterations)(new Map(), (0, _app.big0));
    cm.setMarquardtIterations(mi);
    createLabelWithInputForObject(mi, divCmDetails, (0, _app.boundary1), (0, _app.level0));
    // MarquardtTolerance.
    let mt = cm.getMarquardtTolerance() || new (0, _xmlControl.MarquardtTolerance)(new Map(), (0, _app.big0));
    cm.setMarquardtTolerance(mt);
    createLabelWithInputForObject(mt, divCmDetails, (0, _app.boundary1), (0, _app.level0));
    // MarquardtDerivDelta.
    let mdd = cm.getMarquardtDerivDelta() || new (0, _xmlControl.MarquardtDerivDelta)(new Map(), (0, _app.big0));
    cm.setMarquardtDerivDelta(mdd);
    createLabelWithInputForObject(mdd, divCmDetails, (0, _app.boundary1), (0, _app.level0));
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodAnalyticalRepresentation.
 */ function processCalcMethodAnalyticalRepresentation(divCmDetails, cm) {
    // "me:format".
    let format = cm.getFormat() || new (0, _xmlControl.Format)(new Map(), (0, _xmlControl.Format).options[0]);
    // value, rateUnits, "me:precision"
    function processSelectElement(ClassConstructor, getter, setter, tagName, options) {
        let element = getter() || new ClassConstructor(new Map(), options[0]);
        setter(element);
        let lwsElement = (0, _html.createLabelWithSelect)(tagName, options, tagName, element.value, divCmDetails.id, (0, _app.boundary1), (0, _app.boundary1));
        lwsElement.querySelector('select')?.addEventListener('change', (event)=>{
            let target = event.target;
            element.value = target.value;
            console.log(`Set ${tagName} to ` + target.value);
            (0, _html.resizeSelectElement)(target);
        });
        divCmDetails.appendChild(lwsElement);
    }
    processSelectElement((0, _xmlControl.Format), cm.getFormat.bind(cm), cm.setFormat.bind(cm), (0, _xmlControl.Format).tagName, (0, _xmlControl.Format).options);
    processSelectElement((0, _xmlControl.Format), ()=>format.getRateUnits(), format.setRateUnits.bind(format), (0, _xmlControl.Format).rateUnits, (0, _xmlControl.Format).rateUnitsOptions);
    processSelectElement((0, _xmlControl.Precision), cm.getPrecision.bind(cm), cm.setPrecision.bind(cm), (0, _xmlControl.Precision).tagName, (0, _xmlMesmer.Mesmer).precisionOptions);
    // "me:chebNumTemp", "me:chebNumConc", "me:chebMaxTemp", "me:chebMaxTemp", "me:chebMinTemp", "me:chebMaxConc", "me:chebMinConc",
    // "me:chebTExSize", "me:chebPExSize".
    function processElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, _html.createLabelWithInput)("text", divCmDetails.id + `_${tagName}_input`, (0, _app.boundary1), (0, _app.level0), handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processElement((0, _xmlControl.ChebNumTemp), cm.getChebNumTemp.bind(cm), cm.setChebNumTemp.bind(cm), (0, _xmlControl.ChebNumTemp).tagName);
    processElement((0, _xmlControl.ChebNumConc), cm.getChebNumConc.bind(cm), cm.setChebNumConc.bind(cm), (0, _xmlControl.ChebNumConc).tagName);
    processElement((0, _xmlControl.ChebMaxTemp), cm.getChebMaxTemp.bind(cm), cm.setChebMaxTemp.bind(cm), (0, _xmlControl.ChebMaxTemp).tagName);
    processElement((0, _xmlControl.ChebMinTemp), cm.getChebMinTemp.bind(cm), cm.setChebMinTemp.bind(cm), (0, _xmlControl.ChebMinTemp).tagName);
    processElement((0, _xmlControl.ChebMaxConc), cm.getChebMaxConc.bind(cm), cm.setChebMaxConc.bind(cm), (0, _xmlControl.ChebMaxConc).tagName);
    processElement((0, _xmlControl.ChebMinConc), cm.getChebMinConc.bind(cm), cm.setChebMinConc.bind(cm), (0, _xmlControl.ChebMinConc).tagName);
    processElement((0, _xmlControl.ChebTExSize), cm.getChebTExSize.bind(cm), cm.setChebTExSize.bind(cm), (0, _xmlControl.ChebTExSize).tagName);
    processElement((0, _xmlControl.ChebPExSize), cm.getChebPExSize.bind(cm), cm.setChebPExSize.bind(cm), (0, _xmlControl.ChebPExSize).tagName);
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodThermodynamicTable.
 */ function processCalcMethodThermodynamicTable(divCmDetails, cm) {
    // "me:Tmin", "me:Tmid", "me:Tmax, "me:Tstep".
    function processElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, _html.createLabelWithInput)("text", divCmDetails.id + `_${tagName}_input`, (0, _app.boundary1), (0, _app.level0), handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processElement((0, _xmlControl.Tmin), cm.getTmin.bind(cm), cm.setTmin.bind(cm), (0, _xmlControl.Tmin).tagName);
    processElement((0, _xmlControl.Tmid), cm.getTmid.bind(cm), cm.setTmid.bind(cm), (0, _xmlControl.Tmid).tagName);
    processElement((0, _xmlControl.Tmax), cm.getTmax.bind(cm), cm.setTmax.bind(cm), (0, _xmlControl.Tmax).tagName);
    processElement((0, _xmlControl.Tstep), cm.getTstep.bind(cm), cm.setTstep.bind(cm), (0, _xmlControl.Tstep).tagName);
}
function handleEvent(element, tagName) {
    return (event)=>{
        let target = event.target;
        try {
            element.value = new (0, _bigJsDefault.default)(target.value);
        } catch (e) {
            alert("Invalid input value " + target.value + " , resetting...");
            target.value = element.value.toString();
        }
        (0, _html.resizeInputElement)(target);
    };
}
/**
 * @param divCmDetails The details div.
 * @param cm The CalcMethodSensitivityAnalysis.
 */ function processCalcMethodSensitivityAnalysis(divCmDetails, cm) {
    // "me:sensitivityAnalysisSamples", "me:sensitivityAnalysisOrder", "me:sensitivityNumVarRedIters".
    function processNumberElement(ClassConstructor, getter, setter, tagName) {
        let element = getter() || new ClassConstructor(new Map(), NaN);
        setter(element);
        divCmDetails.appendChild((0, _html.createLabelWithInput)("text", (0, _util.getID)(divCmDetails.id, tagName, (0, _app.s_input)), (0, _app.boundary1), (0, _app.level0), handleEvent(element, tagName), element.value.toString(), tagName));
    }
    processNumberElement((0, _xmlControl.SensitivityAnalysisSamples), cm.getSensitivityAnalysisSamples.bind(cm), cm.setSensitivityAnalysisSamples.bind(cm), (0, _xmlControl.SensitivityAnalysisSamples).tagName);
    processNumberElement((0, _xmlControl.SensitivityAnalysisOrder), cm.getSensitivityAnalysisOrder.bind(cm), cm.setSensitivityAnalysisOrder.bind(cm), (0, _xmlControl.SensitivityAnalysisOrder).tagName);
    processNumberElement((0, _xmlControl.SensitivityNumVarRedIters), cm.getSensitivityNumVarRedIters.bind(cm), cm.setSensitivityNumVarRedIters.bind(cm), (0, _xmlControl.SensitivityNumVarRedIters).tagName);
    // "me:sensitivityVarRedMethod".
    let sensitivityVarRedMethod = cm.getSensitivityVarRedMethod() || new (0, _xmlControl.SensitivityVarRedMethod)(new Map(), "");
    cm.setSensitivityVarRedMethod(sensitivityVarRedMethod);
    let tagName = (0, _xmlControl.SensitivityVarRedMethod).tagName;
    divCmDetails.appendChild((0, _html.createLabelWithSelect)(tagName, (0, _xmlControl.SensitivityVarRedMethod).options, tagName, (0, _xmlControl.SensitivityVarRedMethod).options[0], (0, _util.getID)(divCmDetails.id, tagName, 'select'), (0, _app.boundary1), (0, _app.boundary1)));
    // Add event listener for the select element.
    let select = divCmDetails.querySelector('select');
    select?.addEventListener('change', (event)=>{
        let target = event.target;
        sensitivityVarRedMethod.value = target.value;
        console.log(tagName + " set to " + target.value);
        (0, _html.resizeSelectElement)(target);
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
 */ function createSelectElementCalcMethod(controlIDM, control, div, options, tagName, value, divCmDetailsId, divCmDetailsSelectId) {
    let select = (0, _html.createSelectElement)(options, tagName, value, divCmDetailsSelectId, (0, _app.boundary1));
    div.appendChild(select);
    (0, _app.selectAnotherOptionEventListener)(options, select);
    select.addEventListener('change', (event)=>{
        // Remove any existing div.
        let divCmDetails = document.getElementById(divCmDetailsId);
        if (divCmDetails != null) {
            divCmDetails.remove();
            controlIDM.removeIDs(divCmDetailsId);
        }
        divCmDetails = (0, _html.createFlexDiv)(divCmDetailsId, (0, _app.boundary1));
        div.appendChild(divCmDetails);
        let target = event.target;
        let value = target.value;
        let attributes = new Map();
        attributes.set("xsi:type", value);
        if (value == (0, _xmlControl.CalcMethodSimpleCalc).xsi_type || value == (0, _xmlControl.CalcMethodSimpleCalc).xsi_type2) // "me:simpleCalc", "simpleCalc".
        control.setCalcMethod(new (0, _xmlControl.CalcMethodSimpleCalc)(attributes));
        else if (value == (0, _xmlControl.CalcMethodGridSearch).xsi_type || value == (0, _xmlControl.CalcMethodGridSearch).xsi_type2) // "me:gridSearch", "gridSearch".
        control.setCalcMethod(new (0, _xmlControl.CalcMethodGridSearch)(attributes));
        else if (value == (0, _xmlControl.CalcMethodFitting).xsi_type || value == (0, _xmlControl.CalcMethodFitting).xsi_type2) {
            let cm = new (0, _xmlControl.CalcMethodFitting)(attributes);
            control.setCalcMethod(cm);
            processCalcMethodFitting(divCmDetails, cm);
        } else if (value == (0, _xmlControl.CalcMethodMarquardt).xsi_type || value == (0, _xmlControl.CalcMethodMarquardt).xsi_type2) {
            // "me:marquardt", "marquardt".
            let cm = new (0, _xmlControl.CalcMethodMarquardt)(attributes);
            control.setCalcMethod(cm);
            processCalcMethodMarquardt(divCmDetails, cm);
        } else if (value == (0, _xmlControl.CalcMethodAnalyticalRepresentation).xsi_type || value == (0, _xmlControl.CalcMethodAnalyticalRepresentation).xsi_type2) {
            // "me:analyticalRepresentation", "analyticalRepresentation".
            let cm = new (0, _xmlControl.CalcMethodAnalyticalRepresentation)(attributes);
            control.setCalcMethod(cm);
            processCalcMethodAnalyticalRepresentation(divCmDetails, cm);
        } else if (value == (0, _xmlControl.CalcMethodThermodynamicTable).xsi_type || value == (0, _xmlControl.CalcMethodThermodynamicTable).xsi_type2) {
            // "me:ThermodynamicTable", "ThermodynamicTable".
            let cm = new (0, _xmlControl.CalcMethodThermodynamicTable)(attributes);
            control.setCalcMethod(cm);
            processCalcMethodThermodynamicTable(divCmDetails, cm);
        } else if (value == (0, _xmlControl.CalcMethodSensitivityAnalysis).xsi_type || value == (0, _xmlControl.CalcMethodSensitivityAnalysis).xsi_type2) {
            // "me:sensitivityAnalysis", "sensitivityAnalysis".
            let cm = new (0, _xmlControl.CalcMethodSensitivityAnalysis)(new Map());
            control.setCalcMethod(cm);
            processCalcMethodSensitivityAnalysis(divCmDetails, cm);
        } else throw new Error("Unknown CalcMethod type.");
        (0, _html.resizeSelectElement)(target);
    });
    return select;
}

},{"big.js":"91nMZ","./app":"dPB9w","./xml_control":"fiNxW","./html":"aLPSL","./xml_mesmer":"8G2m7","./util":"f0Rnl","./xml":"7znDa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aytWV":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
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
 */ //export function createReactionDiagram(rdDiv: HTMLDivElement, rdcID: string, rdcHeight: number, dark: boolean,
parcelHelpers.export(exports, "createReactionDiagram", ()=>createReactionDiagram);
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
 */ parcelHelpers.export(exports, "drawReactionDiagram", ()=>drawReactionDiagram);
var _app = require("./app");
var _canvas = require("./canvas");
var _html = require("./html");
var _util = require("./util");
function createReactionDiagram(rdcID, rdcHeight, dark, rd_font, rd_lw, rd_lwc, rdWindow, molecules, reactions, draw) {
    // Destroy any existing rdWindow.
    if (rdWindow != null) {
        rdWindow.close();
        rdWindow = null;
    }
    let rddDiv = document.getElementById((0, _app.reactionsDiagramDivID));
    let rdDivID = (0, _app.addRID)((0, _app.s_Reactions_Diagram));
    // If rdDiv already exists, remove it.
    (0, _app.remove)(rdDivID);
    // Create collapsible content.
    let rdDiv = (0, _html.createDiv)(rdDivID, (0, _app.level1));
    rddDiv.appendChild(rdDiv);
    // Create collapsible content.
    let rdcDiv = (0, _html.getCollapsibleDiv)(rdDivID, rddDiv, null, rdDiv, (0, _app.s_Reactions_Diagram), (0, _app.boundary1), (0, _app.level0));
    // Create a pop diagram button in its own div.
    let bDivId = (0, _app.addRID)(rdDiv.id, (0, _html.s_button) + 's');
    let bDiv = (0, _html.createDiv)(bDivId);
    rdDiv.appendChild(bDiv);
    let pbID = (0, _app.addRID)(bDivId, (0, _html.s_button));
    let popOutText = "Pop into a new Window";
    let pb = (0, _html.createButton)(popOutText, pbID);
    bDiv.appendChild(pb);
    let rdCanvas = document.createElement('canvas');
    rdCanvas.id = rdcID;
    rdDiv.appendChild(rdCanvas);
    //rd_canvas.width = rd_canvas_width;
    rdCanvas.height = rdcHeight;
    rdCanvas.style.border = "1px solid black";
    //rdCanvas.style.margin = "1px";
    if (draw) drawReactionDiagram(rdCanvas, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
    // Add action listener to the pop diagram button.
    pb.addEventListener('click', ()=>{
        //if (rdWindow == null || rdWindow.closed) {
        if (rdWindow == null) {
            let popWindowRDCanvas = document.createElement('canvas');
            popWindowRDCanvas.id = rdcID;
            rdWindow = window.open("", (0, _app.s_Reactions_Diagram), "width=" + rdCanvas.width + ", height=" + rdCanvas.height);
            rdWindow.document.body.appendChild(popWindowRDCanvas);
            if (draw) drawReactionDiagram(popWindowRDCanvas, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
            (0, _app.remove)(rdcID);
            pb.textContent = "Pop into this Window";
        } else {
            rdCanvas = document.createElement('canvas');
            rdCanvas.id = rdcID;
            rdDiv.appendChild(rdCanvas);
            rdCanvas.height = rdcHeight;
            rdCanvas.style.border = "1px solid black";
            if (draw) drawReactionDiagram(rdCanvas, rdcHeight, dark, rd_font, rd_lw, rd_lwc, molecules, reactions);
            rdWindow.close();
            rdWindow = null;
            pb.textContent = popOutText;
        }
    });
    (0, _app.addSaveAsPNGButton)(rdCanvas, bDiv, null, (0, _app.s_Reactions_Diagram));
}
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
        let th = (0, _canvas.getTextHeight)(ctx, "Aj", ctx.font);
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
        reactions.forEach(function(reaction, id) {
            // Get TransitionStates.
            //let reactionTransitionStates: TransitionState[] = reaction.getTransitionStates();
            let rtss = reaction.getTransitionStates();
            //console.log("reactant=" + reactant);
            let reactantsLabel = reaction.getReactantsLabel();
            if (reactantsLabel != undefined) {
                reactants.push(reactantsLabel);
                if (products.has(reactantsLabel)) intProducts.add(reactantsLabel);
                let energy = reaction.getReactantsEnergy((0, _app.getMolecule), molecules);
                console.log("energy=" + energy.toString());
                units = reaction.getEnergyUnits((0, _app.getMolecule), molecules, reaction.getReactants());
                console.log("units=" + units);
                energyMin = (0, _util.min)(energyMin, energy);
                energyMax = (0, _util.max)(energyMax, energy);
                energies.set(reactantsLabel, energy);
                if (!orders.has(reactantsLabel)) {
                    orders.set(reactantsLabel, i);
                    i++;
                }
            }
            let productsLabel = reaction.getProductsLabel();
            if (productsLabel != undefined) {
                products.add(productsLabel);
                let energy = reaction.getProductsEnergy((0, _app.getMolecule), molecules);
                console.log("energy=" + energy.toString());
                units = reaction.getEnergyUnits((0, _app.getMolecule), molecules, reaction.getProducts());
                console.log("units=" + units);
                energyMin = (0, _util.min)(energyMin, energy);
                energyMax = (0, _util.max)(energyMax, energy);
                energies.set(productsLabel, energy);
                if (orders.has(productsLabel)) {
                    i--;
                    let j = (0, _util.get)(orders, productsLabel);
                    // Move product to end and shift everything back.
                    orders.forEach(function(value, key) {
                        if (value > j) orders.set(key, value - 1);
                    });
                    // Insert transition states.
                    if (rtss != undefined) {
                        rtss.forEach(function(ts, ref) {
                            let moleculeRef = ts.getMolecule().getRef();
                            tss.add(moleculeRef);
                            orders.set(moleculeRef, i);
                            energy = (0, _app.getMolecule)(moleculeRef, molecules).getEnergy() ?? (0, _app.big0);
                            console.log("energy=" + energy.toString());
                            units = reaction.getEnergyUnits((0, _app.getMolecule), molecules, reaction.getTransitionStates());
                            console.log("units=" + units);
                            energyMin = (0, _util.min)(energyMin, energy);
                            energyMax = (0, _util.max)(energyMax, energy);
                            energies.set(moleculeRef, energy);
                            i++;
                        });
                        orders.set(productsLabel, i);
                        i++;
                    }
                } else {
                    if (rtss != undefined) rtss.forEach(function(ts, ref) {
                        let moleculeRef = ts.getMolecule().getRef();
                        tss.add(moleculeRef);
                        orders.set(moleculeRef, i);
                        energy = (0, _app.getMolecule)(moleculeRef, molecules).getEnergy() ?? (0, _app.big0);
                        console.log("energy=" + energy.toString());
                        energyMin = (0, _util.min)(energyMin, energy);
                        energyMax = (0, _util.max)(energyMax, energy);
                        energies.set(moleculeRef, energy);
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
        let energyRange = energyMax.minus(energyMin).toNumber();
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
        let tssInXY = new Map();
        let tssOutXY = new Map();
        reorders.forEach(function(value) {
            //console.log("value=" + value + ".");
            //console.log("energies=" + mapToString(energies));
            let energy = (0, _util.get)(energies, value);
            console.log("energy=" + energy.toString());
            let energyRescaled = (0, _util.rescale)(energyMin.toNumber(), energyRange, 0, rdcHeight, energy);
            // Get text width.
            tw = Math.max((0, _canvas.getTextWidth)(ctx, energy.toString(), font), (0, _canvas.getTextWidth)(ctx, value, font));
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
            if (tss.has(value)) {
                tssInXY.set(value, [
                    x0,
                    y0
                ]);
                tssOutXY.set(value, [
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
        let canvasHeightWithBorder = rdcHeight + 4 * th + 2 * lw;
        //console.log("canvasHeightWithBorder=" + canvasHeightWithBorder);
        let originalCanvasHeight = rdcHeight;
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
            //let tss: TransitionState[] = reaction.getTransitionStates();
            let rtss = reaction.getTransitionStates();
            //console.log("reactant=" + reactant);
            let reactantsLabel = reaction.getReactantsLabel();
            let productsLabel = reaction.getProductsLabel();
            let reactantOutXY = (0, _util.get)(reactantsOutXY, reactantsLabel);
            let productInXY = (0, _util.get)(productsInXY, productsLabel);
            if (rtss.size > 0) //tss.forEach(function (ts, ref) {
            rtss.forEach(function(ts, ref) {
                let tsInXY = (0, _util.get)(tssInXY, ref);
                (0, _canvas.drawLine)(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], tsInXY[0], tsInXY[1]);
                let tsOutXY = (0, _util.get)(tssOutXY, ref);
                (0, _canvas.drawLine)(ctx, foreground, lwc, tsOutXY[0], tsOutXY[1], productInXY[0], productInXY[1]);
            });
            else (0, _canvas.drawLine)(ctx, foreground, lwc, reactantOutXY[0], reactantOutXY[1], productInXY[0], productInXY[1]);
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
        reactants.forEach(function(value) {
            let energy = (0, _util.get)(energies, value);
            console.log("energy=" + energy.toString());
            let energyRescaled = (0, _util.rescale)(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            console.log("energyRescaled=" + energyRescaled.toString());
            let x0 = (0, _util.get)(reactantsInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, _util.get)(reactantsOutXY, value)[0];
            let energyString = energy.toString();
            (0, _canvas.drawLevel)(ctx, blue, lw, x0, y, x1, y, font, th, value, energyString);
        });
        products.forEach(function(value) {
            let energy = (0, _util.get)(energies, value);
            console.log("energy=" + energy.toString());
            let energyRescaled = (0, _util.rescale)(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            console.log("energyRescaled=" + energyRescaled.toString());
            let x0 = (0, _util.get)(productsInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, _util.get)(productsOutXY, value)[0];
            let energyString = energy.toString();
            if (intProducts.has(value)) (0, _canvas.drawLevel)(ctx, orange, lw, x0, y, x1, y, font, th, value, energyString);
            else (0, _canvas.drawLevel)(ctx, green, lw, x0, y, x1, y, font, th, value, energyString);
        });
        tss.forEach(function(value) {
            let energy = (0, _util.get)(energies, value);
            console.log("energy=" + energy.toString());
            let energyRescaled = (0, _util.rescale)(energyMin.toNumber(), energyRange, 0, originalCanvasHeight, energy);
            console.log("energyRescaled=" + energyRescaled.toString());
            let x0 = (0, _util.get)(tssInXY, value)[0];
            let y = energyRescaled + lw;
            let x1 = (0, _util.get)(tssOutXY, value)[0];
            let energyString = energy.toString();
            (0, _canvas.drawLevel)(ctx, red, lw, x0, y, x1, y, font, th, value, energyString);
        });
    }
}

},{"./app":"dPB9w","./canvas":"hoJRr","./html":"aLPSL","./util":"f0Rnl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hoJRr":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["ftTiJ","dPB9w"], "dPB9w", "parcelRequire94c2")

//# sourceMappingURL=index.a817b1a4.js.map
