<template>
<div class="form">
  <div class="d-flex">
  <span class="mx-auto h3 title">Type client</span>
  <span @click="close" class="h2 close ">x</span>
  </div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.typeClients}}{{$store.state.IdEditTypClient}}</span>
<!-- retrieve data -->
   
  <div class="register">
    <form action="" @submit.prevent="saveInformation">     
          <label>
             <input type="text" v-model="form.name" placeholder="type de client">
             <span>Type de Client</span>
          </label>
         <span>{{ errors?.name }}</span>

        <span>Description</span>
         <label for="description">
            <textarea  id="description" placeholder="Description"  v-model="form.description"></textarea>
        </label>
        <span>{{ errors?.description }}</span>

        <!-- <span>User_id</span>
         <label for="description">
            <input   disabled placeholder="Description"  v-model="form.user_id">
        </label> -->
        
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
import Swal from 'sweetalert2'

import axios from "axios";
export default {
  props:["modalActive"],
  data() {
    return {
      form: {
        name:"",
        description:"",
        user_id:"",            
      },
      user:"",
      errors: {},
      typeClients:[],
      saveEditBtn:"Ajouter",
    };
  },
 mounted(){
  this.getuser()
  console.log(this.form.user_id)
  
 },
 watch:{
  "$store.state.IdEditTypClient"(a){
    console.log(a)
    if(this.$store.state.IdEditTypClient==null){
      this.getuser()
         this.form={};
         this.saveEditBtn="Ajouter"

        }else{
            this.form=this.$store.state.typeClients;
            this.saveEditBtn="Modifier"
        }

  }
 },
  

 

  methods: {
    getuser(){

axios.get(`${this.$store.state.baseurl}user`
,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
axios.defaults.headers.common['Accept'] = `Application/json`).then((response)=>{
this.$store.commit('userinfo',JSON.stringify(response.data.id))
this.form.user_id=this.$store.state.userinfo

});
    },
    close(){
      this.$emit('close')
    }, 
    saveInformation() {
      if (this.form[ "typeClient"]=="") return; 

       if(this.$store.state.IdEditTypClient==null){
             
        axios.post(
          this.$store.state.baseurl + "typeclient",
          this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`
        )
        .then((resp) => {
          this.typeClients = resp.data.data;
          this.$store.state.typeClients=resp.data
          this.form = { name:"",description:""}
          this.getuser() 
          
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
        
         axios.patch(
          this.$store.state.baseurl + "typeclient/"+this.$store.state.IdEditTypClient,
          this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json` )
        .then((resp) => {
          this.typeClients = resp.data.data;
          this.$store.state.typeClients=resp.data
          this.$emit('close')
          Swal.fire({
               icon: 'success',
               title: 'success message',
               text: 'updated  successfully!'
              });
            this.fetchData()
              this.$store.state.IdEditTypClient=null
          })
          
         
        .catch((err) => {
          Swal.fire({
               icon: 'error',
               title: ' oups ',
               text: 'something wrong  try again!'
              });
          
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