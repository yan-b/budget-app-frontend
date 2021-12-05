import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Accounts from '../views/Accounts.vue'
import Entries from '../views/Entries.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/accounts',
    name: 'Account Overview',
    component: Accounts
  },
  {
    path: '/entries',
    name: 'Account Entries',
    component: Entries
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
