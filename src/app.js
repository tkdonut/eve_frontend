const Character = require('./models/character.js');
const Search = require('./models/search.js');
const DisplayCharacterView  = require('./views/display_character_view.js');
const SearchBoxView = require('./views/search_box_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  const mainContent = document.querySelector('.main_content');

  const character = new Character();
  character.bindEvents();

  const displayCharacterView = new DisplayCharacterView(mainContent);
  displayCharacterView.bindEvents();

  const search = new Search();
  search.bindEvents(); 

  const searchBoxView = new SearchBoxView();
  searchBoxView.bindEvents();

});
