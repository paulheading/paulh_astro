import $ from "~scripts/selectors";
import { gsap } from "gsap";

function checkWindows(callback) {
  $.desktop_windows.forEach((item, index) => callback(item, index));
}

function displayMatchingWindowName(label, name) {
  function displayMatchingName(item) {
    const labelMatch = item.getAttribute("data-label") == label;

    const nameMatch = item.getAttribute("data-name") == name;

    if (!labelMatch) return;

    item.style.visibility = nameMatch ? "visible" : "hidden";
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
  tl.set($window, { visibility: "hidden" })
    .set($folder, { visibility: "visible", onComplete })
    .set($openIcon, { visibility: "hidden", delay: 0.4 })
    .set($shutIcon, { visibility: "visible" });

  function onComplete() {
    checkWindows(hideMatchingLabels);
  }

  function hideMatchingLabels(item) {
    const match = item.getAttribute("data-label") == label;

    if (!match) return;

    item.style.visibility = "hidden";
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
    displayMatchingWindowName(label, name);
  }

  // prettier-ignore
  tl.set($openIcon, { visibility: "visible" })
    .set($shutIcon, { visibility: "hidden" })
    .set(currentTarget, { visibility: "hidden", delay: 0.4 })
    .set($window, { visibility: "visible", onComplete });
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

export default handleGroupFolderClicks;
