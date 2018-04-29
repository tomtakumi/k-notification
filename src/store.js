import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    saveUser (state, payload) {
      state.user = payload
    },
    signedOut (state, payload) {
      state.user = payload
    }
   },
  getters: {
    getUser (state) {
      return state.user
    },
    isSignedIn (state) {
      return state.user ? true : false
    }
  }
})