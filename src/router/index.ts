import { createRouter, createWebHistory } from 'vue-router'
import CharacterCreation from '../views/CharacterCreation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CharacterCreation
    },
  ]
})

export default router
