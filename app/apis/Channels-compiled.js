'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getChannelsList = getChannelsList;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Channels.js
require('es6-promise').polyfill();
require('isomorphic-fetch');
function getChannelsList() {
  return new _promise2.default(function (resolve, reject) {
    fetch('http://52.163.214.52:8089/api/channels').then(function (response) {
      if (response.status != 200) reject(response);
      return response.json();
    }).then(function (channels) {
      console.log(channels);
      resolve(channels);
    });
  });
}

//# sourceMappingURL=Channels-compiled.js.map