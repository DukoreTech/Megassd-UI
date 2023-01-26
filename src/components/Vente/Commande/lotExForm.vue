<template>
   <div class="container">
    <div class="page-header ">
        <div class="row texx-white">
            <div class="col">
                <h3 class="page-title">Ventes</h3>
                <ul class="breadcrumb">
                    <li class="breadcrumb-item"><a href="" @click="$router.push('/')">Tableau de bord</a></li>
                    <li class="breadcrumb-item active">Ajouter commandes</li>                
                </ul>
                <router-link :to="{name:'Commande'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseStock"
                aria-expanded="true" aria-controls="collapseStock">
                <font-awesome-icon icon="fa-solid fa-angle-left me-2"/>
                Retour
            </router-link>
            </div>
        </div>
	</div>
    <div class="row justify-content-center mt-5">
        <div class="col-md-12">
            <form class="" @submit.prevent="envoyer()" >
            <div class="container">
                <div class="row d-flex justify-content-around">                   
                    <!-- Contact Details -->
                    <div class="card contact-card col-lg-5">
                     <div class="h4 card-title mt-2 font-weight-bolder">Produits à vendre</div>
                        <div class="card-body container">
                            <div class="row  form-row">
                                <div class="col-md-6 pb-3 ">
                                    <div class="form-group">
                                        <span>Produit</span>
                                        <select  v-model="form.product" name="produit_id" class="form-select">
                                            <option v-for="produit in produits" :key="produit.id" v-bind:value="produit">{{ produit.products.name }}</option>                                
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 pb-3">
                                    <div class="form-group">
                                        <span class="control-label">Quantité</span>
                                        <input type="number" class="form-control" max="produit.plein" min="1" v-model="form.quantite">
                                    </div>
                                </div>
                                <div class="col-md-6 pb-3">
                                    <div class="form-group">
                                        <span class="control-label">Vides Amenés</span>
                                        <input type="text" v-model="form.vides" class="form-control">
                                    </div>
                                </div>

                                <!--<div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">State / Province</label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">Country</label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">Postal Code</label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>-->
                                <div class="row mt-3">
                                    <div class="form-group">
                                        <a class="btn btn-success btn-block" @click="ajouter">Ajouter</a>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>
                    <!-- /Contact Details -->
                        
                        <!-- Pricing -->
                        <div class="card col-lg-5">
                          <div class="card-title  mt-2 font-weight-bolder">Paiment</div>
                            <div class="card-body">
                                <div class="row form-row ">

                                    <div class="col-md-6  pb-3">
                                        <div class="form-group">
                                            <span>Type of paiement</span>
                                            <select v-model="form.TypePaiment" aria-placeholder="typepaiment"  class="form-select">
                                                <option>cash</option>  
                                                <option>Bordereau</option>                                 
                                            </select>                            
                                        </div>
                                    </div>

                                     <div class="col-md-6  pb-3">
                                      <div class="form-group">
                                       <span>Client</span>
                                        <select v-model="form.client"  name="produit_id" class="form-select">
                                          <option v-for="client in clients" :key="client" :value="client" >{{ client.nom }}</option>                                
                                        </select>
                                        </div>
                                    </div>

                                    <div class="col-md-6  pb-3"  v-if="form.TypePaiment=='Bordereau'">
                                     <div class="form-group">
                                        <div>
                                            <span>Numéro bordereau</span >
                                                <input  type="text" v-model="form.nbbordereau" class="form-control" id="custom_rating_input" name="custom_rating_count"  placeholder="20">
                                        </div>  
                                     </div>           
                                    </div>                               
                                                                   
                                    <div class="col-md-6  pb-3">
                                        <div class="form-group">
                                            <span class="mb-3">Montant payés</span>
                                            <input type="number" class="form-control" v-model="form.montant_paye">                                          </div>
                                    </div>
                                    <div class="col-md-6  pb-3">
                                        <div class="form-group">
                                            <span class="mb-3">Date de paiement</span>
                                            <input v-model="form.datepayed" type="date" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <!-- /Pricing -->                        
                </div>
            </div>

            <div class="mt-4 mb-4 text-white"> <span style="font-size:20px;" class="bg-info p-2 m-3"><font-awesome-icon icon="fa-solid fa-cart-plus" class="icon" />Panier</span>  </div>
            <table class="table table-bordered table-striped table-responsive">
                <!-- <thead class="thead-dark">
                
                <p class="m-4">Ajouter des produits</p>
                <tr>
                <th> produits</th>
                <th>Quantité</th>
                <th>Action</th>
                <th>au:client</th>
                <th> Numero Bordereau</th>
                <th>Montant sur bordereau</th>
                <th>montant supplementaire</th>
                </tr>
                </thead>-->
                <tbody>
                <!--<tr>
                
                <td>
                    <div class="form-group">                            
                    <select  v-model="form.product" name="produit_id" class="form-control">
                        <option v-for="produit in produits" :key="produit.id" v-bind:value="produit">{{ produit.products.name }}</option>                                
                    </select>


                    </div>
                </td>
                <td><input type="number" class="form-control" max="produit.plein" min="1" v-model="form.quantite"></td>

                <td><a class="btn btn-success btn-block" @click="ajouter">Ajouter</a></td>
                
                <td>

                    <select v-model="form.client"  name="produit_id" class="form-control">
                        <option v-for="client in clients" :key="client" :value="client" >{{ client.nom }}</option>                                
                    </select>
                    <span class="error">{{ errors?.client_id}}</span>
                </td>
                <td><input type="text" aria-required="required" class="form-control" v-model="form.nbbordereau">
                    <span class="error">{{ errors?.num_bordereau}}</span>
                </td>
                <td><input type="number" class="form-control" v-model="form.montant_paye">
                    <span class="error">{{ errors?.payed_amount}}</span>
                </td>
                <td><input type="number" class="form-control" v-model="form.montantsup"></td>
            </tr>-->
                
                <tr>
                        <th scope="col">Produit</th>
                        <th scope="col">Quantité</th>
                        <th scope="col">montant</th>
                        <th scope="col">Vides Amenés</th>
                        <th scope="col">Total</th>
                        <th scope="col">Actions</th>
                        <th scope="col">client</th>
                        <th scope="col">type Paiments</th>
                        <th scope="col">Nbbordereau</th>
                        <th scope="col">montant payé</th>
                    </tr>
                <tr v-for="(commande, index) in commandes" :key="commande.index">
                    <td>{{ commande.product_name }}</td>
                    <td>{{ commande.product_quantity }}</td>
                    <td>{{ commande.amount }}</td>
                    <td>{{ commande.caisse_vide }}</td>
                    <td>{{ (commande.product_quantity * commande.amount).toFixed(2) }}F</td>
                    <td class="d-flex">
                    <a class="btn btn-info btn-block mx-2" @click="modifier(index)"><font-awesome-icon icon="fa-solid fa-edit"/></a>
                    <a class="btn btn-danger  btn-block" @click="supprimer(index)"><font-awesome-icon icon="fa-solid fa-trash" class="text-white"/></a></td>
                    
                    </tr>
                <tr>
                
                    <td colspan="4"></td>
                    <td><input type="text" :disabled="disabled"  class="form-control" v-model="totalMontant" Fbu></td>
                    <td colspan="1"></td>
                    <td>{{form.client_name}}</td>
                    <td>{{ form.TypePaiment }}</td>
                    <td>{{form.nbbordereau}}</td>
                    <td>{{form.montant_paye}}</td>
                    
                </tr>
                

                
                </tbody>
                <tfoot class="d-flex justify_content_around mt-5">
                <button class="button btn btn-sm btn-success m-4" type="submit">Valider</button>
                
                </tfoot>
            </table>
            </form>
        <div class="panel panel-danger" v-show="poubelle.length">
        <div class="mt-4 mb-4 "> <span style="font-size:20px;" class="bg-danger  text-white p-2 "><font-awesome-icon icon="fa-solid fa-trash" class="icon" />poubelle</span>  </div>
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
                    <td><a class="btn btn-success btn-block" @click="retablir(index)"><font-awesome-icon icon="fa-solid fa-check" class="text-white"/></a></td>
                    <td><a class="btn btn-danger btn-block" @click="eliminer(index)"><font-awesome-icon icon="fa-solid fa-trash" class="text-white"/></a></td>
                </tr>
                </tbody>
            </table>
            
        </div>
        </div>            
    </div>
   </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2';
import api from '../../../../api';
export default {
    data(){
        return{
            commandes: [],
            poubelle: [], 
            produits: [], 
            clients:{},
            errors:{},
            
            lots:{},
            form: {
                TypePaiment:'',                                  
                product : '',                    
                quantite : '',                    
                montant: '',  
                vides:'',
                datepayed: new Date().toISOString().slice(0,10),
                client:this.$store.state.selectClient_id, 
                client_name:'',
                montant_paye:'',
                nbbordereau:'',
                totalmontant:1,   
                montantsup:0            
            }       
            }

        },
        watch: {
        "form.client"(val) {
            console.log(val)
            this.form.client=val
              this.getprice();
            }
       },
        computed:{
      
      totalMontant(){
        let sum=0;   
        let prod=0
        //this.stocks.price=price
        this.commandes.map(e =>{
         prod+= (e.product_quantity * e.amount);
          sum=prod+this.form.montantsup
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
          api.get("stock")
            .then(resp => {
                
                this.produits=resp.data
    
                //this.produits.forEach(function(item){item.price = 12000});

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
          api.get("client",
          )
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
 
        api.get("getprice",{params:{
        address_id:this.form.client.address_id,
        type_clients_id:this.form.client.type_client_id 

      }})
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
        if(this.form.quantite < result.plein ){
        
            let exist=this.commandes.find((item)=>item.product_id===this.form.product.product_id)
            if(exist)
            {
                exist.product_quantity+=this.form.quantite
                exist.caisse_vide =(exist.caisse_vide*1) + (this.form.vides*1);
            }
            else{
                if(this.form.vides > this.form.quantite)
                {
                   Swal.fire({
                  icon: 'error',
                  title: ' oups ',
                  text: 'nombre de casier vides est superieur a celle des produits' 
                });
                    
                    
                }
                else{
                this.commandes.push({product_id: this.form.product.product_id, product_quantity: this.form.quantite, amount: this.form.montant , product_name:this.form.product.products.name,caisse_vide:this.form.vides});   
                console.log(this.commandes)
                this.getprice()
                 // this.form = {};
               // this.commandes.sort(ordonner);
                }
                }
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
                this.form.quantite = this.commandes[index].product_quantity;
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
      date_bordereau:this.form.datepayed,
      type_paiement:this.form.TypePaiment,
      montantsup:this.form.montantsup
    }
    console.log(v)

    api.post(
          "ventes",
          v
        )
        .then((resp) => {
            this.data=resp.data
            //this.$store.state.vantes=resp.data
         

         // this.commandes = []; 
          this.v=[];
          Swal.fire({
               icon: 'success',
               title: 'Ajouter',
               text: 'Enregister avec succès'
              });
              this.$router.push('/Commande')
         // this.form = { description:"",quantity:"",product_id:"",date_achat:"",lot_id:"",stock_id:"", tva:"",montant:"",montant_total:""} 
        })
        .catch((err) => {
            Swal.fire({
               icon: 'error',
               title: ' oups ',
               text: 'une erreur est survenue veuillez réessayer plus tard!'+ "/n"+ err.data.data
              });
          console.log(err.data.data);
         
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