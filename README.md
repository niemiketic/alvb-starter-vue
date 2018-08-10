# ALVB Vue.js Starter

...

## Requirements

- Node.js v8

## Usage

```sh
# install dependencies
npm install

# run app in development on port 8080
npm run dev

# lint
npm run lint

# format
npm run format

# run all tests
npm test

# run unit tests
npm run test:unit

# run end-to-end tests
npm run test:e2e

# build for production
npm run build
```

## Debugging

From DevTools

```javascript
// use logger
Logger.debug('Hello World!');

// check if there is an authenticated session
AuthService.isAuthenticated();

// get state from store
$app.$store.state.myField;

// dispatch action from store
$app.$store.dispatch('myAction' /* args */);
```

## Ressources

- Libraries
  - [Vue.js](https://vuejs.org/v2/guide/)
  - [Vue Router](https://router.vuejs.org/en/)
  - [Vuex](https://vuex.vuejs.org/en/)
- Tooling
  - [vue-loader](http://vuejs.github.io/vue-loader)
  - [Vue.js Webpack Template](http://vuejs-templates.github.io/webpack/)
- E2E Testing
  - [Nightwatch.js](http://nightwatchjs.org/)
