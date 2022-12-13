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
    products:[],
    IdEditProduit:null,
    stocks:[],
    IdEditStock:null,
    typeStocks:[],
    IdEditTypStock:null

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
