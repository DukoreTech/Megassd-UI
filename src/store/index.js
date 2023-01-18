import { createStore } from 'vuex'

export default createStore({
  state:{
    // baseurl: baseUrl+'/api/',
    //baseurl: 'http://127.0.0.1:8000/api/',
    baseurl: process.env.VUE_APP_url+'api/',
    token: localStorage.getItem('token'),
    selectClient_id : "",
    role:JSON.parse(localStorage.getItem('user')),
    userinfo:[],
    users:[],
    DetteVides:[],
    DetteArgent:[],
    IdEditDetteArgent:null,
    IdEditVide:null,
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
