# MESMER XML GUI (MXG) Progressive Web App 

MESMER is a Master Equation Solver for Multi Energy-well Reactions. It inputs and outputs data in an XML format. This is a Graphical User Interface development for visualising and generating new XML for MESMER.

An online version from where a Progressive Web App (PWA) can be dowloaded for installation on your device:
https://agdturner.github.io/mxg-pwa/dist/main/

A PWA is a type of application software delivered via the Web, built using common Web technologies including HTML, CSS, JavaScript, and WebAssembly. It is intended to work on any platform with a standards-compliant browser, including desktop and mobile devices. For more details see:
- https://en.wikipedia.org/wiki/Progressive_web_app
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app

Downloading and installing a PWA varies by Web browser. Here are links to instructions for some major Web browsers:
- Chrome: https://support.google.com/chrome/answer/9658361
- Firefox: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing
- Edge: https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/ux

Whilst this development is versioned, it is alpha release and is not yet released for user testing or considered production ready.

A RoadMap for development is being produced. The development will go through a beta testing phase before there is a release candidate which is expected to be made in April 2024.

Currently, the GUI starts with a single button called `load`. When actioned, a `save` button should appear and a file input is requested. What is expected is that the user locates an MESMER XML file and loads it. Upon selecting the file, the interface should change to present details contained in the loaded XML. In future releases there may be a way to compile a MESMER XML file from scratch. Some details presented can be modified by the user. Actioning the `save` button will download a new XML file for the user and will be stored in the usual place where files are downloaded on the users device. 

If alpha testers find an issue, then please report this using the agreed channels for communication. The version at the following URL is always the latest version:
https://agdturner.github.io/mxg-pwa/dist/main/

If using the installed PWA, you can update to the latest version by uninstalling and reinstalling the PWA. Uninstalling can be done with the PWA running via the menu (three dots).

It is expected that in due course, there will be more stable releases, and the MESMER team supporting users will be able to respond to issues posted in the usual way.


## Instructions for developers/contributors

Currently, contributions are only welome from those involved directly in the onlgoing MXG development project that started in January 2024. Following release of Version 1 contributions from the community will be welcomed in the usual way and more detailed guidance on how best to contribute will be released.

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
