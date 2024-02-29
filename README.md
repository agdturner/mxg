# MESMER XML GUI Progressive Web App

A repository used to develop the MESMER XML GUI Progressive Web App (MXG-PWA).

A Progressive Web App (PWA) is a type of application software delivered through the web, built using common web technologies including HTML, CSS, JavaScript, and WebAssembly. It is intended to work on any platform with a standards-compliant browser, including desktop and mobile devices. For more details see:
- https://en.wikipedia.org/wiki/Progressive_web_app
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app

The PWA is packaged with Parcel2 and made available via:
https://agdturner.github.io/mxg-pwa/dist/main/

## Dependencies:
- Node > 20.11.0
 - Parcel > 2.11.0

# Installation
1. Clone the repository
2. cd into the repository
3. Run: npm install

# Build
- run:
`parcel build`

# Launch
- run:
`npx parcel src/index.html`
- By default this will run on port 1234. To use a different port for example 2345 run: `npx parcel src/index.html` -p 2345 Once launched, then open http://localhost:1234/ changing the url to match a different port if specified.

# Developer set up
1. Install Visual Studio Code
2. Install Node
3. Download this repository
4. cd into the repository
5. Install dependencies:
`npm install`

# Developer changes/redeployment:
- Changes need committing and pushing to the repository for deployment.
- To deploy a branch called branch1 to https://agdturner.github.io/pwa-parcel-test/dist/branch1/ edit package.json and change:
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
