// Necessary modules
const rl = require('readline-sync')
const sleep = require('system-sleep')

// Colors for POSIX-compliant terminals
let green = '\033[0;32m'
let cyan = '\033[0;36m'
let red = '\033[0;31m'
let boldGreen = '\033[1;32m'
let boldCyan = '\033[1;36m'
let boldGray = '\033[1;37m'
let boldRed = '\033[1;31m'
let yellow = '\033[0;33m'
let reset = '\033[0m'
let clear = '\033[H\033[2J'

// Initializing required variables
let serverIP
let serverPort
let turn = `${cyan}X`
let logTurn
let logTaken
let logOOR
let logNAO
let winner = 'none'
let boardState = []
let boardChoices = [1,2,3,4,5,6,7,8,9]
let winConditions = []

// Connection prompts
let getServer = () => {
  console.log(`Please type your server.`)
  console.log(`<ip>:<port>`)
  let server = rl.question('> ')
  serverIP = server.split(':')[0]
  serverPort = server.split(':')[1]
  console.log(`Connecting to ${serverIP}:${serverPort}...`)
}

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

// Win Checks
let checkWins = () => {
  let winMaybe = 'none'
  let drawCheck = 0
  for (let i = 0; i < winConditions.length; i++) {
    if (winConditions[i][0] !== 0) {
      if (winConditions[i][0] === winConditions[i][1] && winConditions[i][0] === winConditions[i][2] && winConditions[i][0] === 1) {
        winMaybe = 'x'
      } else if (winConditions[i][0] === winConditions[i][1] && winConditions[i][0] === winConditions[i][2] && winConditions[i][0] === 2) {
        winMaybe = 'o'
      } else if (winConditions[i].indexOf(0) === -1) {
        drawCheck += 1
      }
    }
  }
  if (drawCheck === 8) {
    winMaybe = 'draw'
  }
  return winMaybe
}

let board = `
  ┌────┐  ###          ###
  │    │  ###          ###
  │    │  ###          ###
  │    │  ###          ###
  └────┘  ###          ###
####################################
####################################          1 │2 │3
          ###   \\   /  ###                   ──┼──┼──
          ###    \\ /   ###                   4 │5 │6
          ###     X    ###                   ──┼──┼──
          ###    / \\   ###                   7 │8 │9
          ###   /   \\  ###
####################################
####################################
          ###          ###
          ###          ###
          ###          ###
          ###          ###
          ###          ###
`
// Template board for numbers
let numBoard = `
1 │2 │3 
──┼──┼──
4 │5 │6
──┼──┼──
7 │8 │9
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
  `${boldGray}#   ${cyan}\\   /  ${boldGray}\n${boldGray}#    ${cyan}\\ /   ${boldGray}\n${boldGray}#     ${cyan}X    ${boldGray}\n${boldGray}#    ${cyan}/ \\   ${boldGray}\n${boldGray}#   ${cyan}/   \\  ${boldGray}\n${boldGray}###########`,
  `${boldGray}#  ${green}┌────┐  ${boldGray}\n${boldGray}#  ${green}│    │  ${boldGray}\n${boldGray}#  ${green}│    │  ${boldGray}\n${boldGray}#  ${green}│    │  ${boldGray}\n${boldGray}#  ${green}└────┘  ${boldGray}\n${boldGray}###########`]
let midLeft = [
  `${boldGray}###########\n          ${boldGray}#\n          ${boldGray}#\n          ${boldGray}#\n          ${boldGray}#\n          ${boldGray}#\n${boldGray}###########`,
  `${boldGray}###########\n   ${cyan}\\   /  ${boldGray}#\n    ${cyan}\\ /   ${boldGray}#\n     ${cyan}X    ${boldGray}#\n    ${cyan}/ \\   ${boldGray}#\n   ${cyan}/   \\  ${boldGray}#\n${boldGray}###########`,
  `${boldGray}###########\n  ${green}┌────┐  ${boldGray}#\n  ${green}│    │  ${boldGray}#\n  ${green}│    │  ${boldGray}#\n  ${green}│    │  ${boldGray}#\n  ${green}└────┘  ${boldGray}#\n${boldGray}###########`]
let midMid = [
  `${boldGray}##############\n##          ##\n##          ##\n##          ##\n##          ##\n##          ##\n##############`,
  `${boldGray}##############\n##   ${cyan}\\   /  ${boldGray}##\n##    ${cyan}\\ /   ${boldGray}##\n##     ${cyan}X    ${boldGray}##\n##    ${cyan}/ \\   ${boldGray}##\n##   ${cyan}/   \\  ${boldGray}##\n##############`,
  `${boldGray}##############\n##  ${green}┌────┐  ${boldGray}##\n##  ${green}│    │  ${boldGray}##\n##  ${green}│    │  ${boldGray}##\n##  ${green}│    │  ${boldGray}##\n##  ${green}└────┘  ${boldGray}##\n##############`]
let midRight = [
  `${boldGray}###########          ${yellow}1 │2 │3\n#                    ${yellow}──┼──┼──\n#                    ${yellow}4 │5 │6\n#                    ${yellow}──┼──┼──\n#                    ${yellow}7 │8 │9\n#          \n###########`,
  `${boldGray}###########          ${yellow}1 │2 │3\n#   ${cyan}\\   /            ${yellow}──┼──┼──\n${boldGray}#    ${cyan}\\ /             ${yellow}4 │5 │6\n${boldGray}#     ${cyan}X              ${yellow}──┼──┼──\n${boldGray}#    ${cyan}/ \\             ${yellow}7 │8 │9\n${boldGray}#   ${cyan}/   \\  \n${boldGray}###########`,
  `${boldGray}###########          ${yellow}1 │2 │3\n#  ${green}┌────┐            ${yellow}──┼──┼──\n${boldGray}#  ${green}│    │            ${yellow}4 │5 │6\n${boldGray}#  ${green}│    │            ${yellow}──┼──┼──\n${boldGray}#  ${green}│    │            ${yellow}7 │8 │9\n${boldGray}#  ${green}└────┘  \n${boldGray}###########`]
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
  for (let i = 0; i < tl.length; i++) {
    console.log(tl[i] + tm[i] + tr[i])
  }
  for (let i = 0; i < ml.length; i++) {
    console.log(ml[i] + mm[i] + mr[i])
  }
  for (let i = 0; i < bl.length; i++) {
    if (i === 0) {
      logTurn = `          Turn: ${turn}${boldGray}`
    } else {
      logTurn = ''
    }
    console.log(bl[i] + bm[i] + br[i] + logTurn)
  }
}

// Main procedure
// mode = modeSelection()

// Commented out and bypassed because we're not doing the global part for this task.
mode = 'local'
if (mode === 'local') {
  boardState = [0,0,0,0,0,0,0,0,0]
  let alreadyTaken = []

  console.log(`${clear}${boldGray}`)
  drawBoard(boardState)

  while (true) {
    if (winner === 'none') {
      console.log(`${boldGray}\nWhat is your move?`)
      if (logTaken) {
        console.log(red + '\033[1BAlready taken! Try Again!\033[2A' + boldGray)
        logTaken = false
      }
      if (logOOR) {
        console.log(red + '\033[1BNot 1-9! Try Again!\033[2A' + boldGray)
        logOOR = false
      }
      let move = rl.question('> ')
      if (alreadyTaken.indexOf(Number(move)) > -1) {
        logTaken = true
      } else if ((boardChoices.indexOf(Number(move)) > -1) === false) {
        logOOR = true
      } else if (turn === `${cyan}X`) {
        boardState[Number(move)-1] = 1
        alreadyTaken.push(Number(move))
        turn = `${green}O`
        console.log(turn)
      } else if (turn === `${green}O`) {
        boardState[Number(move)-1] = 2
        alreadyTaken.push(Number(move))
        turn = `${cyan}X`
      }
      console.log(`${clear}${boldGray}`)
      drawBoard(boardState)
      winConditions = [
    [boardState[0],boardState[1],boardState[2]],
    [boardState[3],boardState[4],boardState[5]],
    [boardState[6],boardState[7],boardState[8]],
    [boardState[0],boardState[3],boardState[6]],
    [boardState[1],boardState[4],boardState[7]],
    [boardState[2],boardState[5],boardState[8]],
    [boardState[0],boardState[4],boardState[8]],
    [boardState[2],boardState[4],boardState[6]]
    ]
      winner = checkWins()
    } else {
      console.log(`\n${yellow}GAME OVER!`)
      if (winner === 'draw') {
        console.log(`${boldRed}DRAW! ${boldGray}Nobody Wins!`)
        break
      } else if (winner === 'x') {
        console.log(`${boldCyan}X ${boldGray}Wins!`)
        break
      } else if (winner === `o`) {
        console.log(`${boldGreen}O ${boldGray}Wins!`)
        break
      }
    }
  }
}



