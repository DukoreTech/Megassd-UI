<template>
<div class="form">
  <div class="d-flex">
      <span class="mx-auto h3 title">Prix de vente</span>
      <span @click="close" class="h2 close ">x</span>
  </div>
<!-- retrieve data -->
<span class="d-none">{{$store.state.lots}}{{$store.state.IdEditLot}}</span>
<!-- retrieve data -->
  <div class="col-12 mt-2">
    <form action="" @submit.prevent="saveInformation">
          <div class=" col-12 d-md-flex d-sm-block">
            <div class="col-md-6 col-sm-12">
              <div>
                <label for="name">
                    <input type="text" required="required" id="name" placeholder="Nom" v-model="form.name">
                    <span>Nom</span>
                </label>
                <div>{{ errors?.name }}</div>
              </div>
              <div>
                <div>Produit</div>
                 <span v-if="saveEditBtn=='Ajouter'" for="product_id">
                    <select required="required"  v-model="form.product_id" aria-placeholder="product_id" id="product_id" class="form-select">
                        <option v-for="product in products" :key="product.id" :value="product.id"  selected>
                        {{ product.name }}
                        </option>
                    </select>             
                </span>
              </div>  
              <div>
                <span v-if="saveEditBtn=='Modifier'" for="product_id">
                    <select required="required" disabled="disabled"  v-model="form.product_id" aria-placeholder="product_id" id="product_id" class="form-select">
                        <option v-for="product in products" :key="product.id" :value="product.id"  selected>
                        {{ product.name }}
                        </option>
                    </select>             
                </span>
              </div>
              <div class="mt-2">
               <div>Type client</div>
                 <span  v-if="saveEditBtn=='Ajouter'" for="product_id">
                    <select required="required"  v-model="form.type_Clients_id" aria-placeholder="product_id" id="product_id" class="form-select">
                        <option v-for="client in typeClients"  :key="client.id" :value="client.id"  selected>
                        {{ client.name }}
                        </option>
                    </select>             
               </span> 
              </div> 
              <div class="mt-2">
               <span v-if="saveEditBtn=='Modifier'"  for="product_id" class="">
                    <select required="required" disabled="disabled"  v-model="form.type_Clients_id" aria-placeholder="product_id" id="product_id" class="form-select">
                        <option v-for="client in typeClients"   :key="client.id" :value="client.id"  selected>
                        {{ client.name }}
                        </option>
                    </select>             
               </span> 
               <div>{{ errors?.product_id }}</div>
              </div>
               
            </div>

            <div class="col-md-6 col-sm-12">                
              <div>
                <label  for="price_vente">
                      <input required="required" type="text" id="price_vente" placeholder="Prix de vente" v-model="form.price_vente">
                      <span>Prix de vente</span>
                  </label>
                <div>{{ errors?.price_vente }}</div> 
              </div>
              <div>
                  <div >Direction</div>
                  <div class="mt-1">
                    <Multiselect v-if="saveEditBtn=='Ajouter'" 
                      mode="tags"
                      required="required"
                      :close-on-select="false"
                      :searchable="true"
                      value-prop="id" 
                      :object="false"
                      v-model="form.adresses_id"
                      @select="onSelect"
                      :options="options"
                    />
                  </div>
              </div>
               <div>
                <span  v-if="saveEditBtn=='Modifier'" for="product_id" class="">
                  <!--<div>{{ form.adresses_id }}</div>-->
                    <select required="required" disabled="disabled"  v-model="form.adresses_id" aria-placeholder="product_id" id="multiselect" class="form-select">
                        <option v-for="zone in address" :key="zone.id" :value="zone.id" class="bg-white"  selected>
                        {{ zone.name }}
                        </option>
                    </select>             
                  </span>
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
import axios from "axios";
import Swal from 'sweetalert2';
import api from '../../../../api'
import Multiselect from '@vueform/multiselect'
export default {
   components: {
      Multiselect,
    },
  props:["modalActive"],
  data() {
    return {
      
      options: [     
            ],
      form: {
        name:"",
        //quantity:"",
       // price_unitaire:"",
        product_id:"",
        price_vente:"",
        description:"",
        user_id:"",
        adresses_id:[ ],
        type_Clients_id:""
    
      },
      loading:false,
      //myOptions: ['op1', 'op2', 'op3'], // or [{id: key, text: value}, {id: key, text: value}]
      address:this.$store.state.adresses,
      errors: {},
      products:[],
      lots:[],


      saveEditBtn:"Ajouter",
      typeClients:[]
    };
  },
    mounted(){
      console.log(this.$store.state.lots)
     
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
            this.form.type_Clients_id=this.form.type_clients_id
            this.saveEditBtn="Modifier"
            console.log(this.form)
        }

  },
  "this.$store.state.lots"(val){
   
    this.lots=val;
  },
  "address"(val){
    //console.log(val)
    this.address=val
    val.forEach(element => {
      this.options.push({id:element.id,name:element.name,label:element.name})
      
    });
    console.log(this.options)

  }
 },


 


  methods: {
    onSelect(value) {
            console.log(value) // this will log the value as { id: 1, text: 'vue' }
        },
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
      this.loading=true
      let result=[]
      let reply=[]
      let type=""
       if(this.$store.state.IdEditLot==null){  
        result= this.$store.state.lots.filter((item) => item.product_id == this.form.product_id && this.form.adresses_id.some(y => y === item.adresses_id) && item.type_clients_id==this.form.type_Clients_id)
        console.log(result)
        console.log(this.form.adresses_id)
        if(result.length>0){
          this.loading=false
          result.forEach(element => {
          reply.push(element.adresses.name)
          type=element.type_clients.name
          
        });
        let x =JSON.stringify(reply)
          Swal.fire({
               icon: 'info',
               title: 'erreur',
               text: 'vous avez déja définit un  prix pour le  '+type+ ' se trouvant à  ' + reply
                
              });
        }
       
        else{
          this.loading=true
        api.post(
          "lots",
          this.form
        )
        .then((resp) => {
          this.loading=false
         
          this.lots = resp.data;
          this.$emit('fetch')
      
          this.form={}
          this.$emit("fetch")
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
      } }else{
        this.loading=true
         api.patch(
          "lots/"+this.$store.state.IdEditLot,
          this.form )
        .then((resp) => {
          this.loading=false
          this.form={}
          this.lots = resp.data;        
          Swal.fire({
               icon: 'success',
               title: 'Modification',
               text: 'Modification réussi!',  
              });
              this.$store.state.lots=resp.data
         this.$emit('close')
        
         
         })
        .catch((err) => {
          this.loading=false
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

<style  scoped src="@/assets/css/form.css"></style>
<style src="@vueform/multiselect/themes/default.css"></style>