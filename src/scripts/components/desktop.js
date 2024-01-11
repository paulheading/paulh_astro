import $ from "~scripts/selectors";
import {
  handleGroupFolderClicks,
  handleSingleFolderClicks,
} from "~scripts/components/desktop/folders";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";

gsap.registerPlugin(Draggable);

$.desktop_groupfolders.forEach(handleGroupFolderClicks);

$.desktop_singlefolders.forEach(handleSingleFolderClicks);

function createDraggableWindow(window) {
  const isSpotify = window.getAttribute("data-label") == "spotify";

  if (isSpotify) {
    const trigger = window.querySelector("header");
    Draggable.create(window, { trigger });
  } else {
    Draggable.create(window);
  }
}

function createDraggableGroupWindow(folder) {
  const window = folder.querySelector(".outer-window");
  const trigger = window.querySelector(".topbar");

  Draggable.create(window, { trigger });
}

$.desktop_windows.forEach(createDraggableWindow);

$.desktop_groupfolders.forEach(createDraggableGroupWindow);
