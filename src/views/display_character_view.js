const PubSub = require('../helpers/pub_sub.js');

const DisplayCharacterView = function (container) {
  this.container = container;
  this.character_data = null;
  this.character_id = null;
  this.portraitURL = null;
};

DisplayCharacterView.prototype.bindEvents = function() {

  PubSub.subscribe('Search:GotSearchResults', event => {
    const results = event.detail;  
    results.forEach( result => {
      PubSub.publish( 'DisplayCharacterView:EachSearchResult', result);

    });
  });

  PubSub.subscribe('Character:Character-Data-Collected', event => {
    this.character_id = event.detail[0];
    this.character_data = event.detail[1];  
    this.portraitURL = event.detail[2];  
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

  if (this.character_data.description){
    const description = this.constructDescription();
    characterView.appendChild(description);
  }

  container.appendChild(characterView);
};

DisplayCharacterView.prototype.renderLHS = function (container){
  const portrait = document.createElement('img');
  portrait.src = this.portraitURL.px256x256;
  container.appendChild(portrait);
  return container; 
};

DisplayCharacterView.prototype.renderRHS = function (container){
  const header = document.createElement('h1');
  header.textContent = this.character_data.name;
  container.appendChild(header);
  const birthday = new Date(this.character_data.birthday);
  const list = this.constructList(
    [
      'Born: ' + birthday.toUTCString(), 
      'Gender: ' + this.character_data.gender, 
    ]);
  container.appendChild(list);
  return container; 
};

DisplayCharacterView.prototype.constructList = function (listItems) {
  const ul = document.createElement('ul');
  listItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  return ul;
};

DisplayCharacterView.prototype.constructDescription = function(){
  const description = document.createElement('div');
  description.innerHTML = this.character_data.description;
  description.className = 'description';
  return description;
};
module.exports = DisplayCharacterView;
