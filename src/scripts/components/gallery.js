import $ from "~scripts/selectors";

const buttons = $.gallery.getElementsByTagName("button");

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
    video.controls = true;
    video.height = 1080;
    video.width = 1920;
    video.controlsList = "nodownload noplaybackrate";
    video.disablePictureInPicture = true;
    video.style.maxWidth = "100%";
    video.style.height = "auto";
    video.muted = true;

    wrap.appendChild(close);

    wrap.appendChild(video);

    overlay.appendChild(wrap);

    $.gallery.appendChild(overlay);
  });
}
