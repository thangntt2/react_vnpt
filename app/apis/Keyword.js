var request = require('superagent')

export function submitKeyword(keyword) {
  return request
    .post('http://52.163.214.52:8089/api/channels/'+keyword.channel+'/keywords')
        .send({keyword: keyword.name})
}

export function getAllKeywords() {
  return request
    .get('http://52.163.214.52:8089/api/keywords/all')
    .then(response => response.body)
}

export function deleteKeywords() {

}
