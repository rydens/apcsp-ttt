const net = require('net')
const rl = require('readline-sync') 

let serverIP
let serverPort

// Colors for POSIX-compliant terminals
let green = '\033[0;32m'
let cyan = ''
let red = ''
let boldGreen = ''
let boldCyan = ''
let 

let getServer = () => {
  console.log(`Please type your server.`)
  console.log(`<ip>:<port>`)
  let server = rl.question('> ')
  serverIP = server.split(':')[0]
  serverPort = server.split(':')[1]
  console.log(`Connecting to ${serverIP}:${serverPort}...`)
}
let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

console.log(`Welcome to TIC TAC TOE!`)
getServer()
console.log('\033[0;32mConnected!')


