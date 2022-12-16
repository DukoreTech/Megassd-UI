<template>
<div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.locations}}{{$store.state.IdEditLocation}}</span>
<!-- retrieve data -->
  <div class="register">
    
    <form action="" @submit.prevent="saveInformation">

                <span>Produit</span>
                 <label for="produit" class="">
                    <select  v-model="form.produit" aria-placeholder="produit" id="produit">
                        <option v-for="produit in produits" :key="produit.id" :value="produit.id" selected>
                            {{ produit.nom }}
                         </option>
                     </select>             
                  </label>
                 <span>{{ errors?.produit }}</span>
                <br>
                <span>client</span>
                 <label for="client" class="">
                    <select  v-model="form.client" aria-placeholder="client" id="client">
                        <option v-for="client in clients" :key="client.id" :value="client.id" selected>
                            {{ client.nom }}
                         </option>
                     </select>             
                  </label>
                 <span>{{ errors?.client }}</span>
                <br>

                 <label for="Quantite">
                    <input type="tel" id="Quantite" placeholder="Quantite" v-model="form.Quantite">
                    <span>Quantite</span>
                 </label>
                <span>{{ errors?.Quantite }}</span>
                
        <button type="submit" class="btn btn-sm btn-danger float-end button" >{{saveEditBtn}}</button>
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
        produit:"",
        client:"",
        Quantite:""
    
      },
      errors: {},
      locations:[],
      produits:[],
      clients:[],
      saveEditBtn:"Enregistrer",
    };
  },
  mounted(){
    this.getProduits()
    this.getClients()
  },
  updated(){
    if(this.$store.state.IdEditLocation==null){
        this.form={};
        this.saveEditBtn="Enregistrer"
      }else{
         this.form=this.$store.state.locations;
        this.saveEditBtn="Modifier"
      }
 
  },

  methods: {
     getProduits() {
      axios.get(this.$store.state.baseUrl + "/produits",
      )
        .then(resp => {
          this.produits = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },
    getClients() {
      axios.get(this.$store.state.baseUrl + "/clients",
      )
        .then(resp => {
          this.clients = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },
    saveInformation() {
      if (this.form["produit","client","Quantite"]=="") return; 

       if(this.$store.state.IdEditLocation==null){
             
        axios.post(
          this.$store.state.baseUrl + "/locations",
          this.form
        )
        .then((resp) => {
          this.locations = resp.data;
          alert("data is saved")
          this.form = { produit:"",Quantite:""} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         axios.patch(
          this.$store.state.baseUrl+"/locations/"+this.$store.state.IdEditLocation,
          this.form )
        .then((resp) => {
          this.locations = resp.data;
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
.button{
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