import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ProductLibrary from './views/productLibrary.vue'
import taoke from './views/taoke.vue'
import admin from './views/admin.vue'
import app from './views/app.vue'
import tToAudit from './module/admin/tToAudit.vue'
import tEndAudit from './module/admin/tEndAudit.vue'
import tDredge from './module/admin/tDredge.vue'
import tAdd from './module/taoke/tAdd.vue'
import tGoods from './module/taoke/tGoods.vue'
import tInfo from './module/taoke/tInfo.vue'
import tUser from './module/taoke/tUser.vue'
import tAllGoods from './module/app/tAllGoods.vue'
import tSelGoods from './module/app/tSelGoods.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/product',
      name: 'product',
      component: ProductLibrary
    },
    {
      path: '/taoke',
      name: 'taoke',
      redirect: '/taoke/info',
      component: taoke,
      children: [
        {
          name: 'add',
          path: 'add',
          component: tAdd
        },
        {
          name: 'goods',
          path: 'goods',
          component: tGoods
        },
        {
          name: 'info',
          path: 'info',
          component: tInfo
        },
        {
          name: 'user',
          path: 'user',
          component: tUser
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/start',
      component: admin,
      children: [
        {
          name: 'start',
          path: 'start',
          component: tToAudit
        },
        {
          name: 'end',
          path: 'end',
          component: tEndAudit
        },
        {
          name: 'dredge',
          path: 'dredge',
          component: tDredge
        }
      ]
    },
    {
      path: '/app',
      name: 'app',
      redirect: '/app/allgoods',
      component: app,
      children: [
        {
          name: 'allgoods',
          path: 'allgoods',
          component: tAllGoods
        },
        {
          name: 'selgoods',
          path: 'selgoods',
          component: tSelGoods
        }
      ]
    }
  ]
})
