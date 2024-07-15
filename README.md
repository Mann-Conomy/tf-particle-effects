# particle-effects

A Node.js wrapper for Team Fortress 2's in-game particle effects.

[![npm version](https://img.shields.io/npm/v/@mann-conomy/tf-particle-effects?style=flat-square&logo=npm)](https://npmjs.com/package/@mann-conomy/tf-particle-effects)
[![npm downloads](https://img.shields.io/npm/d18m/@mann-conomy/tf-particle-effects?style=flat-square&logo=npm)](https://npmjs.com/package/@mann-conomy/tf-particle-effects)
[![Node.js version](https://img.shields.io/node/v/@mann-conomy/tf-particle-effects?style=flat-square&logo=nodedotjs)](https://nodejs.org/en/about/releases/)
[![GitHub actions](https://img.shields.io/github/actions/workflow/status/Mann-Conomy/tf-particle-effects/test.yml?branch=main&style=flat-square&logo=github&label=test)](https://github.com/Mann-Conomy/tf-particle-effects/blob/main/.github/workflows/test.yml)
[![GitHub license](https://img.shields.io/github/license/Mann-Conomy/tf-particle-effects?style=flat-square&logo=github)](https://github.com/Mann-Conomy/tf-particle-effects/blob/main/LICENSE)

## Installation

Using [npm](https://www.npmjs.com/package/@mann-conomy/tf-particle-effects):

```bash
$ npm install @mann-conomy/tf-particle-effects
```

Using [yarn](https://yarnpkg.com/package/@mann-conomy/tf-particle-effects):

```bash
$ yarn add @mann-conomy/tf-particle-effects
```

## Testing

Using [npm](https://docs.npmjs.com/cli/v8/commands/npm-run-script):
```bash
$ npm test
```

Using [yarn](https://classic.yarnpkg.com/lang/en/docs/cli/run/):
```bash
$ yarn test
```

## Examples
Creating and evaluating Unusual particle effects from the Team Fortress 2 game files.

```js
import { UnusualEffect } from "@mann-conomy/tf-particle-effects";

(async () => {
    try {
        // Create a new Unusual Effect to represent Burning Flames
        const effect = new UnusualEffect({ name: "Burning Flames" });

        // Evaluate the particle effect based on the provided name
        if (effect.eval()) {
            // Retrieve the effect's particle id and name
            const { id, name } = effect.find();

            console.log(id, name); // 13, Burning Flames
        }
    } catch (error) {
        console.error("Error processing effect", error.message);
    }
})();
```

Some more examples are available in the [examples](https://github.com/Mann-Conomy/tf-particle-effects/tree/main/examples) and [test](https://github.com/Mann-Conomy/tf-particle-effects/tree/main/test) directories.

## Documentation

See the [Wiki pages](https://github.com/Mann-Conomy/tf-particle-effects/wiki) for further documentation.

## License

[MIT](LICENSE)

Copyright 2024, The Mann-Conomy Project
