import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '154695311804-gplvtrsvu9hk9tlpkcc64krfs99thqch.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
  render: h => h(App),
}).$mount('#app');