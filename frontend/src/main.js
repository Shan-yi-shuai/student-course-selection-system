import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue2Editor from 'vue2-editor'
import axios from 'axios'
import Vuex from 'vuex'
import Element from 'element-ui'
import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css'
//import { toPrimitive } from 'core-js/library/es6/symbol'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText }
  from '@fortawesome/vue-fontawesome'
import domain from './util/domain'

library.add(fas, far, fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.use(Element);

Vue.use(Vue2Editor);
//axios请求拦截器

Vue.use(Vuex);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

global.domain = domain;



// router.beforeEach((to,from, next) => {
//     if(router.app.$options.store.user) {
//       next();
//     }
//     else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       });
//     }
// })


new Vue({
  router,
  store,
  render: (h) => h(App),
  create() {
    // console.log(this.$store.state.user);
    // console.log(localStorage.getItem('user').number);
  }
}).$mount("#app");

axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers.Authorization = sessionStorage.getItem('token');
      // console.log(config)
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  });

// axios.interceptors.request.use(function (config) {
//   console.log("!")
//   // 为请求头添加Authorization字段为服务端返回的token
  
//   config.headers.Authorization = sessionStorage.getItem('token')
//   return config //固定用法 必须有返回值
//   })

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      // console.log(error);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 返回 401 清除token信息并跳转到登录页面
            store.commit(types.LOGOUT);
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}
            })
        }
      }
      return Promise.reject(error.response.data)  // 返回接口返回的错误信息
    });