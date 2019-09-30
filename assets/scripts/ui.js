'use strict'

const store = require('./store.js') // require store object for the object token

const successMessage = (newText) => {
  $('#message').text(newText)
  $('#message').removeClass('failure') // Makes sure only one will work!!!!!!!!!!!
  $('#message').addClass('success') // .addClass(myclass) goes into index.scss and finds class
}

const failureMessage = newText => {
  $('#message').text(newText)
  $('#message').removeClass('success') // Makes sure only one will work!!!!!!!!!!!
  $('#message').addClass('failure') // .addClass(myclass) goes into index.scss and finds class
}

const onSignUpSuccess = () => {
  successMessage('Sign Up Success, Please Sign In')
  $('#sign-in').trigger('reset')
  $('#sign-up').trigger('reset') // < clears form data!
  $('.sign-in-box').show()
  $('.sign-up-box').hide()
  $('#sign-up-button').show()
  $('#message').show()
  $('#cancel').hide()
}

const onSignUpFailure = () => {
  failureMessage('Sign Up Failed')
  $('#sign-up').trigger('reset')
  $('#message').show()
}

const onSignInSuccess = (responseData) => {
  successMessage('Sign In Success')
  console.log('responseData is', responseData) // this is where we start using the token or keep track of user
  // saves user from API to use later
  store.user = responseData.user
  console.log('store is', store)
  $('#sign-in').trigger('reset')
  // HIDE AND SHOW
  $('#sign-up-button').hide()
  $('#change-password-button').show()
  $('.change-password-box').hide()
  $('.sign-in-box').hide()
  $('.sign-out-box').show()
  $('.create-game').show() // NEW GAME\
  $('#message').hide()
}

const onSignInFailure = () => {
  failureMessage('Sign In Failed')
  $('#sign-in').trigger('reset')
  $('#sign-up-button').show()
  $('#message').show()
}

const onChangePasswordSuccess = () => {
  successMessage('Password Change Success, Please Sign In')
  $('#change-password').trigger('reset')
  $('.change-password-box').hide()
  $('#cancel').hide()
  $('.sign-in-box').show()
  $('#sign-up-button').show()
  $('#message').show()
}

const onChangePasswordFailure = () => {
  failureMessage('Password Change Failed')
  $('#change-password').trigger('reset')
  $('#message').show()
}

const onSignOutSuccess = () => {
  successMessage('Signed Out Successfully')
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#change-password').trigger('reset')
}

const onSignOutFailure = () => {
  failureMessage('Sign Out Failed')
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#change-password').trigger('reset')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}
