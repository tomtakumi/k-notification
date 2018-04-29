import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import * as firebase from 'firebase'
import firebaseui from 'firebaseui'
import router from './router'
import {store} from './store'
import {config} from './helpers/firebaseConfig'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp(config)

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$store.commit('saveUser', user)
        this.$router.push('/success')
      } else {
        this.$router.push('/')
      }
    })
  }
})
