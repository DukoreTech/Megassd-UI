<template>
<div>
        <div>    
            <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-2 ml-5 ajout" @click="modalActive = true,$store.state.IdEditAdresse=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter Adresse
                  </button>
                <!---<div class="mt-3">
                        <input type="text" class="form-control"  v-model="search" placeholder="Search" @keypress.enter="searchEvery"/>
                </div>-->
             </div>  
                <modal-component :modalActive="modalActive" @close="modalActive = !modalActive,fetchData()">
                    <add-form  @close="modalActive = !modalActive,fetchData()"/>
                </modal-component>
        </div>

         <div class="container-fluid">
            <div class="card  mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-mute">Liste des adresses</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                            <thead>
                              <tr>                    
                                <th scope="col">Id</th>
                                <th scope="col">Zone</th>
                                <th scope="col">Description</th>                           
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                           
                            <tbody>
                               <tr v-for="adresse in adresses" :key="adresse.id">
                                <th scope="row">{{ adresse.id }}</th>
                                <td>{{ adresse.name }} </td>
                                <td>{{ adresse.description	 }} </td>         
                                <td>
                                    <button class="btn btn-sm btn-danger m-2"  @click="deleteRole(adresse.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    Supprimer</button>
                                    <button class="btn btn-sm btn-primary" @click="modalActive =true,editRole(adresse,adresse.id)" >
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
import ModalComponent from '@/components/Global/ModalComponent.vue';
import AddForm from './AddAdressForm';
import api from "../../../../api";

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            adresses :[],
            
        }
    },
    mounted(){

        this.fetchData()
       
        
    },
    watch: {
           adresses(val) {
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
            console.log(this.$store.state.token)
          api.get("Address").then(resp => {
                this.adresses = resp.data
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
                this.adresses = resp.data
                Swal.fire('suppression avec succès ', '', 'success')
                this.$store.state.adresses=resp.data
                this.fetchData()
               }).catch(err => {
                console.error(err)
                
                Swal.fire('une erreur est survenue veuillez réessayer plus tard', '', 'error')
                })
            }
               })
               },
               editRole(adresse,id){
        this.$store.state.IdEditAdresse=id
        this.$store.state.adresses=adresse
        
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