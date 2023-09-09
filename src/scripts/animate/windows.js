import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import $ from '~scripts/selectors'
import { length } from '~data/timings'

gsap.registerPlugin(Draggable)

let duration = length * 0.05

function setupDraggables() {
  for (let index = 0; index < $.windows.length; index++) {
    const window = $.windows[index]
    Draggable.create(window)
  }

  for (let index = 0; index < $.folders.length; index++) {
    const folder = $.folders[index]
    const parent = folder.parentNode
    const subfolder = parent.querySelector('.window')

    if (subfolder) Draggable.create(subfolder)
  }
}

const closeState = (target) => target.setAttribute('data-state', 'closed')

const openState = (target) => target.setAttribute('data-state', 'open')

function animateClose(window) {
  const tl = gsap.timeline()

  const onComplete = () => closeState(window)

  tl.to(window, { opacity: 0, zIndex: 1, scale: 0.5, duration, onComplete })

  return tl
}

function animateOpen(window) {
  const tl = gsap.timeline()

  const onStart = () => openState(window)

  tl.to(window, { opacity: 1, zIndex: 2, scale: 1, duration, onStart })

  return tl
}

export { setupDraggables, animateClose, animateOpen, closeState, openState }
