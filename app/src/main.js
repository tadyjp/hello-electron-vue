import Vue from 'vue'
import Electron from 'vue-electron'
import VueDragula from 'vue-dragula'

Vue.use(Electron)
Vue.use(VueDragula)
Vue.config.debug = true

import App from './App'

/* eslint-disable no-new */
new Vue({
  ...App,
  strict: true
}).$mount('#app')

// const {screen} = require('electron')

// setInterval(function () {
//   console.log(screen.getCursorScreenPoint())
// }, 1000)

