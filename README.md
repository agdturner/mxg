# [MESMER XML GUI (MXG)](https://github.com/mesmer-kinetics/mxg)

## Introduction

MESMER XML GUI (MXG) is a Graphical User Interface (GUI) for visualising and generating [Master Equation Solver for Multi Energy-well Reactions (MESMER)](https://github.com/MESMER-kinetics/MESMER-code) [XML](https://en.wikipedia.org/wiki/XML) format data. MXG is been developed independently of other MESMER XML GUI development efforts (e.g. [http://www.mesmergui.cn/](http://www.mesmergui.cn/)). [EPSRC](https://www.ukri.org/councils/epsrc/) funded development from January 2024 to April 2024.

MXG can be used via GitHub Pages and installed onto devices as a Progressive Web Application (PWA). The latest unstable release is served from GitHub Pages from where the respective PWA can be installed:
 - [Latest unstable version](https://mesmer-kinetics.github.io/mxg/dist/main/)

A PWA is a type of application software delivered via the Web and built using common Web technologies including HTML, CSS, JavaScript, and WebAssembly. It should work on any platform with a standards-compliant browser. For more details about what a PWA is please see:
- [Wikipedia Progressive Web App Article](https://en.wikipedia.org/wiki/Progressive_web_app)
- [https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

PWA installation varies by Web browser/device:
- [General instructions](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing)
- Specific instructions for [Chrome](https://support.google.com/chrome/answer/9658361), [Firefox](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing), [Edge](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/ux), [Safari](https://support.apple.com/en-gb/104996).

MXG is built, packaged and deployed using [Node](https://nodejs.org/) and [Parcel](https://parceljs.org/). The main source code is [TypeScript](https://www.typescriptlang.org/). There are also [JSON](https://www.json.org/json-en.html) configuration files and a [Web Worker](https://en.wikipedia.org/wiki/Web_worker) [JavaScript](https://en.wikipedia.org/wiki/JavaScript) file.

MXG uses 3DMol.js under a BSD-3-Clause licence to visualise molecules with coordinates. For details of 3DMol.js please see the GitHub repository: [https://github.com/3dmol/3Dmol.js](https://github.com/3dmol/3Dmol.js). If you use the 3DMol.js visualisations, please cite: Nicholas Rego and David Koes 3Dmol.js: molecular visualization with WebGL Bioinformatics (2015) 31 (8): 1322-1324 doi:10.1093/bioinformatics/btu829.

MXG uses Big.js under an MIT licence to handle decimal numbers. For details of Big.js please see the GitHub repository: [https://mikemcl.github.io/big.js/](https://mikemcl.github.io/big.js/).


## User/Contributor Guide
MXG is being developed to support research and save MESMER users time in creating MESMER XML and in visualising MESMER data and compiling information into reports and other data sets.
Any XML that is created should be checked.
There is currently no undo button.
Loading a MESMER file will lose any changes not yet saved.
There is much about MGX that can be improved. Please test and report issues and comment on issues to help guide development.

There is a Developer Guide below with set up instructions. To contribute, please use the following workflow:
1. Fork the repository.
2. Create an issue or comment on an issue to let others know you are working on that.
3. Make changes to your fork.
4. Submit a pull request linking to the issue.


## Development RoadMap
- Version 1.0
  - Remove button for molecules (In Version 0.11 molecules can be added, but not removed).
  - Support selection of a molecule property to add (In Version 0.11 only loaded molecule properties can be changed. What is wanted is like what has been implemented for Control CalcMethod).
  - Support the specification (addition and deletion) of reactions.


## Developer Guide
- This section contains instructions for setting up a development environment, and compiling and deploying new versions and provides some trouble shooting hints.
- [Microsoft Visual Studio Code](https://code.visualstudio.com/) is suggested as a development environment, but other development environments are available...

### Set Up
- Install the latest LTS release of [Node](https://nodejs.org/)
  - Current development is tested with Node 20.11.1
- Fork/clone this repository.
- cd into the repository
- Install dependencies:
`npm install`
  - Some dependencies depend on other packages and the installation may tak a few minutes.
    - The install command should install all the dependencies.

### Compile
- To compile (transpile using the installed [typescript Node Package](https://www.npmjs.com/package/typescript)) run:
`npm run compile`

### Build/Package
- To build (using the installed [parcel Node Package](https://www.npmjs.com/package/parcel)) run:
`npm run build`

### Launch
- To launch (using the installed [npx Node Package](https://www.npmjs.com/package/npx)) run:
`npm run start`
- A Web server should run on the local host on port 3460:
[localhost:3460/](http://localhost:3460/)
- To stop the Web server, kill the running process.

### Trouble Shooting Guide
1. Use the developer console in the Web browser and check for error and warning messages.
2. If the Service Worker is not registering, try deleting the `.parcel-cache` and launching again.
3. In some circumstances it may help to delete the `node_modules` directory install the node packages again, the build and launch.
4. If the issue persists, please look at any open issues and if you find one that is related, please provide further feedback. If there is no open issue that is the same, please report a new issue...
