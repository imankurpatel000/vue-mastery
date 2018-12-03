import Vue from 'vue'

Vue.filter('time', (value) => {
  return value.replace(/^0(?:0:0?)?/, '')
})

Vue.filter('timeToText', (value) => {
  let time = value.split(':')
  time.splice(1, 0, 'h')
  time.splice(-1, 0, 'min')
  time.splice(2, 0, ' ')
  time.pop()
  let text = time
    .join('')
    .split(' ')
    .map(w => parseInt(w) !== 0 ? w : '')
    .join(' ')
  return text
})

Vue.filter('pluralizeLesson', (value) => {
  return `${value} Lesson${value > 1 ? 's' : ''}`
})

Vue.filter('truncate', (text, stop, clamp) => {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

Vue.filter('capitalize', string => {
  if (!string) return ''
  return string
    .trim()
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ')
})
