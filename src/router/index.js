import { createRouter, createWebHistory } from 'vue-router'
import User from "@/views/UserView.vue"
import Role from "@/views/RoleView.vue"
import Adresse from "@/views/AdresseView.vue"
import Client from "@/views/ClientView.vue"
import TyClient from "@/views/TypeClientView.vue"
import Produit from "@/views/ProduitView.vue"
import Stock from "@/views/StockView.vue"

const routes = [

 { path:'/User',name:'User',component:User },
 { path:'/Role',name:'Role',component:Role },
 { path:'/Adresse',name:'Adresse',component:Adresse },
 { path:'/Client',name:'Client',component:Client },
 { path:'/TyClient',name:'TyClient',component:TyClient },
 { path:'/Produit',name:'Produit',component:Produit },
 { path:'/Stock',name:'Stock',component:Stock },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router










