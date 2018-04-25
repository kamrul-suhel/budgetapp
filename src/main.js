// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App'
import router from './router'
Vue.use(Vuetify);

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
    el: '#budgetapp',
    router,
    components: {App},
    template: '<App/>'
})
