'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitKeyword = submitKeyword;
exports.getAllKeywords = getAllKeywords;
exports.deleteKeywords = deleteKeywords;
var request = require('superagent');

function submitKeyword(keyword) {
  return request.post('http://52.163.214.52:8089/api/channels/' + keyword.channel + '/keywords').send({ keyword: keyword.name });
}

function getAllKeywords() {
  return request.get('http://52.163.214.52:8089/api/keywords/all').then(function (response) {
    return response.body;
  });
}

function deleteKeywords() {}

//# sourceMappingURL=Keyword-compiled.js.map