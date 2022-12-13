import { createStore } from 'vuex'

export default createStore({
  state:{
    baseurl: 'http://127.0.0.1:8000/api/',
    token: localStorage.getItem('token') || '',
    users:[],
    user:[],
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
    IdEditStock:null,
    typeStocks:[],
    IdEditTypStock:null

  },
  mutations: {
    login(state,user) {
      state.user = user;
      localStorage.setItem('user', state.user);
  
 
    },
  logout(state){
      state.user=''
      localStorage.removeItem('user','token')
      
  },
  initialize(state){
      
      if(localStorage.getItem('user')){
          state.user=localStorage.getItem('user')
      }
      
      else{
          this.commit("logout");
      }
      
      
  },
  
  
  },
  actions: {
  },
  modules: {
  },
  getters:{ 
    user:state=>state.user, 

  },
  computed:{

  }
})
