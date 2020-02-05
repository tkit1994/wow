import Vue from 'vue'
import VueRouter from 'vue-router'
import wow from '@/components/wow.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: wow
  }
]

const router = new VueRouter({
  routes
})

export default router
