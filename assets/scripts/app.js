'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const events = require('./events.js')

$(() => {
  // GAME HANDLERS
  $('.game').on('click', events.onClick) // GRID and current player
  $('#clear-board').on('click', events.onClearBoard)
  $('#create-game').on('click', events.onCreateGame) // creates game
  $('#show-games').on('click', events.onGamesPlayed) // gets amount of games
  // API HANDLERS
  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  $('#change-password').on('submit', events.onChangePassword)
  $('#sign-out').on('submit', events.onSignOut)
})
