# Hull Ship Boilerplate.

> _"It's Javascript P*rn™"_
> – The Author

A complete frontend environment based on the latest and greatest technology.

### Benefits
Quite simply, the web of tomorrow, today.

- User-configurable styles for colors, background images, fonts, sizes, css transforms, opacity etc... Like [CSS Variables](http://caniuse.com/#feat=css-variables) but with more swag. Anything you can do in CSS can be exposed as a user-configurable setting 
- No Style leakage between your app and the page, thanks to CSS Modules

### Building Ships
You can use the tooling of your choice to build Ships, they're technology-agnostic. However, after spending months building them, we've settled on a stack that's a combination of sheer power and ease of use. We recommend it strongly.

### The Boot Process.
Read more about [The Boot Process](hull_boot_process.md)

## Manifest URL
    https://ships.hull.io/hull-ship-boilerplate/manifest.json

---

### Ship Architecture

Here are the basic files required to make a ship work
```sh
/manifest.json   # Ship Manifest file. Describes settings
/src
  index.html     # [Optional] Demo Page - Highly recommended
  index.js       # [Optional] Demo Page Code, for manual Ship embeds.
  ship.js        # Ship entry point. Required
  locales/       # Translations directory
    en.json      # Translation file
```

### Setup

```sh
npm install -g gulp && npm install
```

### Configuration

- Go to the [Hull Dashboard](https://dashboard.hullapp.io), Create a Platform with the URL you will use to demo your ship. For instance, this ship is hosted at `http://ships.hull.io/hull-ship-boilerplate/`.
- Paste the snippet in `index.html` and deploy.  
  You can set the URL to `localhost` to develop.
- In the Platform customization screen, click  
  `Add Ship > New Ship > Hull Ship Boilerplate`
- Go to the `Advanced` tab and input the URLs to your ship 
  so that Hull can access the `manifest.json`.
  It needs to be publicly available (localhost won't work here.)
  If you can't host the manifest publicly, copy and paste the manifest in the box, click `Save` on the lower left, then `save` on the top right.

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

```sh
gulp # Serve and watch, use Ngrok to make it publicly available if token present
gulp build # Build in '/dist'
gulp deploy # Build + Deploy to Github Pages + invalidate Cloudfront (only for Hull team)
```

More tasks are available in `/gulp_tasks`.
The entire tooling configuration is in `/config.js`

---

## Inside the box : 

### Tooling

- [Gulp](http://gulpjs.com/)
- [Webpack](http://webpack.github.io/)
- [Babel](https://babeljs.io/) so you can write [ES6](https://github.com/lukehoban/es6features) like a boss _today_.
- [Hot module replacement](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack) that just works. (Live reload and `require` **everything**, without page reloads)
- [React Hot Loader](http://gaearon.github.io/react-hot-loader/) pre-configured (Hot module replacement for react. Hot-replace components). [Check this out](https://vimeo.com/100010922) for a quick overview
- [CSS Modules](https://github.com/css-modules/css-modules) (`import style = "main.css";`)
- Autoprefixer. (Drop the prefixes. Write CSS from the future, have it run today)

### Front-end

- React
- Hull-Style react component allowing to expose user-configurable styles, while you still write simple CSS
- CSS Modules for local styles

