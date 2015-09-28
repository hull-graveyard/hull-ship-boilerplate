# Hull Ship Boilerplate.

> _"It's Javascript P*rn™"_
> – The Author

A complete frontend environment based on the latest and greatest technology.

## Manifest URL

    https://ships.hull.io/hull-ship-boilerplate/manifest.json

### Benefits

Quite simply, the web of tomorrow, today.

- User-configurable styles for colors, background images, fonts, sizes, css transforms, opacity etc... Like [CSS Variables](http://caniuse.com/#feat=css-variables) but with more swag. Anything you can do in CSS can be exposed as a user-configurable setting 
- No Style leakage between your app and the page, thanks to CSS Modules

### Building Ships

You can use the tooling of your choice to build Ships, they're technology-agnostic. However, after spending months building them, we've settled on a stack that's a combination of sheer power and ease of use. We recommend it strongly.

---

### Ship Architecture

```
/src/ship.js    // Ship entry point. Required
/src/index.html // Demo Page. Optional
/src/index.js   // Manual Ship embed, optional.
/manifest.json   // Ship Manifest file. Describes settings
/src/locales/en.json   // Translation file
```

### Setup

```sh
npm install -g gulp && npm install
```

### Configuration

- Go to the Hull Dashboard, Create a Platform with URL you will use to demo your ship. For instance, this ship is hosted at `http://ships.hull.io/hull-ship-boilerplate/`.
- Copy the snippet, paste in `index.html`
- In the Platform customization screen, click `Add Ship > New Ship > Hull Ship Boilerplate`
- Go to the `Advanced` tab, and input the URLs to your ship so that Hull can access the `manifest.json`. Save
### Developing

- Customize `config.js` and create `.env.sh` from `.env.sh.sample`
- Run `gulp` and visit [http://localhost:8081/](http://localhost:8081/).
- We setup a ngrok tunnel with the subdomain matching `name` in `package.json` if a Ngrok token is present in environment
- Write Code
- Drink Coffee
- Be nice to others
- Repeat
- Publish

### Available Tasks

```
gulp sass //Rebuild custom version of Foundation framework

gulp prepare //Copy static files and rebuild Foundation

gulp // serve and watch, use Ngrok to make it publicly available if token present

gulp build //Build

gulp deploy // Build + Deploy to Github Pages + invalidate Cloudfront (only for Hull team)
```

More tasks are available in `/gulp_tasks`

---

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
- ship.js+ship.html [HTML Imports](http://caniuse.com/#feat=imports) wrappers
