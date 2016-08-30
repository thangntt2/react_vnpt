var request = require('browser-request')
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
  return new Promise(function(resolve, reject) {
    request.post({
      uri: 'http://52.163.214.52:8089/api/channels/'+metacontent.channelId+"/metacontents",
      body: {
        name: metacontent.name,
        description: metacontent.description,
        url: metacontent.url,
        image: metacontent.image,
        category: metacontent.category,
      }
    }, function(err, response, body) {
      if (err)
        reject(err)
      resolve(response.response.status)
    })
  })
}

export function searchNewsMetacontents() {

}
