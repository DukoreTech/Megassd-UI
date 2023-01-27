<template>
<div class="form">
  <div class="d-flex">
      <span class="mx-auto h3 title">Perte</span>
      <span @click="close" class="h2 close ">x</span>
    </div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.pertes}}{{$store.state.IdEditPerte}}</span>
<!-- retrieve data -->
  <div class="col-12 mt-2"> 
    <form action="" @submit.prevent="saveInformation">
      <div class="col-12 d-md-flex d-sm-block">
        <div class="col-md-6 col-sm-12">
          <div>
            <div>Produit</div>
                <select  required="required" v-model="form.product_id" aria-placeholder="produit" id="produit" class="form-select">
                    <option v-for="produit in products" :key="produit.id" :value="produit.id" selected>
                        {{ produit.name }}
                      </option>
                  </select>             
              <div>{{ errors?.product_id }}</div>
          </div> 
          <div class="mt-2">   
            <div>Nature </div>
                <select  required="required" v-model="form.nature" aria-placeholder="client" id="client" class="form-select">
                    <option  selected>Non conforme </option>
                    <option >ouvert</option>
                    <option >cassé</option>
                  </select>             
              <div>{{ errors?.type_perte }}</div>
          </div>
          <div class="mt-2">  
            <div>Stock</div>
              <select required="required" v-model="form.stock" aria-placeholder="client" id="client" class="form-select">
                  <option>Vides</option>
                  <option >plein</option>
                </select>             
            <div>{{ errors?.type_perte }}</div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div>
            <label for="quantity">
                <input required="required" type="number" id="quantity" placeholder="Quantite" v-model="form.quantity">
                <span>Quantite</span>
            </label>
            <div>{{ errors?.quantity }}</div>
          </div>  
          <div>    
            <label for="casier">
                <input type="number" required="required" id="casier" placeholder="casier" v-model="form.casier">
                <span>casier</span>
            </label>
          </div>   
        </div>   
      </div>      
      <button type="submit" :disabled="loading" class="btn btn-sm btn-danger button" >
          <div v-if="loading" class="d-flex justify-content-center mx-2">
						    <span class="">Loading...</span>
               <div class="spinner-border" role="status">
               </div>
          </div>
              <span v-if="!loading">{{saveEditBtn}}</span></button>
    </form>
  </div>

</div>
</template>

<script>
//import axios from "axios";
import api from '../../../../api';
import Swal from 'sweetalert2';
export default {
  props:["modalActive"],
  data() {
    return {
      form: {
        product_id:"",
        nature:"",
        casier:"",
        stock:"",
        quantity:"",
        description:""
    
      },
      errors: {},
      pertes:[],
      products:[],
      loading:false,
      saveEditBtn:"Enregistrer",
    };
  },
  mounted(){
    this.getProduits()
  },
  

  methods: {
    close(){
      this.$emit('close')
    },
     getProduits() {
      api.get("products",
      )
        .then(resp => {
          this.products = resp.data
          
        })
        .catch(err => {
          console.log(err)
        })

    },

    saveInformation() {
      this.loading=true

       if(this.$store.state.IdEditPerte==null){
             
        api.post(
          "pertes",
          this.form
          
        )
        .then((resp) => {
          this.loading=false
          this.pertes = resp.data;
          this.form = {}
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
         api.patch(pertes/"+this.$store.state.IdEditPerte",
          this.form )
        .then((resp) => {
          this.loading=false
          this.pertes = resp.data;
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

<style  src="@/assets/css/form.css" scoped></style>