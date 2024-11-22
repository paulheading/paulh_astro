import { gsap } from "gsap";
import { end } from "~data/timings";
import $ from "~scripts/selectors";

const tl = {
  loop: gsap.timeline({ repeat: -1, repeatDelay: 0.5 }),
  main: gsap.timeline(),
};

function animate() {
  const $purple = {};
  const $gold = {};
  const $red = {};

  $purple.ball = $.success_ellipses[0];
  $purple.ball2 = $purple.ball.cloneNode(true);
  $purple.ball3 = $purple.ball.cloneNode(true);

  $gold.ball = $.success_ellipses[1];
  $gold.ball2 = $gold.ball.cloneNode(true);
  $gold.ball3 = $gold.ball.cloneNode(true);

  $red.ball = $.success_ellipses[2];
  $red.ball2 = $red.ball.cloneNode(true);
  $red.ball3 = $red.ball.cloneNode(true);

  const $balls = [
    $purple.ball,
    $purple.ball2,
    $purple.ball3,
    $gold.ball,
    $gold.ball2,
    $gold.ball3,
    $red.ball,
    $red.ball2,
    $red.ball3,
  ];

  const $clones = [
    $purple.ball2,
    $purple.ball3,
    $gold.ball2,
    $gold.ball3,
    $red.ball2,
    $red.ball3,
  ];

  $clones.forEach(($clone) => $.success_colors.appendChild($clone));

  const $all = [
    $.contact_form,
    $.contact_success,
    $.success_title,
    $.success_group,
    ...$balls,
  ];

  const reset = {};
  const expand = {};

  reset.balls = function () {
    const tl = gsap.timeline();

    // prettier-ignore
    tl.set($purple.ball2, { x: 8, y: -8 })
      .set($purple.ball3, { x: -1, y: -9 })
      .set($gold.ball2, { x: -6, y: -8 })
      .set($gold.ball3, { x: -10, y: 0 })
      .set($red.ball2, { x: 9, y: 2 })
      .set($red.ball3, { x: 9, y: -6 });
  };

  reset.lines = function () {
    const tl = gsap.timeline();

    // prettier-ignore
    tl.set($.success_paths, { clearProps: 'all' });
  };

  expand.balls = function () {
    const tl = gsap.timeline();

    // prettier-ignore
    tl.set($purple.ball2, { y: -10 })
      .set($purple.ball3, { x: -2, y: -10 })
      .set($gold.ball2, { y: -10 })
      .set($gold.ball, { x: 2, y: -1 })
      .set($red.ball2, { x: 10, y: 4 })
      .set($red.ball3, { x: 11 });
  };

  expand.lines = function () {
    const tl = gsap.timeline();

    // prettier-ignore
    tl.set($.success_paths, { clearProps: "stroke" })
      .set($.success_paths[0], { y: -1, rotate: -20 })
      .set($.success_paths[1], { x: -3, y: 3, rotate: -45 })
      .set($.success_paths[3], { x: -1, y: 1, rotate: -35 })
      .set($.success_paths[2], { x: 2, y: 2, rotate: -20 });
  };

  function loop() {
    // prettier-ignore
    tl.loop.add(reset.balls)
           .add(reset.lines)
           .set($.success_group, { scale: 0.94, opacity: 0.3 })
           .set($.success_group, { clearProps: "all", delay: 0.5 })
           .add(expand.balls)
           .add(expand.lines);
  }

  reset.balls();
  reset.lines();

  const onComplete = {};

  onComplete.all = function () {
    tl.main.pause();
    tl.loop.pause();
  };

  onComplete.form = function () {
    $.contact_form.reset();
  };

  // prettier-ignore
  tl.main.set($.contact_form, { display: "none", onComplete: () => onComplete.form() })
    .set($.contact_success, { display: "block" })
    .set($.success_title, { y: -10 })
    .add(loop)
    .set($all, { clearProps: "all", onComplete: () => onComplete.all() }, end);
}

export default animate;
