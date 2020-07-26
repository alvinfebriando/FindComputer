import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    token: '',
  },
  mutations: {
    logout(state) {
      state.isLoggedIn = false;
      state.token = '';
      localStorage.removeItem('token');
    },
    login(state, token) {
      state.isLoggedIn = true;
      state.token = token;
      localStorage.setItem('token', token);
    },
  },
  actions: {},
  modules: {},
});
