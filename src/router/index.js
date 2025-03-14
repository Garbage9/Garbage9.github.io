import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Mine from '@/pages/mine'
import Search from '@/pages/search'
import Cinema from '@/pages/cinema'
import Details from '@/pages/details'
import Login from '@/pages/login'
import Register from '@/pages/register'
import Buy from '@/pages/buy'
import store from '../store'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter:(to,from,next)=>{
        store.commit('changeTitle','主页')
        store.commit('changeLefe','0')
        next()
      } 
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      beforeEnter:(to,from,next)=>{
        store.commit('changeTitle','个人中心')
        store.commit('changeLefe','75%')
        next()
      } 
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      beforeEnter:(to,from,next)=>{
        store.commit('changeTitle','搜索')
        store.commit('changeLefe','25%')
        next()
      } 
    },
    {
      path: '/cinema',
      name: 'cinema',
      component: Cinema,
      beforeEnter:(to,from,next)=>{
        store.commit('changeTitle','影院')
        store.commit('changeLefe','50%')
        next()
      } 
    },
     {
        path:'/details/:id',
        name:"Details",
        component:Details,
        beforeEnter:(to,from,next)=>{
          store.commit('changeLefe','详细')
          next()
        } 
      }, 
     {
        path:'/login',
        name:"login",
        component:Login,
        beforeEnter:(to,from,next)=>{
          store.commit('changeTitle','登陆')
          next()
        } 
      }, 
     {
        path:'/register',
        name:"register",
        component:Register,
        beforeEnter:(to,from,next)=>{
          store.commit('changeTitle','注册')
          next()
        } 
      }, 
     {
        path:'/buy',
        name:"buy",
        component:Buy,
        beforeEnter:(to,from,next)=>{
          store.commit('changeTitle','购票')
          next()
        } 
      } 
  ]
})
