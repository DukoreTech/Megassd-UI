<template>
<div class="form">
  <div class="d-flex">
      <span class="mx-auto h3 title">Prix de vente</span>
      <span @click="close" class="h2 close ">x</span>
  </div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.lots}}{{$store.state.IdEditLot}}</span>
<!-- retrieve data -->
  <div class="register">
    <form action="" @submit.prevent="saveInformation">
        <div class="d-flex">
            <div class="col">
                <label for="name">
                    <input type="text" id="name" placeholder="name" v-model="form.name">
                    <span>name</span>
                </label>
                <span>{{ errors?.name }}</span>
                 <br>
                <span>Produit</span>
                 <label for="product_id" class="d-block dateWidth">
                    <select  v-model="form.product_id" aria-placeholder="product_id" id="product_id">
                        <option v-for="product in products" :key="product.id" :value="product.id"  selected>
                        {{ product.name }}
                        </option>
                    </select>             
               </label>
               <span>type client</span>
                 <label for="product_id" class="d-block dateWidth">
                    <select  v-model="form.type_Clients_id" aria-placeholder="product_id" id="product_id">
                        <option v-for="client in typeClients" :key="client.id" :value="client.id"  selected>
                        {{ client.name }}
                        </option>
                    </select>             
               </label> 
               <span>{{ errors?.product_id }}</span>
               

            </div>

             <div class="col">
              <span>direction</span>
                 <label for="product_id" class="d-block dateWidth">
                    <select  v-model="form.adresses_id" aria-placeholder="product_id" id="product_id" multiple>
                        <option v-for="zone in address" :key="zone.id" :value="zone.id"  selected>
                        {{ zone.name }}
                        </option>
                    </select>             
                </label>
              <label for="price_vente">
                    <input type="text" id="price_vente" placeholder="Prix de vente" v-model="form.price_vente">
                    <span>Prix de vente</span>
                </label>
                <span>{{ errors?.price_vente }}</span> 
                  <br>
              

               <span>Description</span><br>
                <label for="description">
                    <textarea  id="description" placeholder="Description"  v-model="form.description"></textarea>
                </label>
                <span>{{ errors?.description }}</span>
         </div>
        </div>  
        
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
import Swal from 'sweetalert2';
import api from '../../../../api'
export default {
  props:["modalActive"],
  data() {
    return {
      form: {
        name:"",
        //quantity:"",
       // price_unitaire:"",
        product_id:"",
        price_vente:"",
        description:"",
        user_id:"",
        adresses_id:"",
        type_Clients_id:""
    
      },
      //myOptions: ['op1', 'op2', 'op3'], // or [{id: key, text: value}, {id: key, text: value}]
      address:[],
      errors: {},
      products:[],
      lots:[],


      saveEditBtn:"Ajouter",
      typeClients:[]
    };
  },
    mounted(){
      this.getproducts()
      //this.getuser()
      this.getaddress()
      this.gettyclient()
  },
  watch:{
  "$store.state.IdEditLot"(a){
    console.log(a)
    if(this.$store.state.IdEditLot==null){
     /// this.getuser()
         this.form={};
         this.saveEditBtn="Ajouter"

        }else{
          
            this.form=this.$store.state.lots;
            this.saveEditBtn="Modifier"
            console.log(this.$store.state.lots)
        }

  },
  "this.$store.state.lots"(val){
    console.log(val)
    this.lots=val;
  }
 },


 


  methods: {
    gettyclient() {
            api.get("typeclient"
            )
            .then(resp => {
                this.typeClients = resp.data
                this.$store.state.typeClients=resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
    
    getaddress() {
        api.get("Address")
            .then(resp => {
                this.address = resp.data
                this.$store.state.adresses=resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        close(){
      this.$emit('close')

    }, 
        saveInformation() {
      if (this.form["product_id","price_vente","quantity","name"]=="") return;


       if(this.$store.state.IdEditLot==null){

        let result= this.$store.state.lots.find((item) => item.product_id == this.form.product_id && item.adresses_id==this.form.adresses_id && item.type_clients_id==this.form.type_Clients_id
)

       // console.log(result)
        if(result){
          Swal.fire({
               icon: 'info',
               title: 'erreur',
               text: 'prix deja existant pour cette zone et type de client!',  
              });
        }
        else{
        api.post(
          "lots",
          this.form
        )
        .then((resp) => {
         
          this.lots = resp.data;
          this.$emit('fetch')
       // console.log(this.$store.state.lots)
          this.form={}
          this.$emit("fetch")
          Swal.fire({
               icon: 'success',
               title: 'Ajouter',
               text: 'Enregister avec succès',  
              });
          //this.form = { name:"",description:"",price_vente:"", quantity:"",price_unitaire:"",product_id:""} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
      } }else{
         api.patch(
          "lots/"+this.$store.state.IdEditLot,
          this.form )
        .then((resp) => {
          this.form={}
          this.lots = resp.data;        
          Swal.fire({
               icon: 'success',
               title: 'Modification',
               text: 'Modification réussi!',  
              });
              this.$store.state.lots=resp.data
         this.$emit('close')
        // this.$emit('fetch')
         
         })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;

        });

       }
       
 
    },
    getproducts() {
            api.get("products")
            .then(resp => {
                this.products = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
   
    
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
    width:45vw;
    max-width:768px;
    font-family:sans-serif;
    padding:0 3vw;
    display:flex;
    flex-direction:column;
    border-radius:5px;
    margin-left:20px;
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
.dateWidth{
    width: 80%;
}

</style>