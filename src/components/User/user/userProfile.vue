<template>
    <div class="form">
    <!-- retrieve data -->
    <span class="d-none">{{$store.state.users}}{{$store.state.IdEditUser}}</span>
    <!-- retrieve data -->
       
      <div class="col-12 d-flex justify-content-center mt-3">
        <div class="col-6 card">
        <img class="img-profile rounded-circle w-25 h-25 bg-light d-flex justify-content-center mt-2" width="250" height="230"  src="@/assets/user.png"/>

        <form action="" @submit.prevent="saveInformation" class="col-12">
          <div class="mt-2">
            <label for="nom"> Nom </label>
                <input type="text" disabled="disabled" id="nom" placeholder="Nom" v-model="form.name" class="form-control">
                <!-- <span>Nom</span> -->
             <div>{{ errors?.name }}</div>
            </div>  

            <div class="mt-3 ">
             <label for="mail">Email</label>
                <input type="email" id="mail" disabled="disabled" placeholder="Email" v-model="form.email" class="form-control">
             <div>{{ errors?.email }}</div>
            </div> 

             <div class="mt-3"> 
             <label for="motDePasse"> Ancien Mot de passe </label>
                <input type="password" id="motDePasse" placeholder="Ancien Mot de passe" v-model="form.password" class="form-control">           
            <div>{{ errors?.password }}</div>
           </div>

           <div class="mt-3"> 
            <label>Nouveau mot de passe</label>
                <input type="password" placeholder="Nouveau mot de passe" v-model="form.new_password" class="form-control">
             <div>{{ errors?.password_confirmation }}</div>
           </div>

           <div class="mt-3"> 
             <label class="form-label">Confirmer Nouveau mot de passe</label>
                <input type="password" placeholder="Confirmer Nouveau mot de passe" v-model="form.password_confirmation" class="form-control">
                <!-- <span>Confirmer Nouveau mot de passe</span> -->
             <div>{{ errors?.password_confirmation }}</div>
            </div>

             <div class="mt-3 mb-3">
                  <button type="submit" class="btn btn-danger" >{{saveEditBtn}}</button>                 
              </div>
        </form>
      </div>  
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
            password_confirmation:"",
            id:"",
            new_password:"",
    
          },
          errors: {},
          iduser:"",
          users:[],
          saveEditBtn:"Confirmer",
        };
      },
      mounted(){
    this.getuser()
    console.log("id:",this.iduser);
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
      this.form.name=Object.values(userlogged)[0].name
      this.form.email=Object.values(userlogged)[0].email
      
      this.form.id=Object.values(userlogged)[0].id
      
    },
    saveInformation() {

          if (this.form["name", "password", "mail"]=="") return; 

            
             api.get("changePassword",{params:{old_password:this.form.password,new_password
:this.form.new_password,new_password_confirmation:this.form.password_confirmation}}
              )
            .then((resp) => {
              this.users = resp.data;
            Swal.fire({
            icon: 'success',
            title: 'Modification',
            text: 'Modification réussi!'   
              });
              this.$router.push('/')
             })
            .catch((err) => {
                
                
              
              this.errors= JSON.stringify(err.data.errors);
              console.log(this.errors);
              Swal.fire({
            icon: 'error',
            title: 'erreur',
            text: this.errors,
              });
             
            });
             
     
        }
        
    }
    }
    </script>
    
    <style  scoped >
    .img-profile {
        display: block;
        text-align: center;
        margin:auto;
      
    }
    
 </style>