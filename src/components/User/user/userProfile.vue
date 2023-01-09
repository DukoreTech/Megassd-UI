<template>
    <div class="form">
    <!-- retrieve data -->
    <span class="d-none">{{$store.state.users}}{{$store.state.IdEditUser}}</span>
    <!-- retrieve data -->
       
      <div class="register">
        <img class="img-profile rounded-circle w-30 h-30 bg-light"  src="@/assets/logo.png">

        <form action="" @submit.prevent="saveInformation">
            <label for="nom">
                <input type="text" id="nom" placeholder="nom" v-model="form.name">
                <span>Nom</span>
            </label>
             <span>{{ errors?.name }}</span>
    
             <label for="mail">
                <input type="email" id="mail" placeholder="email" v-model="form.email">
                <span>Email</span>
             </label>
             <span>{{ errors?.email }}</span>
    
             <label for="motDePasse">
                <input type="password" id="motDePasse" placeholder="Mot de passe" v-model="form.password">
                <span>Mot de passe</span>
            </label>
            <span>{{ errors?.password }}</span>

            <label for="confirm">
                <input type="password" placeholder="Mot de passe" v-model="form.password_confirmation">
                <span>Confirmer nouveau mot de passe</span>
            </label>
             <span>{{ errors?.password_confirmation }}</span>
    
             <div class="d-flex justify-content-around">
                  <button type="submit" class="btn btn-sm btn-danger" >{{saveEditBtn}}</button>
                  <button type="reset" class="btn btn-sm btn-primary" >Annuler</button>
                </div>
        </form>
    </div>
    
    </div>
    </template>
    
    <script>
    import api from '../../../../api';
    import axios from "axios";
    import Swal from 'sweetalert2';
    export default {
      props:["modalActive","id","name","email"],
      data() {
        return {
          form: {
            name:"",
            email:"",
            password:"" ,
            password_confirmation:""
    
          },
          errors: {},
          iduser:"",
          users:[],
          saveEditBtn:"Confirmer",
        };
      },
      mounted(){
    this.getuser()
  },
    //   watch:{
    //   "$store.state.IdEditUser"(a){
    //     console.log(a)
    //     if(this.$store.state.IdEditUser==null){
    //          this.form={};
    //          this.saveEditBtn="Confirmer"
    
    //         }else{
    //             this.form=this.$store.state.users;
    //             this.saveEditBtn="Modifier"
    //         }
    
    //   }
    //  },
    
      methods: { 
    //     getUser() {
    //      api.get("user",this.form )
    //     .then(resp => {
    //       this.users = resp.data
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    getuser(){
      let userlogged= JSON.parse(this.$store.state.user)
      this.username=Object.values(userlogged)[0].name
      this.iduser=Object.values(userlogged)[0].id
      
      console.log("id:",this.iduser);
    },
    saveInformation() {

          if (this.form["name", "password", "mail"]=="") return; 

            if(this.form.password==this.form.password_confirmation)
            {
             api.patch("users/"+this.iduser,
              this.form )
            .then((resp) => {
              this.users = resp.data;
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
     
        }
        
    }
    }
    </script>
    
    <style  scoped>
    .img-profile {
        display: block;
        text-align: center;
        margin:auto;
      
    }
    .form{
        display: flex;
        justify-content: center;
        align-self: center;
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