# MESMER XML GUI (MXG) Progressive Web App 

MESMER is a Master Equation Solver for Multi Energy-well Reactions. It inputs and outputs data in an XML format. This is a Graphical User Interface development for visualising and generating new XML for MESMER.

An online version from where a Progressive Web App (PWA) can be dowloaded for installation on your device:
https://agdturner.github.io/mxg-pwa/dist/main/

A PWA is a type of application software delivered via the Web, built using common Web technologies including HTML, CSS, JavaScript, and WebAssembly. It is intended to work on any platform with a standards-compliant browser, including desktop and mobile devices. For more details see:
- https://en.wikipedia.org/wiki/Progressive_web_app
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app

Downloading and installing a PWA varies by Web browser. Here are links to instructions for some major Web browsers:
- Chrome: https://support.google.com/chrome/answer/9658361?hl=en-GB&co=GENIE.Platform%3DDesktop
- Firefox: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing
- Edge: https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/ux

Whilst this development is versioned, it is alpha release and is not yet released for user testing or considered production ready.

A RoadMap for development is being produced. The development will go through a beta testing phase before there is a release candidate which is expected to be made in April 2024.

To use the GUI there is a button called `load`. When actioned, a file input is requested. What is expected is that the user locates an MESMER XML file and loads it. Upon selecting the file, the interface should change to present details contained in the loaded XML.

If you are using the PWA and it isn't working, you can try uninstalling and installing it again to see if a more recent version fixes things for you. In due course there will be more stable releases and the MESMER team supporting users will be able to respond to issues posted in the usual way.


## Instructions for developers/contributors

Currently contributions only from those involved directly in the MXG development project are welcome. Following release of version 1 contributions from the community will be welcomed in the usual way and more detailed guidance on how best to contribute will be released. 

Microsoft Visual Studio Code with the Copilot extension has been used to develop the code which is mostly TypeScript.

Node and Parcel2 are used to bundle everything together.

## Dependencies:
- Node > 20.11.0

# Installation
1. Clone the repository
2. cd into the repository
3. Install dependencies:
`npm install`

# Build
- run:
`parcel build`

# Launch
- run:
`npx parcel src/index.html`
- By default this will run on port 1234. To use a different port for example 2345 run: `npx parcel src/index.html -p 2345`

Once launched, then open http://localhost:1234/ to test the GUI (change the url to match a different port if one was specified).

# Making changes and redeployment:
- Changes need committing and pushing to the repository for deployment.
- To deploy a branch called `branch1` to `https://agdturner.github.io/pwa-parcel-test/dist/branch1/`, edit the package.json file and change:
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
