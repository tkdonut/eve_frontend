const PubSub = require('../helpers/pub_sub.js');

const DisplayCharacterView = function (container) {
  this.container = container;
  this.character_data = null;
  this.portraitURL = null;
};

DisplayCharacterView.prototype.bindEvents = function() {

  PubSub.subscribe('Character:CharacterDataReady', event => {
    this.character_data = event.detail[0];  
    this.portraitURL = event.detail[1];  
    this.corpData = event.detail[2];
    this.corpIconURL = event.detail[3];
    this.render(); 
  });
};

DisplayCharacterView.prototype.render = function() {

  const container = this.container;
  const characterView = document.createElement('div');
  characterView.className = 'characterdisplay';

  characterView.appendChild(this.renderLHS());
  characterView.appendChild(this.renderRHS());

  const corpLogo = document.createElement('img');
  corpLogo.src = this.corpIconURL.px256x256;
  characterView.appendChild(corpLogo);

  if (this.character_data.description){
    characterView.appendChild(
      this.constructDescription()
    );
  }
  container.appendChild(characterView);
};

DisplayCharacterView.prototype.renderLHS = function (){
  const lhs = document.createElement('div');
  lhs.className = 'characterdisplay_lhs';
  const portrait = document.createElement('img');
  portrait.src = this.portraitURL.px256x256;
  lhs.appendChild(portrait);
  return lhs;
};

DisplayCharacterView.prototype.renderRHS = function (){
  const rhs = document.createElement('div');
  rhs.className = 'characterdisplay_rhs';
  const header = document.createElement('h1');
  header.textContent = this.character_data.name;
  rhs.appendChild(header);
  const birthday = new Date(this.character_data.birthday);
  const list = this.constructList(
    [
      'Born: ' + birthday.toUTCString(), 
      'Gender: ' + (this.character_data.gender === 'male' ? 'Male' : 'Female'),
      'Corporation: ' + this.corpData.name
    ]);
  rhs.appendChild(list);
  return rhs; 
};

DisplayCharacterView.prototype.constructList = function (listItems) {
  const ul = document.createElement('ul');
  listItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  ul.appendChild(this.addSecStatus());
  return ul;
};

DisplayCharacterView.prototype.constructDescription = function(){
  const description = document.createElement('div');
  const header = document.createElement('h3');
  header.textContent = 'Description';
  description.appendChild(header);
  description.innerHTML += this.character_data.description;
  description.className = 'description';
  return description;
};

DisplayCharacterView.prototype.addSecStatus = function(){
  const secLi = document.createElement('li');
  secLi.textContent = 'Security Status: ' + this.character_data.security_status.toFixed(3);
  if (this.character_data.security_status < 0){
    secLi.style.color = 'red';
  } else if (this.character_data.security_status === 0){
    secLi.style.color = 'lightblue'; 
  } else {
    secLi.style.color = 'green';
  }
  return secLi;
};

module.exports = DisplayCharacterView;
