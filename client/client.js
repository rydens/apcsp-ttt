// Necessary modules
const net = require('net')
const rl = require('readline-sync') 

// Initializing required variables
let serverIP
let serverPort

// Colors for POSIX-compliant terminals
let green = '\033[0;32m'
let cyan = '\033[0;36m'
let red = '\033[0;31m'
let boldGreen = '\033[1;32m'
let boldCyan = '\033[1;36m'
let boldGray = '\033[1;37m'
let reset = '\033[0m'
let clear = '\033[H\033[2J'

// Connection prompts
let getServer = () => {
  console.log(`Please type your server.`)
  console.log(`<ip>:<port>`)
  let server = rl.question('> ')
  serverIP = server.split(':')[0]
  serverPort = server.split(':')[1]
  console.log(`Connecting to ${serverIP}:${serverPort}...`)
}

// Hopefully something like time.sleep()
let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let board = `
  ${green}┌────┐  ${boldGray}###          ###
  ${green}│    │  ${boldGray}###          ###
  ${green}│    │  ${boldGray}###          ###
  ${green}│    │  ${boldGray}###          ###
  ${green}└────┘  ${boldGray}###          ###
####################################
####################################
          ###   \\   /  ###
          ###    \\ /   ###
          ###     X    ###
          ###    / \\   ###
          ###   /   \\  ###
####################################
####################################
          ###          ###
          ###          ###
          ###          ###
          ###          ###
          ###          ###
`

// console.log(board)
// console.log(`==========================================\n\n`)

let topLeft = [
  `${boldGray}          #\n          #\n          #\n          #\n          #\n###########`,
  `${cyan}   \\   /  ${boldGray}#\n    ${cyan}\\ /   ${boldGray}#\n     ${cyan}X    ${boldGray}#\n    ${cyan}/ \\   ${boldGray}#\n   ${cyan}/   \\  ${boldGray}#\n${boldGray}###########`,
  `${green}  ┌────┐  ${boldGray}#\n  ${green}│    │  ${boldGray}#\n  ${green}│    │  ${boldGray}#\n  ${green}│    │  ${boldGray}#\n  ${green}└────┘  ${boldGray}#\n${boldGray}###########`]
let topMid = [
  `${boldGray}##          ##\n##          ##\n##          ##\n##          ##\n##          ##\n##############`,
  `${boldGray}##   ${cyan}\\   /  ${boldGray}##\n##    ${cyan}\\ /   ${boldGray}##\n##     ${cyan}X    ${boldGray}##\n##    ${cyan}/ \\   ${boldGray}##\n##   ${cyan}/   \\  ${boldGray}##\n##############`,
  `${boldGray}##  ${green}┌────┐  ${boldGray}##\n##  ${green}│    │  ${boldGray}##\n##  ${green}│    │  ${boldGray}##\n##  ${green}│    │  ${boldGray}##\n##  ${green}└────┘  ${boldGray}##\n##############`]
let topRight = [
  `${boldGray}#          \n#          \n#          \n#          \n#          \n###########`,
  `${boldGray}#   ${cyan}\\   /  \n${boldGray}#    ${cyan}\\ /   \n${boldGray}#     ${cyan}X    \n${boldGray}#    ${cyan}/ \\   \n${boldGray}#   ${cyan}/   \\  \n${boldGray}###########`,
  `${boldGray}#  ${green}┌────┐  \n${boldGray}#  ${green}│    │  \n${boldGray}#  ${green}│    │  \n${boldGray}#  ${green}│    │  \n${boldGray}#  ${green}└────┘  \n${boldGray}###########`]
let midLeft = [
  `${boldGray}###########\n          ${boldGray}#\n          ${boldGray}#\n          ${boldGray}#\n          ${boldGray}#\n          ${boldGray}#\n${boldGray}###########`,
  `${boldGray}###########\n   ${cyan}\\   /  ${boldGray}#\n    ${cyan}\\ /   ${boldGray}#\n     ${cyan}X    ${boldGray}#\n    ${cyan}/ \\   ${boldGray}#\n   ${cyan}/   \\  ${boldGray}#\n${boldGray}###########`,
  `${boldGray}###########\n  ${green}┌────┐  ${boldGray}#\n  ${green}│    │  ${boldGray}#\n  ${green}│    │  ${boldGray}#\n  ${green}│    │  ${boldGray}#\n  ${green}└────┘  ${boldGray}#\n${boldGray}###########`]
let midMid = [
  `${boldGray}##############\n##          ##\n##          ##\n##          ##\n##          ##\n##          ##\n##############`,
  `${boldGray}##############\n##   ${cyan}\\   /  ${boldGray}##\n##    ${cyan}\\ /   ${boldGray}##\n##     ${cyan}X    ${boldGray}##\n##    ${cyan}/ \\   ${boldGray}##\n##   ${cyan}/   \\  ${boldGray}##\n##############`,
  `${boldGray}##############\n##  ${green}┌────┐  ${boldGray}##\n##  ${green}│    │  ${boldGray}##\n##  ${green}│    │  ${boldGray}##\n##  ${green}│    │  ${boldGray}##\n##  ${green}└────┘  ${boldGray}##\n##############`]
let midRight = [
  `${boldGray}###########\n#          \n#          \n#          \n#          \n#          \n###########`,
  `${boldGray}###########\n#   ${cyan}\\   /  \n${boldGray}#    ${cyan}\\ /   \n${boldGray}#     ${cyan}X    \n${boldGray}#    ${cyan}/ \\   \n${boldGray}#   ${cyan}/   \\  \n${boldGray}###########`,
  `${boldGray}###########\n#  ${green}┌────┐  \n${boldGray}#  ${green}│    │  \n${boldGray}#  ${green}│    │  \n${boldGray}#  ${green}│    │  \n${boldGray}#  ${green}└────┘  \n${boldGray}##########`]
let botLeft = [
  `${boldGray}###########\n          #\n          #\n          #\n          #\n          #`,
  `${boldGray}###########\n   ${cyan}\\   /  ${boldGray}#\n    ${cyan}\\ /   ${boldGray}#\n     ${cyan}X    ${boldGray}#\n    ${cyan}/ \\   ${boldGray}#\n   ${cyan}/   \\  ${boldGray}#`,
  `${boldGray}###########\n  ${green}┌────┐  ${boldGray}#\n  ${green}│    │  ${boldGray}#\n  ${green}│    │  ${boldGray}#\n  ${green}│    │  ${boldGray}#\n  ${green}└────┘  ${boldGray}#`]
let botMid = [
  `${boldGray}##############\n##          ##\n##          ##\n##          ##\n##          ##\n##          ##`,
  `${boldGray}##############\n##   ${cyan}\\   /  ${boldGray}##\n##    ${cyan}\\ /   ${boldGray}##\n##     ${cyan}X    ${boldGray}##\n##    ${cyan}/ \\   ${boldGray}##\n##   ${cyan}/   \\  ${boldGray}##`,
  `${boldGray}##############\n##  ${green}┌────┐  ${boldGray}##\n##  ${green}│    │  ${boldGray}##\n##  ${green}│    │  ${boldGray}##\n##  ${green}│    │  ${boldGray}##\n##  ${green}└────┘  ${boldGray}##\n`]
let botRight = [
  `${boldGray}###########\n#          \n#          \n#          \n#          \n#          `,
  `${boldGray}###########\n#   ${cyan}\\   /  ${boldGray}\n${boldGray}#    ${cyan}\\ /   ${boldGray}\n${boldGray}#     ${cyan}X    ${boldGray}\n${boldGray}#    ${cyan}/ \\   ${boldGray}\n${boldGray}#   ${cyan}/   \\  `,
  `${boldGray}###########\n#  ${green}┌────┐  ${boldGray}\n${boldGray}#  ${green}│    │  ${boldGray}\n${boldGray}#  ${green}│    │  ${boldGray}\n${boldGray}#  ${green}│    │  ${boldGray}\n${boldGray}#  ${green}└────┘  `]

// 0: blank, 1: 'x', 2: 'o'
let drawBoard = (boardArray) => {
  tl = topLeft[boardArray[0]].split('\n')
  tm = topMid[boardArray[1]].split('\n')
  tr = topRight[boardArray[2]].split('\n')
  ml = midLeft[boardArray[3]].split('\n')
  mm = midMid[boardArray[4]].split('\n')
  mr = midRight[boardArray[5]].split('\n')
  bl = botLeft[boardArray[6]].split('\n')
  bm = botMid[boardArray[7]].split('\n')
  br = botRight[boardArray[8]].split('\n')
  for (i = 0; i < tl.length; i++) {
    console.log(tl[i] + tm[i] + tr[i])
  }
  for (i = 0; i < ml.length; i++) {
    console.log(ml[i] + mm[i] + mr[i])
  }
  for (i = 0; i < bl.length; i++) {
    console.log(bl[i] + bm[i] + br[i])
  }
}

/* Commented out for testing
// Main procedure
console.log(`Welcome to TIC TAC TOE!`)
getServer()
console.log('\033[0;32mConnected!')
// Need a sleep here
*/
console.log(clear)
// 0: blank, 1: 'x', 2: 'o'
// Default is blank; must specify value if it is going to change
// drawBoard([2,1,2,1,1,1,2,2,1])


let boardState = [0,0,0,0,0,0,0,0,0]
let alreadyTaken = []
let turn = 'x'

while (true) {
  console.log(clear)
  drawBoard(boardState)
  console.log(`\nWhat is your move?`)
  let move = rl.question('> ')
  if (Number(move) in alreadyTaken) {
    console.log(`${red}Already taken! Try Again!`)
  }
  else if (turn === 'x' && !(Number(move) in alreadyTaken)) {
    boardState[Number(move)-1] = 1
    alreadyTaken.push(Number(move))
    turn = 'o'
  } else if () {
    boardState[Number(move)-1] = 2
    turn = 'x'
  }
}
