import $ from "~scripts/selectors";

const buttons = $.gallery.getElementsByTagName("button");

function setupVideo(src, ratio) {
  const video = document.createElement("video");
  const portrait = ratio > 1;
  const size = 1280;

  if (portrait) {
    video.height = size;
    video.width = size / ratio;
  } else {
    video.width = size;
    video.height = size * ratio;
  }

  // video.id = "video_player";
  // video.height = "auto";
  // video.width = "100%";
  // video.controlsList = "nodownload noplaybackrate";
  // video.disablePictureInPicture = true;

  video.src = src;
  video.controls = false;
  video.muted = true;
  video.autoplay = true;
  video.loop = true;

  return video;
}

for (let index = 0; index < buttons.length; index++) {
  const button = buttons[index];

  button.addEventListener("click", function () {
    const src = button.getAttribute("data-src");

    if (!src) return;

    const ratio = button.getAttribute("data-ratio");

    const body = document.getElementsByTagName("body")[0];

    const overlay = document.createElement("div");

    const wrap = document.createElement("div");

    const video = setupVideo(src, ratio);

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

    wrap.appendChild(close);

    wrap.appendChild(video);

    overlay.appendChild(wrap);

    $.gallery.appendChild(overlay);
  });
}
