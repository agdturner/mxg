# [MESMER XML GUI (MXG)](https://github.com/mesmer-kinetics/mxg)

## Introduction

MESMER XML GUI (MXG) is a Graphical User Interface (GUI) for visualising and generating [Master Equation Solver for Multi Energy-well Reactions (MESMER)](https://sourceforge.net/projects/mesmer) [XML](https://en.wikipedia.org/wiki/XML) format data. MXG is been developed independently of other MESMER XML GUI development efforts (e.g. [http://www.mesmergui.cn/](http://www.mesmergui.cn/)). [EPSRC](https://www.ukri.org/councils/epsrc/) funded development from January 2024 until April 2024.

MXG can be used online and installed onto devices as a Progressive Web Application (PWA). The latest unstable release and alpha version are served from GitHub Pages from where the respective PWA can be installed:
 - [Latest unstable version](https://mesmer-kinetics.github.io/mxg/dist/main/)
 - [Version 0.11](https://mesmer-kinetics.github.io/mxg/dist/0.11)

A PWA is a type of application software delivered via the Web and built using common Web technologies including HTML, CSS, JavaScript, and WebAssembly. It should work on any platform with a standards-compliant browser. For more details about what a PWA is please see:
- [Wikipedia Progressive Web App Article](https://en.wikipedia.org/wiki/Progressive_web_app)
- [https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

PWA installation varies by Web browser/device:
- [General instructions](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing)
- Specific instructions for [Chrome](https://support.google.com/chrome/answer/9658361), [Firefox](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing), [Edge](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/ux), [Safari](https://support.apple.com/en-gb/104996).

MXG is built, packaged and deployed using [Node](https://nodejs.org/) and [Parcel](https://parceljs.org/). The main source code is [TypeScript](https://www.typescriptlang.org/). There are also [JSON](https://www.json.org/json-en.html) configuration files and a [Web Worker](https://en.wikipedia.org/wiki/Web_worker) [JavaScript](https://en.wikipedia.org/wiki/JavaScript) file.

The 3D rendering of any molecules with coordinates is provded by 3DMol.js which incorporates code from GLmol, Three.js, and jQuery and is licensed under a BSD-3-Clause license. For more details on 3DMol.js please visit the GitHub repository: [https://github.com/3dmol/3Dmol.js](https://github.com/3dmol/3Dmol.js)

## Contributing
- Community contribution will be facilitated in future, but for the time being, development is being done by a closed group...


## User Guide
The alpha versions are not recommended for general use, but please feel free to have a play. A community release supported by the MESMER community is tentatively scheduled for the end of April 2024. 

### User Testing
- Please ensure you are testing the right version.
  - Please uninstall any installed PWA before installing a different version or to test the PWA using a different Web browser.
    - Uninstalling a PWA can be done with the PWA running, then via the three stacked dots menu.
- Please report issues with documentation/installation/use...

## Development RoadMap
- Development is currently in an alpha phase...
- Beta testing will follow...

 
## Developer Guide
- This section contains instructions for setting up a development environment, and compiling and deploying new versions. There are also some trouble shooting hints.
- [Microsoft Visual Studio Code](https://code.visualstudio.com/) with the [Copilot Extension](https://code.visualstudio.com/docs/copilot/overview) has been used by the main developer.


### Set Up
- Install the latest LTS release of [Node](https://nodejs.org/)
  - Current development is tested with Node 20.11.1
- Fork/clone this repository.
- cd into the repository
- Install dependencies:
`npm install`
  - The main [Node](https://nodejs.org/) dependencies are:
    - [@parcel/packager-raw-url](https://npm.io/package/@parcel/packager-raw-url) ^2.11.0
      - A Parcel plugin that allows for importing assets as URLs without hashing the filename. It's useful to ensure the original filenames of certain assets are not changed in bundling.
    - ["@parcel/transformer-webmanifest](https://npm.io/package/@parcel/transformer-webmanifest) ^2.11.0
      - A Parcel plugin that processes `.webmanifest` files used in Progressive Web Apps (PWAs) for specifying how the app should behave when installed on a user's device. 
    - [parcel](https://www.npmjs.com/package/parcel) ^2.11.0
      - An Web application bundler that packages source files into one or more bundles that can be more efficinetly loaded by a Web browser.
    - [typescript](https://www.npmjs.com/package/typescript) ^5.3.3
      - A statically typed superset of JavaScript that compiles to plain JavaScript
  - Some main dependencies depend on other packages.
    - The install command should install all the dependencies.
  - The versions of dependencies installed by default will depend on the available versions at time of installation to allow for security updates and bug fixes.
    - This may result in varying builds and behaviours...

### Forks
- To get GitHub Pages and PWA deployment working: ensure that GitHub Pages is enabled for the fork. With GitHub Pages enabled, the Web application and PWA should be available from:
  - `https://<github_username or github_organisation_name>.github.io/<forked_repository_name>/dist/main/` where `<github_username or github_organisation_name>` is the GitHub username or GitHub organisation name that owns the repository, and `<forked_repository_name>` is the name of the forked repository.

### Compile
- To compile (transpile using the installed [typescript Node Package](https://www.npmjs.com/package/typescript)) run:
`npm run compile`

### Build/Package
- To build (using the installed [parcel Node Package](https://www.npmjs.com/package/parcel)) run:
`npm run build`

### Launch
- To launch (using the installed [npx Node Package](https://www.npmjs.com/package/npx)) run:
`npm run start`
- A Web server should run on the local host on port 3458:
[localhost:3458/](http://localhost:3458/)
- To stop the Web server, kill the running process.

### Trouble Shooting Guide
1. Try deleting the `.parcel-cache` and launching again.
2. Try deleting the `node_modules` directory and building again, then try launching and if this fails repeat 1.
