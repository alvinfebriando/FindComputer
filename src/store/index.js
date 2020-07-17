import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    logout(state) {
      state.isLoggedIn = false;
    },
    login(state) {
      state.isLoggedIn = true;
    },
  },
  actions: {},
  modules: {},
});
