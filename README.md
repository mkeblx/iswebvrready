# Is WebVR Ready Yet?

[![devDependency Status](https://david-dm.org/mozvr/iswebvrready/dev-status.svg)](https://david-dm.org/mozvr/iswebvrready#info=devDependencies)

Tracks the features of WebVR supported in browsers.
__[View the site](https://iswebvrready.org/)__.


## Run locally

To install, run the following in the root of your cloned copy of the repo:

```sh
npm install
```

To serve the site on [`http://localhost:8000/`](http://localhost:8000/):

```sh
npm start
```

To build the site:

```sh
npm run build
```

To deploy the site to [production](https://iswebvrready.org/):

```sh
npm run deploy
```


## Contribute

To update data, edit [`data.json`](src/data.json), which is in this format:

```js

  // ...

  "features": [

      // ...

      {
        "name", "Feature name or <code>interface.whatever</code>",
        "description", "Brief feature details, html <strong>allowed</strong>",
        "chrome": {
          // 1 = supported
          // 0.5 = supported with caveats (eg flags, nightlies, special builds)
          // 0 = not supported
          "supported": 1
          // (optional) browser version
          "minVersion": 35,
          // (optional) alternate icon, currently supports:
          // "chrome-canary"
          // "firefox-nightly"
          // "webkit"
          // "opera-developer"
          // "internet-explorer-dev"
          "icon": "canary",
          // (optional) details, cavats, links to tickets, flags etc
          "details": [
            "Requires <a href=\"https://www.google.co.uk/intl/en/chrome/browser/canary.html\">Chrome Canary</a>"
          ]
        },
        "firefox": {},
        "opera": {},
        "safari": {},
        "internet-explorer": {},
        // (optional) details that don't apply to a single browser
        "details": [
          "<strong>Chrome & Firefox</strong>: sitting in a tree K-I-S-S-I-N-G"
        ]
      },

      // ...

  ]
```


## Credits

This is a shameless fork of [Jake Archibald](https://github.com/jakearchibald/)'s awesome [isserviceworkerready](https://github.com/jakearchibald/isserviceworkerready).


## License

This program is free software and is distributed under an [MIT License](LICENSE).
