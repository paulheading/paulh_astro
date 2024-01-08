import $ from "~scripts/selectors";
import { gsap } from "gsap";

const duration = 0.2;

function checkWindows(callback) {
  $.desktop_windows.forEach((item, index) => callback(item, index));
}

function animateWindowState({ close, window, onComplete }) {
  const tl = gsap.timeline({ defaults: { duration } });

  if (close) {
    // prettier-ignore
    tl.to(window, { opacity: 0, scale: 0.5 })
      .set(window, { visibility: "hidden", onComplete })
  } else {
    // prettier-ignore
    tl.set(window, { clearProps: "visibility" })
      .to(window, { opacity: 1, scale: 1, onComplete });
  }
}

function displayMatchingWindowName(label, name) {
  function displayMatchingName(item) {
    const labelMatch = item.getAttribute("data-label") == label;

    const nameMatch = item.getAttribute("data-name") == name;

    if (!labelMatch) return;

    animateWindowState({ close: !nameMatch, window: item });
  }

  checkWindows(displayMatchingName);
}

function closeGroupWindow(event) {
  const { currentTarget } = event;

  const $window = currentTarget.closest(".outer-window");

  const label = $window.getAttribute("data-label");

  const $folder = $window.previousSibling;

  const $openIcon = $folder.querySelector(".open-icon");

  const $shutIcon = $folder.querySelector(".shut-icon");

  const tl = gsap.timeline();

  // prettier-ignore
  tl.set($folder, { clearProps: "visibility", onComplete })
    .set($openIcon, { visibility: "hidden", delay: duration })
    .set($shutIcon, { clearProps: "visibility" });

  function onComplete() {
    animateWindowState({ close: true, window: $window });
    checkWindows(hideMatchingLabels);
  }

  function hideMatchingLabels(item) {
    const match = item.getAttribute("data-label") == label;

    if (!match) return;

    animateWindowState({ close: match, window: item });
  }
}

function openGroupFolder(event) {
  const { currentTarget } = event;

  const $window = currentTarget.nextSibling;

  const label = $window.getAttribute("data-label");

  let rows = $window.querySelectorAll(".groupfolder-row");

  let name = "";

  rows.forEach(function (item) {
    if (item.classList.contains("open")) name = item.textContent;
  });

  const $openIcon = currentTarget.querySelector(".open-icon");

  const $shutIcon = currentTarget.querySelector(".shut-icon");

  const tl = gsap.timeline();

  function onComplete() {
    animateWindowState({ close: false, window: $window });
    displayMatchingWindowName(label, name);
  }

  // prettier-ignore
  tl.set($openIcon, { clearProps: "visibility" })
    .set($shutIcon, { visibility: "hidden" })
    .add(onComplete, "+=" + duration);
}

function handleGroupFolderRows(rows) {
  function handleRowClick(event) {
    const { currentTarget } = event;

    const alreadyOpen = currentTarget.classList.contains("open");

    if (alreadyOpen) return;

    const name = currentTarget.innerText;

    const label = currentTarget.getAttribute("data-label");

    rows.forEach(function (item) {
      const match = item == currentTarget;
      match ? item.classList.add("open") : item.classList.remove("open");
    });

    displayMatchingWindowName(label, name);
  }

  rows.forEach((row) => row.addEventListener("click", handleRowClick));
}

function handleGroupFolderClicks(groupfolder) {
  const folder = groupfolder.querySelector(".folder-container");

  const window = groupfolder.querySelector(".outer-window");

  const topbar = window.querySelector(".topbar");

  const close = topbar.querySelector(".close");

  const rows = window.querySelectorAll(".groupfolder-row");

  handleGroupFolderRows(rows);

  folder.addEventListener("click", openGroupFolder);

  close.addEventListener("click", closeGroupWindow);
}

function toggleSingleFolder(event) {
  const { currentTarget } = event;

  const $openIcon = currentTarget.querySelector(".open-icon");

  const $shutIcon = currentTarget.querySelector(".shut-icon");

  const isOpen = $openIcon.style.getPropertyValue("visibility") == "visible";

  const label = currentTarget.getAttribute("data-label");

  const tl = gsap.timeline();

  // prettier-ignore
  tl.set($openIcon, { visibility: isOpen ? "hidden" : "visible" })
    .set($shutIcon, { visibility: isOpen ? "visible" : "hidden", onComplete });

  function toggleMatchingLabels(item) {
    const match = item.getAttribute("data-label") == label;

    if (!match) return;

    animateWindowState({ close: isOpen, window: item });
  }

  function onComplete() {
    checkWindows(toggleMatchingLabels);
  }
}

function handleSingleFolderClicks(container) {
  const folder = container.querySelector(".folder-container");

  folder.addEventListener("click", toggleSingleFolder);
}

export { handleGroupFolderClicks, handleSingleFolderClicks };
