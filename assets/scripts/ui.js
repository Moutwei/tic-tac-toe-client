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
  successMessage('Sign Up Success')
}

const onSignUpFailure = () => {
  failureMessage('Sign Up Failed')
}

const onSignInSuccess = (responseData) => {
  successMessage('Sign In Success')
  console.log('responseData is', responseData) // this is where we start using the token or keep track of user
  // saves user from API to use later
  store.user = responseData.user
  console.log('store is', store)
}

const onSignInFailure = () => {
  failureMessage('Sign In Failed')
}

const onChangePasswordSuccess = () => {
  successMessage('Password Change Success')
}

const onChangePasswordFailure = () => {
  failureMessage('Password Change Failed')
}

const onSignOutSuccess = () => {
  successMessage('Signed Out Successfully')
}

const onSignOutFailure = () => {
  failureMessage('Sign Out Failed')
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
