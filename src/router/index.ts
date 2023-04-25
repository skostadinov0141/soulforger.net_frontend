import { createRouter, createWebHistory } from 'vue-router'
import CharacterCreation from '../views/CharacterCreation.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import LandingPage from '../views/LandingPage.vue';
import axios, { type AxiosInstance } from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/characters/create',
      name: 'create_character',
      component: CharacterCreation,
      meta:{
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const api : AxiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:8000',
      withCredentials: true,
      headers:{
        Accept:'applications/json'
      }
    })
    api.get('/auth/verify-session').then((data) => {
      if (data.data.result === false) {
        next({ name: 'login'})
      } else {
        next() // go to wherever I'm going
      }
    })
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
