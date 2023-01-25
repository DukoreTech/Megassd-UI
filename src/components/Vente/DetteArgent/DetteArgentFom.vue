<template>
    <div class="form">
      <div class="d-flex">
        <span class="mx-auto h3 title">Dettes</span>
        <span @click="close" class="h2 close ">x</span>
      </div>
    <!-- retrieve data -->
    <span class="d-none">{{this.$store.state.DetteArgent}}{{this.$store.state.IdEditDetteArgent}}</span>
    <!-- retrieve data -->
      <div class="register">
        
        <form action="" @submit.prevent="saveInformation">
    
                 

                    <label for="Quantite" v-if="form.montant_en_dette!=0">
                        <input type="tel" disabled id="Quantite" placeholder="Quantite" v-model="form.montant_en_dette">
                        <span>Montant en dette</span>
                     </label>
                     <label for="Quantite" v-if="form.montant_en_exces!=0">
                        <input type="tel" disabled  id="Quantite" placeholder="Quantite" v-model="form.montant_en_exces">
                        <span>Montant en excés</span>
                     </label>
    
                     <label for="Quantite" v-if="form.montant_en_exces!=0">
                        <input type="tel" id="Quantite" placeholder="Quantite" v-model="form.montant_rembourse">
                        <span>Montant Remboursé</span>
                     </label>
                    <span>{{ errors?.Quantite }}</span>
                    <label for="Quantite" v-if="form.montant_en_dette!=0">
                        <input type="tel" id="Quantite" placeholder="Quantite" v-model="form.montant_amene">
                        <span>Montant Payés</span>
                     </label>
                    <span>{{ errors?.Quantite }}</span>
                    <!-- <label for="Quantite" >
                        <input type="hidden" disabled v-model="form.user_id">
                        
                     </label> -->
                    
                  <div class="d-flex justify-content-around">
                    <button type="submit" class="btn btn-sm btn-danger" >{{saveEditBtn}}</button>
                   
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
            montant_paye:this.$store.state.DetteArgent.montant_paye,
            montant_en_exces:this.$store.state.DetteArgent.montant_en_exces,
            montant_en_dette:this.$store.state.DetteArgent.montant_en_dette,
            montant_amene:this.$store.state.DetteArgent.montant_amene,
            montant_rembourse:this.$store.state.DetteArgent.montant_rembourse,
          },
          errors: {},
          stocks:[],
          produits:[],
         saveEditBtn:"Modifier",
        };
      },
      mounted()
      {
            this.form.montant_paye=this.$store.state.DetteArgent.montant_paye,
            this.form.montant_en_exces=this.$store.state.DetteArgent.montant_en_exces,
            this.form.montant_en_dette=this.$store.state.DetteArgent.montant_en_dette,
            this.form.montant_amene=this.$store.state.DetteArgent.montant_amene,
            this.form.montant_rembourse=this.$store.state.DetteArgent.montant_rembourse;
      },

      watch:{
      "$store.state.IdEditDetteArgent"(a){
        console.log(a)
        
          this.form=this.$store.state.DetteArgent
        //  this.saveEditBtn="Modifier
       
      },
      "$store.state.DetteArgent.montant_en_exces"(val){
        this.form.montant_en_exces=this.$store.state.DetteArgent.montant_en_exces
      },
      "$store.state.DetteArgent.montant_en_dette"(val){
        this.form.montant_en_dette=this.$store.state.DetteArgent.montant_en_dette
      },
      "$store.state.DetteArgent.montant_amene"(val){
        this.form.montant_amene=this.$store.state.DetteArgent.montant_amene
      },
      "$store.state.DetteArgent.montant_rembourse"(val)
      {
        this.form.montant_rembourse=this.$store.state.DetteArgent.montant_rembourse

      }

     },
    
      methods: {
        close(){
          this.$emit('close')
        }, 
        saveInformation(){
          if (this.form.montant_amene > this.form.montant_en_dette || this.form.montant_rembourse > this.form.montant_en_exces)
          {
            Swal.fire({
                   icon: 'info',
                   title: 'erreur',
                   text: 'Montant entré pas valide!',  
                  })
          }
          else{


             api.patch(
           "getDetteArgent/"+this.$store.state.IdEditDetteArgent,
              this.form)
            .then((resp) => {
              this.stocks = resp.data;
              Swal.fire({
                icon: 'success',
               title: 'Modification',
               text: 'Modification réussi!', 
                  });
              this.$emit('close')
             })
            .catch((err) => {
              
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