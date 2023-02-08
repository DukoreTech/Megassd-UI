import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/views/DashboardView.vue"
import User from "@/views/UserView.vue"
import Role from "@/views/RoleView.vue"
import Adresse from "@/views/AdresseView.vue"
//import Client from "@/views/ClientView.vue"
import Client from "@/components/Client/clients/ClientsAll.vue"
import TyClient from "@/views/TypeClientView.vue"
import Produit from "@/views/ProduitView.vue"
import Stock from "@/views/StockView.vue"
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
import InvoiceOrderView from "@/views/InvoiceOrderView.vue"
import AllinVoiceView from "@/views/AllinVoiceView.vue"
import DetailsStocksView from "@/views/DetailsStocksView.vue"
import Loginform from '@/components/Global/LoginForm.vue'
import Profile from "@/views/UserProfileView.vue"
import Videsrestant from "@/views/DetteVidesView.vue"
import Clientshistoric from "@/components/Client/clients/Clientshistoric.vue"
import MontantNonpayes from "@/components/Vente/DetteArgent/DetteMoney.vue"
import Stockvide from "@/components/Stock/Stock/Stockvide.vue/listesvides"
import store from '../store/index.js'

const routes = [

  //{ path:'/',name:'Login',component:login },
  {
    path: '/', name: 'Dashboard', component: Dashboard
  },
  { path: '/login', name: 'login', component: Loginform },
  {
    path: '/User', name: 'User', component: User, meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,

    }
  },
  { path: '/Role', name: 'Role', component: Role },
  {
    path: '/Adresse', name: 'Adresse', component: Adresse
  },
  { path: '/Client', name: 'Client', component: Client },
  { path: '/TyClient', name: 'TyClient', component: TyClient },
  { path: '/Produit', name: 'Produit', component: Produit },
  { path: '/Stock', name: 'Stock', component: Stock },
  { path: '/Videsrestant', name: 'Videsrestant', component: Videsrestant },
  { path: '/MontantNonpayes', name: 'MontantNonpayes', component: MontantNonpayes },
  { path: '/Clientshistoric/:id,:client', name: 'Clientshistoric', component: Clientshistoric, props: true },

  { path: '/lot', name: 'lot', component: lot },
  { path: '/Reception', name: 'Reception', component: Reception },
  { path: '/Stockvide', name: 'Stockvide', component: Stockvide },
  { path: '/Commande', name: 'Commande', component: Commande },
  { path: '/AddCommande', name: 'AddCommande', component: AddCommande },
  { path: '/lotExForm', name: 'lotExForm', component: lotExForm },
  { path: '/Location', name: 'Location', component: Location },
  { path: '/Perte', name: 'Perte', component: Perte },
  { path: '/Profile', name: 'Profile', component: Profile },
  {
    path: '/salesreport', name: 'salesreport', component: salesreport,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,

    }

  },
  {
    path: '/DetailStocksView', name: 'DetailStocksView', component: DetailStocksView,
    meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,

    }
  },
  {
    path: '/DetailsStocksView', name: 'DetailsStocksView', component: DetailsStocksView, meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,

    }
  },
  {
    path: '/AllinVoiceView', name: 'AllinVoiceView', component: AllinVoiceView, meta: {
      requiresAuth: true,
      adminAuth: true,
      userAuth: false,

    }
  },
  { path: '/InvoiceOrderView/:id', name: 'InvoiceOrderView', component: InvoiceOrderView, props: true },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('user')) {

    let user = JSON.parse(localStorage.getItem('user'));
    let role = user.user.role_id
    let accessToken = localStorage.getItem('token');
    if (to.meta.requiresAuth) {
      if (!role || !accessToken) {
        router.push({ path: '/login' });
      } else {
        if (to.meta.adminAuth) {
          if (role == 1) {
            next();
          } else {
            router.push({ path: '/' });
          }
        } else if (to.meta.userAuth) {
          if (role == 2) {
            next();
          } else {
            router.push({ path: '/' });
          }
        }
      }
    } else {
      next();
    }
  }



});





export default router










