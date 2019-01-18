const PubSub = require('../helpers/pub_sub.js');

const DisplayCharacterView = function () {
  this.character_data = null;
};

DisplayCharacterView.prototype.bindEvents = () => {
  PubSub.subscribe('Character:Character-Data-retrieved');
};

module.exports = DisplayCharacterView;
