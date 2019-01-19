const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Character = function (characterID) {
  this.characterID = characterID;
  this.data = null;
};

//Character.prototype.bindEvents = function () {
//  PubSub.subscribe('Character:form-submitted', (event) => {
//    const character_id = event.detail;
//    this.getData(character_id);
//  });
//};

Character.prototype.getData = function () {
  this.getPortrait();
  
  const url = `https://esi.evetech.net/latest/characters/${this.characterID}/?datasource=tranquility`;
  const request = new RequestHelper(url);

  const charPromise = request.get();

  charPromise.then((data) => {
    this.data = data;
   
    PubSub.publish('Character:Character-Data-retrieved', [this.characterID, this.data]);
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
    PubSub.publish('Character:Character-Portrait-retrieved',this.portraitURL );
  })
    .catch((err) =>{
    console.error(err);
    });


};

module.exports = Character;
