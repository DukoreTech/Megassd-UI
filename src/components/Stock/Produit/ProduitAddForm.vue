<template>
  <div class="form">
    <div class="d-flex">
      <span class="mx-auto h3 title">Produit</span>
      <span @click="close" class="h2 close ">x</span>
    </div>
  <span class="d-none">{{$store.state.products}}{{$store.state.IdEditProduit}}</span>
    <!-- retrieve data -->
   <div class="col-12 mt-2">
        <form @submit.prevent="saveInformation">
          <div>
            <label for="name">
                <input type="text" required="required" id="name" placeholder="Nom" v-model="form.name">
                <span>Nom</span>
            </label>
            <div>{{ errors?.name }}</div>
          </div>
          <div>
            <label for="unite_mesure">
                <input type="text" required="required" id="unite_mesure" placeholder="Unite De Mesure" v-model="form.unite_mesure">
                <span>Unite De Mesure</span>
            </label>
            <div>{{ errors?.unite_mesure }}</div>
          </div>
          <div>
           <label for="caisse">
                <input type="number" disabled="disabled" required="required" id="caisse" placeholder="caisse" v-model="form.caisse">
                <span>caisse</span>
            </label>
            <div>{{ errors?.caisse }}</div>
          </div>
          <div>
            <label for="nombre_bouteille">
                <input type="number" required="required" id="nombre_bouteille" placeholder="Nombres des Bouteilles" v-model="form.nombre_bouteille">
                <span>Nombres des Bouteilles</span>
             </label>
             <div>{{ errors?.nombre_bouteille }}</div>
          </div>   
          <div v-if="saveEditBtn=='Ajouter'">
            <label for="nombre_bouteille">
                <input type="number" required="required" id="nombre_bouteille" placeholder="Quantité initial" v-model="form.qte">
                <span>Quantité initial</span>
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
import axios from 'axios'
import Swal from 'sweetalert2';
import api from '../../../../api';

export default{
  props:["modalActive"],
  
  data() {
        return {
          form: {
            name:"",
            unite_mesure:"",
            caisse:1,
            nombre_bouteille:"",
            user_id:"",
            qte:"",
          },
          errors: {},
          //user:"",
          products:[],
          users:localStorage.getItem('user'),
          saveEditBtn:"Ajouter",
          token:this.$store.state.token,
          loading:false
        }
      },
      
  
  mounted(){
    //  this.getuser()
    
      //this.getcompayinfo()
  },
  watch:{
  "$store.state.IdEditProduit"(a){
    console.log(a)
    if(this.$store.state.IdEditProduit==null){
     // this.getuser()
         this.form={};
         this.saveEditBtn="Ajouter"

        }else{
            this.form=this.$store.state.products;
            this.saveEditBtn="Modifier"
        }

  }
 },
  

  computed:
  {
      userinfor() {
          return this.$store.state.userinfo
      }

  },
  
  methods:{

    close(){
      this.$emit('close')
    },   
    saveInformation() {
          if (this.form["unite_mesure","caisse","name"]=="") return;
          this.loading=true 
    
           if(this.$store.state.IdEditProduit==null){
                 
            api.post(
              "products",
              this.form
            )
            .then((resp) => {
              this.loading=false
              this.products = resp.data;
           //   this.getuser()
              this.form = { name:"",unite_mesure:"",nombre_bouteille:""} 
              this.form.caisse=1
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
             api.patch("products/"+this.$store.state.IdEditProduit,
              this.form )
            .then((resp) => {
              this.products = resp.data;
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
    
           }
     
        },
      
  
     
  }
}
</script>
<style  scoped src="@/assets/css/form.css">

</style>
