import $ from '~scripts/selectors'
import { length } from '~data/timings'
import { gsap } from 'gsap'

const delay = length * 0.1
const opacity = 0.5
const clearProps = 'opacity'

function animate() {
  const tl = gsap.timeline({ repeat: -1 })

  // prettier-ignore
  tl.set($.time_separator, { opacity, delay })
    .set($.time_separator, { clearProps, delay });

  return tl
}

export default animate
