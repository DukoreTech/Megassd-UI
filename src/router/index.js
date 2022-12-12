import { createRouter, createWebHistory } from 'vue-router'
import User from "@/views/UserView.vue"
import Role from "@/views/RoleView.vue"

const routes = [

 { path:'/User',name:'User',component:User },
 { path:'/Role',name:'Role',component:Role },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router










