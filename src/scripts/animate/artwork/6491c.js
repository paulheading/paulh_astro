import { gsap } from 'gsap'
import { start, end } from '~data/timings'

function animation(target) {
  const $ = (selector) => target.querySelector('#' + selector)

  const $star_1 = $('star_1')
  const $star_2 = $('star_2')
  const $star_3 = $('star_3')
  const $star_4 = $('star_4')
  const $star_5 = $('star_5')
  const $star_6 = $('star_6')

  const stars = [$star_2, $star_3, $star_4, $star_5, $star_6]

  const $face = $('face')

  const $echo_1 = $('echo_1')
  const $echo_2 = $('echo_2')
  const $echo_3 = $('echo_3')

  const echoes = [$echo_1, $echo_2, $echo_3]

  const all = [$star_1, stars, $face, echoes]

  const tl = gsap.timeline({ defaults: { transformOrigin: 'center' } })
  const clearProps = 'all'
  const display = 'block'
  const rotation = 540
  const stagger = 0.1
  const delay = 0.2

  // prettier-ignore
  tl.to($star_1, { display, rotation }, start)
    .to(stars, { display, stagger })
    .to([$star_1, stars], { display: "none", stagger })
    .to($face, { display, delay })
    .to(echoes, { display, stagger })
    .set(all, { clearProps }, end);

  return tl
}

export default animation
