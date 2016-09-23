'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitKeyword = submitKeyword;
exports.getAllKeywords = getAllKeywords;
exports.deleteKeywords = deleteKeywords;
var request = require('superagent');

function submitKeyword(keyword) {
  return request.post('http://54.148.247.77:8089/api/channels/' + keyword.channel + '/keywords').send({ keyword: keyword.name });
}

function getAllKeywords() {
  return request.get('http://54.148.247.77:8089/api/keywords').then(function (response) {
    return response.body;
  });
}

function deleteKeywords() {}

//# sourceMappingURL=Keyword-compiled.js.map