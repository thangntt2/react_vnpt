'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getAllMetacontents = getAllMetacontents;
exports.searchWikiMetacontents = searchWikiMetacontents;
exports.queryWikiMetacontents = queryWikiMetacontents;
exports.submitMetacontent = submitMetacontent;
exports.searchNewsMetacontents = searchNewsMetacontents;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('browser-request');
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
  return new _promise2.default(function (resolve, reject) {
    request.post({
      uri: 'http://52.163.214.52:8089/api/channels/' + metacontent.channelId + "/metacontents",
      body: {
        name: metacontent.name,
        description: metacontent.description,
        url: metacontent.url,
        image: metacontent.image,
        category: metacontent.category
      }
    }, function (err, response, body) {
      if (err) reject(err);
      resolve(response.response.status);
    });
  });
}

function searchNewsMetacontents() {}

//# sourceMappingURL=Metacontents-compiled.js.map