import Vue from 'vue'
import Electron from 'vue-electron'

Vue.use(Electron)
Vue.config.debug = true

import App from './App'

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount('#app')

// const {screen} = require('electron')

// setInterval(function () {
//   console.log(screen.getCursorScreenPoint())
// }, 1000)

