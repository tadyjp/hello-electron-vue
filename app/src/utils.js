import moment from 'moment'

export default {
  formatHour (duration) {
    const d = moment.duration((duration) * 1000)
    const h = ('00' + Math.floor(d.hours())).slice(-2)
    const m = ('00' + Math.floor(d.minutes())).slice(-2)
    const s = ('00' + Math.floor(d.seconds())).slice(-2)
    return `${h}:${m}:${s}`
  }
}
