var brrequest = require('browser-request')
var request = require('superagent')
require('es6-promise').polyfill();
require('isomorphic-fetch');

export function getAllMetacontents() {
	return new Promise(function(resolve, reject) {
		brrequest.get({
			uri: 'http://54.148.247.77:8089/api/metacontents',
		}, function(err, response, body) {
			if (err)
				reject(err)
			resolve(JSON.parse(body))
		})
	});
}

export function getMetacontent(id) {
  return request
    .get('http://54.148.247.77:8089/api/metacontent/' + id)
    .then(response => response.body)
}

export function searchWikiMetacontents(name) {
  return request
    .get('http://54.148.247.77:8089/api/metacontents/search_wiki?entity=' + name)
    .then(response => response.body)
}

export function queryWikiMetacontents(name) {
  return new Promise(function(resolve, reject) {
    brrequest.get({
      uri: 'http://54.148.247.77:8089/api/metacontents/query_wiki?entity=' + name,
    }, function(err, response, body) {
      if (err)
        reject(err)
      resolve(JSON.parse(body))
    })
  })
}

export function queryNewsMetacontents(link) {
  return request
    .get('http://54.148.247.77:8089/api/metacontents/query_news?url=' + link)
}

export function searchNewsMetacontents(name, sites, isFull) {
  return request
    .get('http://54.148.247.77:8089/api/metacontents/search_news?entity=' + name
      + '&sites=' + JSON.stringify(sites)
      + "&full_res=" + isFull)
}

export function submitMetacontent(metacontent) {
  return fetch('http://54.148.247.77:8089/api/channels/'+metacontent.channel+'/metacontents',
    {
      method:'POST',
      body:JSON.stringify(metacontent),
      json:true,
      headers: {
        'Content-Type': 'application/json charset=utf-8',
      },
    })
      .then(response => response.status)
}

export function putMetacontent(metacontent) {
  return request
    .put('http://54.148.247.77:8089/api/channels/'+metacontent.channel_id+'/metacontents')
    .send(JSON.stringify(metacontent))
}

export function deleteMetacontent(metacontent) {
  return fetch('http://54.148.247.77:8089/api/channels/'+ metacontent.ChannelId+'/metacontents',
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
