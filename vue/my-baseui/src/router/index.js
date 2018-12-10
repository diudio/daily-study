import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'form',
      component: () => import('../pages/form')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../pages/form')
    }
  ]
})
