import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    num:1
  },
  mutations: {
    numAdd(state,payload){
      state.num += payload;
    }
  },
  actions: {
    
  },
  getters: {
    
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
