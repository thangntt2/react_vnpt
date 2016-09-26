//Channels.js
require('es6-promise').polyfill();
require('isomorphic-fetch');
const request = require('superagent')

export function getChannelsList() {
	return new Promise(function(resolve, reject) {
    fetch('http://54.148.247.77:8089/api/channels')
      .then(function(response) {
        if (response.status != 200)
          reject(response)
        return response.json()
      })
      .then(function(channels) {
        resolve(channels)
      })
	})
}

export function submitChannel(channel) {
  return request.post('http://54.148.247.77:8089/api/channels')
    .send(channel)
    .set('Content-Type', 'application/json')
}


export function deleteChannel(channel) {
  return request.del('http://54.148.247.77:8089/api/channels/'+channel.id)
}
