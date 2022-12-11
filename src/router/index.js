import { createRouter, createWebHistory } from 'vue-router'
import User from "@/views/UserView.vue"

const routes = [
 {
   path:'/User',
   name:'User',
   component:User
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router










