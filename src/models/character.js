const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Character = function () {
  this.data = null;
};

//Character.prototype.bindEvents = function () {
//  PubSub.subscribe('Character:form-submitted', (event) => {
//    const character_id = event.detail;
//    this.getData(character_id);
//  });
//};

Character.prototype.getData = function (character_id) {
  const url = `https://esi.evetech.net/latest/characters/${character_id}/?datasource=tranquility`;
  const request = new RequestHelper(url);

  const charPromise = request.get();

  charPromise.then((data) => {
    this.data = data;
    PubSub.publish('Character:Character-Data-retrieved', this.data);
  })
    .catch((err) =>{
    console.error(err);
    });

  PubSub.publish('Character:Character-Data-pending', {});
};

module.exports = Character;



