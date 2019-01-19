const PubSub = require('../helpers/pub_sub.js');

const SearchBoxView = function() {};

SearchBoxView.prototype.bindEvents = function() {
  const form = document.querySelector('.search_box');
  form.addEventListener('submit', event =>{
    event.preventDefault();
    const mainContent = document.querySelector('.main_content');
    mainContent.innerHTML = '';
    const searchString = event.target['search_character'].value;
    PubSub.publish('SearchBoxView:SearchStringReady', searchString);
  });
};

module.exports = SearchBoxView;
