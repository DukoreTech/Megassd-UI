<template>
<div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.pertes}}{{$store.state.IdEditPerte}}</span>
<!-- retrieve data -->
  <div class="register">
    
    <form action="" @submit.prevent="saveInformation">

                <span>Produit</span>
                 <label for="produit" class="">
                    <select  v-model="form.product_id" aria-placeholder="produit" id="produit">
                        <option v-for="produit in products" :key="produit.id" :value="produit.id" selected>
                            {{ produit.name }}
                         </option>
                     </select>             
                  </label>
                 <span>{{ errors?.product_id }}</span>
                <br>
                <span>Perte</span>
                 <label for="client" class="">
                    <select  v-model="form.type_perte" aria-placeholder="client" id="client">
                        <option  selected>manquant </option>
                        <option >manquant </option>
                        <option >detruire</option>
                     </select>             
                  </label>
                 <span>{{ errors?.type_perte }}</span>
                <br>

                 <label for="quantity">
                    <input type="tel" id="quantity" placeholder="quantity" v-model="form.quantity">
                    <span>Quantite</span>
                 </label>
                <span>{{ errors?.quantity }}</span>

                 <span>Description</span><br>
                <label for="description">
                    <textarea  id="description" placeholder="Description"  v-model="form.description"></textarea>
                </label>
                <span>{{ errors?.description }}</span>
                
        <button type="submit" class="btn btn-sm btn-danger float-end button" >{{saveEditBtn}}</button>
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
        product_id:"",
        type_perte:"",
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
  updated(){
    if(this.$store.state.IdEditPerte==null){
        this.form={};
        this.saveEditBtn="Enregistrer"
      }else{
         this.form=this.$store.state.pertes;
        this.saveEditBtn="Modifier"
      }
 
  },

  methods: {
     getProduits() {
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
      if (this.form["product_id","type_perte","quantity","description"]=="") return; 

       if(this.$store.state.IdEditPerte==null){
             
        axios.post(
          this.$store.state.baseUrl + "/pertes",
          this.form
        )
        .then((resp) => {
          this.pertes = resp.data;
          this.form = { product_id:"",type_perte:"",quantity:"",description:""} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         axios.patch(
          this.$store.state.baseUrl+"/pertes/"+this.$store.state.IdEditPerte,
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
.button{
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