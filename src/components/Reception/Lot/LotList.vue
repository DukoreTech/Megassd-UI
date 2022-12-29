<template>
    <div>
            <div> 
              <div class="d-md-flex m-3 justify-content-between" >
                    <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="modalActive = true,$store.state.IdEditLot=null">
                        <font-awesome-icon icon="fa-solid fa-plus-circle" />
                        Ajouter lot
                      </button>
                    <div class="mt-3">
                            <input type="text" class="form-control"  v-model="search" placeholder="Search" @keypress.enter="searchEvery"/>
                    </div>
                 </div>  
    
                    <modal-component :modalActive="modalActive" @close="modalActive = !modalActive">
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
                            <table class="table table-bordered  table-striped table-hover text-center" id="dataTable" width="100%" cellspacing="0">
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
                                    <td>{{ lot.description }} </td>    
                                    <td>{{lot.adresses_id }}</td>  
                                    <td>{{lot.type_clients_id }}</td> 
                                          
                                    <td>
                                        <button class="btn btn-sm btn-default m-2"  @click="deleteLot(lot.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                        </button>
                                        <button class="btn btn-sm btn-default" @click="modalActive = true,editlot(lot,lot.id)" >
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
                axios.delete(this.$store.state.baseUrl + "/lots/" + id)
                .then(resp => {
                    this.lots = resp.data
                    this.fetchData()
                })
                .catch(err => {
                    console.error(err)
                })
                
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
    
    </style>