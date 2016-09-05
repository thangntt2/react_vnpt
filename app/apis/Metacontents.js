var brrequest = require('browser-request')
var request = require('superagent')
require('es6-promise').polyfill();
require('isomorphic-fetch');

export function getAllMetacontents() {
	return new Promise(function(resolve, reject) {
		brrequest.get({
			uri: 'http://52.163.214.52:8089/api/metacontents/all',
		}, function(err, response, body) {
			if (err)
				reject(err)
			resolve(JSON.parse(body))
		})
	});
}

export function searchWikiMetacontents(name) {
  // return new Promise(function(resolve, reject) {
  //   request.get({
  //     uri: 'http://52.163.214.52:8089/api/metacontents/search?entity=' + name,
  //   }, function(err, response, body) {
  //     if (err)
  //       reject(err)
  //     resolve(JSON.parse(body))
  //   })
  // })
  return request
    .get('http://52.163.214.52:8089/api/metacontents/search?entity=' + name)
}

export function queryWikiMetacontents(name) {
  return new Promise(function(resolve, reject) {
    brrequest.get({
      uri: 'http://52.163.214.52:8089/api/metacontents/query_wiki?entity=' + name,
    }, function(err, response, body) {
      if (err)
        reject(err)
      resolve(JSON.parse(body))
    })
  })
}

export function queryNewsMetacontents(link) {
  return request
    .get('http://52.163.214.52:8089/api/metacontents/query_news?url=' + link)
}

export function searchNewsMetacontents(name, sites) {
  return request
    .get('http://52.163.214.52:8089/api/metacontents/search_news?entity=' + name + '&sites=' + JSON.stringify(sites))
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
