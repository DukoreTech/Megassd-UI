<template>
<div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.produits}}{{$store.state.IdEditProduit}}</span>
<!-- retrieve data -->
   

  <div class="register">
    <form action="" @submit.prevent="saveInformation">

        <label for="nom">
            <input type="text" id="nom" placeholder="nom" v-model="form.nom">
            <span>Nom</span>
        </label>
        <span>{{ errors?.nom }}</span>

        <label for="uniteDeMesure">
            <input type="text" id="uniteDeMesure" placeholder="uniteDeMesure" v-model="form.uniteDeMesure">
            <span>Unite De Mesure</span>
        </label>
        <span>{{ errors?.uniteDeMesure }}</span>

       <label for="caisse">
            <input type="tel" id="caisse" placeholder="caisse" v-model="form.caisse">
            <span>caisse</span>
        </label>
        <span>{{ errors?.caisse }}</span>

        <label for="nbBouteille">
            <input type="text" id="nbBouteille" placeholder="Nombres des Bouteilles" v-model="form.nbBouteille">
            <span>Nombres des Bouteilles</span>
         </label>
         <span>{{ errors?.nbBouteille }}</span>

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
        nom:"",
        uniteDeMesure:"",
        caisse:"",
        nbBouteille:"",
    
      },
      errors: {},
      produits:[],
      saveEditBtn:"Enregistrer",
    };
  },
  updated(){
    if(this.$store.state.IdEditProduit==null){
        this.form={};
        this.saveEditBtn="Enregistrer"
      }else{
         this.form=this.$store.state.produits;
        this.saveEditBtn="Modifier"
      }
 
  },

  methods: {
    saveInformation() {
      if (this.form["uniteDeMesure","adateDenaissancege","caisse","nom"]=="") return; 

       if(this.$store.state.IdEditProduit==null){
             
        axios.post(
          this.$store.state.baseUrl + "/produits",
          this.form
        )
        .then((resp) => {
          this.produits = resp.data;
          this.form = { nom:"",uniteDeMesure:"",nbBouteille:"", caisse:""} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         axios.patch(
          this.$store.state.baseUrl+"/produits/"+this.$store.state.IdEditProduit,
          this.form )
        .then((resp) => {
          this.produits = resp.data;
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