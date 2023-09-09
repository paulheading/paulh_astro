const folder = (name = '', position, open = false, group = null, focus = false) => ({ name, position, open, group, focus })

const position = (a, b, c, d) => [
  {
    right: a,
    top: b,
  },
  {
    right: c,
    top: d,
  },
]

const group = (items = [], open = false) => ({
  open,
  items,
})

const group_item = (name, open = false, focus = false) => ({ name, open, focus })

const folders = [
  folder('trello', position(10, 20, 20, 40), true),
  folder('spotify', position(200, 40, 160, 90), false, group([group_item('2020'), group_item('2021'), group_item('2022', true)])),
  folder('themes', position(100, 100, 60, 170), false, group([group_item('barbican reset', true), group_item('futuro')])),
]

export default folders
