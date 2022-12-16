<template>
<div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.stocks}}{{$store.state.IdEditStock}}</span>
<!-- retrieve data -->
   <!-- <div class="alert alert-success d-flex align-items-center mt-5 w-50 mx-auto" role="alert">
      <font-awesome-icon icon="fa-solid fa-check-circle" class="bi flex-shrink-0 " width="24" height="24" role="img" aria-label="Success:" />
      <div>
        Done
      </div>
    </div>  -->

    <!-- <div class="alert-dismissible fade show alert alert-success d-flex align-items-center mt-5 w-50 mx-auto" role="alert">
      <font-awesome-icon icon="fa-solid fa-check-circle" class="bi flex-shrink-0 " width="24" height="24" role="img" aria-label="Success:" />
        <strong>success</strong> 
        <button type="button" class=" btn-sm btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div> -->
  <div class="register">
    
    <form action="" @submit.prevent="saveInformation">

                <span>Produit</span>
                 <label for="produit" class="">
                  <input type="tel" disabled id="Quantite" placeholder="Quantite" v-model="form.product_id">
                               
                  </label>
                 <span>{{ errors?.produit }}</span>
                <br>

                 <label for="Quantite">
                    <input type="tel" id="Quantite" placeholder="Quantite" v-model="form.vide">
                    <span>Quantite Vide</span>
                 </label>
                <span>{{ errors?.Quantite }}</span>
                <label for="Quantite">
                    <input type="text" disabled v-model="form.user_id">
                    <span>User_id</span>
                 </label>
                
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
        vide:"",
        user_id:"",
    
      },
      errors: {},
      stocks:[],
      produits:[],
      saveEditBtn:"Enregistrer",
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
      axios.get(this.$store.state.baseurl + "products",this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
                    axios.defaults.headers.common['Accept'] = `Application/json`
      )
        .then(resp => {
          this.produits = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },
    saveInformation() {
      if (this.form["produit","Quantite"]=="") return; 

       if(this.$store.state.IdEditStock==null){
             
        axios.post(
          this.$store.state.baseUrl + "stock",
          this.form
        )
        .then((resp) => {
          this.stocks = resp.data;
          alert("data is saved")
          this.form = { produit:"",Quantite:""} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         axios.patch(
          this.$store.state.baseurl + "stock/"+this.$store.state.IdEditStock,
          this.form )
        .then((resp) => {
          this.stocks = resp.data;
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
input,select{
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