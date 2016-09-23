'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getAllMetacontents = getAllMetacontents;
exports.getMetacontent = getMetacontent;
exports.searchWikiMetacontents = searchWikiMetacontents;
exports.queryWikiMetacontents = queryWikiMetacontents;
exports.queryNewsMetacontents = queryNewsMetacontents;
exports.searchNewsMetacontents = searchNewsMetacontents;
exports.submitMetacontent = submitMetacontent;
exports.putMetacontent = putMetacontent;
exports.deleteMetacontent = deleteMetacontent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var brrequest = require('browser-request');
var request = require('superagent');
require('es6-promise').polyfill();
require('isomorphic-fetch');

function getAllMetacontents() {
  return new _promise2.default(function (resolve, reject) {
    brrequest.get({
      uri: 'http://54.148.247.77:8089/api/metacontents'
    }, function (err, response, body) {
      if (err) reject(err);
      resolve(JSON.parse(body));
    });
  });
}

function getMetacontent(id) {
  return request.get('http://54.148.247.77:8089/api/metacontent/' + id).then(function (response) {
    return response.body;
  });
}

function searchWikiMetacontents(name) {
  return request.get('http://54.148.247.77:8089/api/metacontents/search_wiki?entity=' + name).then(function (response) {
    return response.body;
  });
}

function queryWikiMetacontents(name) {
  return new _promise2.default(function (resolve, reject) {
    brrequest.get({
      uri: 'http://54.148.247.77:8089/api/metacontents/query_wiki?entity=' + name
    }, function (err, response, body) {
      if (err) reject(err);
      resolve(JSON.parse(body));
    });
  });
}

function queryNewsMetacontents(link) {
  return request.get('http://54.148.247.77:8089/api/metacontents/query_news?url=' + link);
}

function searchNewsMetacontents(name, sites, isFull) {
  return request.get('http://54.148.247.77:8089/api/metacontents/search_news?entity=' + name + '&sites=' + (0, _stringify2.default)(sites) + "&full_res=" + isFull);
}

function submitMetacontent(metacontent) {
  return fetch('http://54.148.247.77:8089/api/channels/' + metacontent.channel + '/metacontents', {
    method: 'POST',
    body: (0, _stringify2.default)(metacontent),
    json: true,
    headers: {
      'Content-Type': 'application/json charset=utf-8'
    }
  }).then(function (response) {
    return response.status;
  });
}

function putMetacontent(metacontent) {
  return request.put('http://54.148.247.77:8089/api/channels/' + metacontent.channel_id + '/metacontents').send((0, _stringify2.default)(metacontent));
}

function deleteMetacontent(metacontent) {
  return fetch('http://54.148.247.77:8089/api/channels/' + metacontent.ChannelId + '/metacontents', {
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