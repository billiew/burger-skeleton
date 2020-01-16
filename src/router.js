import Vue from 'vue'
import Router from 'vue-router'
import Ordering from './views/Ordering.vue'
import Kitchen from './views/Kitchen.vue'
import Finishedorder from './views/finishedOrder.vue'
import Startpage from './views/Welcome.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: 'Crafty Burgers',
      },
      name: 'ordering',
      component: Ordering
    },
    {
      path: '/finishedOrder',
      meta: {
        title: 'Finishedorder',
      },
      name: 'Finished order',
      component:  () => import(/* webpackChunkName: "read" */ './views/finishedOrder.vue')
    },
    {
      path: '/startpage',
      meta: {
        title: 'Startpage',
      },
      name: 'Startpage',
      component:  () => import(/* webpackChunkName: "read" */ './views/Welcome.vue')
    },
    {
      path: '/kitchen',
      meta: {
        title: 'Kitchen',
      },
      name: 'kitchen',
      // route level code-splitting
      // this generates a separate chunk (read.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "read" */ './views/Kitchen.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router;
