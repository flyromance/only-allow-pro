# cli usage

package.json

```json
{
  "scripts": {
    "build": "only-allow node 16 && vite build",
    "preinstall": "only-allow npm 6.x"
  }
}
```

if current nodejs version is not match 16, vite build will not excuted!

# api usage

```js
const { match } = require("only-allow-pro");

// current nodejs version is match 16 ?
if (!match("node", "16")) {
  console.log("must use nodejs 16 to start current project.");
  process.exit(1);
}

// current package manager is npm && curent package manager verions is 16
if (!match("npm", "6")) {
  console.log("must use npm and version 6.");
  process.exit(1);
}
```

we can put above judgement in some build config file, because build tool will load this file.

for example:
- vue-cli-service powered project => `vue.config.js`
- vite powered project => `vite.config.js`
- ...

# why not use only-allow
only-allow is great node module, but it has some limitations.

- `only-allow` only support pm check, but not support version check.
- `only-allow` only support pm, not support nodejs version check.
