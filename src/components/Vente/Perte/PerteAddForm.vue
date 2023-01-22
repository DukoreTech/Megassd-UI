<template>
<div class="form">
  <div class="d-flex">
      <span class="mx-auto h3 title">Perte</span>
      <span @click="close" class="h2 close ">x</span>
    </div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.pertes}}{{$store.state.IdEditPerte}}</span>
<!-- retrieve data -->
  <div class="register">
    
    <form action="" @submit.prevent="saveInformation">

                <span>Produit</span>
                 <label for="produit" class="">
                    <select  required="required" v-model="form.product_id" aria-placeholder="produit" id="produit">
                        <option v-for="produit in products" :key="produit.id" :value="produit.id" selected>
                            {{ produit.name }}
                         </option>
                     </select>             
                  </label>
                 <span>{{ errors?.product_id }}</span>
                <br>
                <span>Nature</span>
                 <label for="client" class="">
                    <select  required="required" v-model="form.nature" aria-placeholder="client" id="client">
                        <option  selected>Non conforme </option>
                        <option >ouvert</option>
                        <option >cassé</option>
                     </select>             
                  </label>
                 <span>{{ errors?.type_perte }}</span>
                <br>
                <span>Stock</span>
                 <label for="client" class="">
                    <select required="required" v-model="form.stock" aria-placeholder="client" id="client">
                        <option>Vides</option>
                        <option >plein</option>
                     </select>             
                  </label>
                 <span>{{ errors?.type_perte }}</span>
                <br>
                <label for="quantity">
                    <input required="required" type="number" id="quantity" placeholder="quantity" v-model="form.quantity">
                    <span>Quantite</span>
                </label>
                <span>{{ errors?.quantity }}</span>
                <label for="quantity">
                    <input type="number" required="required" id="quantity" placeholder="quantity" v-model="form.casier">
                    <span>casier</span>
                </label>
                
            <button type="submit" class="btn btn-sm btn-danger float-end button" >{{saveEditBtn}}</button>
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
      

       if(this.$store.state.IdEditPerte==null){
             
        api.post(
          "pertes",
          this.form
          
        )
        .then((resp) => {
          this.pertes = resp.data;
          this.form = {}
          Swal.fire({
               icon: 'success',
               title: 'Ajouter',
               text: 'Enregister avec succès',  
              });
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         api.patch(pertes/"+this.$store.state.IdEditPerte",
          this.form )
        .then((resp) => {
          this.pertes = resp.data;
          this.$emit('close')
         })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
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
    width:45vw;
    max-width:350px;
    height: 500px;
    font-family:sans-serif;
    padding:0 3vw;
    display:flex;
    flex-direction:column;
    border-radius:5px;
    margin-left:10px;
    margin-top: 20px;
}

label{
    margin-bottom:5px;
    position:relative;
    border-bottom:1px solid #ddd;
}
input,select,textarea{
    width:100%;
    padding:10px 0px;
    margin-top:10px;
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
    margin-top:10px;
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
.dateWidth{
    width: 80%;
}

</style>