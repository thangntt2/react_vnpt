//Channels.js
var request = require('browser-request')
export function getChannelsList() {
	return new Promise(function(resolve, reject) {
		request.get({
			uri: 'http://52.163.214.52:8089/api/channels',
		}, function(err, response, body) {
			if (err)
				reject(err)
			resolve(JSON.parse(body))
		})
	})
}