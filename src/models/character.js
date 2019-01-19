const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Character = function (characterID) {
  this.characterID = characterID;
  this.data = null;
  this.portraitURL = null;
};


Character.prototype.bindEvents = function() {
  PubSub.subscribe('DisplayCharacterView:EachSearchResult', event => {
    new Character(event.detail).getData(); 
  });
};


Character.prototype.getData = function () {
  const url = `https://esi.evetech.net/latest/characters/${this.characterID}/?datasource=tranquility`;
  const request = new RequestHelper(url);
  const charPromise = request.get();
  charPromise.then((data) => {
    this.data = data;
    this.getPortrait();
  })
    .catch((err) =>{
      console.error(err);
    });
};

Character.prototype.getPortrait = function () {
  const url = `https://esi.evetech.net/latest/characters/${this.characterID}/portrait/?datasource=tranquility`;
  const request = new RequestHelper(url);
  const charPromise = request.get();
  charPromise.then((data) => {
    this.portraitURL = data;
    PubSub.publish(
      'Character:Character-Data-Collected',
      [
        this.characterID,
        this.data,
        this.portraitURL
      ]
    );
  })
    .catch((err) =>{
      console.error(err);
    });


};

module.exports = Character;
