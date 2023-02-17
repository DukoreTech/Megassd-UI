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
                <div class="card  mb-2">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-mute">Liste des ventes</h6>
                        
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered  table-striped table-hover text-center"   width="100%" cellspacing="0">
                                <thead>                              
                                  <tr>                    
                                    <th rowspan="2">Id</th>
                                    <th colspan="3">Produit</th>
                                    <th>Montant Total</th>
                                    <th>Montant Payé</th>
                                    <th>client</th>
                                    <th>Date effectué</th>
                                    <th>Date confirmer</th>
                                    <th>status</th>
                                    <th>Fait par:</th>
                                    <th>Actions</th>
                                 </tr>
                              <tr>
                                <td>Nom</td>
                                <td>Quantité</td>
                                <td>Montant</td>
                              </tr>
                                </thead>                     
                                <tbody>
                                   <tr v-for="order in ventes" :key="order.id">
                                    <th scope="row">{{ order.id }}</th>
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
                                    <td>{{ order.clients.nom}} </td>
                                    <td>{{ order.date_facturation}} </td>
                                    <td>{{ (order.updated_at.substr(0, 10))}}</td>
                                    <td><span v-if="order.status==1" style="color:black;"><font-awesome-icon icon="fa-solid fa-check" /></span><span class="bg-secondary text-white mt-5" style=" width:120px;" 
                                         v-if="order.status==0">En cours</span></td>            
                                    <td>{{ order.users.name}}</td>                       
                                    <td>
                                        
                                        <router-link :to="{name:'InvoiceOrderView',params:{id:order.id}}" class="nav-link collapsed  text-black" 
                                            aria-expanded="true" aria-controls="collapseStock"><font-awesome-icon icon="fa-solid fa-file-invoice" /> </router-link>
                                        <button v-if="order.status==0" class="btn btn-sm btn-primary" @click="confirmpayment(order)">
                                            <font-awesome-icon icon="fa-solid fa-check" />
                                        </button>
                                    </td>
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
                orders :this.$store.state.vantes
            }
        },
        mounted(){
            this.fetchData()
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
                  console.log(val)
                  $('#datatable').DataTable().destroy();
                  this.$nextTick(()=> {
                    $('#datatable').DataTable()
                  });
                }
           },
        
        methods:{
            ajout(){
                this.$router.push({name:'AddCommande'})
            },
            fetchData() {
                api.get("ventes")
                .then(resp => {
                    this.orders = resp.data
                    this.$store.state.vantes=resp.data
                    console.log(this.orders)
                  
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