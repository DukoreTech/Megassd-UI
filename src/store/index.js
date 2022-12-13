import { createStore } from 'vuex'

export default createStore({
  state:{
    baseurl: 'http://127.0.0.1:8000/api/',
    token: localStorage.getItem('token') || '',
    userinfo:[],
    users:[],
    user:"",
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
    login(state,user) {
      state.user = user;
      localStorage.setItem('user',user);
      
  
 
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
  userinfo(state,user){
    state.userinfo=user

}
  
  
  },
  actions: {
    
  },
  modules: {
  },
  getters:{ 
    user:state=>state.user, 
    userinformation:state=>state.userinfo,

  },
  computed:{

  }
})
