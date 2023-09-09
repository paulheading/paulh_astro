import { stripHtml } from 'string-strip-html'
import showdown from 'showdown'
import { list } from './variables.js'

const create = {}

/**
 * @summary Formats strings into HTML arrays
 * @param {string} target
 * @returns {array} Array of HTML markup
 */
create.html = (target) => new showdown.Converter().makeHtml(target)

/**
 * @summary Create text snippet. Either summary or description html markup
 */
create.snippet = function (target, position) {
  var hr = '---'

  // (loop) if first character is a backtick, remove it
  while (target.slice(0, 1) == '`') target = target.slice(1)
  // (loop) if last character is a backtick, remove it
  while (target.slice(-1) == '`') target = target.slice(0, -1)

  if (!target.includes(hr)) return create.html(target)

  var split = target.split(hr)

  return create.html(split[position])
}

/**
 * @summary If possible, create text snippet from array position 0
 * @param {string} target - Trello markup
 */
create.summary = function (target) {
  target = create.snippet(target, 0)
  return stripHtml(target).result
}

/**
 * @summary If possible, create text snippet from array position 1
 * @param {string} target - Trello markup
 */
create.desc = (target) => create.snippet(target, 1)

create.type = (target) => {
  const { pages, roles, projects, education } = list
  if (target == pages) return 'page'
  if (target == roles) return 'role'
  if (target == projects) return 'project'
  if (target == education) return 'education'
  return 'unknown'
}

const remove = {}

remove.hero = (name) => name.replace('Hero: ', '')

export { remove, create }
