'use strict';

// The engine contains all the logic and state for the app
import Ship from './components/ship';

if ( Hull && Hull.onEmbed ) {
  Hull.onEmbed(Ship.start);
}
