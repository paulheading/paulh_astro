import $ from '~scripts/selectors'

let active = 0

function displayStatus() {
  const status = `${active + 1} of ${$.trello_pages.length}`
  $.trello_status.innerHTML = status
}

function disablePrevious() {
  const disable = active <= 0
  $.trello_previous.disabled = disable
}

function disableNext() {
  const disable = active >= $.trello_pages.length - 1
  $.trello_next.disabled = disable
}

function displayPage(page, index) {
  const id = page.getAttribute('data-index')
  const match = id == active

  match ? (page.style.display = 'block') : page.removeAttribute('style')
}

function updateDisplay() {
  displayStatus()
  disablePrevious()
  disableNext()
}

function previousPage() {
  if (active > 0) active -= 1
  $.trello_pages.forEach(displayPage)
  updateDisplay()
}

function nextPage() {
  if (active < $.trello_pages.length) active += 1
  $.trello_pages.forEach(displayPage)
  updateDisplay()
}

$.trello_pages.forEach(displayPage)
updateDisplay()

$.trello_previous.addEventListener('click', previousPage)
$.trello_next.addEventListener('click', nextPage)
