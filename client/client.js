const net = require('net')

const server = '127.0.0.1'
const port = '8080'

let client = new net.Socket()
client.connect(port, server, () => {
  console.log(`Connected to: ${server}:${port}`)
})
client.write('Hello!')

client.on('data', (data) => {
  console.log(`Data: ${data}`)
})

client.on('close', () => {
  console.log('Connection Closed')
})
