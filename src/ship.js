import App from './app';

// This is the entry point for the Ship when it's used as an HTML Import.
// It's standalone and boots when Hull exists and calls onEmbed

if (window.Hull){
  // This is called when the ship has been embedded in the page.
  Hull.onEmbed(App.start);
}

module.exports=App
