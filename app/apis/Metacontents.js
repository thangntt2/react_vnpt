var request = require('browser-request')
require('es6-promise').polyfill();
require('isomorphic-fetch');
const requester = require('es6-request')

export function getAllMetacontents() {
	return new Promise(function(resolve, reject) {
		request.get({
			uri: 'http://52.163.214.52:8089/api/metacontents/all',
		}, function(err, response, body) {
			if (err)
				reject(err)
			resolve(JSON.parse(body))
		})
	});
}

export function searchWikiMetacontents(name) {
  return new Promise(function(resolve, reject) {
    request.get({
      uri: 'http://52.163.214.52:8089/api/metacontents/search?entity=' + name,
    }, function(err, response, body) {
      if (err)
        reject(err)
      resolve(JSON.parse(body))
    })
  })
}

export function queryWikiMetacontents(name) {
  return new Promise(function(resolve, reject) {
    request.get({
      uri: 'http://52.163.214.52:8089/api/metacontents/query_wiki?entity=' + name,
    }, function(err, response, body) {
      if (err)
        reject(err)
      resolve(JSON.parse(body))
    })
  })
}

export function submitMetacontent(metacontent) {
  return fetch('http://52.163.214.52:8089/api/channels/'+metacontent.channel+'/metacontents',
    {
      method:'POST',
      body:JSON.stringify(metacontent),
      json:true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.status)
}

export function deleteMetacontent(metacontent) {
  return fetch('http://52.163.214.52:8089/api/channels/'+ metacontent.ChannelId+'/metacontents',
    {
      method: 'DELETE',
      body: JSON.stringify({
        id: metacontent.id
      }),
      json:true,
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.status)
}
