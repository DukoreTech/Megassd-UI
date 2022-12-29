<template>
   <div class="container">
       <div class="row justify-content-center mt-5">
           <div class="col-md-12">
               <form class="" @submit.prevent="envoyer()" >
               <table class="table table-bordered table-striped table-responsive">
                   <thead class="thead-dark">
                       <tr>
                           <th class="col-sm-2">Produit</th>
                           <th class="col-sm-1">Quantité</th>
                           <th class="col-sm-1">montant</th>
                           <th class="col-sm-1">Total</th>
                           <th class="col-sm-2">Actions</th>
                           <th class="col-sm-2">client</th>
                           <th class="col-sm-2">Nbbordereau</th>
                           <th class="col-sm-2">montant payé</th>
                       </tr>
                   </thead>
                   <tbody>
                   <tr v-for="(commande, index) in commandes" :key="index">
                       <td>{{ commande.product_id }}</td>
                       <td>{{ commande.product_quantity }}</td>
                       <td>{{ commande.amount }}</td>
                       <td>{{ (commande.product_quantity * commande.amount).toFixed(2) }}F</td>
                       <td class="d-flex"><a class="btn btn-info btn-block" @click="modifier(index)">Modifier</a>
                      <a class="btn btn-warning btn-block" @click="supprimer(index)">Poubelle</a></td>
                   </tr>
                   <tr>
                       <td colspan="3"></td>
                       <td><input type="text" :disabled="disabled"  class="form-control" v-model="totalMontant" Fbu></td>
                       <td colspan="2"></td>
                      
                   </tr>
                   <tr>
                       <td>
                           <div class="form-group">                            
                           <select v-model="form.produit_id" name="produit_id" class="form-control">
                               <option v-for="produit in produits" :key="produit.id" v-bind:value="produit.id">{{ produit.products.name }}</option>                                
                           </select>

                           </div>
                       </td>
                       <td><input type="text" class="form-control" v-model="form.quantite"></td>

                       <td></td>
                       

                       
                      
                       <td><a class="btn btn-primary btn-block" @click="ajouter">Ajouter</a></td>
                       <td></td>
                       <td>

                        <select v-model="form.client" v-on:change="getprice" name="produit_id" class="form-control">
                               <option v-for="client in clients" :key="client" :value="client" >{{ client.nom }}</option>                                
                        </select>
                       </td>
                       <td><input type="number" class="form-control" v-model="form.nbbordereau"></td>
                       <td><input type="number" class="form-control" v-model="form.montant_paye"></td>
                   </tr>
                   </tbody>
                   <tfoot>
                   <a class="button btn btn-xs btn-warning" @click="toutPoubelle">Tout à la poubelle</a>
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
                       <td>{{ commande.quantite }}</td>
                       <td>{{ commande.montant }} F</td>
                       <td>{{ (commande.quantite * commande.montant).toFixed(2) }} F</td>
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
export default {
    data(){
        return{
            commandes: [],
            poubelle: [], 
            produits: {}, 
            clients:{},
            
            lots:{},
            form: {                                  
                produit_id : '',                    
                quantite : '',                    
                montant: '',  
                client:'', 
                montant_paye:'',
                nbbordereau:'',
                totalmontant:1,                
            }       
            }

        },
    
        computed:{
      
      totalMontant(){
        let sum=0;
        
        //this.stocks.price=price

        this.commandes.map(e =>{
           sum+= (e.product_id * e.amount);
          console.log(e)
          //console.log(sum)

        })
        return sum;
       //
        
      }
    },
     mounted()
        {
            this.getstock()
            this.getclient()
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
                this.commandes.push({product_id: this.form.produit_id, product_quantity: this.form.quantite, amount: this.form.montant});
                this.form = {};
               // this.commandes.sort(ordonner);
                console.log(this.commandes)
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
      borderau:this.form.nbbordereau,
      montant_borderau:this.form.montant_paye,
      amount_tax:this.totalMontant
      
    }
    console.log(v)

    axios.post(
          this.$store.state.baseurl + "ventes",
          v,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`
        )
        .then((resp) => {
          this.receptions = resp.data;
          
          this.commandes = []; 
         // this.form = { description:"",quantity:"",product_id:"",date_achat:"",lot_id:"",stock_id:"", tva:"",montant:"",montant_total:""} 
        })
        .catch((err) => {
          console.error(err.response.data.errors);
          this.errors = err.response.data.errors;
        })       
            }, 
            

    },
    
    }
    var ordonner = function (a, b) {
        return (a.commande.toUpperCase() > b.commande.toUpperCase())
    };


</script>

<style>

</style>