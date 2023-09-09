import { gsap } from 'gsap'
import { trim, start, end } from '~data/timings'

// prettier-ignore
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

function stagger(link) {
  const wrap = link.querySelector('.link-content')
  const sentences = wrap.querySelectorAll('.sentence')
  const sample = sentences[0].querySelectorAll('.word')

  const tl = gsap.timeline()
  const opacity = 1
  const textDecoration = 'underline'
  const stagger = start
  const max_stagger = (sample.length - 1) * stagger
  const start_end = start + max_stagger
  const stagger_end = end - max_stagger

  var random = [...Array(sample.length).keys()]

  random = shuffle(random)

  function setWords(tl, params, label) {
    sentences.forEach((sentence) => {
      const words = sentence.querySelectorAll('.word')
      const targets = []

      for (let index = 0; index < words.length; index++) {
        const ref = random[index]
        const word = words[ref]
        targets.push(word)
      }

      tl.set(targets, { ...params, stagger }, label)
    })

    return tl
  }

  // prettier-ignore
  tl.add(() => setWords(tl, { opacity }, start), start)
    .set(link, { textDecoration }, start_end)
    .set(link, { textDecoration: "none" }, stagger_end)
    .add(() => setWords(tl, { opacity: 0 }, 'hide'), 'hide');

  return tl
}

function scroll(wrap) {
  const tl = gsap.timeline()
  const ease = 'none'
  const x = -trim * 30

  // prettier-ignore
  tl.set(wrap, { x: 0 })
    .to(wrap, { ease, x, duration: trim }, start);

  return tl
}

export default { stagger, scroll }
