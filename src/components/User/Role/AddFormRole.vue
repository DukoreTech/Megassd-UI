<template>
<div>
<!-- retrieve data -->
<span class="">{{$store.state.roles}}{{$store.state.IdEditRole}}</span>
<!-- retrieve data -->
   

  <div class="register">
    <form action="" @submit.prevent="saveInformation">
        
        <label for="role">
            <input type="text" id="role" placeholder="role" v-model="form.role">
            <span>Role</span>
        </label>
         <span>{{ errors?.role }}</span>

         <label for="description">
            <textarea  id="description" placeholder="description" v-model="form.description"></textarea>
            <span>Description</span>
        </label>
        <span>{{ errors?.description }}</span>
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
        role:"",
        description:"",            
      },
      errors: {},
      roles:[],
      saveEditBtn:"Enregistrer",
    };
  },
  updated(){
    if(this.$store.state.IdEditRole==null)return;
    this.form=this.$store.state.roles;
    this.saveEditBtn="Modifier"
  },

  methods: {
 
    saveInformation() {
      if (this.form[ "role"]=="") return; 

       if(this.$store.state.IdEditRole==null){
             
        axios.post(
          this.$store.state.baseUrl + "/roles",
          this.form
        )
        .then((resp) => {
          this.roles = resp.data;
          this.form = { role:"",description:""} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         axios.patch(
          this.$store.state.baseUrl+"/roles/"+this.$store.state.IdEditRole,
          this.form )
        .then((resp) => {
          this.roles = resp.data;
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