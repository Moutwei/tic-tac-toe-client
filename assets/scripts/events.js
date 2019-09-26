const api = require('./api.js') // ./ in same folder
const ui = require('./ui.js')

let myClick = 'X'
$('#player').text('Player 1\'s | Place an X!')

// For determining winner or loser
let player1 = 'playing...' // current status
let player2 = 'playing...'

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
let clickCount = 0
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
      clickCount++
      console.log(clickCount)
    } else {
      // places o's
      $(event.target).text('O')
      myClick = 'X'
      // updates turn box
      $('#player').text('Player 1\'s | Place an X!')
      // FILLS placedLocations[] array with locations!
      placedLocations[event.target.id] = 'O'
      clickCount++
      console.log(clickCount)
    }
  } else {
    console.log('CANNOT PLACE AGAIN')
    $('#player').text('CANNOT PLACE AGAIN')
  }
  console.log(placedLocations) // FOUND THE LOCATIONS ----------------- console

  // PLAYER 1 and 2 WIN TEST
  if ((placedLocations[0] === 'X' && placedLocations[1] === 'X' && placedLocations[2] === 'X') ||
  (placedLocations[3] === 'X' && placedLocations[4] === 'X' && placedLocations[5] === 'X') ||
  (placedLocations[6] === 'X' && placedLocations[7] === 'X' && placedLocations[8] === 'X') ||
  (placedLocations[0] === 'X' && placedLocations[3] === 'X' && placedLocations[6] === 'X') ||
  (placedLocations[1] === 'X' && placedLocations[4] === 'X' && placedLocations[7] === 'X') ||
  (placedLocations[2] === 'X' && placedLocations[5] === 'X' && placedLocations[8] === 'X') ||
  (placedLocations[0] === 'X' && placedLocations[4] === 'X' && placedLocations[8] === 'X') ||
  (placedLocations[2] === 'X' && placedLocations[4] === 'X' && placedLocations[6] === 'X')) {
    $('#player').text('PLAYER 1 WINS')
    console.log('PLAYER 1 WINS!')
  }
  if ((placedLocations[0] === 'O' && placedLocations[1] === 'O' && placedLocations[2] === 'O') ||
  (placedLocations[3] === 'O' && placedLocations[4] === 'O' && placedLocations[5] === 'O') ||
  (placedLocations[6] === 'O' && placedLocations[7] === 'O' && placedLocations[8] === 'O') ||
  (placedLocations[0] === 'O' && placedLocations[3] === 'O' && placedLocations[6] === 'O') ||
  (placedLocations[1] === 'O' && placedLocations[4] === 'O' && placedLocations[7] === 'O') ||
  (placedLocations[2] === 'O' && placedLocations[5] === 'O' && placedLocations[8] === 'O') ||
  (placedLocations[0] === 'O' && placedLocations[4] === 'O' && placedLocations[8] === 'O') ||
  (placedLocations[2] === 'O' && placedLocations[4] === 'O' && placedLocations[6] === 'O')) {
    $('#player').text('PLAYER 2 WINS')
    console.log('PLAYER 2 WINS!')
  }
  // CHECKS TIE!!!!! only needed to be valid for player 1
  if (clickCount === 9) {
    if ($('#player').text() !== 'PLAYER 1 WINS') {
      console.log('TIE')
      $('.game').off('click')
    }
  }
  // CHECKS IF GAME IS OVER OR NOT for Player 1
  if ($('#player').text() === 'PLAYER 1 WINS') {
    console.log('GAME OVER')
    $('#player').text('GAME OVER')
  }
  // CHECKS IF GAME IS OVER OR NOT for Player 2
  if ($('#player').text() === 'PLAYER 2 WINS') {
    console.log('GAME OVER')
    $('#player').text('GAME OVER')
  }
  // Makes game unclickable if the turn box is 'GAME OVER'
  if ($('#player').text() === 'GAME OVER') {
    $('.game').off('click')
  }
}

// NEW GAME FUNCTION!
const onNewGame = (event) => {
  placedLocations = [ // puts x's and o's in empty array
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
  myClick = 'X'
  $('#player').text('Player 1\'s | Place an X!')
  $('.game').text('')
  $('.game').on('click', onClick)
  clickCount = 0
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
  onClick,
  onNewGame
}
