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

  if (subfolder) Draggable.create(subfolder);
}

function draggableWindow(window) {
  // let isSpotify = window.getAttribute("data-group") == "spotify";

  // if (isSpotify) {
  //   let target = window.querySelector("header");

  //   return Draggable.create(target);
  // }

  return Draggable.create(window);
}

function setupDraggables() {
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
