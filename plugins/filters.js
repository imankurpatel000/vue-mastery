import Vue from 'vue'
import moment from 'moment'

Vue.filter('time', (value) => {
  return value.replace(/^0(?:0:0?)?/, '')
})

Vue.filter('timeToText', (value) => {
  let time = moment(value, 'HH:mm:ss').format('H[h] MM[min]')
  return time.split(' ').filter(unit => parseInt(unit) !== 0).join(' ')
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
