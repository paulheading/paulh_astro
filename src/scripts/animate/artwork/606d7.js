import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/dist/MorphSVGPlugin'
import { start, end } from '~data/timings'

gsap.registerPlugin(MorphSVGPlugin)

const display = 'block'
const transformOrigin = 'center'
const duration = 0.5
const opacity = 0
const scale = 1.5
const clearProps = 'all'
const x = 35

const reset = { clearProps, delay: duration }

const explode = {
  display,
  opacity,
  scale,
}

const settings = { defaults: { transformOrigin, duration } }

function animation(target) {
  const $ = (selector) => target.querySelector('#' + selector)

  const $lobby = $('lobby')
  const $hall = $('hall')
  const $stage = $('stage')
  const $garden = $('garden')

  const $bar_1 = $('bar_1')
  const $bar_2 = $('bar_2')
  const $bar_3 = $('bar_3')
  const $bar_4 = $('bar_4')

  const $sound = $('sound')
  const $marker = $('marker')

  const rooms = [$lobby, $hall, $stage, $garden]
  const bars = [$bar_1, $bar_2, $bar_3, $bar_4]

  const all = [...rooms, ...bars, $sound, $marker]

  const tl = gsap.timeline(settings)

  function resetRooms(tl, label) {
    const reset = (room) => tl.set(room, { morphSVG: room }, label)

    rooms.forEach(reset)

    return tl
  }

  function morphRooms(tl, label) {
    const morph = (room, index) => tl.to(room, { morphSVG: bars[index] }, label)

    rooms.forEach(morph)

    return tl
  }

  // prettier-ignore
  tl.set($marker, { x: -x }) // invisible
    .add(() => resetRooms(tl, "reset"), "reset") // invisible
    .set([rooms, $sound], { display }, start)
    .set($sound, { ...reset })
    .to($sound, { ...explode })
    .set($sound, { ...reset })
    .to($sound, { ...explode })
    .add(() => morphRooms(tl, "morph"), "morph")
    .to($marker, { display, x, duration: duration * 2, delay: duration })
    .set(all, { clearProps }, end);

  return tl
}

export default animation
