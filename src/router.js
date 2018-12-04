import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ProductLibrary from './views/productLibrary.vue'
import taoke from './views/taoke.vue'
import admin from './views/admin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: ProductLibrary
    },
    {
      path: '/taoke',
      name: 'taoke',
      component: taoke
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  ]
})
