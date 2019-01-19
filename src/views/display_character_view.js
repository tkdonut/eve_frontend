const PubSub = require('../helpers/pub_sub.js');

const DisplayCharacterView = function (container) {
  this.container = container;
  this.character_data = null;
  this.character_id = null;
  this.portraitURL = null;
};

DisplayCharacterView.prototype.bindEvents = function() {

  PubSub.subscribe('Character:Character-Data-Collected', event => {
    this.character_id = event.detail[0];
    this.character_data = event.detail[1];  
    this.portraitURL = event.detail[2];  
    console.table(this.character_data);
    console.table(this.portraitURL);
    console.table(event.detail[0]);
    this.render(); 
  });
};

DisplayCharacterView.prototype.render = function() {

  const container = this.container;
  const characterView = document.createElement('div');
  characterView.className = 'characterdisplay';

  let lhs = document.createElement('div');
  lhs.className = 'characterdisplay_lhs';
  lhs = this.renderLHS(lhs);
  characterView.appendChild(lhs);

  let rhs = document.createElement('div');
  rhs.className = 'characterdisplay_rhs';
  rhs = this.renderRHS(rhs);
  characterView.appendChild(rhs);

  container.appendChild(characterView);
};

DisplayCharacterView.prototype.renderLHS = function (container){
  const header = document.createElement('h1');
  header.textContent = this.character_data.name;
  container.appendChild(header);
  const portrait = document.createElement('img');
  portrait.src = this.portraitURL.px256x256;
  container.appendChild(portrait);
  return container; 
};

DisplayCharacterView.prototype.renderRHS = function (container){
  const para = document.createElement('p');
  para.textContent = this.character_id;
  container.appendChild(para);
  return container; 
};

module.exports = DisplayCharacterView;
