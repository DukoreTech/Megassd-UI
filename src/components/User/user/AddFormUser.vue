<template>
<div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.users}}{{$store.state.IdEditUser}}</span>
<!-- retrieve data -->
   
  <div class="register">
    <form action="" @submit.prevent="saveInformation">
        <div class="d-flex">
            <div class="col-6">
        <label for="nom">
            <input type="text" id="nom" placeholder="nom" v-model="form.nom">
            <span>Nom</span>
        </label>
         <span>{{ errors?.nom }}</span>

         <label for="prenom">
            <input type="text" id="prenom" placeholder="prenom" v-model="form.prenom">
            <span>Prenom</span>
        </label>
         <span>{{ errors?.prenom }}</span>
          <label for="dateDenaissance" class="d-block dateWidth">
            <input type="date" id="dateDenaissance"  v-model="form.dateDenaissance">
            <span>Date de naissance</span>
         </label>
         <span>{{ errors?.dateDenaissance }}</span>

         <label for="telephone">
            <input type="tel" id="telephone" placeholder="Telephone" v-model="form.telephone">
            <span>Telephone</span>
         </label>
         <span>{{ errors?.telephone }}</span>
            </div>
             <div class="col-6">
         <label for="mail">
            <input type="email" id="mail" placeholder="Telephone" v-model="form.mail">
            <span>Email</span>
         </label>
         <span>{{ errors?.mail }}</span>

         <label for="Adresse">
            <input type="text" id="Adresse" placeholder="Adresse" v-model="form.adresse">
            <span>Adresse</span>
         </label>
         <span>{{ errors?.adresse }}</span>

        <label for="nomDUtilisateur">
            <input type="text" id="nomDUtilisateur" placeholder="Nom d'Utilasateur" v-model="form.nomDUtilisateur">
            <span>Nom d'Utilisateur</span>
        </label>
        <span>{{ errors?.nomDUtilisateur }}</span>

         <label for="motDePasse">
            <input type="password" id="motDePasse" placeholder="Mot de passe" v-model="form.motDePasse">
            <span>Mot de passe</span>
        </label>
         <span>{{ errors?.motDePasse }}</span>
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
        nom:"",
        prenom:"",
        dateDenaissance:"",
        telephone:"",
        mail:"",
        adresse:"",
        nomDUtilisateur:"",
        motDePasse:""      
      },
      errors: {},
      users:[],
      saveEditBtn:"Enregistrer",
    };
  },
  updated(){
    if(this.$store.state.IdEditUser==null){
        this.form={};
        this.saveEditBtn="Enregistrer"
      }else{
         this.form=this.$store.state.users;
        this.saveEditBtn="Modifier"
      }
 
  },

  methods: {
 
    saveInformation() {
      if (this.form["nomDUtilisateur", "motDePasse", "mail", "nom"]=="") return; 

       if(this.$store.state.IdEditUser==null){
             
        axios.post(
          this.$store.state.baseUrl + "/users",
          this.form
        )
        .then((resp) => {
          this.users = resp.data;
          this.form = { nom:"",prenom:"",dateDenaissance:"", telephone:"",mail:"",adresse:"",nomDUtilisateur:"",motDePasse:""} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         axios.patch(
          this.$store.state.baseUrl+"/users/"+this.$store.state.IdEditUser,
          this.form )
        .then((resp) => {
          this.users = resp.data;
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