<template>
    <div class="form">
      <div class="d-flex">
        <span class="mx-auto h3 title">Dettes vides</span>
        <span @click="close" class="h2 close ">x</span>
      </div>
    <!-- retrieve data -->
    <span class="d-none">{{$store.state.DetteVides}}{{$store.state.IdEditVide}}</span>
    <!-- retrieve data -->
      <div class="register">
        
        <form action="" @submit.prevent="saveInformation">
    
                   <span>Restant</span>
                     <label for="produit" class="">
                      <input type="tel" v-model="form.reste" disabled id="Quantite" placeholder="Quantite">
                                   
                      </label>
                     <span>{{ errors?.produit }}</span>
                    <br>
    
                     <label for="Quantite">
                        <input type="tel" id="Quantite" placeholder="Quantite" v-model="form.nouveau_casier">
                        <span>Quantite Amenés</span>
                     </label>
                    <span>{{ errors?.Quantite }}</span>
                    <!-- <label for="Quantite" >
                        <input type="hidden" disabled v-model="form.user_id">
                        
                     </label> -->
                    
                  <div class="d-flex justify-content-around">
                    <button type="submit" class="btn btn-sm btn-danger" >{{saveEditBtn}}</button>
                    <button type="reset" class="btn btn-sm btn-primary" >vider</button>
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
           
            nouveau_casier:this.$store.state.DetteVides.nouveau_casier,
            reste:this.$store.state.DetteVides.reste
        
          },
          errors: {},
          stocks:[],
          produits:[],
          saveEditBtn:"Ajouter",
        };
      },
     
      watch:{
      "$store.state.IdEditVide"(a){
        console.log(a)
        
                this.form=this.$store.state.DetteVides;
                this.saveEditBtn="Modifier"
            
    
      }
     },
    
      methods: {
        close(){
          this.$emit('close')
        },
        saveInformation() {
         // if (this.form["produit","Quantite"]=="") return; 
    
         
            
             api.patch(
           "getDetteVides/"+this.$store.state.IdEditVide,
              this.form )
            .then((resp) => {
              this.stocks = resp.data;
              Swal.fire({
                   icon: 'success',
                   title: 'success',
                   text: 'data updated successfully!',  
                  });
              this.$emit('close')
             })
            .catch((err) => {
              console.error(err.response.data.errors);
              this.errors = err.response.data.errors;
            });
    
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