import $ from '~scripts/selectors'
import animate from '~scripts/animate/time'

function update() {
  const timeZone = 'Europe/London'
  const timeStyle = 'short'
  const time = new Date().toLocaleString('en-GB', { timeZone, timeStyle })

  $.time_hours.innerHTML = time.slice(0, 2)
  $.time_minutes.innerHTML = time.slice(-2)
}

export default { update, animate }
