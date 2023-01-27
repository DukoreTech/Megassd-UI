<template>
<div class="form">
  <div class="d-flex">
    <span class="mx-auto h3 title">Adresse</span>
    <span @click="close" class="h2 close ">x</span>
  </div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.adresses}}{{$store.state.IdEditAdresse}}</span>

<!-- retrieve data -->
  <div class="col-md-12 col-lg-12 mt-2">
    <form action="" @submit.prevent="saveInformation">   
        <div>
          <label for="etablis">
              <input type="text" required="required" v-model="form.name" placeholder="zone">              
             <span>Zone</span>
          </label>
         <div class="error">{{ errors?.zone}}</div>
        </div>  
        <div>
          <div>Description</div>
          <label for="description">
              <textarea  id="description" required="required"  placeholder="Description"  v-model="form.description"></textarea>
          </label>
          <div class="error">{{ errors?.description }}</div>
        </div>
        <div class="d-flex justify-content-around">
          <button type="submit" :disabled="loading" class="btn btn-sm btn-danger" >
            <div v-if="loading" class="d-flex justify-content-center mx-2">
						  <span class="">Loading...</span>
                         <div class="spinner-border" role="status">
                         </div>
            </div>
            <span v-if="!loading" class="button__text">{{saveEditBtn}}</span></button>
          <button type="reset" v-if="saveEditBtn=='Ajouter'" class="btn btn-sm btn-primary" >vider</button>
        </div>
    </form>
</div>

</div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
import api from "../../../../api";
export default {
  
  props:["modalActive"],
  data() {
    return {
      form: {
        name:"",
        description:"",            
      },
      errors: {},
      adresses:[],
      saveEditBtn:"Ajouter",
      loading:false,
    };
  },

  watch:{
  "$store.state.IdEditAdresse"(a){
    console.log(a)
    if(this.$store.state.IdEditAdresse==null){
      //this.getuser()
         this.form={};
         this.saveEditBtn="Ajouter"

        }else{
            this.form=this.$store.state.adresses;
            this.saveEditBtn="Modifier"
        }

  }
 },

  methods: {
    
    close(){
      this.$emit('close')
    }, 
    saveInformation() {
      if (this.form[ "zone"]=="") return; 

      this.loading=true

       if(this.$store.state.IdEditAdresse==null){
             
        api.post("Address",
          this.form)
        .then((resp) => {
          this.loading=false
          this.adresses = resp.data;
          this.form = {} 
          this.$store.state.adresses=resp.data
          Swal.fire({
               icon: 'success',
               title: 'Ajouter',
               text: 'Enregister avec succès',  
              });
          
          })
        .catch((err) => {
          this.loading=false
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
        this.loading=true
         api.patch("Address/"+this.$store.state.IdEditAdresse,
          this.form)
        .then((resp) => {
          this.loading=false
          this.adresses = resp.data.data;
          Swal.fire({
               icon: 'success',
               title: 'Modification',
               text: 'Modification réussi!',  
              });
          this.$emit('close')
          

          //this.$store.state.IdEditAdresse=null
          
         })
        .catch((err) => {
          this.loading=false
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });

       }
 
    }
    
}
}
</script>
<style scoped src="@/assets/css/form.css">

</style>