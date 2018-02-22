// Colors for POSIX-compliant terminals
let green = '\033[0;32m'
let cyan = '\033[0;36m'
let red = '\033[0;31m'
let boldGreen = '\033[1;32m'
let boldCyan = '\033[1;36m'
let boldGray = '\033[1;37m'
let reset = '\033[0m'
let clear = '\033[H\033[2J'

// Hopefully something like time.sleep()
let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

//console.log(clear)

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
console.log(board)
console.log(`==========================================\n\n`)
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
let drawBoard = (tl=0, tm=0, tr=0, ml=0, mm=0, mr=0, bl=0, bm=0, br=0) => {
  tl = topLeft[tl].split('\n')
  tm = topMid[tm].split('\n')
	tr = topRight[tr].split('\n')
  ml = midLeft[ml].split('\n')
  mm = midMid[mm].split('\n')
  mr = midRight[mr].split('\n')
  bl = botLeft[bl].split('\n')
  bm = botMid[bm].split('\n')
  br = botRight[br].split('\n')
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

// 0: blank, 1: 'x', 2: 'o'
// Default is blank; must specify value if it is going to change
drawBoard(2,1,2,1,1,1,2,2,1)


