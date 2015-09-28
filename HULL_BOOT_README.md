# How Ships work
Below is a detailed breakdown of how we insert Ships in the page.

#### 1. Ship Boot Sequence
When you embed the `hull.js` library in the page, `Hull.ready` will get called automatically. When this happens, it gets passed an array of Deployments. This is how it looks like:

```js
Hull.ready(function(hull,me,platform,org){
  //platform contains the "deployments" property:
  console.log(platform.deployments = [deployment1,deployment2,deployment3])
  //...
  //When developing a Ship, this is where you change a few settings to make it work locally.
  Hull.embed(platform.deployments);
});
```

A Deployment is a Hash with the following structure :

```js
{
  ship: {
    name: "ShipName",
    manifest:{
      index: 'dist/index.html'
      //... Entire manifest.json
    }, 
    resources:{}, //configured Resources, such as Quizzes
    settings: {} //Configured Settings that were described in manifest
  },
  platform: {
    //... Platform Data
  },
  settings: {
    '$el': 'body>div.main>div.secondary', //css3 selector where to insert ship
    '$placement':'bottom', //bottom|top|before|after|replace, where to embed when selector is found
    '$multi': true, //wether to embed on every matched selector or just the first
    '$mode': 'embed', // embed|iframe
    //...More Ship platform specific settings
  }
}
```

Here we have everytyhing needed to access to the Ship, see how it should be embedded and insert it in the platform the right way.

`Hull.ready` then calls `Hull.embed(platform.deployments)`.

#### 2. Ship Embed Method

When `deployment.settings.$mode` is `embed`, We use [HTML Imports](http://caniuse.com/#feat=imports) (With a Polyfill for older browsers) to handle dependency management. Otherwise we use an Iframe.

- For each deployment, we load the file declared in the `index` key of `manifest.json` . In the ships we've built, it will usually be `/dist/index.html`

- Once the import is loaded, we inject it's content in the place and manner described in `deployment.settings`

- Then, Hull calls the `Hull.onEmbed` callback in your ship.

**HTML imports are great for dependency management,** they make it easy to declare additional dependencies, CSS files if you need, and the main JS file for your ship. You can even inline the JS in this file to optimize performance.

#### Booting the Ship.

To boot the ship, all you need to do is call the following from inside your Ship: 

```js
//Note the `document` here. we need this when inserting as HTML import.
Hull.onEmbed(document, function(element, deployment){
  //This will get called when the Ship is ready to boot.
})
```

#### [Alternative] CommonJS Boot methods.
Here's an [Advanced] method of embedding and booting ships, skipping the HTML import phase. This is useful when you install ship code locally and bundle it in a larger project:

- In the `hull.js` tag, add the `embed="false"` parameter
- Hull will not embed the ships automatically for you.
- Require your ship (`require('./ship')` with CommonJS)
- Expose a `Ship.start(el, deployment)` method on your ship.
- Call `Hull.ready`, and boot your app there by calling `Ship.start(el, deployment)`: 

_index.html_
```html
  <script src='hull.api.js' embed="false"/>
  <script src='app.js'/>
```

_main.js_
```js
  var MyShip = require('./ship');
  Hull.ready(function(hull,me,platform,org){
    //Find the deployment you're interested in. This will vary depending on your needs
    var deployments = _.filter(platform.deployments,function(deployment){
      return deployment.ship.name==='ship'
    });

    //For each found deployment, manually start the ship.
    deployments.map(function(deployment){
      //If your ship doesnt need to know it's root element, skip this.
      var el = document.querySelector(deployment.settings.$el)
      MyShip.start(el,deployment)
    });
  });
```

_my-ship.js_
```js
//Here's the CommonJS pattern we recommend so your ship can start both Embedded and inline:

var MyShip = {
  //... your ship logic
  start: function(el, deployment){
    //ship boot sequence here
  }
}

//Not used here: 
//Hull.onEmbed(document,MyShip.start);

module.exports = MyShip;

```
