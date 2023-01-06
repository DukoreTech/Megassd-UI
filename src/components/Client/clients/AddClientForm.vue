<template>
<div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.clients}}{{$store.state.IdEditClient}}</span>
<!-- retrieve data -->
  <div class="register">
    <form action="" @submit.prevent="saveInformation">
        <div class="d-flex">
            <div class="col-6">
                <label for="nom">
                    <input type="text" id="nom" placeholder="nom" v-model="form.nom">
                    <span>Nom</span>
                </label>
                <span class="error">{{ errors?.nom }}</span>

                <!--<label for="prenom">
                    <input type="text" id="prenom" placeholder="prenom" v-model="form.prenom">
                    <span>Proprietaire</span>
                </label>
                <span>{{ errors?.prenom }}</span>

                <label for="assujet_tva" class="">
                    <input type="text" id="assujet_tva"  v-model="form.assujet_tva">
                    <span>TVA (%)</span>
                </label>
                <span>{{ errors?.assujet_tva }}</span>-->

             <label for="telephone">
                    <input type="tel" id="telephone" placeholder="Telephone" v-model="form.telephone">
                    <span>Telephone</span>
                </label>
                <span class="error">{{ errors?.telephone }}</span>
                
            </div>

             <div class="col-6">
                <!---<label for="nif">
                    <input type="text" id="nif" placeholder="Nif" v-model="form.nif">
                    <span>Nif</span>
                </label>
                <span>{{ errors?.nif }}</span>
                    <br>--> 
                <span>Type de client</span>
                 <label for="typeClient" class="d-block dateWidth">
                    <select  v-model="form.type_client_id" aria-placeholder="Type de client" id="typeClient">
                        <option v-for="typeClient in typeClients" :key="typeClient.id" :value="typeClient.id" selected>
                            {{ typeClient.name }}
                         </option>
                     </select>             
                  </label>
                <span class="error">{{ errors?.type_client_id}}</span>
                <br>
                <span>Adresse</span>
                 <label for="adresse" class="d-block dateWidth">
                    <select  v-model="form.address_id" aria-placeholder="Adresse" id="adresse">
                        <option v-for="adresse in adresses" :value="adresse.id" :key="adresse.id" selected>
                        {{ adresse.name }}
                        </option>
                    </select>             
              </label>
               <span class="error">{{ errors?.address_id }}</span>       

               <!--<span>Description</span><br>
                <label for="description">
                    <textarea  id="description" placeholder="Description"  v-model="form.description"></textarea>
                </label>
                <span>{{ errors?.description }}</span>--> 
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
import Swal from 'sweetalert2';
export default {
  props:["modalActive"],
  data() {
    return {
      form: {
        nom:"",
        prenom:"",
        assujet_tva:"",
        telephone:"",
        nif:"",
        address_id:"",
        type_client_id:"",
        description:"",
        user_id:"",
    
      },
      errors: {},
      clients:[],
      adresses:[],
      typeClients:[],
      saveEditBtn:"Enregistrer",
    };
  },
    mounted(){
      this.getAdresse()
      this.getClientType()
      
  },
  watch:{
  "$store.state.IdEditClient"(a){
    console.log(a)
    if(this.$store.state.IdEditClient==null){
        this.form={};
        this.saveEditBtn="Enregistrer"
      }else{
         this.form=this.$store.state.clients;
        this.saveEditBtn="Modifier"
      }
 
  }
},

  methods: {
   

    getAdresse() {
      axios.get(this.$store.state.baseurl + "Address",
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`
      )
        .then(resp => {
          this.adresses = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },
     getClientType() {
      axios.get(this.$store.state.baseurl + "typeclient",
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.typeClients = resp.data
                this.$store.state.typeClients=resp.data
                this.getuser()
            })
            .catch(err => {
                console.error(err)
            })

    },
   
    saveInformation() {
      if (this.form["prenom","type_client_id","telephone","nom"]=="") return; 

       if(this.$store.state.IdEditClient==null){
             
        axios.post(
          this.$store.state.baseurl + "client",  this.form, axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`
        
        )
        .then((resp) => {
          this.clients = resp.data;

          this.form = { nom:"",prenom:"",type_client_id:"", assujet_tva:"",nif:"",address_id:""}
          Swal.fire({
               icon: 'success',
               title: 'success',
               text: 'data added successfully!',  
              });
         // this.getuser() 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         axios.patch(
          this.$store.state.baseurl+"client/"+this.$store.state.IdEditClient,
          this.form )
        .then((resp) => {
          this.clients = resp.data;
         // this.$emit('close')
          Swal.fire({
               icon: 'success',
               title: 'success',
               text: 'data updated successfully!',  
              });
          
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