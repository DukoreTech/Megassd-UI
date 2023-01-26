<template>
<div class="form">
 <div class="d-flex">
  <span class="mx-auto h3 title">Client</span>
  <span @click="close" class="h2 close ">x</span>
  </div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.clients}}{{$store.state.IdEditClient}}</span>
<!-- retrieve data -->
  <div class="col-12 mt-1">
    <form action="" @submit.prevent="saveInformation">

        <div class=" col-12 d-md-flex d-sm-block">
            <div class="col-md-6 col-sm-12">
              <div>
                <label for="nom">
                    <input type="text" required="required" id="nom" placeholder="nom" v-model="form.nom">
                    <span>Nom</span>
                </label>
                <span class="error">{{ errors?.nom }}</span>
              </div>
              <div>
                <div class="font-weight-bold">Type de client</div>
                    <select  v-model="form.type_client_id" aria-placeholder="Type de client" id="typeClient" required="required" class="form-select">
                        <option v-for="typeClient in typeClients" :key="typeClient.id" :value="typeClient.id" selected>
                            {{ typeClient.name }}
                         </option>
                     </select>             
                <div class="error">{{ errors?.type_client_id}}</div>
              </div>                 
            </div>

             <div class="col-md-6 col-sm-12">
               <div>  
                  <label for="telephone">
                      <input type="tel" id="telephone" placeholder="Telephone" v-model="form.telephone" required="required">
                      <span>Telephone</span>
                      </label>
                    <span class="error">{{ errors?.telephone }}</span> 
                </div>
                <div>
                  <div class="font-weight-bold">Adresse</div>
                    <select  v-model="form.address_id" aria-placeholder="Adresse" id="adresse" required="required" class="form-select">
                      <option v-for="adresse in adresses" :value="adresse.id" :key="adresse.id" selected>
                      {{ adresse.name }}
                      </option>
                    </select>             
                  <div class="error">{{ errors?.address_id }}</div>  
                </div>             
              </div>
        </div>  
        <div class="d-flex justify-content-around mt-2">
          <button type="submit" class="btn btn-sm btn-danger" >{{saveEditBtn}}</button>
          <button type="reset" v-if="saveEditBtn=='Ajouter'"  class="btn btn-sm btn-primary" >vider</button>
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

<style  scoped src="@/assets/css/form.css">
</style>