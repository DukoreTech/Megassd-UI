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
          <div class="">Product</div>
            <select  v-model="form.product_id" aria-placeholder="Adresse" id="adresse" required="required" class="form-select">
              <option v-for="product in products" :value="product.id" :key="product.id" selected>
              {{ product.name }}
              </option>
            </select>             
          <div class="error">{{ errors?.product }}</div>  
        </div> 
    

     
        <div>  
          <label for="prix">
              <input type="number" id="telephone" placeholder="prix" v-model="form.prix" required="required">
              <span>prix</span>
              </label>
            <span class="error">{{ errors?.prix }}</span> 
        </div>
                    
      
 
        <div class="d-flex justify-content-around mt-2">
          <button type="submit" :disabled="loading" class="btn btn-sm btn-danger" >
            <div v-if="loading" class="d-flex justify-content-center mx-2">
                          <span class="">Loading...</span>
                         <div class="spinner-border" role="status">
                          
                         </div>
            </div>
            <span v-if="!loading" class="button__text"> {{saveEditBtn}}</span>
          </button>
          <button type="reset" v-if="saveEditBtn=='Ajouter'"  class="btn btn-sm btn-primary" >vider</button>
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
            product_id:"",
            prix:"",            
          },
          errors: {},
          prix:[],
          products:[],
          saveEditBtn:"Ajouter",
          loading:false,
        };
      },
    
      watch:{
      "$store.state.IdEditprice"(a){
        console.log(a)
        if(this.$store.state.IdEditprice==null){
          //this.getuser()
             this.form={};
             this.saveEditBtn="Ajouter"
    
            }else{
                this.form=this.$store.state.price;
                this.saveEditBtn="Modifier"
            }
    
      }
     },
      mounted()
      {
        this.getproducts();

      },
      methods: {
        
        close(){
          this.$emit('close')
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
          //if (this.form[ "zone"]=="") return; 
    
          this.loading=true
    
           if(this.$store.state.IdEditprice==null){
                 
            api.get("createprix",{params:{product_id:this.form.product_id,prix:this.form.prix}}
              )
            .then((resp) => {
              this.loading=false
              this.prix = resp.data;
              this.form = {} 
              this.$store.state.price=resp.data
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
             api.get("updateprix",
             {params:{id:this.$store.state.IdEditprice,product_id:this.form.product_id,prix:this.form.prix}})
            .then((resp) => {
              this.loading=false
              this.prix = resp.data.data;
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