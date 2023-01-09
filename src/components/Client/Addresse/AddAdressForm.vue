<template>
<div class="form">
  <div class="d-flex">
  <span class="mx-auto h3 title">Adresse</span>
  <span @click="close" class="h2 close ">x</span>
  </div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.adresses}}{{$store.state.IdEditAdresse}}</span>

<!-- retrieve data -->
  <div class="register">
    <form action="" @submit.prevent="saveInformation">   
          <label for="etablis">
              <input type="text" v-model="form.name" placeholder="zone">              
             <span>Zone</span>
          </label>
         <span class="error">{{ errors?.zone}}</span>

        <span>Description</span>
         <label for="description">
            <textarea  id="description" placeholder="Description"  v-model="form.description"></textarea>
        </label>
        <span class="error">{{ errors?.description }}</span>
        <!-- <button type="button">Register</button> -->
        <div class="d-flex justify-content-around">
          <button type="submit" class="btn btn-sm btn-danger" >{{saveEditBtn}}</button>
          <button type="reset" class="btn btn-sm btn-primary" >vider</button>
        </div>
    </form>
</div>

</div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
import api from "../../../../api";
export default {
  
  props:["modalActive"],
  data() {
    return {
      form: {
        name:"",
        description:"",            
      },
      errors: {},
      adresses:[],
      saveEditBtn:"Ajouter",
    };
  },

  watch:{
  "$store.state.IdEditAdresse"(a){
    console.log(a)
    if(this.$store.state.IdEditAdresse==null){
      //this.getuser()
         this.form={};
         this.saveEditBtn="Ajouter"

        }else{
            this.form=this.$store.state.adresses;
            this.saveEditBtn="Modifier"
        }

  }
 },

  methods: {
    
    close(){
      this.$emit('close')
    }, 
    saveInformation() {
      if (this.form[ "zone"]=="") return; 

       if(this.$store.state.IdEditAdresse==null){
             
        api.post("Address",
          this.form)
        .then((resp) => {
          this.adresses = resp.data;
          this.form = {} 
          this.$store.state.adresses=resp.data
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
         api.patch("Address/"+this.$store.state.IdEditAdresse,
          this.form)
        .then((resp) => {
          this.adresses = resp.data.data;
          Swal.fire({
               icon: 'success',
               title: 'Modification',
               text: 'Modification réussi!',  
              });
          this.$emit('close')
          

          //this.$store.state.IdEditAdresse=null
          
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