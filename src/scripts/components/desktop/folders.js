import $ from "~scripts/selectors";
import { gsap } from "gsap";

const duration = 0.2;

const get = {
  label: (target) => target.getAttribute("data-label"),
  name: (target) => target.getAttribute("data-name"),
};

function checkWindows(callback) {
  $.desktop_windows.forEach((item, index) => callback(item, index));
}

function animateWindowState({ item, isOpen, onComplete }) {
  const tl = gsap.timeline({ defaults: { duration } });

  if (isOpen) {
    //prettier-ignore
    tl.to(item, { opacity: 0, scale: 0.5 })
      .set(item, { visibility: "hidden", onComplete });
  } else {
    // prettier-ignore
    tl.set(item, { clearProps: "visibility" })
      .to(item, { opacity: 1, scale: 1, onComplete });
  }
}

function toggleMatchingWindowLabel(item, { isOpen, label }) {
  const labelMatches = get.label(item) == label;

  if (!labelMatches) return;

  animateWindowState({ item, isOpen });
}

function toggleMatchingWindowName(item, { isOpen, label, name }) {
  const labelMatches = get.label(item) == label;

  if (!labelMatches) return;

  const nameMatches = get.name(item) == name;

  if (!nameMatches) {
    animateWindowState({ item, isOpen: true });
    return;
  }

  animateWindowState({ item, isOpen });
}

function getIconState(icon) {
  return icon.style.getPropertyValue("visibility") != "hidden";
}

function animateFolderState({ icons, isOpen, onComplete }) {
  const tl = gsap.timeline();

  if (isOpen) {
    // prettier-ignore
    tl.set(icons.open, { visibility: "hidden" })
      .set(icons.closed, { clearProps: "visibility", onComplete });
  } else {
    // prettier-ignore
    tl.set(icons.closed, { visibility: "hidden" })
      .set(icons.open, { clearProps: "visibility", onComplete });
  }
}

function getFolderState(target) {
  let folder_container = target.querySelector(".folder-container");

  let folder_icons = folder_container.querySelector(".folder-icons");

  let svgs = folder_icons.getElementsByTagName("svg");

  let label = get.label(folder_container);

  let icons = {
    open: svgs[0],
    closed: svgs[1],
  };

  let isOpen = getIconState(icons.open);

  return { target, icons, isOpen, label };
}

function toggleSingleFolder(event) {
  const { currentTarget } = event;

  const $container = currentTarget.closest(".singlefolder-container");

  const settings = getFolderState($container);

  function onComplete() {
    checkWindows(function (item) {
      toggleMatchingWindowLabel(item, { ...settings });
    });
  }

  animateFolderState({
    ...settings,
    onComplete,
  });
}

function toggleGroupFolder(event) {
  const { currentTarget } = event;

  const $container = currentTarget.closest(".groupfolder-container");

  const settings = getFolderState($container);

  const $window = $container.querySelector(".outer-window");

  const $openRow = $window.querySelector(".groupfolder-row.open");

  const name = $openRow.textContent;

  function onComplete() {
    const { isOpen } = settings;
    animateWindowState({ item: $window, isOpen });

    checkWindows(function (item) {
      toggleMatchingWindowName(item, { ...settings, name });
    });
  }

  animateFolderState({
    ...settings,
    onComplete,
  });
}

function handleFolderClicks($container, callback) {
  const $folder = $container.querySelector(".folder-container");

  $folder.addEventListener("click", callback);
}

function handleRowClicks(event, $rows) {
  const { currentTarget } = event;

  const isOpen = currentTarget.classList.contains("open");

  if (isOpen) return;

  const name = currentTarget.textContent;

  const label = get.label(currentTarget);

  $rows.forEach(function ($row) {
    const match = $row == currentTarget;
    match ? $row.classList.add("open") : $row.classList.remove("open");
  });

  checkWindows(function (item) {
    toggleMatchingWindowName(item, { isOpen, label, name });
  });
}

function handleGroupFolderClicks($container) {
  const $window = $container.querySelector(".outer-window");

  const $close = $window.querySelector("button.close");

  const $rows = $window.querySelectorAll(".groupfolder-row");

  $close.addEventListener("click", toggleGroupFolder);

  $rows.forEach(function ($row) {
    $row.addEventListener("click", (event) => handleRowClicks(event, $rows));
  });

  handleFolderClicks($container, toggleGroupFolder);
}

function handleSingleFolderClicks($container) {
  handleFolderClicks($container, toggleSingleFolder);
}

export { handleGroupFolderClicks, handleSingleFolderClicks };
