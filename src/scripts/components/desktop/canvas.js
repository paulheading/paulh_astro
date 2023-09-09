import $ from '~scripts/selectors'
import { setupDraggables, animateClose, animateOpen, closeState, openState } from '~scripts/animate/windows'

setupDraggables()

function toggleState(target) {
  const state = target.getAttribute('data-state')
  const isOpen = state == 'open'
  isOpen ? closeState(target) : openState(target)
}

function toggleWindow(window, title, group) {
  const window_group = window.getAttribute('data-group')
  const window_state = window.getAttribute('data-state')
  const window_title = window.id.slice(7)

  const titleMatch = window_title == title
  const groupMatch = window_group == group
  const isOpen = window_state == 'open'

  if (!titleMatch) {
    window.style.zIndex = 1
    if (groupMatch) animateClose(window)
    return
  }

  isOpen ? animateClose(window) : animateOpen(window)
}

function toggleFolder(folder, subfolder) {
  const match = folder.id.slice(7)

  toggleState(folder)

  if (subfolder) {
    toggleState(subfolder)
    return
  }

  $.windows.forEach((window) => toggleWindow(window, match))
}

function toggleSubfolder(subfolder, folder) {
  toggleState(subfolder)
  toggleState(folder)
}

function toggleSubWindow(event, list) {
  const { target } = event
  const title = target.innerHTML
  const group = list.getAttribute('data-group')
  const siblings = list.children

  toggleState(target)

  for (let index = 0; index < siblings.length; index++) {
    const sibling = siblings[index]
    const sibling_title = sibling.innerHTML
    if (sibling_title != title) closeState(sibling)
  }

  $.windows.forEach((window) => toggleWindow(window, title, group))
}

function folder(folder) {
  const parent = folder.parentNode
  const subfolder = parent.querySelector('.window')

  if (subfolder) {
    const close = subfolder.querySelector('.close')
    const list = subfolder.querySelector('.list')
    const folders = list.getElementsByTagName('button')

    close.addEventListener('click', () => toggleSubfolder(subfolder, folder))

    for (let index = 0; index < folders.length; index++) {
      const folder = folders[index]
      folder.addEventListener('click', (event) => toggleSubWindow(event, list))
    }
  }

  folder.addEventListener('click', () => toggleFolder(folder, subfolder))
}

function focusWindow(item) {
  for (let index = 0; index < $.windows.length; index++) {
    const window = $.windows[index]
    const isFocused = window == item
    window.style.zIndex = isFocused ? 2 : 1
  }
}

function attachFocusWindow(elements, item) {
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index]
    element.addEventListener('focus', () => focusWindow(item))
  }
}

function window(item) {
  const $skiplink = item.querySelector('.skiplink')
  const buttons = item.getElementsByTagName('button')
  const links = item.getElementsByTagName('a')

  $skiplink.addEventListener('click', () => $.folders[0].focus())

  attachFocusWindow(buttons, item)
  attachFocusWindow(links, item)
}

$.folders.forEach(folder)

$.windows.forEach(window)
