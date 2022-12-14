<template>
<div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.lots}}{{$store.state.IdEditLot}}</span>
<!-- retrieve data -->
  <div class="register">
    <form action="" @submit.prevent="saveInformation">
        <div class="d-flex">
            <div class="col-6">
                <label for="name">
                    <input type="text" id="name" placeholder="name" v-model="form.name">
                    <span>name</span>
                </label>
                <span>{{ errors?.name }}</span>
                 <br>
                <span>Produit</span>
                 <label for="product_id" class="d-block dateWidth">
                    <select  v-model="form.product_id" aria-placeholder="product_id" id="product_id">
                        <option v-for="product in products" :key="product.id" :value="product.id" selected>
                        {{ product.name }}
                        </option>
                    </select>             
              </label>
               <span>{{ errors?.product_id }}</span>  

                <label for="quantity" class="">
                    <input type="text" id="quantity"  v-model="form.quantity">
                    <span>Quantity</span>
                </label>
                <span>{{ errors?.quantity }}</span>
                
            </div>

             <div class="col-6">
                <label for="price_unitaire">
                    <input type="text" id="price_unitaire" placeholder="price unitaire" v-model="form.price_unitaire">
                    <span>Prix unitaire</span>
                </label>
                <span>{{ errors?.price_unitaire }}</span>

                 <label for="price_vente">
                    <input type="text" id="price_vente" placeholder="Prix de vente" v-model="form.price_vente">
                    <span>Prix de vente</span>
                </label>
                <span>{{ errors?.price_vente }}</span>  
                    <br>
               <span>Description</span><br>
                <label for="description">
                    <textarea  id="description" placeholder="Description"  v-model="form.description"></textarea>
                </label>
                <span>{{ errors?.description }}</span>
         </div>
        </div>  
        <!-- <button type="button">Register</button> -->
        <button type="submit" class="btn btn-sm btn-danger float-end" >{{saveEditBtn}}</button>
    </form>
</div>

</div>
</template>

<script>
import axios from "axios";
export default {
  props:["modalActive"],
  data() {
    return {
      form: {
        name:"",
        quantity:"",
        price_unitaire:"",
        product_id:"",
        price_vente:"",
        description:""
    
      },
      errors: {},
      products:[],
      lots:[],
      saveEditBtn:"Enregistrer",
    };
  },
    mounted(){
      this.getProducts()
  },
  updated(){
    if(this.$store.state.IdEditLot==null){
        this.form={};
        this.saveEditBtn="Enregistrer"
      }else{
         this.form=this.$store.state.lots;
        this.saveEditBtn="Modifier"
      }
 
  },

  methods: {

    getProducts() {
      axios.get(this.$store.state.baseUrl + "/products",
      )
        .then(resp => {
          this.products = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },
    saveInformation() {
      if (this.form["product_id","price_unitaire","quantity","name"]=="") return; 

       if(this.$store.state.IdEditLot==null){
             
        axios.post(
          this.$store.state.baseUrl + "/lots",
          this.form
        )
        .then((resp) => {
          this.lots = resp.data;
          this.form = { name:"",description:"",price_vente:"", quantity:"",price_unitaire:"",product_id:""} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         axios.patch(
          this.$store.state.baseUrl+"/lots/"+this.$store.state.IdEditLot,
          this.form )
        .then((resp) => {
          this.lots = resp.data;
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

  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
body{
    min-height:100vh;
    display:grid;
    place-content:center;
    font-family:sans-serif;
    color:#6b6b6b;
 
}
form{
    width:90vw;
    max-width:768px;
    /* border:1px solid #ddd; */
    padding:3vw;
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
    padding:15px 0px; 
    margin-top:20px;
    background:rgb(75, 126, 160);
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
    width: 60%;
}

</style>