import $ from '~scripts/selectors'
import { gsap } from 'gsap'

const paths = $.wifi_paths
const delay = 0.2
const stagger = delay
const clearProps = 'all'

function animate() {
  const tl = gsap.timeline()

  // prettier-ignore
  tl.set([paths], { clearProps })
    .set([paths[2], paths[1]], { delay, stagger, opacity: 0.5 })
    .set(paths[1], { delay, stagger, opacity: 1 });

  return tl
}

export default animate
