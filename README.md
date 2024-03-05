# MESMER XML GUI (MXG) Progressive Web App 

[MESMER](https://sourceforge.net/projects/mesmer) is a Master Equation Solver for Multi Energy-well Reactions that inputs and outputs data in an XML format. MXG provides a Graphical User Interface (GUI) for visualising and generating MESMER XML. MXG has been developed independently of another MESMER XML GUI: http://www.mesmergui.cn/ 

MXG can be used online served from GitHub Pages or dowloaded and installed onto your device as a Progressive Web Application (PWA):
 - [Version 0.1](https://agdturner.github.io/mxg-pwa/dist/0.1)
   - See [GUI User Instructions](#GUI_User_Instructions) 
 - [Latest unstable version](https://agdturner.github.io/mxg-pwa/dist/main/)

A PWA is a type of application software delivered via the Web, built using common Web technologies including HTML, CSS, JavaScript, and WebAssembly. It is intended to work on any platform with a standards-compliant browser, including desktop and mobile devices. For more details about what a PWA is please see:
- https://en.wikipedia.org/wiki/Progressive_web_app
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app

How to download and install a PWA varies by Web browser. Here are links to instructions for some major Web browsers:
- [Chrome](https://support.google.com/chrome/answer/9658361)
- [Firefox](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing)
- [Edge](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/ux)

The online version and PWA are built and deployed. The main source code is [TypeScript](https://www.typescriptlang.org/). There are also [JSON](https://www.json.org/json-en.html) configuration files and a [Web Worker](https://en.wikipedia.org/wiki/Web_worker) [JavaScript](https://en.wikipedia.org/wiki/JavaScript) file. The source files are built and packaged using [Node](https://nodejs.org/) and [Parcel](https://parceljs.org/).  


## GUI User Instructions

### Version 0.1
- MXG 0.1 starts with a single button called `load`.
- The user is expected to:
  1. Action `load`:
    - A File Input Dialogue should appear and a `save` button should appear.
    - The user should locate and select [Acetyl_O2_associationEx.xml](https://agdturner.github.io/mxg-pwa/data/examples/AcetylO2/Acetyl_O2_associationEx.xml).
    - A portrayal of the XML should appear.
      - This is similar to the portrayal provided by the XML Style Layer Transform (XSLT) provided with MESMER. 
  2. Change the energy of one or more Molecules using the Inputs in the Molecules table section.
    - Only the values in the table will change, the changes will not be reflected in the reactions diagram.  
  3. Action the `save` button.
    - This should download a new XML file to the usual place where files are downloaded on the users device.


## Development RoadMap
- Development is currently in an alpha release phase.
- Alpha testing with version 0.1 is in process.
- Alpha testing will continue throughout March 2024.
- Beta testing will follow...
- Release candidates and a first release is planned for the end of April 2024.


## Alpha Testing
- Please make sure you are testing the latest alpha release.
  - If you are testing with an installed PWA, please ensure you have uninstalled any previous version and have the correct version for testing installed.
    -  Uninstalling the PWA can be done with the PWA running via the menu (three dots).
- Please report any issues encountered using agreed protocols.


## Contribution
- Currently, contributions are only welome from those involved directly in the ongoing MXG development project that started in January 2024.


## Developer
- This section contains instructions for getting set up with a development environment and provides some advice about troubleshooting.

### Set Up
- The recommended developer environment is the latest [Microsoft Visual Studio Code](https://code.visualstudio.com/) (VSCode) and the latest LTS release of [Node](https://nodejs.org/).
- Please set this up on your platform of choice.


-   and Parcel based on ##
Microsoft Visual Studio Code with the Copilot extension has been used to develop the code which is mostly TypeScript.

Node and Parcel2 are used to bundle everything together.

To test things out, then please fork this repository. To get your own GitHub Pages version and PWA deployment working, then ensure that GitHub Pages is enabled for your forked repository and this should be available via:
`https://<github_username>.github.io/<forked_repository_name>/dist/main/` where `<github_username>` is your username and `<forked_repository_name>` is the name of your forked repository.

### Dependencies:
- Node > 20.11.0

# Installation
1. Clone the repository
2. cd into the repository
3. Install dependencies:
`npm install`

### Build
- run:
`parcel build`

### Launch
- run:
`npx parcel src/index.html`
- By default this will run on port 1234. To use a different port for example 2345 run: `npx parcel src/index.html -p 2345`

Once launched, then open http://localhost:1234/ to test the GUI (change the url to match a different port if one was specified).

### Update and redeploy
- Changes need committing and pushing to the repository for deployment.
- To deploy a branch called `branch1`, edit the `package.json` file and change:
```
  "targets": {
    "main": {
      "distDir": "./dist",
      "publicUrl": "/pwa-parcel-test/dist/main/"
    }
  },
```
To:
```
  "targets": {
    "branch1": {
      "distDir": "./dist",
      "publicUrl": "/pwa-parcel-test/dist/branch1/"
    }
  },
```
This new branch should deploy to:
`https://<github_username>.github.io/<forked_repository_name>/dist/branch1/` where `<github_username>` is your username and `<forked_repository_name>` is the name of your forked repository.
