const Character = require('./models/character.js');
const DisplayCharacterView  = require('./views/display_character_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');


  const mainContent = document.querySelector('.main_content');

  const displayCharacterView = new DisplayCharacterView(mainContent);
  displayCharacterView.bindEvents();


  //TODO split out to bindEvents calls
  const testCharacter = new Character('93541762');
  testCharacter.getData();


});
