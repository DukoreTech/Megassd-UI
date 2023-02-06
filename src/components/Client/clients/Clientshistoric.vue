<template>
    <div class="container">
        <div class="page-header">
						<div class="row">
							<div class="col">
								<h3 class="page-title">Client</h3>
								<ul class="breadcrumb">
									<li class="breadcrumb-item"><a href="" @click="$router.push('/')">Tableau de bord</a></li>
                  
                  <li class="breadcrumb-item"> <router-link :to="{name:'Client'}" class=""
                   aria-expanded="true" aria-controls="collapseStock">
                  
                 Clients
                 </router-link>
            </li>
									<li class="breadcrumb-item active">{{ clients.nom }}</li>
								</ul>
							</div>
						</div>
		</div>
        <div class="profile">
        <div class="row">
        <div class="card">
                    <div class="card-body">
            <h4 class="mb-2 text-center">{{ clients.nom }}</h4>
             
            <div class="historique">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                   <li class="nav-item" role="presentation">
                     <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Commandes</button>
                   </li>
                   <li class="nav-item" role="presentation">
                     <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Bouteilles en dette</button>
                   </li>
                   <li class="nav-item" role="presentation">
                     <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Dettes</button>
                   </li>
                </ul>
              
            </div>
          </div>
        </div>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active mt-5" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
              <div class="card  mb-4 d-flex justify-content-flex-end">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-mute">Commandes</h6>
                </div>

                <div class="card-body">
                  <div class="col-lg-4 col-sm-6 col-xs-12 mb-4">
                        <input type="text" class="form-control"  v-model="search" placeholder="Search" @keypress.enter="searchEvery"/>
                  </div>
                    <div class="table-responsive ">
                        <table v-for="order,i  in filteredItems" :key="i"   class="table table-bordered mb-5  table-hover text-center"   width="100%" cellspacing="0">
                            <thead>
                              <tr>                    
                                <th rowspan="2">commande</th>
                                <th colspan="3">produits</th>
                                <th scope="col">Montant total</th>
                                <th scope="col">Montant payé</th>
                                <th scope="col">Date:</th>
                                <th scope="col">Status</th>
                             </tr>
                              <tr>
                                <td>Nom</td>
                                <td>Quantité</td>
                                <td>Montant</td>
                              </tr>
                             
                            </thead>
                      
                            <tbody>
                              <div v-if="orders.length==0">
                                <p class="text-center vh-30">No order yet</p>
                              </div>                   
                              <tr>
                                <th scope="row">#{{ order.id }}</th>  
                                <td> <h6 style="border-bottom:1px solid ;" v-for="val in JSON.parse(order.products)" :key="val">
                                        {{ val.product_name }}
                                </h6></td>
                                <td> <h6 style="border-bottom:1px solid ;" v-for="val in JSON.parse(order.products)" :key="val">
                                        {{ val.product_quantity }}
                                </h6></td>
                                <td><h6 style="border-bottom:1px solid ;" v-for="val in JSON.parse(order.products)" :key="val">
                                        {{ val.amount }}
                                </h6></td>  
                                   
                               
                                  
                                   
                     
                                <td>{{ order.total_amount}} </td>
                                <td>{{ order.payed_amount}} </td>
                                <td>{{ order.date_facturation}} </td>                                                                                                                                                                                                       
                                            
                                        
                                <td><span v-if="order.status==1" style="background:turquoise;color:white; padding:4px;">Payés</span><span style="background-color:#495057;color:white ;padding:4px;" 
                                     v-if="order.status==0">En cours</span></td>             
                              </tr>
                            </tbody>
                         </table>
                    </div>
                    </div>
                    </div>
                    
            </div>
            <div class="tab-pane fade mt-5" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
              <div class="card  mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-mute">Bouteilles en dette</h6>
                </div>
                <div class="card-body">
              <div class="table-responsive">
                    
                    <table v-if="orders!==[0]" class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                        <thead>
                          <tr>                    

                            <th scope="col">number</th>
                                    <th scope="col">commande</th>
                                    <th scope="col">produits</th>
                                    <th scope="col">Quantité depart</th>
                                    <th scope="col">Quantité Restant</th>
                                    <th scope="col">Status</th>
                         </tr>
                        </thead>
                  
                        <tbody>
                          <div v-if="DetteVides.length==0" class="text-center">
                          <p>Pas de dette</p>

                        </div>
                                   <tr v-for="dette in DetteVides" :key="dette.id">
                                    <th scope="row">{{ dette.id }}</th>
                                    <td>{{ dette.order_id }} </td>
                                    <td>{{ dette.products.name }}</td>
                                    <td>{{ dette.quantite_depart }}</td>
                                    <td>{{ dette.reste }} </td>           
                                                  
                                    <td>
                                       <!-- <button class="btn btn-sm btn-danger m-2"  @click="deleteReception(reception.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                        delete</button>-->
                                        <button class="btn btn-success p-2 mt-2 text-white" v-if="dette.reste==0">Payés</button>
                                        <button class="btn btn-success p-2 mt-2 text-white" v-if="dette.reste!==0">En cours</button>
                
                                    </td>
                                  </tr>
                                </tbody>
                     </table>
                </div>
                </div>
                </div>
            </div>
            <div class="tab-pane fade mt-5" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
              <div class="card  mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-mute">Dettes</h6>
                </div>
                <div class="card-body">
              <div class="table-responsive">
                    <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                        <thead>                              
                          <tr>                    
                            <th scope="col">Id</th>
                            <th scope="col">commande</th>
                            <th scope="col">prix payés </th>
                            <th scope="col">montant_en_exces</th>
                            <th scope="col">montant_en_dette</th>
                            <th scope="col">Montant Amenée</th>
                            <th scope="col">montant_rembourse</th>
                            <th scope="col">Status</th>
                         </tr>
                        </thead>  
                        <div v-if="DetteMoney.length==0">
                          <p class="text-center vh-30">Pas de dette</p>

                        </div>                   
                        <tbody>
                           <tr v-for="money in DetteMoney" :key="money.id">
                            <th scope="row">{{ money.id }}</th>
                            <!--<td>{{JSON.parse(money.orders.products)[0].product_name }} </td>-->
                            <td>{{ money.order_id}}</td>
                           <!--<td>{{ reception.stock_id }} </td>--> 
                            <td>{{ money.montant_paye }} </td>            
                            <td>{{ money.montant_en_exces }} </td>            
                            <td>{{ money.montant_en_dette }}</td>            
                            <td>{{ money.montant_amene}}</td>            
                            <td>{{ money.montant_rembourse }}</td>                      
                            <td>
                               <!-- <button class="btn btn-sm btn-danger m-2"  @click="deleteReception(reception.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                delete</button>-->
                                <button class="btn btn-success p-2 mt-2 text-white" v-if="money.montant_en_exces==0 && money.montant_en_dette==0">Payés</button>
                                <button class="btn btn-success p-2 mt-2 text-white" v-if="money.montant_en_exces!==0 && money.montant_en_dette!==0">En cours</button>
                                
                            </td>
                          </tr>
                        </tbody>
                     </table>
                </div>
                </div>
                </div>

            </div>
        </div>

            </div>

        </div>


        

    </div>
  
</template>

<script>
import  api from '../../../../api';
import Swal from 'sweetalert2';
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
export default {
    props:['id','client'],
    data(){
        return{
            
            clients: '',
            address:'',
            typeclient:'',
            orders:[],
            DetteVides:[],
            DetteMoney:[],
            search:""
        }
       
    },
    mounted()
{
    let clp=JSON.parse(this.client)
    this.clients= clp
    let add=JSON.stringify(clp.adresses)
    this.address=JSON.parse(add)
    console.log(this.address)
    this.getcommands()
    this.getvides()
    this.getargent()

},
computed: {
    
    filteredItems () {
      return this.searchInArray(this.orders, this.search)
      
    }
  },
watch: {
  orders(val) {
              console.log(val)
              $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $('#datatable').DataTable()
              });
            }
       },
methods:{
  searchInArray(arrayList, searchText) {
            //Methode pour faire une rechercher dans le tableau
            if(Array.isArray(arrayList) ){
                return arrayList.filter(
                e => JSON.stringify(e)
                         .toLowerCase()
                         .includes(searchText.toLowerCase())
            )
            }
            return arrayList
        },
  getcommands()
  {
    api.get("getcommands",{params:{
      client_id:this.id
      }})
            .then(resp => {
                this.orders = resp.data
               
              })
            .catch(err => {
                console.error(err)
            })
    
  },
  getvides(){
    api.get("getvides",{params:{
      client_id:this.id
      }})
            .then(resp => {
                this.DetteVides = resp.data
               
              })
            .catch(err => {
                console.error(err)
            })
  },
  getargent()
  {
    api.get("getdettemoney",{params:{
      client_id:this.id
      }})
            .then(resp => {
                this.DetteMoney = resp.data
               
              })
            .catch(err => {
                console.error(err)
            })

  }

}

}



</script>

<style>

</style>