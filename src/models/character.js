const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Character = function () {
};

Character.prototype.bindEvents = function() {
  PubSub.subscribe('Search:GotSearchResults', event => {
    const searchResults = event.detail;
    const promisesArray = searchResults.map(result => this.getData(result));
    Promise.all(promisesArray).then(values => {
      values.forEach(value => {
        PubSub.publish('Character:CharacterDataReady', value);
      });
    });
  });
};

Character.prototype.getData = function (id){

  let charData = null;
  let portraitURL = null;
  let corpData = null;
  let corpIconURL = null;
  
  const charPromise = this.getBasicData(id)
    .then(data => charData = data)
    .then(() => this.getPortrait(id))
    .then( portraitReturn => portraitURL = portraitReturn)
    .then(() => this.getCorpData(charData))
    .then( corpReturn => corpData = corpReturn)
    .then(() => this.getCorpIcon(charData))
    .then( corpIconReturn => corpIconURL = corpIconReturn)
    .then(() => ([charData, portraitURL, corpData, corpIconURL]));
  return charPromise;
};

Character.prototype.getBasicData = function (id) {
  const url = `https://esi.evetech.net/latest/characters/${id}/?datasource=tranquility`;
  const request = new RequestHelper(url);
  return request.get();
};

Character.prototype.getPortrait = function (id) {
  const url = `https://esi.evetech.net/latest/characters/${id}/portrait/?datasource=tranquility`;
  const request = new RequestHelper(url);
  return request.get();
};

Character.prototype.getCorpData = function (charData) {
  const url = `https://esi.evetech.net/latest/corporations/${charData.corporation_id}/?datasource=tranquility`;
  const request = new RequestHelper(url);
  return request.get();
};

Character.prototype.getCorpIcon = function (charData) {
  const url = `https://esi.evetech.net/latest/corporations/${charData.corporation_id}/icons/?datasource=tranquility`;
  const request = new RequestHelper(url);
  return request.get();
};

module.exports = Character;
