import Vue from 'vue'
import App from './App.vue'
import TextMiddleEllipsis from '../lib/vue-text-middle-ellipsis.min';

Vue.use(TextMiddleEllipsis);

new Vue({
  el: '#app',
  render: h => h(App)
})
