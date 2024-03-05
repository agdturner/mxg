# MESMER XML GUI (MXG)

## Introduction

MESMER XML GUI (MXG) provides a Graphical User Interface (GUI) for visualising and generating [Master Equation Solver for Multi Energy-well Reactions (MESEMR)](https://sourceforge.net/projects/mesmer) [XML](https://en.wikipedia.org/wiki/XML) input and output data. MXG has been developed independently of other MESMER XML GUI development efforts (e.g. [http://www.mesmergui.cn/](http://www.mesmergui.cn/)). 

MXG can be used online and installed onto your devices as a Progressive Web Application (PWA). The following online versions are served from GitHub Pages and from these pages the respective PWA can be installed:
 - [Version 0.1](https://agdturner.github.io/mxg-pwa/dist/0.1)
 - [Latest unstable version](https://agdturner.github.io/mxg-pwa/dist/main/)

[MXG User Guide](#User-Guide) 

A PWA is a type of application software delivered via the Web, built using common Web technologies including HTML, CSS, JavaScript, and WebAssembly. It is intended to work on any platform with a standards-compliant browser, including desktop and mobile devices. For more details about what a PWA is please see:
- https://en.wikipedia.org/wiki/Progressive_web_app
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app

PWA installation varies by Web browser (instructions: [Chrome](https://support.google.com/chrome/answer/9658361), [Firefox](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing), [Edge](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/ux)).

MXG is built, packaged and deployed using [Node](https://nodejs.org/) and [Parcel](https://parceljs.org/). The main source code is [TypeScript](https://www.typescriptlang.org/). There are also [JSON](https://www.json.org/json-en.html) configuration files and a [Web Worker](https://en.wikipedia.org/wiki/Web_worker) [JavaScript](https://en.wikipedia.org/wiki/JavaScript) file.

MXG development began at the end of January 2024. A community release is coming soon and tentatively scheduled for the end of April 2024...


## Contributing
- Community contribution will be facilitated in future, but for the time being development and testing contributions are only welome from those involved directly in the MXG development project.


## User Guide

### User Testing
- Please ensure you are testing the right version.
  - Please uninstall any installed PWA before installing a different version to test.
    -  Uninstalling a PWA can be done with the PWA running via the menu (three dots).
- Please report issues with documentation/installation/use to help develop something better...

### Version 0.1
- A single `load` button should appear on the interface.
- The user is expected to:
  1. Action `load`:
    - A File Input Dialogue should appear and a `save` button should appear.
    - The user should locate and select [Acetyl_O2_associationEx.xml](https://agdturner.github.io/mxg-pwa/data/examples/AcetylO2/Acetyl_O2_associationEx.xml).
    - A portrayal of the XML should appear.
      - This is similar to the portrayal provided by Extensible Stylesheet Language Transformation (XSLT) files that come with the main MESMER software. 
  2. Change the energy of one or more Molecules using the Inputs in the Molecules table section.
    - Only the values in the table will change, the changes will not be reflected in the reactions diagram.  
  3. Action the `save` button.
    - This should download a new XML file to the usual place where files are downloaded on the users device.
- The saved XML file should be very similar to the input XML file, but there are some differences:
  - Comments are not preserved.
  - Additonal spaces are removed.
  - Numbers may format differently, for example `2.25E16` appears as `22500000000000000`.


## Development RoadMap
- Development is currently in an alpha phase...
- Beta testing will follow...
- Version 0.2 Sprint (focussing on priorities to 2024-03-07)
  - Version 0.2 will build on Version 0.1
  - Prioritised enhancements:
    1. Display all [Acetyl_O2_associationEx.xml](https://agdturner.github.io/mxg-pwa/data/examples/AcetylO2/Acetyl_O2_associationEx.xml) details in HTML
      - Include details not exposed already in Molecules and Reactions tables.
        - No need to include atoms or bonds for molecules.
      - Create tables for: Conditions, Model Parameters, and Control.
    2. Make all details editable.
- Version 0.3 Sprint (due by 2024-03-21)
  - Test loading of other XML files.
  - Allow users to add molecules and reactions from scratch and use an existing XML file as a template.

 
## Developer Guide
- This section contains instructions for getting set up with a development environment and compiling and deploying new versions.
- [Microsoft Visual Studio Code](https://code.visualstudio.com/) with the [Copilot Extension](https://code.visualstudio.com/docs/copilot/overview) provides a helpful code development environment, but the choice is up to you.


### Set Up
- Install the latest LTS release of [Node](https://nodejs.org/)
  - Current development is tested with Node 20.11.1
- Clone this repository.
- cd into the repository
- Install dependencies:
`npm install`
  - The main Node dependencies are:
    - [@parcel/packager-raw-url](https://npm.io/package/@parcel/packager-raw-url) ^2.11.0
      - A Parcel plugin that allows for importing assets as URLs without hashing the filename. It's useful to ensure the original filenames of certain assets are not changed in bundling.
    - ["@parcel/transformer-webmanifest](https://npm.io/package/@parcel/transformer-webmanifest) ^2.11.0
      - A Parcel plugin that processes `.webmanifest` files used in Progressive Web Apps (PWAs) for specifying how the app should behave when installed on a user's device. 
    - [parcel](https://www.npmjs.com/package/parcel) ^2.11.0
      - An Web application bundler that packages source files into one or more bundles that can be more efficinetly loaded by a Web browser.
    - [typescript](https://www.npmjs.com/package/typescript) ^5.3.3
      - A statically typed superset of JavaScript that compiles to plain JavaScript
  - These depend on other packages, and the entire stack of dependencies is installed.
    - The versions of dependencies installed by default depends on the available versions at time of installation.
      - Rather than specify a very specific version, a version greater than a specified version is specified to allow for (security and bug fix) updates.
        - This is helpful, but may result in varying builds and behaviours!     

### Forks
- To get GitHub Pages and PWA deployment working: ensure that GitHub Pages is enabled for your fork. Then the Web application and PWA should be available from:
  - `https://<github_username>.github.io/<forked_repository_name>/dist/main/` where `<github_username>` is your username and `<forked_repository_name>` is the name of your forked repository.

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

### Deploy
- To deploy over the current version push changes to the GitHub repository.
- To deploy to a new version, update the `package.json` file and change the version target. For example, to change from releasing version 0.1 to 0.2 the following was changed:
```
    "0.1": {
      "context": "browser",
      "includeNodeModules": true,
      "sourceMap": true,
      "engines": {
        "browsers": [
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Safari versions",
          "last 2 Edge versions"
        ]
      },
      "distDir": "dist/0.1",
      "publicUrl": "/mxg-pwa/dist/0.1"
    }
```
To:
```
    "0.2": {
      "context": "browser",
      "includeNodeModules": true,
      "sourceMap": true,
      "engines": {
        "browsers": [
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Safari versions",
          "last 2 Edge versions"
        ]
      },
      "distDir": "dist/0.2",
      "publicUrl": "/mxg-pwa/dist/0.2"
    }
```
After adding, committing and pushing `dist/0.2`, the online version and PWA were automatically (but perhaps not instantaneously) made available at:
[https://agdturner.github.io/mxg-pwa/dist/0.2](https://agdturner.github.io/mxg-pwa/dist/0.2)


## Acknowledgements
- This work is being funded and supported by [EPSRC](https://www.ukri.org/councils/epsrc/) and the [University of Leeds](https://www.leeds.ac.uk).
