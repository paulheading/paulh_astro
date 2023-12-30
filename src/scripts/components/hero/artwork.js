import animate from "~scripts/animate/artwork";

function toggle(svgs, loop) {
  for (let index = 0; index < svgs.length; index++) {
    const svg = svgs[index];
    const data = svg.getAttribute("data-loop");

    if (data != loop) {
      svg.removeAttribute("style");
    } else {
      svg.setAttribute("style", "display: block;");
      animate["artwork" + loop](svg);
    }
  }
}

export default { toggle, animate };
