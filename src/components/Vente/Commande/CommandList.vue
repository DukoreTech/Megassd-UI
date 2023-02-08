<template>
<div>
        <div> 
          <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info  ml-5 ajout" @click="this.$router.push({name:'lotExForm'})">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter command
                  </button>
                
             </div>  

                <modal-component :modalActive="modalActive" @close="modalActive = !modalActive">
                    <add-form @close="modalActive = !modalActive"/>
                </modal-component>
        </div>
         <div class="container-fluid">
            <loading v-if="isLoading"></loading>
            
            <div class="card  mb-2">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-mute">Liste des ventes</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                            <thead> 
                               
                                
                                <th scope="col">N0</th>
                                <th scope="col">client</th>
                                <th  v-for="product in products" :key="product.id">{{ product.name }}</th>
                                <!---<th scope="col">Montant Total</th>
                                <th scope="col">Montant Payé</th>
                                <th scope="col">Date effectué</th>
                                <th scope="col">status</th>
                                <th scope="col">Fait par:</th>
                                <th scope="col">Actions</th>-->
                             
                               
                             
                             
                            </thead>                     
                            <tbody>

                               <tr v-for="order in ventes" :key="order.id">
                                <th scope="row">{{ order.id }}</th>
                                <td>{{ order.clients.nom}} </td>
                                 <td v-for="product in JSON.parse(order.products)" :key="product.product_id"><div>{{product.product_quantity }}</div>
                                </td>
                                <!--
                               
                                <td>{{ order.total_amount}} </td>
                                <td>{{ order.payed_amount}} </td>
                                
                                <td>{{ order.date_facturation}} </td>
                              
                                <td><span v-if="order.status==1" style="color:black;"><font-awesome-icon icon="fa-solid fa-check" /></span><span class="bg-secondary text-white mt-5" style=" width:120px;" 
                                     v-if="order.status==0">En cours</span></td>            
                                <td>{{ order.users.name}}</td>                       
                                <td>
                                    
                                    <router-link :to="{name:'InvoiceOrderView',params:{id:order.id}}" class="nav-link collapsed  text-black" 
                                        aria-expanded="true" aria-controls="collapseStock"><font-awesome-icon icon="fa-solid fa-file-invoice" /> </router-link>
                                    <button v-if="order.status==0" class="btn btn-sm btn-primary" @click="confirmpayment(order)">
                                        <font-awesome-icon icon="fa-solid fa-check" />
                                    </button>
                                </td>-->
                              </tr>
                            </tbody>
                         </table>
                      </div>
                   </div>
                </div>
        </div>
</div>
</template>

<script>
import Swal from 'sweetalert2';
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";
import ModalComponent from '@/components/Global/ModalComponent';
import AddForm from './CommandAddForm.vue';
import api from '../../../../api';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            isLoading:false,
            orders :this.$store.state.vantes,
            products:[],
            prod:[],
            produits:[],
        }
    },
    mounted(){
        this.fetchData()
        this.getproducts()
    },
    computed:{
        searchEvery(){
            return this.receptions.filter(val=>val.includes(this.search))
            },
         ventes(){
            return  this.$store.state.vantes;
         }
    },
    watch: {
        
        orders(val) {
            //  console.log(val)
              $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $('#datatable').DataTable()
              });
            }
       },
    
    methods:{
        getproducts() {
            api.get("products")
            .then(resp => {
                this.products = resp.data

                
                this.products.forEach((element) => {
                    this.produits.push({id:element.id,name:element.name,quantite:0,})
                  
                    
                
                
                
                
               });
            
                
            })
            .catch(err => {
                console.error(err)
            })
        },
        ajout(){
            this.$router.push({name:'AddCommande'})
        },
        fetchData() {
            this.isLoading=true
            api.get("ventes")
            .then(resp => {
                this.isLoading=false
                this.orders = resp.data
                this.$store.state.vantes=resp.data
                this.orders.forEach(element1 => {
                console.log(JSON.parse(element1.products))
                    JSON.parse(element1.products).forEach(element => {
                    console.log(element.product_id)
                   this.prod.push({id:element.product_id, quantite:element.product_quantity})
  
               });
               this.prod.forEach(obj => {
                        this.produits.forEach(element2 => {
                            if (obj.id == element2.id) {
                                element2.quantite=obj.quantite;
                                element2.quantite=obj.quantite;
                 //this.produits.push({id:element.id,name:element.name,quantite:obj.quantite})
                    
                }
                else{
                    element1.quantite='-';

                }

                            
                        });
               

                });
                    
                });
                
            console.log(this.produits)
              
            })
            .catch(err => {
                console.error(err)
            })
        },
        confirmpayment(order) {

           let form={
                payed_amount:order.total_amount,
                status:1
            }
            Swal.fire({
                icon:'info',
                title: 'en cliquant sur confirmez vous confirmez que le montant total a ete payé',
            // showDenyButton: true,
             showCancelButton: true,
             confirmButtonText: 'confirmer'
             })
            .then((result) => {
                if (result.isConfirmed) {
        api.patch(
          "ventes/"+order.id,
          form)
        .then((resp) => {
            this.orders=resp.data
            this.fetchData()
        })
            .catch(err => {
                console.error(err)
            })

                }

            });

            
        },

       /* editReception(reception,id){
        this.$store.state.IdEditReception=id
        this.$store.state.receptions=reception
        
        }*/
    }
    
}
</script>

<style scoped>
    .ajout{
        color: white;
    }
  

</style>