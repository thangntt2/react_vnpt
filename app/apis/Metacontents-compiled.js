'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getAllMetacontents = getAllMetacontents;
exports.searchWikiMetacontents = searchWikiMetacontents;
exports.queryWikiMetacontents = queryWikiMetacontents;
exports.submitMetacontent = submitMetacontent;
exports.deleteMetacontent = deleteMetacontent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('browser-request');
require('es6-promise').polyfill();
require('isomorphic-fetch');
var requester = require('es6-request');

function getAllMetacontents() {
  return new _promise2.default(function (resolve, reject) {
    request.get({
      uri: 'http://52.163.214.52:8089/api/metacontents/all'
    }, function (err, response, body) {
      if (err) reject(err);
      resolve(JSON.parse(body));
    });
  });
}

function searchWikiMetacontents(name) {
  return new _promise2.default(function (resolve, reject) {
    request.get({
      uri: 'http://52.163.214.52:8089/api/metacontents/search?entity=' + name
    }, function (err, response, body) {
      if (err) reject(err);
      resolve(JSON.parse(body));
    });
  });
}

function queryWikiMetacontents(name) {
  return new _promise2.default(function (resolve, reject) {
    request.get({
      uri: 'http://52.163.214.52:8089/api/metacontents/query_wiki?entity=' + name
    }, function (err, response, body) {
      if (err) reject(err);
      resolve(JSON.parse(body));
    });
  });
}

function submitMetacontent(metacontent) {
  return fetch('http://52.163.214.52:8089/api/channels/' + metacontent.channel + '/metacontents', {
    method: 'POST',
    body: (0, _stringify2.default)(metacontent),
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.status;
  });
}

function deleteMetacontent(metacontent) {
  return fetch('http://52.163.214.52:8089/api/channels/' + metacontent.ChannelId + '/metacontents', {
    method: 'DELETE',
    body: (0, _stringify2.default)({
      id: metacontent.id
    }),
    json: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.status;
  });
}

//# sourceMappingURL=Metacontents-compiled.js.map