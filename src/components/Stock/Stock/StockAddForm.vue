<template>
<div class="form">
  <div class="d-flex">
    <span class="mx-auto h3 title">Stock</span>
    <span @click="close" class="h2 close ">x</span>
  </div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.stocks}}{{$store.state.IdEditStock}}</span>
<!-- retrieve data -->
  <div class="register">
    
    <form action="" @submit.prevent="saveInformation">

                
                

                 <label for="Quantite">
                    <input type="text" id="Quantite" placeholder="Quantite" v-model="form.vide">
                    <span>Quantite Vide</span>
                 </label>
                <span>{{ errors?.Quantite }}</span>
                <!-- <label for="Quantite" >
                    <input type="hidden" disabled v-model="form.user_id">
                    
                 </label> -->
                
              <div class="d-flex justify-content-around">
                <button type="submit" :disabled="loading" class="btn btn-sm btn-danger" >
                  <div v-if="loading" class="d-flex justify-content-center mx-2">
						       <span class="">Loading...</span>
                         <div class="spinner-border" role="status">
                         </div>
              </div>
                 <span v-if="!loading"> {{saveEditBtn}}</span></button>
                
              </div>
          </form>
</div>

</div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from "axios";
import api from '../../../../api';
export default {
  props:["modalActive"],
  data() {
    return {
      form: {
        product_id:"",
        vide:"",
        user_id:"",
    
      },
      errors: {},
      stocks:[],
      produits:[],
      saveEditBtn:"Ajouter",
      loading:false
    };
  },
 mounted(){
    this.getProduits()
  },
  watch:{
  "$store.state.IdEditStock"(a){
    console.log(a)
    
            this.form=this.$store.state.stocks;
            this.saveEditBtn="Modifier"
        

  }
 },

  methods: {
     getProduits() {
      api.get("products",
      this.form
      )
        .then(resp => {
          this.produits = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },
    close(){
      this.$emit('close')
    }, 
    saveInformation() {
      if (this.form["produit","Quantite"]=="") return; 
      this.loading=true

       if(this.$store.state.IdEditStock==null){
             
        api.post("stock",
          this.form
        )
        .then((resp) => {
          this.loading=false
          this.stocks = resp.data;
          alert("data is saved")
          this.form = { produit:"",Quantite:""} 
        })
        .catch((err) => {
          this.loading=false
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
        this.loading=true
         api.patch(
       "stock/"+this.$store.state.IdEditStock,
          this.form )
        .then((resp) => {
          this.loading=false
          this.stocks = resp.data;
          Swal.fire({
               icon: 'success',
               title: 'success',
               text: 'data updated successfully!',  
              });
          this.$emit('close')
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

<style src="@/assets/css/form.css" scoped>
</style>