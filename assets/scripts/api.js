const config = require('./config.js')
const store = require('./store.js')

const signUp = (formData) => {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-up',
    data: formData
  })
}
const signIn = (formData) => {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-in',
    data: formData
  })
}
const changePassword = (formData) => {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/change-password',
    headers: { // reason for this is this instruction! ---> (requires Authorization header)
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}
const signOut = () => {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/sign-out',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
let id = 0 // id = for data check below
// CREATES GAME
const create = () => {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/games',
    success: function (data) {
      id = data.game.id
    },
    headers: { // reason for this is this instruction! ---> (requires Authorization header)
      Authorization: 'Token token=' + store.user.token
    }
  })
}
// GETS AMOUNT OF GAMES
let totalGames = 0
const gamesPlayed = () => {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/games',
    success: function (data) {
      console.log('My Games: ', data)
      totalGames = data.games.length // GETS AMOUNT OF GAMES as ARRAY
      console.log(totalGames)
    },
    headers: { // reason for this is this instruction! ---> (requires Authorization header)
      Authorization: 'Token token=' + store.user.token
    }
  })
}
// UPDATE GAME with X
const updateGameX = (index) => {
  console.log()
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/games/' + id,
    headers: { // reason for this is this instruction! ---> (requires Authorization header)
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': {
        'cell': {
          'index': index,
          'value': 'X'
        },
        'over': false
      }
    }
  })
}
// UPDATE GAME with O
const updateGameO = (index) => {
  console.log()
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/games/' + id,
    headers: { // reason for this is this instruction! ---> (requires Authorization header)
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': {
        'cell': {
          'index': index,
          'value': 'O'
        },
        'over': false
      }
    }
  })
}
module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  create,
  gamesPlayed,
  updateGameX,
  updateGameO
}
