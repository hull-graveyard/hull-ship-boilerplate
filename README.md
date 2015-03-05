
# Hull Ship Boilerplate.

> _"It's Javascript P*rn™"_
> 
> – The Author

A complete frontend environment based on the latest and greatest technology.


### Benefits

Quite simply, the web of tomorrow, today.

- User-configurable styles for colors, background images, fonts, sizes, css transforms, opacity etc... Like [CSS Variables](http://caniuse.com/#feat=css-variables) but with more swag. Anything you can do in CSS can be exposed as a user-configurable setting 
- No Style leakage between your app and the page. [Scoped Styles](http://caniuse.com/#feat=style-scoped) working today
- [HTML Imports](http://caniuse.com/#feat=imports) : Have your app run securely in any environment. Build it as a full page app, we'll embed it in the right place without you worrying how it gets delivered and how it lives in the page
- Component-based development
- Built-in I18n
- Based on [React-Router](https://github.com/rackt/react-router) for full access to every state of the App. ~~Let the User preview every state of your application to check it's design and behaviour~~ (Soon)
- ~~Flowers and unicorns~~ (Soon)

### Setup

- Ensure that [Node.js](http://nodejs.org) and [gulp](http://gulpjs.com) are installed. Gulp can easily be installed with `npm install -g gulp`
- Run `npm install`
- Go to the [Hull Dashboard](https://dashboard.hullbeta.io/) > Ships > Add Ship, and paste the ship boilerplate manifest URL : https://raw.githubusercontent.com/hull-ships/hull-ship-boilerplate/master/manifest.json
- Copy the Ship's ID, paste it in your local `manifest.json` under `demoKeys.appId`. Paste your Org URL under `demoKeys.orgUrl`

### Developing

- Run `gulp server` and visit [http://localhost:8081/](http://localhost:8081/).
- Write Code
- Drink Coffee
- Be nice to others
- Repeat
- Publish

### Build
- run `gulp build`

### Deployment
- Publish anywhere you like, as long the following files are public:
- `manifest.json`
- `ship.html`
- `ship.js`
 


## Inside the box : 

### Tooling
- Gulp
- Webpack
- Webpack-dev-server
- Babel (ex-6to5) So you can write [ES6](https://github.com/lukehoban/es6features) like a boss _today_.
- [Hot module replacement](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack) that just works. (Live reload and `require` **everything**, without page reloads)
- [React Hot Loader](http://gaearon.github.io/react-hot-loader/) pre-configured (Hot module replacement for react. Hot-replace components). [Check this out](https://vimeo.com/100010922) for a quick overview
- SCSS Loader (`var style = require(main.scss);`)
- Autoprefixer. (Drop the prefixes. Write CSS from the future, have it run today)
- Native OSX Notifications, because you want to know when things happen.

### Front-end
- React
- React-Router
- ~~Hull-Flux-Engine : Wraps api calls, Micro Flux-like architecture for simple apps~~ _(Soon)_
- Hull-Style react component allowing to expose user-configurable styles, while you still write simple CSS
- Ship.js+Ship.html [HTML Imports](http://caniuse.com/#feat=imports) wrappers
