'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getChannelsList = getChannelsList;
exports.submitChannel = submitChannel;
exports.deleteChannel = deleteChannel;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Channels.js
require('es6-promise').polyfill();
require('isomorphic-fetch');
var request = require('superagent');

function getChannelsList() {
  return new _promise2.default(function (resolve, reject) {
    fetch('http://54.148.247.77:8089/api/channels').then(function (response) {
      if (response.status != 200) reject(response);
      return response.json();
    }).then(function (channels) {
      resolve(channels);
    });
  });
}

function submitChannel(channel) {
  return request.post('http://54.148.247.77:8089/api/channels').send((0, _stringify2.default)(channel)).set('Content-Type', 'application/json');
}

function deleteChannel(channel) {
  return request.del('http://54.148.247.77:8089/api/channels/' + channel.id);
}

//# sourceMappingURL=Channels-compiled.js.map