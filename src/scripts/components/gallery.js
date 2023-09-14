import $ from "~scripts/selectors";

const buttons = $.gallery.getElementsByTagName("button");

function calc_invert(ratio) {
  const width = 1;
  const height = 1 * ratio;
  const inverse = width / height;

  return inverse.toFixed(3);
}

const calc_height = (value, ratio) => Math.round(value * ratio);

const calc_width = (value, ratio) => Math.round(value * calc_invert(ratio));

function resizePlayer() {
  const overlay = $.gallery.querySelector(".overlay");

  if (!overlay) return;

  const wrap = overlay.querySelector(".wrap");

  const video = overlay.querySelector("video");

  const ratio = video.getAttribute("data-ratio");

  let width = wrap.offsetWidth;

  let height = calc_height(width, ratio);

  if (height > window.innerHeight) {
    height = window.innerHeight;
    width = calc_width(height, ratio);
  }

  video.width = width;

  video.height = height;
}

for (let index = 0; index < buttons.length; index++) {
  const button = buttons[index];

  button.addEventListener("click", function () {
    const data = {};

    data.src = button.getAttribute("data-src");

    if (!data.src) return;

    data.ratio = button.getAttribute("data-ratio");

    const body = document.getElementsByTagName("body")[0];

    const overlay = document.createElement("div");

    const wrap = document.createElement("div");

    const video = document.createElement("video");

    const close = document.createElement("button");

    body.style.overflow = "hidden";

    overlay.classList.add("overlay");

    wrap.classList.add("wrap");

    close.classList.add("close");

    close.innerText = "Close";

    close.addEventListener("click", function () {
      $.gallery.removeChild($.gallery.lastElementChild);
      body.removeAttribute("style");
    });

    // video.id = "video_player";
    // video.height = "auto";
    // video.width = "100%";
    // video.controlsList = "nodownload noplaybackrate";
    // video.disablePictureInPicture = true;

    video.src = data.src;
    video.controls = false;
    video.muted = true;
    video.autoplay = true;
    video.loop = true;

    video.setAttribute("data-ratio", data.ratio);

    wrap.appendChild(close);

    wrap.appendChild(video);

    overlay.appendChild(wrap);

    $.gallery.appendChild(overlay);

    resizePlayer();
  });
}

window.addEventListener("resize", resizePlayer);
