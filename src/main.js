// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/content.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Qs from 'qs';
import Home from '../src/pages/home.vue'
import VueLazyload from 'vue-lazyload'
import 'jquery'
import './assets/key'


// 导入axios
import Axios from 'axios'
// 将axios挂载到Vue上
Vue.prototype.$axios = Axios
// 引入sweiper
Vue.use(VueAwesomeSwiper)
//引入iView
Vue.use(iView)
//引入ElementUI
Vue.use(ElementUI);
//VueLazyload
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.jpg',
  loading: 'dist/loading.gif',
  attempt: 1
})







Vue.config.productionTip = false

Vue.prototype.HOST = '/api'
Vue.prototype.$axios = Axios;
// Axios.defaults.baseURL = 'http://v.juhe.cn/movie/';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//添加请求拦截器
Axios.interceptors.request.use(function(config){
  if(config.method == 'post'){
    config.data = Qs.stringify(config.data)
  }
  return config;
},function(error){
  return Promise.reject(error);
});
//添加响应拦截器
Axios.interceptors.request.use(function(response){
  return response;
},function (error){
  return Promise.reject(error);
});







/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data:{
 
  },
  methods:{
    // get(){
    //   this.$axios.get(this.urls.in_theaters,{
    //     params:{
    //       Property:'title'
    //     }
    //   }).then(res => {//请求成功
    //     this.contentlist = res['count']['subjects']
    //     console.log(res['count']['subjects']);
    //   })
    //   .catch(error => {//请求失败
    //     console.log(error);
    //   })
    // },
    // post(){
    //   this.$axios.post('url',{
    //     params:{

    //     }
    //   }).then(res => {
    //     console.log(res);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    // }
  }
})
