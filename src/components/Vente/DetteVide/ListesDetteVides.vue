<template>
    <div>
            <div> 
              <div class="d-md-flex m-3 justify-content-between" >
                   
                 </div>  
    
                    <modal-component :modalActive="modalActive" @close="modalActive = !modalActive , fetchData()">
                        <DetteVidesForm @close="modalActive = !modalActive,fetchData()"/>
                    </modal-component>
            </div>
             <div class="container-fluid">
                <div class="card  mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-mute">Liste des Vides</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                                <thead>                              
                                  <tr>                    
                                    <th scope="col">number</th>
                                    <th scope="col">order Id</th>
                                    <th scope="col">product</th>
                                    <th scope="col">client</th>
                                    <!--<th scope="col">Stock</th>--> 
                                    <th scope="col">Quantité depart</th>
                                    <th scope="col">Quantité Restant</th>
                                    <th scope="col">Quantité Amenées</th>
                                    <th scope="col">Actions</th>
                                 </tr>
                                </thead>                     
                                <tbody>
                                   <tr v-for="dette in DetteVides" :key="dette.id">
                                    <th scope="row">{{ dette.id }}</th>
                                    <td>{{ dette.order_id }} </td>
                                    <td>{{dette.products.name }}</td>
                                    <td>{{dette.clients.nom}}</td>
                                    <td>{{ dette.quantite_depart }}</td>
                                    <td>{{ dette.reste }} </td>
                                    <td>{{ dette.nouveau_casier }} </td>            
                                                  
                                    <td>
                                       <!-- <button class="btn btn-sm btn-danger m-2"  @click="deleteReception(reception.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                        delete</button>-->
                                        <span class="bg-success p-2 text-white" v-if="dette.reste==0">Done</span>
                                        <button v-if="dette.reste!==0" class="btn btn-sm btn-primary" @click="modalActive = true, editDette(dette,dette.id)" >
                                        <font-awesome-icon icon="fa-solid fa-edit"/>Modifier
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
    import axios from "axios";
    import Swal from 'sweetalert2';
    import ModalComponent from '@/components/Global/ModalComponent';
    import DetteVidesForm from './DetteVidesForm.vue';
    import api from '../../../../api';
    
    export default {
        components: { ModalComponent, DetteVidesForm },
        data() {
            return{
                modalActive: false,
                search:'',
                DetteVides : [],
            }
        },
        mounted(){
            this.fetchData()
            this.DetteVides.forEach(element => {
                console.log(element.clients.nom)
                
            });
          
            
        },
        computed:{
            searchEvery(){
                return this.receptions.filter(val=>val.includes(this.search))
                }
        },
        watch: {
            DetteVides(val) {
                  console.log(val)
                  $('#datatable').DataTable().destroy();
                  this.$nextTick(()=> {
                    $('#datatable').DataTable()
                  });
                },
                "$store.state.IdEditVide"(val){

                }
            
           },
        
        methods:{
            fetchData() {
                api.get("getDetteVides",
              )
                .then(resp => {
                    this.DetteVides = resp.data
                    this.$store.state.DetteVides=resp.data
                })
                .catch(err => {
                    console.error(err)
                })
            },
            deleteReception(id) {
                Swal.fire({
                    title: 'vous etes sure de vouloir supprimer ces informations',
                 showDenyButton: true,
                 showCancelButton: true,
                 confirmButtonText: 'suppprimer'
                 })  .then((result) => {
                    if (result.isConfirmed) {
                        api.delete("reception/"+id)
                .then(resp => {
                    this.DetteVides = resp.data
                    this.fetchData()
                })
                .catch(err => {
                    console.error(err)
                })
                    }
                });
               
                
            },
            editDette(Dette,id){
            this.$store.state.IdEditVide=id
            this.$store.state.DetteVides=Dette
            console.log(this.$store.state.DetteVides)
            
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