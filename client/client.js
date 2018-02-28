// Necessary modules
const rl = require('readline-sync')   // Allows accepting user input and actually waiting for it.

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
let turn = `${cyan}X` // Switches around to control what gets placed.
let logTurn           // What to log for the "Turn: " label next to the board
let logTaken          // Whether or not to log the "Already taken" error
let logOOR            // Whether or not to log the "Not 1-9" error
let winner = 'none'   // Will change when there is a winner
let boardState = []   // Initializing array for the state of each chunk
let boardChoices = [1,2,3,4,5,6,7,8,9]  // Choices possible; with the "Not 1-9" error
let winConditions = []     // Initalizing conditions for how the letters must match in order for the game to be won



// Win Checks
let checkWins = () => {
  winner = 'none'   // Double checks that winner variable is set to right thing at first
  let drawCheck = 0 
  for (let i = 0; i < winConditions.length; i++) {
    if (winConditions[i][0] !== 0) {
      if (winConditions[i][0] === winConditions[i][1] && winConditions[i][0] === winConditions[i][2] && winConditions[i][0] === 1) {
        winner = 'x'
      } else if (winConditions[i][0] === winConditions[i][1] && winConditions[i][0] === winConditions[i][2] && winConditions[i][0] === 2) {
        winner = 'o'
      } else if (winConditions[i].indexOf(0) === -1) {
        drawCheck += 1
      }
    }
  }
  if (drawCheck === 8) {
    winner = 'draw'
  }
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
mode = 'local'  // Old thing for when I build in global functionality
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
      checkWins()
    } else {
      console.log(`\n${yellow}GAME OVER!`)
      if (winner === 'draw') {
        console.log(`${boldRed}DRAW! ${boldGray}Nobody Wins!`)
      } else if (winner === 'x') {
        console.log(`${boldCyan}X ${boldGray}Wins!`)
      } else if (winner === `o`) {
        console.log(`${boldGreen}O ${boldGray}Wins!`)
      }
      break
    }
  }
}



