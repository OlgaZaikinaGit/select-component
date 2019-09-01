import Vue from 'vue'
import App from './vue-components/App.vue'

//import select components with theme
import SelectEl from './vue-components/SelectEl/SelectEl.vue'
import './vue-components/SelectEl/src/stylus/style.styl'

import './src/stylus/style.styl'
//
Vue.component('select-el', SelectEl)
Vue.component('app', App)
//
new Vue({ el: '#app' })