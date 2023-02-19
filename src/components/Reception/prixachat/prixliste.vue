<template>
    <div>
            <div>    
                <div class="d-md-flex m-3 justify-content-between" >
                    <button class="btn btn-info mt-2 ml-5 ajout" @click="modalActive = true,$store.state.IdEditAdresse=null">
                        <font-awesome-icon icon="fa-solid fa-plus-circle" />
                        Nouveau prix
                      </button>                
                 </div>  
                    <modal-component :modalActive="modalActive" @close="modalActive = !modalActive,fetchData()">
                        <add-form  @close="modalActive = !modalActive,fetchData()"/>
                    </modal-component>
            </div>
    
             <div class="container-fluid">
                <loading v-if="isLoading"></loading>
                <div class="card ">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-mute">Liste des adresses</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                                <thead>
                                  <tr>                    
                                    <th scope="col">#</th>
                                    <th scope="col">produit</th>
                                    <th scope="col">prix</th>                           
                                    <th scope="col">Actions</th>
                                 </tr>
                                </thead>
                               
                                <tbody>
                                   <tr v-for="price in prix" :key="price.id">
                                    <th scope="row">{{ price.id }}</th>
                                    <td>{{ price.products.name }} </td>
                                    <td>{{ price.prix}} </td>         
                                    <td>
                                        <button class="btn btn-sm btn-danger mx-2"  @click="deleteRole(price.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                        </button>
                                        <button class="btn btn-sm btn-primary" @click="modalActive =true,editRole(price,price.id)" >
                                        <font-awesome-icon icon="fa-solid fa-edit"/>
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
    import ModalComponent from '@/components/Global/ModalComponent.vue';
    import AddForm from './prixform';
    import api from "../../../../api";
    
    export default {
        components: { ModalComponent, AddForm },
        data() {
            return{
                modalActive: false,
                search:'',
                prix :[],
                isLoading:false
    
                
            }
        },
        mounted(){
    
            this.fetchData()
           
            
        },
        watch: {
            prix(val) {
                  console.log(val)
                  $('#datatable').DataTable().destroy();
                  this.$nextTick(()=> {
                    $('#datatable').DataTable()
                  });
                }
           },
        computed:{
            searchEvery(){
                return this.adresses.filter(val=>val.includes(this.search))
                },
            
        },
    
    
        methods:{
            getall()
            {
    
            },
            fetchData() {
                this.isLoading=true
                console.log(this.$store.state.token)
              api.get("getprix").then(resp => {
                this.isLoading=false
                    this.prix = resp.data
                    this.$store.state.adresses=resp.data
                  
            
                })
                .catch(err => {
                    
                    console.error(err)
                })
            },
            deleteRole(id) {
                Swal.fire({
                    title: 'vous etes sure de vouloir supprimer ces informations',
    
                 showCancelButton: true,
                 confirmButtonText: 'supprimer'
                 })
                .then((result) => {
                    if (result.isConfirmed) {
                        api.delete("Address/"+ id)
                    .then(resp => {
                    this.prix = resp.data
                    Swal.fire('suppression avec succès ', '', 'success')
                    this.$store.state.price=resp.data
                    this.fetchData()
                   }).catch(err => {
                    console.error(err)
                    
                    Swal.fire('une erreur est survenue veuillez réessayer plus tard', '', 'error')
                    })
                }
                   })
                   },
                   editRole(price,id){
            this.$store.state.IdEditprice=id
            this.$store.state.price=price
            
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