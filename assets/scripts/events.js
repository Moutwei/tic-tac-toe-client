const api = require('./api.js') // ./ in same folder
const ui = require('./ui.js')

let myClick = 'X'

const onClick = (event) => { // event.target grabs the element!
  if ($(event.target).text() === '') {
    if (myClick === 'X') {
      $(event.target).text('X')
      myClick = 'O'
    } else {
      $(event.target).text('O')
      myClick = 'X'
    }
  } else {
    $(event.target).text('NOPE')
  }
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
