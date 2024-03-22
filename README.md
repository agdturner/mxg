# [MESMER XML GUI (MXG)](https://github.com/agdturner/mxg-pwa)

## Introduction

MESMER XML GUI (MXG) is to provide a Graphical User Interface (GUI) for visualising and generating [Master Equation Solver for Multi Energy-well Reactions (MESMER)](https://sourceforge.net/projects/mesmer) input/output [XML](https://en.wikipedia.org/wiki/XML) format data. MXG is been developed independently of other MESMER XML GUI development efforts (e.g. [http://www.mesmergui.cn/](http://www.mesmergui.cn/)). Development began in January 2024. A first phase of development is being funded and supported by [EPSRC](https://www.ukri.org/councils/epsrc/) and the [University of Leeds](https://www.leeds.ac.uk) and is ongoing until the end of April 2024. The aim is to have a community supported release and development cadence from then on...

Various alpha versions of MXG can be used online. MXG can also be installed onto devices as Progressive Web Application (PWA). The following online versions are served from GitHub Pages from where the respective PWA can be installed:
 - [Latest unstable version](https://agdturner.github.io/mxg-pwa/dist/main/)
 - [Version 0.5](https://agdturner.github.io/mxg-pwa/dist/0.5)
 - [Version 0.4](https://agdturner.github.io/mxg-pwa/dist/0.4)
 - [Version 0.3](https://agdturner.github.io/mxg-pwa/dist/0.3)
 - [Version 0.2](https://agdturner.github.io/mxg-pwa/dist/0.2)
 - [Version 0.1](https://agdturner.github.io/mxg-pwa/dist/0.1)

For details on use please see the [MXG User Guide Section](#User-Guide) 

A PWA is a type of application software delivered via the Web, built using common Web technologies including HTML, CSS, JavaScript, and WebAssembly. It is intended to work on any platform with a standards-compliant browser, including desktop and mobile devices. For more details about what a PWA is please see:
- [Wikipedia Progressive Web App Article](https://en.wikipedia.org/wiki/Progressive_web_app)
- [https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

PWA installation varies by Web browser/device:
- [General instructions](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing)
- Specific instructions for [Chrome](https://support.google.com/chrome/answer/9658361), [Firefox](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing), [Edge](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/ux)).

MXG is built, packaged and deployed using [Node](https://nodejs.org/) and [Parcel](https://parceljs.org/). The main source code is [TypeScript](https://www.typescriptlang.org/). There are also [JSON](https://www.json.org/json-en.html) configuration files and a [Web Worker](https://en.wikipedia.org/wiki/Web_worker) [JavaScript](https://en.wikipedia.org/wiki/JavaScript) file.


## Contributing
- Community contribution will be facilitated in future, but for the time being developing and testing is being done by a closed group...


## User Guide
The only users currently supported are those involved in alpha testing. A community release with ongoing support from the MESMER community is tentatively scheduled for the end of April 2024. The alpha versions are not recommended for general use, but please feel free to have a play.

### User Testing
- Please ensure you are testing the right version.
  - Please uninstall any installed PWA before installing a different version to test.
    -  Uninstalling a PWA can be done with the PWA running, then via the three stacked dots menu.
- Please report issues with documentation/installation/use to help develop something better...

### Version 0.6
- This builds on Version 0.5
- Buttons text is used to provide information to users about how to use the GUI rather than leaving it for users to be guided by intuition. It is hoped that this makes the program more user friendly and accessible.

### Version 0.5
- This builds on Version 0.4
- For the example [Acetyl_O2_associationEx.xml](https://agdturner.github.io/mxg-pwa/data/examples/AcetylO2/Acetyl_O2_associationEx.xml) file:
  - There were no major new features in this release. There was a major refactoring underway and the release was used to discuss user interface design.

### Version 0.4
- This builds on Version 0.3
- For the example [Acetyl_O2_associationEx.xml](https://agdturner.github.io/mxg-pwa/data/examples/AcetylO2/Acetyl_O2_associationEx.xml) file:
  - This was supposed to present all control options, but tere are issues.
  - If the users edits a me:ZPE property, the reaction well diagram should update.

### Version 0.3
- This builds on Version 0.2
- For the example [Acetyl_O2_associationEx.xml](https://agdturner.github.io/mxg-pwa/data/examples/AcetylO2/Acetyl_O2_associationEx.xml) file:
  - This is supposed to reveal all details and make these editable.

### Version 0.2
- This builds on Version 0.1
- For the example [Acetyl_O2_associationEx.xml](https://agdturner.github.io/mxg-pwa/data/examples/AcetylO2/Acetyl_O2_associationEx.xml) file:
  - The rotation constants and vibration frequencies can now also be edited.
  - Rather than present the data for molecules in a single table, the details are collapsible and editable via buttons.
  - Additional tables present data for: Conditions, Model Parameters, and Control.
- It had been the intention to:
1. Ensure additional details are exposed and made editable for molecules.
2. Make all details editable for all tables.
- Progress has been made workign towards these additional features, but this is not included in this version...

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
  - This should download a new XML file to the downloads location on the user device.
- Notes
  - Any saved XML file should be very similar to the input XML file, but there are some differences:
    - Comments are not preserved.
    - Additonal spaces are removed.
    - Numbers may format differently, for example `2.25E16` appears as `22500000000000000`.

## Development RoadMap
- Development is currently in an alpha phase...
- Beta testing will follow...
- Version 0.3 Sprint (focussing on priorities to 2024-03-21)
  - Make all details of [Acetyl_O2_associationEx.xml](https://agdturner.github.io/mxg-pwa/data/examples/AcetylO2/Acetyl_O2_associationEx.xml) editable
  - Test loading of other XML files.
  - Allow users to add molecules and reactions from scratch and use an existing XML file as a template.
- Version 0.2 Sprint (focussing on priorities to 2024-03-07)
  - Version 0.2 builds on Version 0.1
  - Prioritised enhancements:
1. Display all [Acetyl_O2_associationEx.xml](https://agdturner.github.io/mxg-pwa/data/examples/AcetylO2/Acetyl_O2_associationEx.xml) details in HTML
  - Include details not exposed already in Molecules and Reactions tables.
    - No need to include atoms or bonds for molecules.
  - Create tables for: Conditions, Model Parameters, and Control.
2. Make all details editable.

 
## Developer Guide
- This section contains instructions for setting up a development environment, and compiling and deploying new versions. There are also some trouble shooting hints.
- [Microsoft Visual Studio Code](https://code.visualstudio.com/) with the [Copilot Extension](https://code.visualstudio.com/docs/copilot/overview) provides a helpful code development environment, but the choice is up to you.


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
After adding, committing and pushing `dist/0.2`, the online version and PWA were automatically (but perhaps not instantaneously) became available at:
[https://agdturner.github.io/mxg-pwa/dist/0.2](https://agdturner.github.io/mxg-pwa/dist/0.2)

### Trouble Shooting Guide
- Try deleting the `node_modules` directory and the `.parcel-cache` and building and launching again.
  - This will recreate these things which are built and puposefully not contained in the repository.
    - They should be built/installed for your particular set up... 
- A machine reboot may help...
- If issues persist, please do not struggle and communicate with the main developer...
  - The set up for users and developers is intended to be a simple process with a minimal set of steps...
