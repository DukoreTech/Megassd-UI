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
//import login from "@/views/loginView.vue"
import lot from "@/views/LotView.vue"
import Reception from "@/views/ReceptionView.vue"
import Commande from "@/views/CommandView.vue"
import Location from "@/views/LocationView.vue"
import Perte from "@/views/PerteView.vue"
import AddCommande from "@/components/Vente/Commande/CommandAddForm.vue"
import lotExForm from "@/components/Vente/Commande/lotExForm.vue"
import salesreport from "@/views/SalesreportView.vue"
import DetailStocksView from "@/views/DetailStocksView.vue"
import InvoiceOrderView from"@/views/InvoiceOrderView.vue"
import AllinVoiceView from "@/views/AllinVoiceView.vue"
import DetailsStocksView from "@/views/DetailsStocksView.vue"

const routes = [

 //{ path:'/',name:'Login',component:login },
 { path:'/',name:'Dashboard',component:Dashboard, meta: {
  requiresAuth: true
} },
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
 { path:'/Commande',name:'Commande',component:Commande },
 { path:'/AddCommande',name:'AddCommande',component:AddCommande },
 { path:'/lotExForm',name:'lotExForm',component:lotExForm },
 { path:'/Location',name:'Location',component:Location },
 { path:'/Perte',name:'Perte',component:Perte },
 { path:'/salesreport',name:'salesreport',component:salesreport },
 { path:'/DetailStocksView',name:'DetailStocksView',component:DetailStocksView },
 { path:'/DetailsStocksView',name:'DetailsStocksView',component:DetailsStocksView },
 { path:'/AllinVoiceView',name:'AllinVoiceView',component:AllinVoiceView },
 {path:'/InvoiceOrderView/:id',name:'InvoiceOrderView',component:InvoiceOrderView,props: true},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes  
})




export default router










