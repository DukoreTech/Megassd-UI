<template>
<div class="form">
 <div class="d-flex">
  <span class="mx-auto h3 title">Client</span>
  <span @click="close" class="h2 close ">x</span>
  </div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.clients}}{{$store.state.IdEditClient}}</span>
<!-- retrieve data -->
  <div class="register">
    <form action="" @submit.prevent="saveInformation">
        <div class="d-flex">
            <div class="col">

                <label for="nom">
                    <input type="text" id="nom" placeholder="nom" v-model="form.nom">
                    <span>Nom</span>
                </label>
                <span class="error">{{ errors?.nom }}</span>
                  <br>
                <span>Type de client</span>
                 <label for="typeClient" class="d-block dateWidth">
                    <select  v-model="form.type_client_id" aria-placeholder="Type de client" id="typeClient">
                        <option v-for="typeClient in typeClients" :key="typeClient.id" :value="typeClient.id" selected>
                            {{ typeClient.name }}
                         </option>
                     </select>             
                  </label>
                <span class="error">{{ errors?.type_client_id}}</span>
                
                <button type="submit" class="btn btn-sm btn-danger float-start" >{{saveEditBtn}}</button>
            </div>

             <div class="col">
              <label for="telephone">
                        <input type="tel" id="telephone" placeholder="Telephone" v-model="form.telephone">
                        <span>Telephone</span>
                  </label>
                <span class="error">{{ errors?.telephone }}</span> 
                 <br>
                <span>Adresse</span>
                 <label for="adresse" class="d-block dateWidth">
                    <select  v-model="form.address_id" aria-placeholder="Adresse" id="adresse">
                        <option v-for="adresse in adresses" :value="adresse.id" :key="adresse.id" selected>
                        {{ adresse.name }}
                        </option>
                    </select>             
              </label>
               <span class="error">{{ errors?.address_id }}</span>       
               <button type="reset" class="btn btn-sm btn-primary float-start" >vider</button>
         </div>
        </div>  
    </form>
</div>

</div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';
import api from '../../../../api'
export default {
  props:["modalActive"],
  data() {
    return {
      form: {
        nom:"",
        prenom:"",
        assujet_tva:"",
        telephone:"",
        nif:"",
        address_id:"",
        type_client_id:"",
        description:"",
        user_id:"",
    
      },
      errors: {},
      clients:[],
      adresses:[],
      typeClients:[],
      saveEditBtn:"Ajouter",
    };
  },
    mounted(){
      this.getAdresse()
      this.getClientType()
      
  },
  watch:{
  "$store.state.IdEditClient"(a){
    console.log(a)
    if(this.$store.state.IdEditClient==null){
        this.form={};
        this.saveEditBtn="Ajouter"
      }else{
         this.form=this.$store.state.clients;
        this.saveEditBtn="Modifier"
      }
 
  }
},

  methods: {
   
    close(){
      this.$emit('close')
    },
    getAdresse() {
      api.get("Address"
      )
        .then(resp => {
          this.adresses = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },
     getClientType() {
      api.get("typeclient")
            .then(resp => {
                this.typeClients = resp.data
                this.$store.state.typeClients=resp.data
                
            })
            .catch(err => {
                console.error(err)
            })

    },
    closemodal(){
      this.$emit('close')
      this.errors={}
    },
    
   
    saveInformation() {
      if (this.form["prenom","type_client_id","telephone","nom"]=="") return; 

       if(this.$store.state.IdEditClient==null){
             
        api.post(
          "client",  this.form)
        .then((resp) => {
          this.clients = resp.data;

          this.form = { nom:"",prenom:"",type_client_id:"", assujet_tva:"",nif:"",address_id:""}
          Swal.fire({
            icon: 'success',
            title: 'Ajouter',
            text: 'Enregister avec succès'   
              });
         // this.getuser() 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         api.patch("client/"+this.$store.state.IdEditClient,
          this.form )
        .then((resp) => {
          this.clients = resp.data;
          this.closemodal()
          Swal.fire({
            icon: 'success',
            title: 'Modification',
            text: 'Modification réussi!'   
              });
          
         })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });

       }
 
    }
    
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
    width:45vw;
    max-width:768px;
    font-family:sans-serif;
    padding:0 3vw;
    display:flex;
    flex-direction:column;
    border-radius:5px;
    margin-left:20px;
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
.dateWidth{
    width: 80%;
}

</style>