// let serverIP
// let serverPort     // These three are for a two-computer two-player version that needs a server.
// let logNAO

// Connection prompts           Not part of this program.
// let getServer = () => {
//   console.log(`Please type your server.`)
//   console.log(`<ip>:<port>`)
//   let server = rl.question('> ')
//   serverIP = server.split(':')[0]
//   serverPort = server.split(':')[1]
//   console.log(`Connecting to ${serverIP}:${serverPort}...`)
// }

// Allows the user to select gamemode (local/one computer or global/server)
// let modeSelection = () => {
//   let modeinput
//   while (modeinput !== 1 || modeinput !== 2) {
//     console.log(`${clear}Welcome to TIC TAC TOE!`)
//     console.log(`Select Gamemode:
// 1) Two Player Local - Play with a friend next to you
// 2) Two Player Global - Connect to a server and find an opponent`)
//     if (logNAO) {
//       console.log(red + '\033[1BNot An Option!\033[2A' + reset)
//       logNAO = false
//     }
//     modeinput = rl.question('> ')
//     if (modeinput === '1') {
//       console.log(`You selected Two Player Local!`)
//       return 'local'
//     } else if (modeinput === '2') {
//       console.log('You selected Two Player Global!')
//       return 'global'
//     } else {
//       logNAO = true
//     }
//   }
// }