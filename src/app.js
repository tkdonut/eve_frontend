const Character = require('./models/character.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  //TODO split out to bindEvents calls
  const testCharacter = new Character();
  testCharacter.getData('93541762');


});
