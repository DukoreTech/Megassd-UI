import { createStore } from 'vuex'

export default createStore({
  state:{
    baseurl: 'http://localhost:8000/api/',
    token: localStorage.getItem('token'),
    selectClient_id : "",
    role:JSON.parse(localStorage.getItem('user')),
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
    IdEditTypStock:null,
    lots:[],
    IdEditLot:null,
    receptions:[],
    IdEditReception:null,
    locations:[],
    IdEditLocation:null,
    pertes:[],
    IdEditPerte:null,


  },
  mutations: {
    login(state, user) {
      state.user = user;

      //state.token=token;
      localStorage.setItem('user', state.user);
     // localStorage.setItem('token', state.token);
  },
  logout(state){
      state.user=''
      localStorage.removeItem('user')    

  },
  initialize(state){
      if(localStorage.getItem('user')){
          state.user=localStorage.getItem('user')
      }
      
      else{
          this.commit("logout");
          localStorage.removeItem('token')
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
  //  role:state=>state.role.,
    token:state=>state.token,
    userinformation:state=>state.userinfo,

  },
  computed:{

  }
})
