import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/views/DashboardView.vue"
import User from "@/views/UserView.vue"
import Role from "@/views/RoleView.vue"
import Adresse from "@/views/AdresseView.vue"
import Client from "@/views/ClientView.vue"
import TyClient from "@/views/TypeClientView.vue"
import Produit from "@/views/ProduitView.vue"
import Stock from "@/views/StockView.vue"
import TypeStock from "@/views/TypeStockView.vue"
import login from "@/views/loginView.vue"
import lot from "@/views/LotView.vue"
import Reception from "@/views/ReceptionView.vue"

const routes = [

 { path:'/',name:'Login',component:login },
 { path:'/Dashboard',name:'Dashboard',component:Dashboard },
 { path:'/User',name:'User',component:User },
 { path:'/Role',name:'Role',component:Role },
 { path:'/Adresse',name:'Adresse',component:Adresse },
 { path:'/Client',name:'Client',component:Client },
 { path:'/TyClient',name:'TyClient',component:TyClient },
 { path:'/Produit',name:'Produit',component:Produit },
 { path:'/Stock',name:'Stock',component:Stock },
 { path:'/TypeStock',name:'TypeStock',component:TypeStock },
 { path:'/lot',name:'lot',component:lot },
 { path:'/Reception',name:'Reception',component:Reception },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router










