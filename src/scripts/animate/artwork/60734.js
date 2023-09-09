import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/dist/DrawSVGPlugin'
import { start, end } from '~data/timings'

gsap.registerPlugin(DrawSVGPlugin)

function animation(target) {
  const $ = (selector) => target.querySelector('#' + selector)

  const $mouse = $('mouse')
  const $left_squiggle = $('left_squiggle')
  const $right_squiggle = $('right_squiggle')
  const $box = $('box')

  const strokes = [$mouse, $left_squiggle, $right_squiggle]

  const all = [...strokes, $box]

  const tl = gsap.timeline()

  const clearProps = 'all'
  const display = 'block'
  const squiggle_duration = 1.2
  const mouse_duration = squiggle_duration / 3

  // prettier-ignore
  tl.set(strokes, { drawSVG: "0% 0%" }) // invisible
    .set($mouse, { display }, start)
    .to($mouse, { drawSVG: "0% 100%", duration: mouse_duration })
    .to($mouse, { drawSVG: "100% 100%", duration: mouse_duration })
    .set($left_squiggle, { display })
    .to($left_squiggle, { drawSVG: "0% 100%", duration: squiggle_duration })
    .set([$box, $right_squiggle], { display })
    .to($right_squiggle, { drawSVG: "0% 100%", duration: squiggle_duration })
    .set(all, { clearProps }, end);

  return tl
}

export default animation
