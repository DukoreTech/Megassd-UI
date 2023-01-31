<template>
<div>
        <div>      
            <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-2 ml-5 ajout" @click="modalActive = true,$store.state.IdEditTypClient=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter type de Client
                  </button>
             </div>   
                <modal-component :modalActive="modalActive" @close="modalActive = !modalActive ,fetchData()">
                    <add-form @close="modalActive = !modalActive,fetchData()"/>
                </modal-component>
        </div>

         <div class="container-fluid">
            <loading v-if="isLoading"></loading>
            <div class="card  mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-mute">Liste des type des clients</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                            <thead>
                              <tr>                    
                                <th scope="col">#</th>
                                <th scope="col">Type de client</th>
                                <th scope="col">Description</th>                           
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                           
                            <tbody>
                               <tr v-for="typeClient in typeClients" :key="typeClient.id">
                                <th scope="row">{{ typeClient.id }}</th>
                                <td>{{ typeClient.name }} </td>
                                <td>{{ typeClient.description }} </td>         
                                <td>
                                    <button class="btn btn-sm btn-danger mx-2"  @click="deleteTClient(typeClient.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    </button>
                                    <button class="btn btn-sm btn-primary" @click="modalActive = true,editTypeClient(typeClient,typeClient.id)" >
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
import ModalComponent from '@/components/Global/ModalComponent';
import AddForm from './TypeClAddForm';
import Swal from 'sweetalert2';

import api from '../../../../api'

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            typeClients :[],
            isLoading:false,
        }
    },
    created(){
        this.fetchData()
    },
    watch: {
        typeClients(val) {
              console.log(val)
              $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $('#datatable').DataTable()
              });
            }
       },
    computed:{
        searchEvery(){
            return this.typeClients.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        fetchData() {
            this.isLoading=true
            
            api.get("typeclient",
            )
            .then(resp => {
                this.isLoading=false
                this.typeClients = resp.data
                this.$store.state.typeClients=resp.data
               
          
            })
            .catch(err => {
                console.error(err)
            })
            
        },
        deleteTClient(id) {
            Swal.fire({
             title: 'vous etes sure de vouloir supprimer ces informations',
             showCancelButton: true,
             confirmButtonText: 'supprimer',
            // denyButtonText: `Don't save`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                api.delete("typeclient/" + id,
               )
              .then(resp => {
                Swal.fire('suppression avec succès ', '', 'success')
                this.typeClients = resp.data
                this.$store.state.typeClients=resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
                Swal.fire('une erreur est survenue veuillez réessayer plus tard', '', 'error')
            })
              
            } 
      })
            
            
        },

        editTypeClient(typeClient,id){
        this.$store.state.IdEditTypClient=id
        this.$store.state.typeClients=typeClient
        
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