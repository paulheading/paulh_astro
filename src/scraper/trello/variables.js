const id = {
  user: process.env.TRELLO_ID_USER,
  board: process.env.TRELLO_ID_BOARD,
}

const list = {
  pages: process.env.TRELLO_LIST_PAGES,
  hero: process.env.TRELLO_LIST_HERO,
  projects: process.env.TRELLO_LIST_PROJECTS,
  roles: process.env.TRELLO_LIST_ROLES,
  education: process.env.TRELLO_LIST_EDUCATION,
}

const api = {
  key: process.env.TRELLO_API_KEY,
  base: 'https://api.trello.com/1/',
}

const user = {
  token: process.env.TRELLO_USER_TOKEN,
}

const string = {
  cards: (target) => 'list/' + target + '/cards/',
  attachments: (target) => 'cards/' + target + '/attachments',
  actions: (target) => 'cards/' + target + '/actions',
  url: (target) => api.base + target + '?key=' + api.key + '&token=' + user.token,
}

export { string, id, list, api, user }
