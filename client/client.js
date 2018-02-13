const Client = require('node-rest-client')
let client = new Client.Client()

let server_ip = 'localhost'

client.get('localhost:8080', (data, response) => {
  console.log(data)
  console.log(response)
})
