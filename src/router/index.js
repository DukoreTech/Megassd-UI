import { createRouter, createWebHistory } from 'vue-router'
import User from "@/views/UserView.vue"
import Role from "@/views/RoleView.vue"
import Adresse from "@/views/AdresseView.vue"
import Client from "@/views/ClientView.vue"

const routes = [

 { path:'/User',name:'User',component:User },
 { path:'/Role',name:'Role',component:Role },
 { path:'/Adresse',name:'Adresse',component:Adresse },
 { path:'/Client',name:'Client',component:Client },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router










