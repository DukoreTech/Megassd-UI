<template>
  <div>
 <section class="h-100 h-custom mx-auto">
  <div class="container h-100 px-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card shopping-cart" style="border-radius: 15px;">
          <div class="card-body text-black">
            <form action="">

             <div class="row">
              <div class="col-lg-6 px-5 py-4">

                <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase">Produit</h3>

                <div class="d-flex align-items-center mb-5" v-for="(stock,id) in cart" :key="stock.id">
                  <div class="flex-shrink-0">
                   
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <a href="#!" @click="removeitem(stock.id)" class="float-end text-black"><font-awesome-icon icon="fa-solid fa-times"/></a>
                    <h5 class="text-primary" ref="product_id"   :data-id="id">{{stock.products.name}}</h5>
                    
                    <h6  style="color: #9e9e9e;" id="product_price" :value="stock.price">Prix: {{stock.price}} Fbu</h6>
                    <div class="d-flex align-items-center">
                  
                      <div class="align-items-center">
                        <button class="btn btn-default"  @click.prevent="decrement(id)" >
                          <font-awesome-icon icon="fa-solid fa-minus"/>
                        </button>
                        <!-- <span class="fw-bold">{{lot.quantity}}</span> -->
                        <input type="number"   min="1"  :max="stock.plein" v-model="stock.plein">
                         <!-- @keyup="limitQte(id)" @change="limitQte(id)" -->
                        <!-- <div class="text-danger" v-if="showMsg(id)">we dont have such quantity</div> -->
                        <!-- <input class="btn btn-default quantity fw-bold text-black" min="0" name="quantity" type="number" v-model="count"> -->
                        <button  class="btn btn-default" :max="stock.plein"  @click.prevent="increment(id)" >
                           <font-awesome-icon icon="fa-solid fa-plus"/>
                        </button>
                       
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="mb-4" style="height: 2px; background-color: #1266f1; opacity: 1;">

                <!-- <div class="d-flex justify-content-between px-x">
                  <p class="fw-bold">Discount:</p>
                  <p class="fw-bold">95$</p>
                </div> -->
                <div class="d-flex justify-content-between p-2 mb-2" style="background-color: #e1f5fe;">
                  <h5 class="fw-bold mb-0">Total:</h5>
                  <h5 class="fw-bold mb-0" id="product_quantity" ref="montant"  :data-id="totalMontant">{{totalMontant}} FBU</h5>
                </div>

              </div>
              <div class="col-lg-6 px-5 py-4">

                <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase">Paiement</h3>

                <form class="mb-5">
                  <div class="form-outline mb-5">
                    <label class="form-label" for="typeText">Type paiement</label>
                    <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                      v-model="paiement" minlength="19" maxlength="19" />
                  </div>
                  

                  <div class="form-outline mb-5">
                    <label class="form-label" for="typeText">Numero de bordereaux</label>
                    <input type="number" id="typeText" class="form-control form-control-lg" siez="17"
                      v-model="numero" minlength="19" maxlength="19" />
                  </div>
                  <div class="form-outline mb-5">
                    <label class="form-label" for="typeText">Montant sur bordereaux</label>
                    <input type="number" id="typeText" class="form-control form-control-lg" siez="17"
                      v-model="montatsurbordereau" minlength="19" maxlength="19" />
                  </div>

                    <div class="form-outline mb-5">
                        <label class="form-label" for="typeName">client</label>
                        <label for="typeClient" class="d-block dateWidth">
                    <select  v-model="client" aria-placeholder="Type de client" id="typeClient" v-on:change="getprice" >
                        <option v-for="client in clients" :key="client" :value="client" selected>
                            {{ client.nom }}
                         </option>
                     </select>             
                  </label>
                    </div>

            
                  <button type="button" class="btn btn-primary btn-block btn-lg float-end" @click="getinfo()">Ajouter</button>

                  <h5 class="fw-bold mb-5" style="position: absolute; bottom: 0;">

                      <router-link :to="{name:'Commande'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseStock"
                             aria-expanded="true" aria-controls="collapseStock">
                               <font-awesome-icon icon="fa-solid fa-angle-left me-2"/>
                             Back
                            </router-link> 
                    <a href="#!"></a><!--  -->
                  </h5>

                </form>

              </div>
            </div>
          </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  </div>
</template>

<script>
import axios from "axios";

// import ModalComponent from '@/components/Global/ModalComponent';
// import AddForm from './ReceptionAddForm.vue';

import Swal from 'sweetalert2';

export default {
    // components: { ModalComponent, AddForm },
    
    data() {
        return{

            form:{
              amount:"",
              
            },
            productname:[],
            modalActive: false,
            search:'',
            total:null,
            clients:[],
            client:'',
            stocks:[],
            montatsurbordereau:'',
            numero:"",
            totalammount:'',
            price:'',
            lots : [ ],
            cart:[],
            stocksquant:[],
            error:'',
            paiement:"bordereau",
        }
    },
  
    mounted(){
        //this.fetchData()
        this.getclient()
        this.getstock()   
    },
    
    methods:{
      onchange(id){

        if(this.stocks[id].plein > this.stocksquant[id])
        {
          this.stocks[id].plein .preventDefault()
          
          console.log(this.stocks.plein)
           //this.error='the quantity u are asking does not exist in store';
        }

      },
      validateNumber(event,id){
        let keyCode = this.cart[id].plein;
      let range=this.stocksquant[id]
      if (keyCode >range ) {
        event.preventDefault();
      }
  },
      
        decrement(id){
          this.cart[id].plein =  this.cart[id].plein *1 - 1 
          this.cart[id].price=this.cart[id].price*1

        //id.PreventDefault()
        },
        removeitem(id){
          this.cart = this.cart.filter(item => item.id !== id);
          console.log(this.cart)
        },
        increment(id){ 
          if(this.cart[id].plein < this.stocksquant[id])
          {
          this.cart[id].plein =this.cart[id].plein *1 + 1
          //this.stocks[id].price=this.stocks[id].price*1 
          }
        },
     
        getstock(){
          axios.get(this.$store.state.baseurl + "stock",axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
                    axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                
                this.cart=resp.data
    
                this.cart.forEach(function(item){item.price = 0});

                for (let index = 0; index < resp.data.length; index++) {
                  const quantity = resp.data[index].plein;
                  const idproduit=resp.data[index].id;
                  let product_quantity={"id":idproduit,"quantity":quantity}
                  this.stocksquant.push(product_quantity)
                }
                //console.log(this.stocksquant)
            })
            .catch(err => {
                console.error(err)
            })


        },
        getclient(){
          axios.get(this.$store.state.baseurl + "client",
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.clients = resp.data
                this.$store.state.typeClients=resp.data
            })
            .catch(err => {
                console.error(err)
            })

        },
        getprice(){
 
        axios.get(this.$store.state.baseurl +"getprice",{params:{
        address_id:this.client.address_id,
        type_clients_id:this.client.type_client_id 

      }},axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
        axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.lots = resp.data
                //console.log(this.lots)
                this.lots.forEach((obj) => {
                this.cart.forEach((array1Obj) => {
                if (obj.product_id === array1Obj.product_id) {
                  array1Obj.price=obj.price_vente;
                    
                }
               });
              });
             
              
             
            })
            .catch(err => {
                console.error(err)
            })

    },
   
    getinfo(){
      let y={};
      let x = [];
      for (let index = 0; index < this.$refs.product_id.length; index++) {
        const productname= this.$refs.product_id[index].attributes['1'].value;
        let id=this.cart[productname].id
        let quantity=this.cart[productname].plein
        let price=this.cart[productname].price
        y={'product_id':id,'product_quantity':quantity,'amount':price}
        x.push(y)
    }
  //console.log(x)

  
  
   

    const v = {
      products : x,
      client_id: this.client.id,
      num_bordereau:this.numero,
      payed_amount:this.montatsurbordereau,
      total_amount:this.$refs.montant.attributes['2'].value,
    }
    axios.post(
          this.$store.state.baseurl + "ventes",
          v,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`
        )
        .then((resp) => {
          this.receptions = resp.data;
          this.form = { description:"",quantity:"",product_id:"",date_achat:"",lot_id:"",stock_id:"", tva:"",montant:"",montant_total:""} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
          Swal.fire({
               icon: 'error',
               title: ' oups ',
               text: 'something wrong  try again!'+ ""+ err.response.data.data 
              });
          
        })
    
             
    }   
    },
    
    computed:{
      
      totalMontant(){
        let sum = 0;
        //this.stocks.price=price

        this.cart.map(e =>{
          sum += (e.plein * e.price);
          console.log(e)
          //console.log(sum)

        })
        return sum;
       //
        
      },
       searchEvery(){
            return this.products.filter(val=>val.includes(this.search))
            }
    }
    
}
</script>

<style scoped>

/* medi query */

 @media (min-width: 1025px) {
.h-custom {
height: 100vh !important;
}
}

.number-input input[type="number"] {
-webkit-appearance: textfield;
-moz-appearance: textfield;
appearance: textfield;
}

.number-input input[type=number]::-webkit-inner-spin-button,
.number-input input[type=number]::-webkit-outer-spin-button {
-webkit-appearance: none;
}

.number-input button {
-webkit-appearance: none;
background-color: transparent;
border: none;
align-items: center;
justify-content: center;
cursor: pointer;
margin: 0;
position: relative;
}

.number-input button:before,
.number-input button:after {
display: inline-block;
position: absolute;
content: '';
height: 2px;
transform: translate(-50%, -50%);
}

.number-input button.plus:after {
transform: translate(-50%, -50%) rotate(90deg);
}

.number-input input[type=number] {
text-align: center;
}

.number-input.number-input {
border: 1px solid #ced4da;
width: 10rem;
border-radius: .25rem;
}

.number-input.number-input button {
width: 2.6rem;
height: .7rem;
}

.number-input.number-input button.minus {
padding-left: 10px;
}

.number-input.number-input button:before,
.number-input.number-input button:after {
width: .7rem;
background-color: #495057;
}

.number-input.number-input input[type=number] {
max-width: 4rem;
padding: .5rem;
border: 1px solid #ced4da;
border-width: 0 1px;
font-size: 1rem;
height: 2rem;
color: #495057;
}

@media not all and (min-resolution:.001dpcm) {
@supports (-webkit-appearance: none) and (stroke-color:transparent) {

.number-input.def-number-input.safari_only button:before,
.number-input.def-number-input.safari_only button:after {
margin-top: -.3rem;
}
}
}

.shopping-cart .def-number-input.number-input {
border: none;
}

.shopping-cart .def-number-input.number-input input[type=number] {
max-width: 2rem;
border: none;
}

.shopping-cart .def-number-input.number-input input[type=number].black-text,
.shopping-cart .def-number-input.number-input input.btn.btn-link[type=number],
.shopping-cart .def-number-input.number-input input.md-toast-close-button[type=number]:hover,
.shopping-cart .def-number-input.number-input input.md-toast-close-button[type=number]:focus {
color: #212529 !important;
}

.shopping-cart .def-number-input.number-input button {
width: 1rem;
}

.shopping-cart .def-number-input.number-input button:before,
.shopping-cart .def-number-input.number-input button:after {
width: .5rem;
}

.shopping-cart .def-number-input.number-input button.minus:before,
.shopping-cart .def-number-input.number-input button.minus:after {
background-color: #9e9e9e;
}

.shopping-cart .def-number-input.number-input button.plus:before,
.shopping-cart .def-number-input.number-input button.plus:after {
background-color: #4285f4;
}

</style>