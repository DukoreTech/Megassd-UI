<template>
  <div>
 <section class="h-100 h-custom mx-auto">
  <div class="container h-100 px-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card shopping-cart" style="border-radius: 15px;">
          <div class="card-body text-black">

            <div class="row">
              <div class="col-lg-6 px-5 py-4">

                <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase">Produit</h3>

                <div class="d-flex align-items-center mb-5" v-for="(lot,id) in lots" :key="lot.id">
                  <div class="flex-shrink-0">
                    <img src="logo.png" class="img-fluid" style="width: 80px;" alt="Produit">
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <a href="#!" class="float-end text-black"><font-awesome-icon icon="fa-solid fa-times"/></a>
                    <h5 class="text-primary">{{lot.product_id}}</h5>
                    <h6 style="color: #9e9e9e;">Prix: {{lot.price_vente}} Fbu</h6>
                    <div class="d-flex align-items-center">
                  
                      <div class="align-items-center">
                        <button class="btn btn-default"  @click="decrement(id)" >
                          <font-awesome-icon icon="fa-solid fa-minus"/>
                        </button>
                        <!-- <span class="fw-bold">{{lot.quantity}}</span> -->
                        <input type="text"   min="1" size="2" :max="lot.quantity" v-model="lot.quantity">
                         <!-- @keyup="limitQte(id)" @change="limitQte(id)" -->
                        <!-- <div class="text-danger" v-if="showMsg(id)">we dont have such quantity</div> -->
                        <!-- <input class="btn btn-default quantity fw-bold text-black" min="0" name="quantity" type="number" v-model="count"> -->
                        <button  class="btn btn-default"  @click="increment(id)" >
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
                  <h5 class="fw-bold mb-0">{{totalMontant}} FBU</h5>
                </div>

              </div>
              <div class="col-lg-6 px-5 py-4">

                <h3 class="mb-5 pt-2 text-center fw-bold text-uppercase">Paiement</h3>

                <form class="mb-5">

                  <div class="form-outline mb-5">
                    <label class="form-label" for="typeText">Numero de bordereaux</label>
                    <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                      value="1234 5678 9012 3457" minlength="19" maxlength="19" />
                  </div>

                    <div class="form-outline mb-5">
                        <label class="form-label" for="typeName">Votre nom sur bordereau</label>
                        <input type="text" id="typeName" class="form-control form-control-lg" siez="17"
                        value="Patrick irakoze" />
                    </div>

            
                  <button type="button" class="btn btn-primary btn-block btn-lg float-end" @click="subJouter(id)">Ajouter</button>

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

export default {
    // components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            total:null,
            // isShow:false,
            // limit:"",
            lots : [ ]
        }
    },
  
    mounted(){
        this.fetchData()
    },
    
    methods:{
        decrement(id){
          this.lots[id].quantity =  this.lots[id].quantity *1 - 1 
        },
        increment(id){
          this.lots[id].quantity =this.lots[id].quantity *1 + 1 
        },
        fetchData() {
            axios.get(this.$store.state.baseUrl + "/lots/")
            .then(resp => {
                this.lots = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        // subJouter(id){
          //  const limit=this.lots[id].quantity
          //   console.log(limit)
        //     if(this.lots[id].quantity >24){
        //       this.isShow=true
        //     }else{
        //       this.isShow=false
        //     }
        // },
        // limitQte(id){
          // const limit=this.lots[id].quantity
          // console.log(limit)
        //   if(this.lots[id].quantity>24){
        //     this.isShow=true
        //   }else{
        //      this.isShow=false
        //   }
        // },
        // showMsg(id){
        //   if(this.lots[id].id) return this.isShow
        // },
        // Total(){
        //     return this.total= this.count + 50
        // },
        // deleteReception(id) {
        //     axios.delete(this.$store.state.baseUrl + "/receptions/" + id)
        //     .then(resp => {
        //         this.receptions = resp.data
        //         this.fetchData()
        //     })
        //     .catch(err => {
        //         console.error(err)
        //     })
            
        // },

        // editReception(reception,id){
        // this.$store.state.IdEditReception=id
        // this.$store.state.receptions=reception
        
        // }
    },
    computed:{
      totalMontant(){
        let sum = 0;

        this.lots.map(e =>{
          sum += (e.quantity * e.price_vente);
          console.log(e)
        })
        return sum;
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