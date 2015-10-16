## Ship Boot Sequence
When you embed the `hull.js` library in the page, `Hull.ready` will get called automatically when the library is... well... ready. When this happens, it gets passed an array of Deployments, looking like this:

```js
Hull.ready(function(hull, me, platform, org){
  //platform contains a "deployments" property:
  console.log(platform.deployments = [deployment1, deployment2, deployment3]);
  //When building a Ship, you can use this to override the boot process, manipulate deployments to make them work locally. When you're done call this:
  Hull.embed(platform.deployments);
});
```

A Deployment is a Hash with the following structure. It has is everytyhing needed to boot and embed the Ship in a Platform.

```js
{
  settings: {
    // Those are Deployment-specific settings.
    // The Ship also has Ship-level settings.
    // 
    // The settings below are always present. You can declare more
    // in the "deployment_settings" hash of the Manifest.
    '$el': 'body>div.main>div.secondary', //css3 selector where to insert ship
    '$placement':'bottom', //bottom|top|before|after|replace, where to embed when selector is found
    '$multi': true, //wether to embed on every matched selector or just the first
    // ...
  },
  ship: {
    name: "ShipName",
    manifest:{
      index: '/ship.js'
      //... Entire manifest.json
    }, 
    resources:{}, //configured Resources, such as Quizzes
    settings: {} //Configured Settings that are described in manifest
  },
  platform: {
    //... Platform Data
  }
}
```

## Ship Embed Method

- For each deployment, we load the script declared in a key named `index` in `manifest.json` . In the ships we release, it will usually be `/ship.js`

- Once the import is loaded, we inject it's content in the place and manner described in `deployment.settings`

- Then, Hull calls the `Hull.onEmbed` callback in your ship.

**HTML imports are great for dependency management,** they make it easy to declare additional dependencies, CSS files if you need, and the main JS file for your ship. You can even inline the JS in this file to optimize performance.

#### Booting the Ship.

To boot the ship, all you need to do is call the following from inside your Ship: 

```js
//Note the `document` here. we need this when inserting as HTML import.
Hull.onEmbed(document, function(element, deployment, hull){
  //This will get called when the Ship is ready to boot.
})
```

## [Alternative] CommonJS Boot methods.
This is an [Advanced] method of embedding and booting ships by overriding script loading. It can be useful when to load ship code locally, or use it bundled it in a larger project:

- In the `hull.js` tag, add the `embed="false"` parameter
- Hull will not embed the ships automatically for you.
- Require your ship : `import {start} from './ship';`
- Call `Hull.ready`, and boot your app there by calling `start(element, deployment, hull)`: 

_index.html_
```html
<script src='hull.api.js' foo="...usual settings" embed="false"/>
<script src='app.js'/>
```

_app.js_
```js
import { start } from './ship';

Hull.ready(function(hull, me, platform, org){
  // Find the deployment you're interested in.
  // This will vary depending on your needs
  var deployments = _.filter(platform.deployments,function(deployment){
    return deployment.ship.name==='ship'
  });
  // Override / specify an element to embed the Ship in. [or not.];
  var el = document.querySelector('body');
  start(el, deployment, hull);
});
```

_ship.js_
```js
// Here's the pattern we recommend so your ship can start
// in both modes
var MyShip = {
  //... your ship logic
  start: function(el, deployment){
    //ship boot sequence here
  }
}

module.exports = MyShip;
```
