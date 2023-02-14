<template>
 <div class="form">
    <div class="d-flex">
        <span class="mx-auto h3 title">Reception</span>
        <span @click="close" class="h2 close ">x</span>
    </div>
      <!-- retrieve data -->
    <span class="d-none">{{$store.state.receptions}}{{$store.state.IdEditReception}}</span>
      <!-- retrieve data -->
    <div class="col-12 mt-2">
      <form action="" @submit.prevent="saveInformation">
          <div class=" col-12 d-md-flex d-sm-flex d-xsm-flex">
              <div class="col">
                <div>
                  <div>Produit</div>
                      <select :disabled="saveEditBtn=='Modifier'"  v-model="form.product_id"  id="product_id" required="required" class="form-select">
                          <option v-for="product in stocks"  :key="product.id" :value="product.product_id" selected>
                          {{ product.products.name }}
                          </option>
                      </select>             
                    <div>{{ errors?.product_id }}</div>  
                </div> 
                <div>
                  <label for="lot_id">
                    <input type="number" v-model="form.lot_id" placeholder="price" required="required">
                    <span>Price</span>
                  </label>
                  <div>{{ errors?.lot_id }}</div>  
                </div>
                <div>
                  <label for="quantity">
                      <input type="number" id="quantity" placeholder="quantity" v-model="form.quantity" required="required">
                      <span>Quantity</span>
                  </label>
                  <div>{{ errors?.quantity }}</div>
                </div>  
                <div>
                  <label for="tva" >
                      <input type="number" required="required" disabled="disabled" step="1" id="tva" placeholder="tva" v-model="form.tva">
                      <span>TVA(%)</span>
                  </label>
                  <div>{{ errors?.tva }}</div>
                </div>  
                <div>  
                  <label for="date_achat">                    
                      <input type="date" id="date_achat" class="dateWidth" v-model="form.date_achat">
                      <span>Date d'achat</span>
                  </label>
                  <div>{{ errors?.date_achat }}</div>
                </div>
              </div>

              <div class="col-md-6 col">
                
                <div>
                  <label for="montant" class="">
                      <input type="text" id="montant" :disabled="saveEditBtn=='Modifier'" required="required" v-model="form.montant">
                      <span>Montant</span>
                  </label>
                  <div>{{ errors?.montant }}</div>                 
                  <label for="montant" class="">
                      <input type="hidden" id="montant" required="required" v-model="form.stock_id">
                  </label>   
               </div>
                <div>
                  <label for="montant_total">
                      <input type="number"  id="montant_total" disabled="saveEditBtn=='Modifier'" required="required" placeholder="montant"  v-model="form.montant_total">
                      <span>Montant total</span>
                  </label>
                  <div>{{ errors?.montant_total }}</div>            
                </div>
                <div>  
                <div>Description</div>
                  <label for="description">
                      <textarea  id="description" placeholder="Description"  v-model="form.description"></textarea>
                  </label>
                  <div>{{ errors?.description }}</div>
                </div>  
              </div>
          </div>  
          <div class="d-flex justify-content-around">
            <button type="submit" :disabled="loading" class="btn btn-sm btn-danger" >
              <div v-if="loading" class="d-flex justify-content-center mx-2">
						       <span class="">Loading...</span>
                         <div class="spinner-border" role="status">
                         </div>
              </div>
              <span v-if="!loading">{{saveEditBtn}}</span>
              </button>
            <button type="reset" :disabled="loading" v-if="saveEditBtn=='Ajouter'" class="btn btn-sm btn-primary" >vider</button>
          </div>
      </form>
    </div>

  </div>
</template>
<script>
import Swal from 'sweetalert2';
import api from '../../../../api'
export default {
  props:["modalActive"],
  data() {
    return {
      form: {
        quantity:"",
        lot_id:"",
        tva:1,
        stock_id:"",
        stock:"",
        product_id:"",
        date_achat:new Date().toISOString().slice(0,10),
        montant_total:0,
        montant:0,
        description:"",
        user_id:""
      },
      errors: {},
      receptions:[],
      //products:[],
      stocks:[],
      saveEditBtn:"Ajouter",
      loading:false,
      vides:[]
    };
  },

    mounted(){
      this.getuser()
      this.getStocks()
      this.getvides()
  },
  watch:{
  "$store.state.IdEditReception"(a){
    console.log(a)
    if(this.$store.state.IdEditReception==null){
      this.getuser()
       //  this.form={};
       this.form.product_id="",
      this.form.date_achat=new Date().toISOString().slice(0,10),
      this.form.montant_total=0,
      this.form.montant=0,
      this.form.quantity="",
      this.form.lot_id="",
      this.form.tva=1,
      this.form.stock_id="",
      this.form.stock="",

     this.saveEditBtn="Ajouter"

        }else{
          
            this.form=this.$store.state.receptions;
            this.form.date_achat=(this.$store.state.receptions.date_achat).substr(0, 10)
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
      api.get("stock",
          this.form)
        .then(resp => {
          this.stocks = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },
    getvides() {
      api.get("vides"
          )
        .then(resp => {
          this.vides = resp.data
        })
        .catch(err => {
          console.log(err)
        })

    },

    close(){
      this.$emit('close')
    }, 
    saveInformation() {
     // console.log(this.$refs.product)
     
      if (this.form["product_id","lot_id","stock_id","quantity"]=="") return; 
      this.loading=true
      let result=[]
      this.vides.forEach(item => {
      JSON.parse(item.products).forEach(element => {
        console.log(element)
          if(element==this.form.product_id)
          {
            result=item

          }
        
          
        });
        
      });
      console.log(this.result)
    //  let result= this.vides.find((item) => item.products.find() === this.form.product_id)
    //  this.form.product_id=this.form.stock.product_id
      
      if(this.form.quantity > result.quantite)
      {
        this.loading=false
        Swal.fire({
               icon: 'error',
               title: 'oups',
               text: "Vous n'avez pas assez de vide pour effecctuer cette achat: nb vide dispnible! : "+result.quantite,  
              });
      }
     else{
        this.loading=true

       if(this.$store.state.IdEditReception==null){
         
           this.form.stock_id=this.form.product_id,
             console.log(this.form.stock_id)
        api.post(
          "reception",
          this.form
        )
        .then((resp) => {
          this.loading=false
          this.receptions = resp.data;
          this.form.date_achat=new Date().toISOString().slice(0,10),
          this.form.product_id="",
          this.form.montant_total=0,
          this.form.montant=0,
          this.form.quantity="",
          this.form.lot_id="",
          this.form.tva=1,
          this.form.stock_id="",
          this.form.stock="",

          Swal.fire({
               icon: 'success',
               title: 'Ajouter',
               text: 'Enregister avec succès',  
              });
        })
        .catch((err) => {
          this.loading=false
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });

      }else{
        this.loading=true
         api.patch(
          "reception/"+this.$store.state.IdEditReception,
          this.form )
        .then((resp) => {
          this.loading=false
          this.receptions = resp.data;
          
          this.$emit('close')
          
          Swal.fire({
               icon: 'success',
               title: 'Modification',
               text: 'Modification réussi!',  
              });
             
         })
        .catch((err) => {
          this.loading=false
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        });

       

      }
}
 
},

  }
}
    


</script>

<style  scoped src="@/assets/css/form.css">
</style>
<style scoped>

@media (max-width:575px){

.form {
    margin-top:120px;
    overflow: scroll;
}

}

</style>