<template>
<div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.receptions}}{{$store.state.IdEditReception}}</span>
<!-- retrieve data -->
  <div class="register">
    <form action="" @submit.prevent="saveInformation">
        <div class="d-flex">

            <div class="col col1">
                <span>Produit</span>
                 <label for="product_id" class="d-block dateWidth">
                    <select  v-model="form.product_id" aria-placeholder="product_id" id="product_id">
                        <option v-for="product in products" :key="product.id" :value="product.id" selected>
                        {{ product.name }}
                        </option>
                    </select>             
                  </label>
               <span>{{ errors?.product_id }}</span>  
                 <br>
                 <span>Lot</span>
                 <label for="lot_id" class="d-block dateWidth">
                    <select  v-model="form.lot_id" aria-placeholder="lot" id="lot_id">
                        <option v-for="lot in lots" :key="lot.id" :value="lot.id" selected>
                        {{ lot.name }}
                        </option>
                    </select>             
                  </label>
               <span>{{ errors?.lot_id }}</span>  
                <br>
                  <span>stock</span>
                 <label for="stock_id" class="d-block dateWidth">
                    <select  v-model="form.stock_id" aria-placeholder="stock" id="stock_id">
                        <option v-for="stock in stocks" :key="stock.id" :value="stock.id" selected>
                        {{ stock.id }}
                        </option>
                    </select>             
                  </label>
               <span>{{ errors?.stock_id }}</span> 

                <label for="quantity">
                    <input type="number" id="quantity" placeholder="quantity" v-model="form.quantity">
                    <span>Quantity</span>
                </label>
                <span>{{ errors?.quantity }}</span>

              
                
            </div>

             <div class="col col2">
                   <label for="tva" class="">
                    <input type="number" id="tva" placeholder="tva"   v-model="form.tva">
                    <span>TVA (%)</span>
                </label>
                <span>{{ errors?.tva }}</span>
                <label for="date_achat" class="d-block dateWidth">
                    <input type="date" id="date_achat" placeholder="date_achat" v-model="form.date_achat">
                    <span>Date d'achat</span>
                </label>
                <span>{{ errors?.date_achat }}</span>

                <label for="montant" class="">
                    <input type="number" id="montant" placeholder="montant"   v-model="form.montant">
                    <span>Montant</span>
                </label>
                <span>{{ errors?.montant }}</span>     

                <label for="montant_total" class="">
                    <input type="number" id="montant_total" placeholder="montant"  v-model="form.montant_total">
                    <span>Montant total</span>
                </label>
                <span>{{ errors?.montant_total }}</span>            
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
        quantity:"",
        lot_id:"",
        tva:"",
        stock_id:"",
        product_id:"",
        date_achat:"",
        montant_total:"",
        montant:"",
        description:""
    
      },
      errors: {},
      receptions:[],
      products:[],
      stocks:[],
      lots:[],
      saveEditBtn:"Enregistrer",
    };
  },
    mounted(){
      this.getProducts()
      this.getStocks()
      this.getLots()
  },
  updated(){
    if(this.$store.state.IdEditReception==null){
        this.form={};
        this.saveEditBtn="Enregistrer"
      }else{
         this.form=this.$store.state.receptions;
        this.saveEditBtn="Modifier"
      }
 
  },

  methods: {

    getProducts() {
      axios.get(this.$store.state.baseUrl + "/products",
      )
        .then(resp => {
          this.products = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },
     getStocks() {
      axios.get(this.$store.state.baseUrl + "/stocks",
      )
        .then(resp => {
          this.stocks = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },
    getLots() {
      axios.get(this.$store.state.baseUrl + "/lots",
      )
        .then(resp => {
          this.lots = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },
    saveInformation() {
      if (this.form["product_id","lot_id","stock_id","quantity"]=="") return; 

       if(this.$store.state.IdEditReception==null){
             
        axios.post(
          this.$store.state.baseUrl + "/receptions",
          this.form
        )
        .then((resp) => {
          this.receptions = resp.data;
          this.form = { description:"",quantity:"",product_id:"",date_achat:"",lot_id:"",stock_id:"", tva:"",montant:"",montant_total:""} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });
       }else{
         axios.patch(
          this.$store.state.baseUrl+"/receptions/"+this.$store.state.IdEditReception,
          this.form )
        .then((resp) => {
          this.receptions = resp.data;
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