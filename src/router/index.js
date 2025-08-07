import { createRouter, createWebHistory } from 'vue-router'
import TodoHome from '@/views/Home.vue'
import TaskDescription from '@/views/TaskDescription.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TodoHome,
  },
  {
    path: '/task/:id',
    name: 'TaskDescription',
    component: TaskDescription,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
