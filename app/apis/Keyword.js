var request = require('superagent')

export function submitKeyword(keyword) {
  return request
    .post('http://54.148.247.77:8089/api/channels/'+keyword.channel+'/keywords')
        .send({keyword: keyword.name})
}

export function getAllKeywords() {
  return request
    .get('http://54.148.247.77:8089/api/keywords')
    .then(response => response.body)
}

export function deleteKeywords() {

}
