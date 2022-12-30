<template>
<div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.adresses}}{{$store.state.IdEditAdresse}}</span>

<!-- retrieve data -->
   

  <div class="register">
    <form action="" @submit.prevent="saveInformation">   

        <span>Zone</span>
          <label for="etablis">
              <input type="text" v-model="form.name">
          </label>
         <span class="error">{{ errors?.zone}}</span>

        <span>Description</span>
         <label for="description">
            <textarea  id="description" placeholder="Description"  v-model="form.description"></textarea>
        </label>
        <span class="error">{{ errors?.description }}</span>
        <!-- <button type="button">Register</button> -->
        <button type="submit" class="btn btn-sm btn-danger float-end" >{{saveEditBtn}}</button>
    </form>
</div>

</div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
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
      saveEditBtn:"Enregistrer",
    };
  },

  watch:{
  "$store.state.IdEditAdresse"(a){
    console.log(a)
    if(this.$store.state.IdEditAdresse==null){
      //this.getuser()
         this.form={};
         this.saveEditBtn="Enregistrer"

        }else{
            this.form=this.$store.state.adresses;
            this.saveEditBtn="Modifier"
        }

  }
 },

  methods: {
 
    saveInformation() {
      if (this.form[ "zone"]=="") return; 

       if(this.$store.state.IdEditAdresse==null){
             
        axios.post(
          this.$store.state.baseurl + "Address",
          this.form,
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`
        )
        .then((resp) => {
          this.adresses = resp.data;
          this.form = { zone:"",description:""} 
          this.$store.state.adresses=resp.data
          
          })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         axios.patch(
          this.$store.state.baseurl + "Address/"+this.$store.state.IdEditAdresse,
          this.form)
        .then((resp) => {
          this.adresses = resp.data.data;
          this.$store.state.adresses=resp.data.data
          this.$emit('close')
          Swal.fire({
               icon: 'success',
               title: 'success',
               text: 'address updated successfully!',  
              });

          this.$store.state.IdEditAdresse=null
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
.error{
  color:color;
}
form{
    width:90vw;
    max-width:768px;
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

textarea::placeholder{
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


</style>