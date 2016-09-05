//Channels.js
require('es6-promise').polyfill();
require('isomorphic-fetch');
export function getChannelsList() {
	return new Promise(function(resolve, reject) {
    fetch('http://52.163.214.52:8089/api/channels')
      .then(function(response) {
        if (response.status != 200)
          reject(response)
        return response.json()
      })
      .then(function(channels) {
        console.log(channels)
        resolve(channels)
      })
	})
}


