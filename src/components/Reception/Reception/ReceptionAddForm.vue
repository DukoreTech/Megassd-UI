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
                        <option v-for="product in stocks" :key="product.id" :value="product.product_id" selected>
                        {{ product.products.name }}
                        </option>
                    </select>             
                  </label>
               <span>{{ errors?.product_id }}</span>  
                 <br>
                 <span>Price</span>
                 <label for="lot_id" class="d-block dateWidth">
                    <input type="number" v-model="form.lot_id">
                  </label>
               <span>{{ errors?.lot_id }}</span>  
                <br>
              

                <label for="quantity">
                    <input type="number" id="quantity" placeholder="quantity" v-model="form.quantity">
                    <span>Quantity</span>
                </label>
                <span>{{ errors?.quantity }}</span>

              
                
            </div>

             <div class="col col2">
                  <label for="tva" class="">
                    <input type="number" step="0.01" id="tva" placeholder="tva" v-model="form.tva">
                    <span>TVA(%)</span>
                </label>
                <span>{{ errors?.tva }}</span>
                <label for="date_achat" class="d-block dateWidth">
                    <input type="date" id="date_achat" placeholder="date_achat" v-model="form.date_achat">
                    <span>Date d'achat</span>
                </label>
                <span>{{ errors?.date_achat }}</span>

                <label for="montant" class="">
                    <input type="text" id="montant" v-model="form.montant">
                    <span>Montant</span>
                </label>
                <span>{{ errors?.montant }}</span> 
                <label for="montant" class="">
                    <input type="hidden" id="montant" v-model="form.stock_id">
        
                </label>    

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
import Swal from 'sweetalert2';
export default {
  props:["modalActive"],
  data() {
    return {
      form: {
        quantity:"",
        lot_id:"",
        tva:0,
        stock_id:"",
        stock:"",
        product_id:"",
        date_achat:"",
        montant_total:0,
        montant:0,
        description:"",
        user_id:""
      },
      errors: {},
      receptions:[],
      //products:[],
      stocks:[],
      saveEditBtn:"Enregistrer",
    };
  },

    mounted(){
      this.getuser()
      this.getStocks()
  },
  watch:{
  "$store.state.IdEditReception"(a){
    console.log(a)
    if(this.$store.state.IdEditReception==null){
      this.getuser()
         this.form={};
         this.saveEditBtn="Enregistrer"

        }else{
          
            this.form=this.$store.state.receptions;
            this.saveEditBtn="Modifier"
            console.log(this.$store.state.receptions)
        }

  }
  ,"form.lot_id"(val)
  {
    if(this.quantity!=0 || this.form.tva!=0)
    {
      this.onChange();
      this.onchangetva();
    }
  }
  ,"form.quantity"(val)
  {
    this.onChange()
    if(this.form.tva!=0)
      {
        this.onchangetva()
      }
  }
  ,"form.tva"(val)
  {
    this.onchangetva()
  }
 },


  methods: {

    getuser(){
      let userlogged= JSON.parse(this.$store.state.user)
      this.form.user_id=Object.values(userlogged)[0].id
    },
    onChange(){
      const a=this.form.lot_id
      const b=this.form.quantity
      this.form.montant= a * b 
    },
    onchangetva(){
      const c=this.form.tva
      const d=this.form.montant
      this.form.montant_total= d * c
      
      
      

    },
  

    /*getProducts() {
            axios.get(this.$store.state.baseurl + "products",axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
            axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.products = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },*/
    getStocks() {
      axios.get(this.$store.state.baseurl + "stock",
          this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`)
        .then(resp => {
          this.stocks = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },
  
    saveInformation() {
      console.log(this.$refs.product)
     
      if (this.form["product_id","lot_id","stock_id","quantity"]=="") return; 
      
      let result= this.stocks.find((item) => item.id === this.form.product_id)
      //this.form.product_id=this.form.stock.product_id
      
      if(this.form.quantity > result.vide)
      {
        Swal.fire({
               icon: 'error',
               title: 'oups',
               text: "Vous n'avez pas assez de vide pour effecctuer cette achat: nb vide dispnible! : "+result.vide,  
              });
      }
      else{

       if(this.$store.state.IdEditReception==null){
       console.log(this.result)
        //this.form.product_id=this.form.stock.product_id
           this.form.stock_id=result.id,
             console.log(this.form.stock_id)
        axios.post(
          this.$store.state.baseurl + "reception",
          this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`
        )
        .then((resp) => {
          this.receptions = resp.data;
          this.form = {}
          Swal.fire({
               icon: 'success',
               title: 'success',
               text: "Achat effectué avec success",  
              });
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });

      }else{
         axios.patch(
          this.$store.state.baseurl+"reception/"+this.$store.state.IdEditReception,
          this.form )
        .then((resp) => {
          this.receptions = resp.data;
          this.$emit('close')
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