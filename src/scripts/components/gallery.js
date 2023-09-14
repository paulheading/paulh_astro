import $ from "~scripts/selectors";

const buttons = $.gallery.getElementsByTagName("button");

function resizePlayer() {
  const overlay = $.gallery.querySelector(".overlay");

  if (!overlay) return;

  const wrap = overlay.querySelector(".wrap");

  const video = overlay.querySelector("video");

  const calc_height = (value) => Math.round(value * 0.5625);

  const calc_width = (value) => Math.round(value * 1.77);

  let width = wrap.offsetWidth;

  let height = calc_height(width);

  if (height > window.innerHeight) {
    height = window.innerHeight;
    width = calc_width(height);
  }

  video.width = width;
  video.height = height;
}

for (let index = 0; index < buttons.length; index++) {
  const button = buttons[index];

  button.addEventListener("click", function () {
    const src = button.getAttribute("data-src");

    if (!src) return;

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
    video.src = src;
    // video.controls = true;
    // video.height = "auto";
    // video.width = "100%";
    // video.controlsList = "nodownload noplaybackrate";
    // video.disablePictureInPicture = true;
    video.muted = true;

    wrap.appendChild(close);

    wrap.appendChild(video);

    overlay.appendChild(wrap);

    $.gallery.appendChild(overlay);

    resizePlayer();
  });
}

window.addEventListener("resize", resizePlayer);
