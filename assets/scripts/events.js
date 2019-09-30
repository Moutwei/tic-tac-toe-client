'use-strict'
const getFormFields = require('../../lib/get-form-fields.js') // ../ go up
const api = require('./api.js') // ./ in same folder
const ui = require('./ui.js')

// initializers
let myClick = 'X'
$('#player').text('Player 1\'s | Place an X!')
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
let player1wins = 0
let player2wins = 0

// Hiders
$('.sign-in-box')
$('#sign-up-button')
$('#change-password-button').hide()
$('.sign-up-box').hide()
$('.change-password-box').hide()
$('#message').hide()
$('.sign-out-box').hide()
$('.game-box').hide()
$('.turn-box').hide()
$('.show-games-box').hide()
$('.clear-board').hide() // button
$('.create-game').hide() // button
$('.games-played-box').hide()
$('#cancel').hide()

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
      // api for updating game with X
      api.updateGameX(event.target.id)
        .then()
        .catch()
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
      // api for updating game with O
      api.updateGameO(event.target.id)
        .then()
        .catch()
    }
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
  // if TIE
  // CHECKS TIE!!!!! only needed to be valid for player 1
  if (clickCount === 9) {
    if ($('#player').text() !== 'PLAYER 1 WINS') {
      onGamesPlayed(event) // shows amount of games played
      console.log('TIE')
      $('#player').text('TIE')
      $('.game').off('click')
      $('.create-game').show()
    }
  }
  // IF PLAYER 1 WINS
  // CHECKS IF GAME IS OVER OR NOT for Player 1
  if ($('#player').text() === 'PLAYER 1 WINS') {
    onGamesPlayed(event) // shows amount of games played
    player1wins++
    console.log('GAME OVER')
    $('.create-game').show()
    $('.game').off('click')
    $('.score-by-wins-box').show()
  }

  // IF PLAYER 2 WINS
  // CHECKS IF GAME IS OVER OR NOT for Player 2
  if ($('#player').text() === 'PLAYER 2 WINS') {
    onGamesPlayed(event) // shows amount of games played
    player2wins++
    console.log('GAME OVER')
    $('.create-game').show()
    $('.game').off('click')
    $('.score-by-wins-box').show()
  }
  // Makes game unclickable if the turn box is 'GAME OVER'
  if ($('#player').text() === 'GAME OVER') {
    $('.game').off('click')
  }
}

// NEW GAME FUNCTION!
const onClearBoard = (event) => {
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

// ****************************** API EVENTS ****************************
const onSignUp = (event) => {
  event.preventDefault()
  console.log('On Sign Up Event')
  const form = event.target // grabs element in this function
  const formData = getFormFields(form) // getFormFields grabs data into object
  console.log('Form Data is', formData)
  api.signUp(formData) // AJAX methods
    .then(ui.onSignUpSuccess) // This is where you display something on your HTML
    .catch(ui.onSignUpFailure)
}
const onSignIn = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signIn(formData)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}
const onChangePassword = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}
const onSignOut = (event) => {
  event.preventDefault()
  onClearBoard() // Clears board on sign out as well
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
  // HIDE AND SHOW
  $('.game-box').hide()
  $('.show-games-box').hide()
  $('.games-played-box').hide()
  $('.turn-box').hide()
  $('.sign-out-box').hide()
  $('.sign-in-box').show()
  $('#change-password-button').hide()
  $('#sign-up-button').show()
  $('.create-game').hide() // NEW GAME
  $('.score-by-wins-box').hide()
}
const onCreateGame = (event) => {
  event.preventDefault()
  const game = event.target
  const gameData = getFormFields(game)
  api.create(gameData)
    .then()
    .catch()
  // HIDE AND SHOW
  $('.create-game').hide()
  $('.game-box').show()
  $('.show-games-box').show()
  $('.games-played-box').show()
  $('.turn-box').show()
  $('#change-password-button').hide()
  $('.sign-out-box').show() // do something when clicked REMEMBER THIS
}
// Gets amount of games played
const onGamesPlayed = (event) => {
  event.preventDefault()
  const games = event.target
  const gamesPlayedData = getFormFields(games)
  api.gamesPlayed(gamesPlayedData)
    .then()
    .catch()
}
const onSignUpButton = (event) => {
  $('#sign-up-button').hide()
  $('.sign-up-box').show()
  $('.sign-in-box').hide()
  $('#cancel').show()
  $('#change-password-button').hide()
  $('#message').hide()
}
const onCancel = (event) => {
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset')
  $('#change-password').trigger('reset')
  $('.sign-in-box').show()
  $('#sign-up-button').show()
  $('.sign-up-box').hide()
  $('#cancel').hide()
  $('#change-password-button').hide()
  $('.change-password-box').hide()
  $('#message').hide()
}
const onChangePasswordButton = (event) => {
  $('#cancel').show()
  $('#sign-up-button').hide()
  $('.change-password-box').show()
  $('#change-password-button').hide()
  $('.create-game').hide()
  $('.sign-out-box').hide()
}
module.exports = {
  onClick,
  onClearBoard,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateGame,
  onGamesPlayed,
  onSignUpButton,
  onCancel,
  onChangePasswordButton
}
