import { createRouter, createWebHistory } from 'vue-router'
import CharacterCreation from '../views/CharacterCreation.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
  ]
})

export default router
