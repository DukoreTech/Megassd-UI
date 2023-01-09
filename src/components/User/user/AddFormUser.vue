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
            <input type="text" id="nom" placeholder="nom" v-model="form.name">
            <span>Nom</span>
        </label>
         <span>{{ errors?.nom }}</span>

         <label for="mail">
            <input type="email" id="mail" placeholder="Telephone" v-model="form.email">
            <span>Email</span>
         </label>
         <span>{{ errors?.mail }}</span>

       <!-- <label for="prenom">
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
         <span>{{ errors?.telephone }}</span>--> 
            </div>
             <div class="col-6">
        

        <!-- <label for="Adresse">
            <input type="text" id="Adresse" placeholder="Adresse" v-model="form.adresse">
            <span>Adresse</span>
         </label>
         <span>{{ errors?.adresse }}</span>-->

        <!--<label for="nomDUtilisateur">
            <input type="text" id="nomDUtilisateur" placeholder="Nom d'Utilasateur" v-model="form.nomDUtilisateur">
            <span>Nom d'Utilisateur</span>
        </label>
        <span>{{ errors?.nomDUtilisateur }}</span>-->

         <label for="motDePasse">
            <input type="password" id="motDePasse" placeholder="Mot de passe" v-model="form.password">
            <span>Mot de passe</span>
        </label>
        <label for="confirm">
            <input type="password" placeholder="Mot de passe" v-model="form.password_confirmation">
            <span>Confirmer Mot de passe</span>
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
import api from '../../../../api';
import axios from "axios";
import Swal from 'sweetalert2';
export default {
  props:["modalActive"],
  data() {
    return {
      form: {
        name:"",
     //   prenom:"",
       // dateDenaissance:"",
       // telephone:"",
        email:"",
       // adresse:"",
       // nomDUtilisateur:"",
        password:"" ,
        password_confirmation:""

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
      if (this.form["name", "password", "mail"]=="") return; 

       if(this.$store.state.IdEditUser==null){
        if(this.form.password==this.form.password_confirmation)
        {
        api.post(
           "register",
          this.form
        )
        .then((resp) => {
          this.users = resp.data;
          Swal.fire({
               icon: 'success',
               title: 'Ajouter',
               text: 'Enregister avec succès',  
              });
              this.$emit('close')
          this.form = {} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
      }else{
        Swal.fire({
               icon: 'error',
               title: 'mot de passe',
               text: 'Mots de passe ne sont pas les memes',  
              });

      }
       }else{
        api.patch("users/"+this.$store.state.IdEditUser,
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