import { createStore } from 'vuex'

export default createStore({
  state:{
    baseUrl: 'http://localhost:3000',
    users:[],
    IdEditUser:null,
    roles:[],
    IdEditRole:null,
    adresses:[],
    IdEditAdresse:null,
    clients:[],
    IdEditClient:null,
    typeClients:[],
    editTypeClient:null,
    produits:[],
    IdEditProduit:null,
    stocks:[],
    IdEditStock:null

  },
  mutations: {
  
  },
  actions: {
  },
  modules: {
  },
  getters:{  

  },
  computed:{

  }
})
