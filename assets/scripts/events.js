const api = require('./api.js') // ./ in same folder
const ui = require('./ui.js')

let myClick = 'X'
$('#player').text('Player 1\'s | Place an X!')

// For determining winner or loser
let player1 = 'playing...' // current status
let player2 = 'playing...'

// all possible location combinations for three x's or o's in a row
const winningCombinations = [
  [0, 1, 2], // Row Winning Combinations
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Collumn Winning Combinations
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Cross Winning Combinations
  [2, 4, 6]
]
let placedLocations = [ // puts x's and o's in empty array
  '', // 0
  '', // 1
  '', // 2
  '', // 3
  '', // 4
  '', // 5
  '', // 6
  '', // 7
  '' // 8
]
// onClick handles both the GAME GRID and Turn (current-player) Box
const onClick = (event) => { // event.target grabs the element!
  // code for displaying x's or o's and if already clicked
  if ($(event.target).text() === '') {
    // places x's
    if (myClick === 'X') {
      $(event.target).text('X')
      myClick = 'O'
      // updates turn box
      $('#player').text('Player 2\'s | Place an O!')
      // FILLS placedLocations[] array with locations!
      placedLocations[event.target.id] = 'X'
    } else {
      // places o's
      $(event.target).text('O')
      myClick = 'X'
      // updates turn box
      $('#player').text('Player 1\'s | Place an X!')
      // FILLS placedLocations[] array with locations!
      placedLocations[event.target.id] = 'O'
    }
  } else {
    console.log('CANNOT CLICK AGAIN')
  }
  console.log(placedLocations) // FOUND THE LOCATIONS
}

// for (let i = 0; i <= myElements.length; i++) {
//  $(myElements[i]).click(function () {
//  $(this).data('clicked', true)
//  })
// if ($(myElements[i]).data('clicked')) {
// $(myElements[i]).html('X')
// }
// }

/*
  api.click() // AJAX methods // might need data in parameters for o and x
  // FINISH IN API.js ^^^
    .then(ui.onClickSuccess) // This is where you display something on your HTML
    .catch(ui.onClickFailure) // another way of saying on VALID CLICK
}
*/
module.exports = {
  onClick
}
