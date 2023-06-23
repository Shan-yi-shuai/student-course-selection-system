import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user') || undefined, // test{number:223344, password:'123456g'},  //
    //token:undefined || localStorage.getItem('token'),
    initialPassword: "123456g", // 管理员录入的初始密码
  },
  mutations: {
    login (state, payload) {
      state.user = payload;
      localStorage.setItem('user',payload);
      sessionStorage.setItem("user",payload);
    },
    logout (state) {
      state.user = undefined;
    },
    initialRegister (state, payload) {
      state.initialPassword = payload;
      localStorage.setItem('initial_password',payload);
    },
    get(state,key) {
      // console.log('getgetgetgetget',key,localStorage.getItem('user'),sessionStorage.getItem('user'));
      return localStorage.getItem(key);
    }
  },
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  actions: {
    login (context, payload) {
      context.commit('login', payload);
    },
    logout (context) {
      context.commit('logout');
    },
    initialRegister (context, payload) {
      context.commit('initialRegister', payload);
    },
    get(context, payload) {
      context.commit('get', payload);
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
