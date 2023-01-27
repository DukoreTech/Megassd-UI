<template>
<div class="form">
  <div class="d-flex">
  <span class="mx-auto h3 title">Type client</span>
  <span @click="close" class="h2 close ">x</span>
  </div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.typeClients}}{{$store.state.IdEditTypClient}}</span>
<!-- retrieve data -->
   
  <div class="col-12 mt-3">
    <form action="" @submit.prevent="saveInformation">

         <div>      
          <label>
             <input type="text" required="required" v-model="form.name" placeholder="type de client">
             <span>Type de Client</span>
          </label>
         <span>{{ errors?.name }}</span>
        </div>
        <div>  
          <div>Description</div>
          <label for="description">
              <textarea  id="description"  placeholder="Description"  v-model="form.description"></textarea>
          </label>
          <span>{{ errors?.description }}</span>
        </div>
        <div class="d-flex justify-content-around">
          <button type="submit" :disabled="loading" class="btn btn-sm btn-danger" >
            <div v-if="loading" class="d-flex justify-content-center mx-2">
						  <span class="">Loading...</span>
                         <div class="spinner-border" role="status">
                          
                         </div>
            </div>
            <span v-if="!loading" class="button__text"> {{saveEditBtn}}</span>
          </button>
          <button type="reset" v-if="saveEditBtn=='Ajouter'" class="btn btn-sm btn-primary" >vider</button>
        </div>
      </form>
</div>

</div>
</template>

<script>
import Swal from 'sweetalert2'

import api from '../../../../api'

import axios from "axios";
export default {
  props:["modalActive"],
  data() {
    return {
      form: {
        name:"",
        description:"",
        user_id:"",            
      },
      user:"",
      errors: {},
      typeClients:[],
      saveEditBtn:"Ajouter",
      loading:false,
    };
  },
 mounted(){
  //this.getuser()
  console.log(this.form.user_id)
  
 },
 watch:{
  "$store.state.IdEditTypClient"(a){
    console.log(a)
    if(this.$store.state.IdEditTypClient==null){
      //this.getuser()
         this.form={};
         this.saveEditBtn="Ajouter"

        }else{
            this.form=this.$store.state.typeClients;
            this.saveEditBtn="Modifier"
        }

  }
 },
  

 

  methods: {

    close(){
      this.$emit('close')
      this.errors={}
    }, 
    saveInformation() {
      if (this.form[ "typeClient"]=="") return; 

          this.loading=true

       if(this.$store.state.IdEditTypClient==null){
             
        api.post("typeclient",
          this.form )
        .then((resp) => {
          this.loading=false
          this.typeClients = resp.data.data;
          this.$store.state.typeClients=resp.data
          this.form = { name:"",description:""}
          Swal.fire({
            icon: 'success',
            title: 'Ajouter',
            text: 'Enregister avec succès'
              });
         // this.getuser() 
          
        })
        .catch((err) => {
          this.loading=false
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
        this.loading=true
         api.patch("typeclient/"+this.$store.state.IdEditTypClient,
          this.form)
        .then((resp) => {
          this.loading=false
          
          this.typeClients = resp.data;
          this.$store.state.typeClients=resp.data
          this.close()
          Swal.fire({
               icon: 'success',
               title: 'Modification',
               text: 'Modification avec success!'
              });
            this.fetchData()
              this.$store.state.IdEditTypClient=null
          })
        .catch((err) => {
          this.loading=false
          console.log(err.response.data);
          this.errors = err.response.data;
          Swal.fire({
               icon: 'error',
               title: ' oups ',
               text: 'une erreur est survenue réessayer plus tard!'
              });
        });

       }
 
    }
    
}
}
</script>

<style  scoped src="@/assets/css/form.css">

</style>