<template>
<div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.lots}}{{$store.state.IdEditLot}}</span>
<!-- retrieve data -->
  <div class="register">
    <form action="" @submit.prevent="saveInformation">
        <div class="d-flex">
            <div class="col-6">
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
               <span>{{ errors?.product_id }}</span>
               <span>direction</span>
                 <label for="product_id" class="d-block dateWidth">
                    <select  v-model="form.adresses_id" aria-placeholder="product_id" id="product_id">
                        <option v-for="zone in address" :key="zone.id" :value="zone.id"  selected>
                        {{ zone.name }}
                        </option>
                    </select>             
                </label>
                
         
               
                 

                <!--<label for="quantity" class="">
                    <input type="text" id="quantity"  v-model="form.quantity">
                    <span>Quantity</span>
                </label>
                <span>{{ errors?.quantity }}</span>-->
                
            </div>

             <div class="col-6">
              <span>type client</span>
                 <label for="product_id" class="d-block dateWidth">
                    <select  v-model="form.type_Clients_id" aria-placeholder="product_id" id="product_id">
                        <option v-for="client in typeClients" :key="client.id" :value="client.id"  selected>
                        {{ client.name }}
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
      myOptions: ['op1', 'op2', 'op3'], // or [{id: key, text: value}, {id: key, text: value}]
      address:[],
      errors: {},
      products:[],
      lots:[],
      saveEditBtn:"Enregistrer",
      typeClients:[]
    };
  },
    mounted(){
      this.getproducts()
      this.getuser()
      this.getaddress()
      this.gettyclient()
  },
  watch:{
  "$store.state.IdEditLot"(a){
    console.log(a)
    if(this.$store.state.IdEditLot==null){
      this.getuser()
         this.form={};
         this.saveEditBtn="Enregistrer"

        }else{
          
            this.form=this.$store.state.lots;
            this.saveEditBtn="Modifier"
            console.log(this.$store.state.lots)
        }

  }
 },


  methods: {
    gettyclient() {
            axios.get(this.$store.state.baseurl + "typeclient",
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.typeClients = resp.data
                this.$store.state.typeClients=resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
    getuser(){

      axios.get(`${this.$store.state.baseurl}user`,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
      axios.defaults.headers.common['Accept'] = `Application/json`).then((response)=>{
      this.$store.commit('userinfo',JSON.stringify(response.data.id))
      this.form.user_id=this.$store.state.userinfo

      });
    },
    getaddress() {
        axios.get(this.$store.state.baseurl + "Address",
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
        axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.address = resp.data
                this.$store.state.adresses=resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },

        saveInformation() {
      if (this.form["product_id","price_vente","quantity","name"]=="") return; 

       if(this.$store.state.IdEditLot==null){
             
        axios.post(
          this.$store.state.baseurl + "lots",
          this.form
        )
        .then((resp) => {
          this.lots = resp.data;
          //this.form = { name:"",description:"",price_vente:"", quantity:"",price_unitaire:"",product_id:""} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         axios.patch(
          this.$store.state.baseurl+"lots/"+this.$store.state.IdEditLot,
          this.form )
        .then((resp) => {
          this.lots = resp.data;
          this.$emit('close')
         })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });

       }
 
    },

    getproducts() {
            axios.get(this.$store.state.baseurl + "products",axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
            axios.defaults.headers.common['Accept'] = `Application/json`)
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