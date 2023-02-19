<template>
    <div class="form">
      <div class="d-flex">
          <span class="mx-auto h3 title">Location vides</span>
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
                <div>Stock</div>
                    <select  required="required" :disabled="this.$store.state.IdEditLocation!==null" v-model="form.stocks_vides_id" aria-placeholder="produit" id="produit" class="form-select">
                        <option v-for="produit in products" :key="produit.id" :value="produit.id" selected>
                            {{ produit.name }}
                          </option>
                      </select>             
                  <div>{{ errors?.product_id }}</div>
              </div> 
              <div class="mt-2">   
                <div>Nature </div>
                <input required="required" type="text" disabled  id="quantity" placeholder="" v-model="form.nature">           
                  <div>{{ errors?.type_perte }}</div>
              </div>
              <div class="mt-2">  
                <div>clients</div>
                  <select required="required" :disabled="this.$store.state.IdEditLocation!==null" v-model="form.client_id" aria-placeholder="client" id="client" class="form-select">
                    <option v-for="client in clients" :key="client.id" :value="client.id" selected>
                            {{ client.nom }}
                          </option>
                    </select>             
                <div>{{ errors?.type_perte }}</div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div>
                <label for="quantity">
                    <input required="required" :disabled="this.$store.state.IdEditLocation!==null" type="number" id="quantity" placeholder="Quantite" v-model="form.quantity">
                    <span>Quantite</span>
                </label>
                <div>{{ errors?.quantity }}</div>
              </div> 
              <div class="col-md-6 col-sm-12">
              <div v-if="this.$store.state.IdEditLocation!==null">
                <label for="quantity">
                    <input required="required" type="number" id="quantity" placeholder="Quantite" v-model="form.rembourse">
                    <span>Quantite remboursé</span>
                </label>
                <div>{{ errors?.quantity }}</div>
              </div> 
              <input type="hidden" v-model="form.status">
                
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
    import api from '../../../../../api';
    import Swal from 'sweetalert2';
    export default {
      props:["modalActive"],
      data() {
        return {
          form: {
            stocks_vides_id:"",
            nature:"emprunt",
            quantity:"",
            client_id:"",
            quantity:"",
            description:"",
            restant:"",
            rembourse:0,
            status:''
        
          },
          errors: {},
          clients:[],
          locations:[],
          products:[],
          loading:false,
          saveEditBtn:"Enregistrer",
        };
      },
      mounted(){
        this.getProduits()
        this.getclient()
       // console.log(this.$store.state.IdEditLocation);
      },
      watch:{
        "$store.state.IdEditLocation"(val)
        {
          console.log(val)
          if(this.$store.state.IdEditLocation==null)
          {
           // console.log('hi')
            this.saveEditBtn="Ajouter",
            this.stocks_vides_id="",
            this.form.nature="emprunt",
            this.form.quantity="",
            this.form.client_id="",
            this.form.quantity=""
            
            
          }
          else{
            this.saveEditBtn="Modifier"
            this.form=this.$store.state.locations;
            
            //this.form.stockvide_id
            console.log(this.form)
          }

        }

      },
      
    
      methods: {
        close(){
          this.$emit('close')
        },
        getclient(){
          api.get("client",
          )
            .then(resp => {
                this.clients = resp.data
                this.$store.state.typeClients=resp.data
                console.log(this.$store.state.typeClients)
               
            })
            .catch(err => {
                console.error(err)
            })

        },
         getProduits() {
          api.get("vides",
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
    
           if(this.$store.state.IdEditLocation==null){

            this.form.restant=this.form.quantity

                 
            api.post(
              "location",
              this.form
              
            )
            .then((resp) => {
              this.loading=false
              this.locations = resp.data;
              this.stocks_vides_id="",
              this.form.nature="emprunt",
              this.form.quantity="",
              this.form.client_id="",
              this.form.quantity=""
            
              
              
              
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
          if(this.form.rembourse > this.form.quantity)
          {
            Swal.fire({
                   icon: 'info',
                   title: 'erreur',
                   text: 'quantité invalide',  
                  });
                  this.loading=false
          }
          else
          
          {
          //  this.form.restant=this.form.restant-this.form.rembourse
           
            
            //this.$store.state.quantiteR=this.form.quantiteR
            api.patch("location/"+this.$store.state.IdEditLocation,
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
    }
    </script>
    
    <style  src="@/assets/css/form.css" scoped></style>