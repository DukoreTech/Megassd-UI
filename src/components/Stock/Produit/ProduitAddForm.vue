<template>
  <span class="d-none">{{$store.state.products}}{{$store.state.IdEditProduit}}</span>
    <!-- retrieve data -->
   <div class="register">
        <form @submit.prevent>
    
            <label for="name">
                <input type="text" id="name" placeholder="name" v-model="form.name">
                <span>Nom</span>
            </label>
            <span>{{ errors?.name }}</span>
    
            <label for="unite_mesure">
                <input type="text" id="unite_mesure" placeholder="unite_mesure" v-model="form.unite_mesure">
                <span>Unite De Mesure</span>
            </label>
            <span>{{ errors?.unite_mesure }}</span>
    
           <label for="caisse">
                <input type="number" id="caisse" placeholder="caisse" v-model="form.caisse">
                <span>caisse</span>
            </label>
            <span>{{ errors?.caisse }}</span>
    
            <label for="nombre_bouteille">
                <input type="number" id="nombre_bouteille" placeholder="Nombres des Bouteilles" v-model="form.nombre_bouteille">
                <span>Nombres des Bouteilles</span>
             </label>
             <span>{{ errors?.nombre_bouteille }}</span>
             <label for="nombre_bouteille">
              <input type="text" v-model="form.user_id" >
                <span>User_id</span>
                
             </label>
            <button type="submit" @click="saveInformation" class="btn btn-sm btn-danger float-end" >{{saveEditBtn}}</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios'

export default{
  props:["modalActive"],
  
  data() {
        return {
          form: {
            name:"",
            unite_mesure:"",
            caisse:"",
            nombre_bouteille:"",
            user_id:"",
          },
          errors: {},
          //user:"",
          products:[],
          users:localStorage.getItem('user'),
          saveEditBtn:"Enregistrer",
          token:this.$store.state.token
        }
      },
      
  
  mounted(){
      this.getuser()
      this.edit()
      //this.getcompayinfo()
  },
  

  computed:
  {
      userinfor() {
          return this.$store.state.userinfo
      }

  },
  
  methods:{
    edit(){
      if(this.$store.state.IdEditProduit==null){
     
     this.form={};
     this.saveEditBtn="Enregistrer"
   }else{
    
     this.form=this.$store.state.products;
     this.saveEditBtn="Modifier"
   }

    },
    saveInformation() {
          if (this.form["unite_mesure","caisse","name"]=="") return; 
    
           if(this.$store.state.IdEditProduit==null){
                 
            axios.post(
              this.$store.state.baseurl + "products",
              this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`,
                    axios.defaults.headers.common['Accept'] = `Application/json`
            )
            .then((resp) => {
              this.products = resp.data;
              
              this.form = { name:"",unite_mesure:"",nombre_bouteille:"", caisse:""} 
            })
            .catch((err) => {
              console.error(err.response.data.errors);
              this.errors = err.response.data.errors;
            });
           }else{
             axios.patch(
              this.$store.state.baseUrl+"/products/"+this.$store.state.IdEditProduit,
              this.form )
            .then((resp) => {
              this.products = resp.data;
              this.$emit('close')
             })
            .catch((err) => {
              console.error(err.response.data.errors);
              this.errors = err.response.data.errors;
            });
    
           }
     
        },
      
      getuser(){

           axios.get(`${this.$store.state.baseurl}user`
          ,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
           axios.defaults.headers.common['Accept'] = `Application/json`).then((response)=>{
           this.$store.commit('userinfo',JSON.stringify(response.data.id))
           this.form.user_id=this.$store.state.userinfo
        
  });
},
   
     
  }
}
</script>
<style  scoped>
    
      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    body{
        min-height:100vh;
        display:grid;
        place-content:center;
        font-family:sans-serif;
        color:#6b6b6b;
     
    }
    form{
        width:90vw;
        max-width:768px;
        /* border:1px solid #ddd; */
        padding:3vw;
        display:flex;
        flex-direction:column;
        border-radius:5px;
    }
    
    label{
        margin-bottom:15px;
        position:relative;
        border-bottom:1px solid #ddd;
    }
    input,select{
        width:100%;
        padding:10px 0px;
        margin-top:20px;
        border:none;
        outline:none;
    }
    input::placeholder{
        opacity:0;
    }
    
    select::placeholder{
        opacity:0;
    }
    label span{
        position:absolute;
        top:0;
        left:0;
        transform:translateY(30px);
        font-size:0.825em;
        transition-duration:300ms;
    }
     span{
        position:relative;
        bottom:10;
        left:0;
        transform:translateY(10px);
        font-size:0.825em;
    }
    button{
        padding:15px 0px; 
        margin-top:20px;
        background:rgb(75, 126, 160);
        color:#fff;
        cursor:pointer;
        border-radius:3px;
        width: 100px;
        float:right;
    }
    label:focus-within > span,
    input:not(:placeholder-shown) + span{
        color:purple;
        transform:translateY(0px);
    }
    .dateWidth{
        width: 60%;
    }
    
    </style>
