import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import $ from "~scripts/selectors";
import { length } from "~data/timings";

gsap.registerPlugin(Draggable);

let duration = length * 0.05;

function forEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    callback(element, index);
  }
}

function draggableSubfolder(folder) {
  const parent = folder.parentNode;

  const subfolder = parent.querySelector(".window");

  if (subfolder) {
    let trigger = subfolder.querySelector(".topbar");

    Draggable.create(subfolder, { trigger });
  }
}

function draggableWindow(window) {
  let isSpotify = window.getAttribute("data-group") == "spotify";

  if (isSpotify) {
    let trigger = window.querySelector("header");

    Draggable.create(window, { trigger });
  } else {
    Draggable.create(window);
  }
}

function setupDraggables() {
  if (!$.windows) return;

  forEach($.windows, draggableWindow);

  forEach($.folders, draggableSubfolder);
}

const closeState = (target) => target.setAttribute("data-state", "closed");

const openState = (target) => target.setAttribute("data-state", "open");

function animateClose(window) {
  const tl = gsap.timeline();

  const onComplete = () => closeState(window);

  tl.to(window, { opacity: 0, zIndex: 1, scale: 0.5, duration, onComplete });

  return tl;
}

function animateOpen(window) {
  const tl = gsap.timeline();

  const onStart = () => openState(window);

  tl.to(window, { opacity: 1, zIndex: 2, scale: 1, duration, onStart });

  return tl;
}

export { setupDraggables, animateClose, animateOpen, closeState, openState };
