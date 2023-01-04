<template>
   <div class="container">
       <div class="row justify-content-center mt-5">
           <div class="col-md-12">
               <form class="" @submit.prevent="envoyer()" >
               <table class="table table-bordered table-striped table-responsive">
                   <thead class="thead-dark">
                    <p>Product info</p>
                       <tr>
                           <th scope="col">Produit</th>
                           <th scope="col">Quantité</th>
                           <th scope="col">montant</th>
                           <th scope="col">Total</th>
                           <th scope="col">Actions</th>
                           <th scope="col">client</th>
                           <th scope="col">Nbbordereau</th>
                           <th scope="col">montant payé</th>
                       </tr>
                       

                   </thead>
                   <tbody>
                   <tr v-for="(commande, index) in commandes" :key="commande.index">
                       <td>{{ commande.product_id }}</td>
                       <td>{{ commande.product_quantity }}</td>
                       <td>{{ commande.amount }}</td>
                       <td>{{ (commande.product_quantity * commande.amount).toFixed(2) }}F</td>
                       <td class="d-flex"><a class="btn btn-info btn-block" @click="modifier(index)">Modifier</a>
                      <a class="btn btn-warning btn-block" @click="supprimer(index)">Poubelle</a></td>
                      
                   </tr>
                   <p class="m-4">Total Amount</p>
                   

                   <tr>
                    
                       <td colspan="3"></td>
                       <td><input type="text" :disabled="disabled"  class="form-control" v-model="totalMontant" Fbu></td>
                       <td colspan="1"></td>
                       <td>{{form.client_name}}</td>
                       <td>{{form.nbbordereau}}</td>
                       <td>{{form.montant_paye}}</td>
                       
                   </tr>
                   <p>Product Form</p>
                   <tr>
                    
                    <th>select product</th>
                    <th>Quantity</th>
                    <th>Action</th>
                    <th>To:client</th>
                    <th> Numero Bordereau</th>
                    <th>Montant sur bordereau</th>
                    <th>montant supplementaire</th>


                   </tr>

                   <tr>
                    
                    

                       <td>
                           <div class="form-group">                            
                           <select v-model="form.product" name="produit_id" class="form-control">
                               <option v-for="produit in produits" :key="produit.id" v-bind:value="produit">{{ produit.products.name }}</option>                                
                           </select>

                           </div>
                       </td>
                       <td><input type="number" class="form-control" max="produit.plein" min="1" v-model="form.quantite"></td>

                       <td><a class="btn btn-primary btn-block" @click="ajouter">Ajouter</a></td>
                       
                       <td>

                        <select v-model="form.client" v-on:change="getprice" name="produit_id" class="form-control">
                               <option v-for="client in clients" :key="client" :value="client" >{{ client.nom }}</option>                                
                        </select>
                       </td>
                       <td><input type="number" class="form-control" v-model="form.nbbordereau"></td>
                       <td><input type="number" class="form-control" v-model="form.montant_paye"></td>
                       <td><input type="number" class="form-control" v-model="form.montantsup"></td>
                   </tr>
                   </tbody>
                   <tfoot class="d-flex justify_content_around mt-5">
                   
                   
                   <button class="button btn btn-xs btn-success" type="submit">Valider</button>
                   </tfoot>
               </table>
           </form>
           <div class="panel panel-danger" v-show="poubelle.length">
               <div class="panel-heading">Poubelle</div>
               <table class="table table-bordered table-striped table-responsive">
                   <thead>
                   <tr>
                       <th class="col-sm-4">Produit</th>
                       <th class="col-sm-2">Quantité</th>
                       <th class="col-sm-2">montant</th>
                       <th class="col-sm-2">Total</th>
                       <th class="col-sm-1"></th>
                       <th class="col-sm-1"></th>
                   </tr>
                   </thead>
                   <tbody>
                   <tr v-for="(commande, index) in poubelle" :key="index">
                       <td>{{ commande.product_id }}</td>
                       <td>{{ commande.product_quantity }}</td>
                       <td>{{ commande.amount}} F</td>
                       <td>{{ (commande.product_quantity * commande.amount).toFixed(2) }} F</td>
                       <td><a class="btn btn-success btn-block" @click="retablir(index)">Rétablir</a></td>
                       <td><a class="btn btn-danger btn-block" @click="eliminer(index)">Supprimer</a></td>
                   </tr>
                   </tbody>
               </table>
               <div class="panel-footer">
                   &nbsp;
                   <div class="btn-group">
                       <a class="button btn btn-xs btn-success" @click="toutRetablir">Tout rétablir</a>
                       <a class="button btn btn-xs btn-danger" @click="toutEliminer">Tout supprimer</a>
                   </div>
               </div>
           </div>
           </div>            
       </div>
   </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2';
export default {
    data(){
        return{
            commandes: [],
            poubelle: [], 
            produits: [], 
            clients:{},
            
            lots:{},
            form: {                                  
                product : '',                    
                quantite : '',                    
                montant: '',  
                client:'', 
                client_name:'',
                montant_paye:'',
                nbbordereau:'',
                totalmontant:1,   
                montantsup:0             
            }       
            }

        },
    
        computed:{
      
      totalMontant(){
        let sum=0;
        
        //this.stocks.price=price

        this.commandes.map(e =>{
           sum+= (e.product_quantity * e.amount)+this.form.montantsup;
          console.log(e)
          //console.log(sum)

        })
        return sum;
       //
        
      }
    },
     mounted()
        {
            this.getclient()
            this.getstock()
           
        },
    
    methods:{
        getstock(){
          axios.get(this.$store.state.baseurl + "stock",axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
                    axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                
                this.produits=resp.data
    
                this.produits.forEach(function(item){item.price = 12000});

               /* for (let index = 0; index < resp.data.length; index++) {
                  const quantity = resp.data[index].plein;
                  const idproduit=resp.data[index].id;
                  let product_quantity={"id":idproduit,"quantity":quantity}
                  this.stocksquant.push(product_quantity)
                }*/
                console.log(this.produits)
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
            this.form.client_name=this.form.client.nom
 
        axios.get(this.$store.state.baseurl +"getprice",{params:{
        address_id:this.form.client.address_id,
        type_clients_id:this.form.client.type_client_id 

      }},axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
        axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.lots = resp.data
                //console.log(this.lots)
                this.lots.forEach((obj) => {
                this.commandes.forEach((array1Obj) => {
                if (obj.product_id == array1Obj.product_id) {
                  array1Obj.amount=obj.price_vente;
                    
                }
                
               });
               
              });
              console.log(this.commandes)
             
              
             
            })
            .catch(err => {
                console.error(err)
            })

    },
        retablir(index) {
                this.commandes.push(this.poubelle[index]);
                this.poubelle.splice(index, 1);
               // this.commandes.sort(ordonner);
            },
           
            
        ajouter() {
            console.log(this.produits)
            let result= this.produits.find((item) => item.id === this.form.product.product_id)
                if(this.form.quantite < result.plein){
                this.commandes.push({product_id: this.form.product.product_id, product_quantity: this.form.quantite, amount: this.form.montant , product_name:this.form.product.products.name});
               // this.form = {};
                console.log(this.commandes)
               // this.commandes.sort(ordonner);
                }
              
                else{

                    Swal.fire({
               icon: 'error',
               title: ' oups ',
               text: 'quantity not available' 
              });
                }
          //  console.log(this.check)
           
               

                 
            
            },

            modifier(index) {
                this.form.produit_id = this.commandes[index].product_id;
                this.form.quantite = this.commandes[index].quantite;
                this.form.montant = this.commandes[index].montant;
                this.commandes.splice(index, 1);
            },

            supprimer(index) {
                this.poubelle.push(this.commandes[index]);
                this.commandes.splice(index, 1);
                this.poubelle.sort(ordonner);
            },
            envoyer() {
                const v = {
      products : this.commandes,
      client_id: this.form.client.id,
      num_bordereau:this.form.nbbordereau,
      payed_amount:this.form.montant_paye,
      total_amount:this.totalMontant,
      montantsup:this.form.montantsup
    }
    console.log(v)

    axios.post(
          this.$store.state.baseurl + "ventes",
          v,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`
        )
        .then((resp) => {
            this.data=resp.data
         

         // this.commandes = []; 
          this.v=[];
          Swal.fire({
               icon: 'success',
               title: ' success message ',
               text: 'order made with success'
              });
              this.$router.push('/Commande')
         // this.form = { description:"",quantity:"",product_id:"",date_achat:"",lot_id:"",stock_id:"", tva:"",montant:"",montant_total:""} 
        })
        .catch((err) => {
            Swal.fire({
               icon: 'error',
               title: ' oups ',
               text: 'something wrong  try again!'+ ""+ err.response.data.data 
              });
          
        
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        })       
            }, 
            eliminer(index)
            {
                this.poubelle = this.poubelle.filter(item => item.index !== index);
                this.poubelle.splice(index, 1);
            }
    },
    
    }
    var ordonner = function (a, b) {
        return (a.commande.toUpperCase() > b.commande.toUpperCase())
    };


</script>

<style>

</style>