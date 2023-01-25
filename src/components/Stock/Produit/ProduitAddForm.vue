<template>
  <div class="form">
    <div class="d-flex">
      <span class="mx-auto h3 title">Produit</span>
      <span @click="close" class="h2 close ">x</span>
    </div>
  <span class="d-none">{{$store.state.products}}{{$store.state.IdEditProduit}}</span>
    <!-- retrieve data -->
   <div class="register">
        <form @submit.prevent="saveInformation">
            <label for="name">
                <input type="text" required="required" id="name" placeholder="name" v-model="form.name">
                <span>Nom</span>
            </label>
            <span>{{ errors?.name }}</span>
    
            <label for="unite_mesure">
                <input type="text" required="required" id="unite_mesure" placeholder="unite_mesure" v-model="form.unite_mesure">
                <span>Unite De Mesure</span>
            </label>
            <span>{{ errors?.unite_mesure }}</span>
    
           <label for="caisse">
                <input type="number" disabled="disabled" required="required" id="caisse" placeholder="caisse" v-model="form.caisse">
                <span>caisse</span>
            </label>
            <span>{{ errors?.caisse }}</span>
    
            <label for="nombre_bouteille">
                <input type="number" required="required" id="nombre_bouteille" placeholder="Nombres des Bouteilles" v-model="form.nombre_bouteille">
                <span>Nombres des Bouteilles</span>
             </label>
             <span>{{ errors?.nombre_bouteille }}</span>
             <!-- <label for="nombre_bouteille">
              <input type="text" v-model="form.user_id" >
                <span>User_id</span>
                
             </label> -->
             <div class="d-flex justify-content-around">
              <button type="submit" class="btn btn-sm btn-danger" >{{saveEditBtn}}</button>
              <button type="reset" v-if="saveEditBtn=='Ajouter'" class="btn btn-sm btn-primary" >vider</button>
            </div>
          </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2';
import api from '../../../../api';

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
    //  this.getuser()
    
      //this.getcompayinfo()
  },
  watch:{
  "$store.state.IdEditProduit"(a){
    console.log(a)
    if(this.$store.state.IdEditProduit==null){
     // this.getuser()
         this.form={};
         this.saveEditBtn="Ajouter"

        }else{
            this.form=this.$store.state.products;
            this.saveEditBtn="Modifier"
        }

  }
 },
  

  computed:
  {
      userinfor() {
          return this.$store.state.userinfo
      }

  },
  
  methods:{

    close(){
      this.$emit('close')
    },   
    saveInformation() {
          if (this.form["unite_mesure","caisse","name"]=="") return; 
    
           if(this.$store.state.IdEditProduit==null){
                 
            api.post(
              "products",
              this.form
            )
            .then((resp) => {
              this.products = resp.data;
           //   this.getuser()
              this.form = { name:"",unite_mesure:"",nombre_bouteille:"", caisse:""} 
              Swal.fire({
               icon: 'success',
               title: 'Ajouter',
               text: 'Enregister avec succès',  
              });
            })
            .catch((err) => {
              console.error(err.response.data.errors);
              this.errors = err.response.data.errors;
            });
           }else{
             api.patch("products/"+this.$store.state.IdEditProduit,
              this.form )
            .then((resp) => {
              this.products = resp.data;
              Swal.fire({
               icon: 'success',
               title: 'Modification',
               text: 'Modification réussi!',  
              });
          this.$emit('close')
             })
            .catch((err) => {
              console.error(err.response.data.errors);
              this.errors = err.response.data.errors;
            });
    
           }
     
        },
      
  
     
  }
}
</script>
<style  scoped>
 .title{
  font-weight: bolder;
  font-size: 20px;
}
.close{
  font-weight: bolder;
  margin-right: 20px;
  font-size: 23px;
  cursor:pointer;
}
form{
    width:30vw;
    max-width:768px;
    font-family:sans-serif;
    padding:0 3vw;
    display:flex;
    flex-direction:column;
    border-radius:5px;
}

label{
    margin-bottom:15px;
    position:relative;
    border-bottom:1px solid #ddd;
}
input,select,textarea{
    width:100%;
    padding:10px 0px;
    margin-top:20px;
    border:none;
    outline:none;
}

input::placeholder{
    opacity:0;
}
.error{
  color: red;
}

select::placeholder{
    opacity:0;
}
textarea::placeholder{
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
    padding:5px 0px; 
    margin-top:20px;
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
    </style>
