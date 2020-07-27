import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    token: '',
    username: '',
    userId: '',
  },
  mutations: {
    logout(state) {
      state.isLoggedIn = false;
      state.token = '';
      state.username = '';
      state.userId = '';
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
    },
    login(state, { token, username, userId }) {
      state.isLoggedIn = true;
      state.token = token;
      state.username = username;
      state.userId = userId;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
    },
  },
  actions: {},
  modules: {},
});
