# [MESMER XML GUI (MXG)](https://github.com/%GITHUB_USER%/mxg)

## Introduction

MESMER XML GUI (MXG) is a Graphical User Interface (GUI) for visualising and generating [Master Equation Solver for Multi Energy-well Reactions (MESMER)](https://github.com/MESMER-kinetics/MESMER-code) [XML](https://en.wikipedia.org/wiki/XML) format data.

[EPSRC](https://www.ukri.org/councils/epsrc/) funded MXG development in 2024.

MXG can be used via GitHub Pages and installed onto devices as a Progressive Web Application (PWA). The latest unstable release is served from GitHub Pages from where the respective PWA can be installed:
 - [Version %VERSION%](https://%GITHUB_USER%.github.io/mxg/dist/%VERSION%/)

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
- MXG aims to support MESMER users in preparing MESMER input data, and converting MESMER output data into useful forms.
- Any XML that is created by MXG should be checked.
- There is currently no undo button.
- Loading a MESMER file will lose any changes not yet saved.
- There is much about MGX that can be improved. Please test it, report and comment on issues to help with development.
- To report an issue you will need a GitHub account. [Please follow this link to check for issues and report them.](https://github.com/MESMER-kinetics/mxg/issues)  

There is a [Developer Guide](#developer-guide) below with set up instructions. To contribute, please use the following workflow:
1. Fork the repository.
2. Create and comment on an issue to let others know you are working on it.
3. Test changes to your fork.
4. Submit a pull request linking to the issue.


## Development RoadMap
- Version 1.0
  - Version 0.15 and onwards are beta test versions for Version 1.0.
  - The developer community aims to address and consider what to do about all reported issues that are faults.
  - Fixed faults will result in a new beta version for testing.
  - There is no timeline for completing testing and releasing Version 1.0.
- Submitted issues that are feature requests rather than faults will help form the development roadmaps for future versions.

## Developer Guide
- This section is a guide to compiling and deploying a new versions of MXG, and provides some trouble shooting hints.
- [Microsoft Visual Studio Code](https://code.visualstudio.com/) is suggested as a development environment.

### Set Up
- Install the latest LTS release of [Node](https://nodejs.org/)
  - Current development is tested with Node 22.10.1
- Fork and clone this repository.
- cd into the repository
- Install dependencies:
`npm install`
  - This can take a few minutes.

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

### Releasing a new version
1. Update the version number in [.env](../.env).
2. Configure to use the new version number (this updates all the build files where the version number is used):
   `npm run configure`
3. Build the new version:
   `npm run build`
4. Run the new version to test:
   `npm run start`
6. Commit changes.
7. Create pull request.
8. Merge pull request.
9. Test installation as a PWA.

### Trouble Shooting Guide
1. Open the Web browser developer console and check for error and warning messages.
2. If the Service Worker is not registering, delete the `.parcel-cache` directory, and re-launch using `npm run start`.
3. Try deleting the cache of the Web browser.
4. Try deleting the `node_modules` directory, re-install dependencies `npm install`, re-build `npm run build`, and re-launch `npm run start`.
5. If the problem persists, please report it to the community as an issue.