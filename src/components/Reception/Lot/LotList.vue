<template>
    <div>
            <div> 
              <div class="d-md-flex m-3 justify-content-between" >
                    <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="modalActive = true,$store.state.IdEditLot=null">
                        <font-awesome-icon icon="fa-solid fa-plus-circle" />
                        Ajouter lot
                      </button>
                   <!-- <div class="mt-3">
                            <input type="text" class="form-control"  v-model="search" placeholder="Search" @keypress.enter="searchEvery"/>
                    </div>-->
                 </div>  
    
                    <modal-component :modalActive="modalActive" @close="modalActive = !modalActive , fetchData()">
                        <add-form @close="modalActive = !modalActive"/>
                    </modal-component>
            </div>
             <div class="container-fluid">
                <div class="card  mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-mute">Liste des lots</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                                <thead>
                                  <tr>                    
                                    <th scope="col">Id</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Produit</th>
                                    <th scope="col">Prix de vente</th>
                                    <th scope="col">zone</th>
                                    <th scope="col">type client</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                 </tr>
                                </thead>
                          
                                <tbody>
                                   <tr v-for="lot in lots" :key="lot.id">
                                    <th scope="row">{{ lot.id }}</th>
                                    <td>{{ lot.name }} </td>
                                    <td>{{ lot.products.name }} </td>            
                                    <td>{{ lot.price_vente }} </td>            
                                       
                                    <td>{{lot.adresses.name }}</td>  
                                    <td>{{lot.type_clients.name}}</td>
                                    <td>{{ lot.description }} </td>  
                                          
                                    <td>
                                        <button class="btn btn-sm btn-danger m-2"  @click="deleteLot(lot.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                        delete</button>
                                        <button class="btn btn-sm btn-primary" @click="modalActive = true,editlot(lot,lot.id)" >
                                       edit<font-awesome-icon icon="fa-solid fa-edit"/>
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
    import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Swal from 'sweetalert2';
    import axios from "axios";
    import ModalComponent from '@/components/Global/ModalComponent';
    import AddForm from './lotAddForm';
    
    export default {
        components: { ModalComponent, AddForm },
        data() {
            return{
                modalActive: false,
                search:'',
                lots : [ ]
            }
        },
        mounted(){
            this.fetchData()
        },
        computed:{
            searchEvery(){
                return this.lots.filter(val=>val.includes(this.search))
                }
        },
        watch: {
            lots(val) {
              console.log(val)
              $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $('#datatable').DataTable()
              });
            }
       },
        methods:{
            fetchData() {
                axios.get(this.$store.state.baseurl + "lots")
                .then(resp => {
                    this.lots = resp.data
              
                })
                .catch(err => {
                    console.error(err)
                })
            },
            deleteLot(id) {
                Swal.fire({
                title: 'vous etes sure de vouloir supprimer ces informations',
             showDenyButton: true,
             showCancelButton: true,
             confirmButtonText: 'Delete'
             })  .then((result) => {
                if (result.isConfirmed) {
                    axios.delete(this.$store.state.baseurl + "lots/" + id)
                .then(resp => {
                    this.lots = resp.data
                    console.log(this.lots)
                    Swal.fire('item deleted')
                    this.fetchData()

                })
                .catch(err => {
                    console.error(err)
                    
                Swal.fire('something wrong try again', '', 'error')
                })
                }
            });

              
                
            },
    
            editlot(lot,id){
            this.$store.state.IdEditLot=id
            this.$store.state.lots=lot
            
            }
        }
        
    }
    </script>
    
    <style scoped>
        .ajout{
            color: white;
        }
        th{
        text-transform: capitalize;
        text-align: center;
        font-size: 13px;
        font-weight: bold;
        
    }
    td{
        text-align: center;
        font-size: 16px;  
        
    }
    
    </style>