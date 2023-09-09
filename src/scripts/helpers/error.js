const messages = {}

messages.subject = {
  valueMissing: `Please add an email subject.`,
}

messages.from = {
  valueMissing: `Please add your email address.`,
  typeMismatch: `This doesn't look like an email address.`,
  tooShort: `Just a few more letters please.`,
}

messages.message = {
  valueMissing: `Don't forget your message!`,
}

function inputError(title, input, error) {
  if (input.validity.valid) {
    input.removeAttribute('data-error')
    error.removeAttribute('data-error')
    error.textContent = ''
  } else {
    showError(title, input, error)
  }
}

function addInputListener(title) {
  var input = document.getElementById(title)
  var error = document.getElementById(title + '_error')
  input.addEventListener('input', () => inputError(title, input, error))
}

function showError(title, input, error) {
  var result = messages[title]

  if (input.validity.valueMissing) result = result.valueMissing
  else if (input.validity.typeMismatch) result = result.typeMismatch
  else if (input.validity.tooShort) result = result.tooShort

  error.textContent = result

  input.setAttribute('data-error', true)
  error.setAttribute('data-error', true)

  if (title == 'message') input.focus()
}

function submitError(event, title, input, error) {
  if (!input.validity.valid) {
    showError(title, input, error)
    event.preventDefault()
  }
}

function checkSubmitError(event, title) {
  var input = document.getElementById(title)
  var error = document.getElementById(title + '_error')
  submitError(event, title, input, error)
}

export { messages, inputError, showError, submitError, addInputListener, checkSubmitError }
