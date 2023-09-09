import card from '~scripts/components/page/card'
import controls from '~scripts/components/page/controls'

function setup($selector) {
  const $content = $selector.querySelector('.page-content')
  const $controls = $selector.querySelector('.controls')
  const $cards = $content.children

  for (let index = 0; index < $cards.length; index++) {
    card.readmore(index, $cards)
  }

  if ($controls) controls.setup($controls, $cards)
}

export default { setup }
