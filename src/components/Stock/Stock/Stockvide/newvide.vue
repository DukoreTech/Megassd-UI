<template>
    <div class="form">
     <div class="d-flex">
       <span class="mx-auto h3 title">Stock Vides</span>
       <span @click="close" class="h2 close ">x</span>
     </div>
   <span class="d-none">{{$store.state.vides}}{{$store.state.newvide}}</span>
     <!-- retrieve data -->
    <div class="col-12 mt-2">
         <form @submit.prevent="saveInformation">
           <div>
             <label for="name">
                 <input type="text" disabled required="required" id="name" placeholder="Nom" v-model="form.name">
                 <span>Nom stock</span>
             </label>
             <div>{{ errors?.name }}</div>
           </div>
           
           
           <div>
             <label for="nombre_bouteille">
                 <input type="number" required="required" id="nombre_bouteille" placeholder="Nombres des Bouteilles" v-model="form.quantite">
                 <span>Quantité</span>
              </label>
              <div>{{ errors?.nombre_bouteille }}</div>
           </div>   
           <div class="d-flex justify-content-around">
             <button type="submit" :disabled="loading" class="btn btn-sm btn-danger" >
               <div v-if="loading" class="d-flex justify-content-center mx-2">
                                <span class="">Loading...</span>
                          <div class="spinner-border" role="status">
                          </div>
               </div>
               <span v-if="!loading">{{saveEditBtn}}</span>
             </button>
             <button type="reset" :disabled="loading" v-if="saveEditBtn=='Ajouter'" class="btn btn-sm btn-primary" >vider</button>
           </div>
           </form>
     </div>
   </div>
 </template>
 
 <script>
 import Multiselect from '@vueform/multiselect'
 import Swal from 'sweetalert2';
 import api from '../../../../../api'
 
 export default {
     components: {
       Multiselect,
     },
     data(){
         return{
             form:{
              
               name:this.$store.state.vides.name,
               quantite:"",
                 
             },
             products:[],
             value:[],
             vides:[],
             options:[],
             newvide:"",
             saveEditBtn:"ajouter",
             
         }
     },
     mounted(){
         this.getproducts()
         console.log(this.options)
 
     },
     watch:{

         "$store.state.newvide"(val){
          console.log(val)
          if(this.$store.state.newvide!=null)
          {
            this.form.name=this.$store.state.vides.name;
          this.saveEditBtn="Modifier"
          

          }
          
            
 
   },
      
  
 
  },
     methods:{
         close(){
       this.$emit('close')
       this.form.quantite=""
     },
         getproducts() {
             api.get("products")
             .then(resp => {
                 this.products = resp.data
             })
             .catch(err => {
                 console.error(err)
             })
         },
         saveInformation() {
           if (this.form["quantite","name"]=="") return;
             this.loading=true
              api.get("addnewvide/",{params:{id:this.$store.state.newvide,quantite:this.form.quantite,}}
                )
             .then((resp) => {
             
                this.loading=false
               this.vides = resp.data;
               Swal.fire({
                icon: 'success',
                title: 'Modification',
                text: 'Modification réussi!',  
               });
           this.$emit('close')
              })
             .catch((err) => {
               this.loading=false
               console.error(err.response.data.errors);
               this.errors = err.response.data.errors;
             });
     
            
      
         },
 
 
     },
     
    
 
 
 }
 </script>
 
 <style  scoped src="@/assets/css/form.css">
 
 </style>