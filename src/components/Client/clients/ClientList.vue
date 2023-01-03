<template>
<div>
        <div> 
          <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="modalActive = true,$store.state.IdEditClient=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter Client
                  </button>
               
             </div>  

                <modal-component :modalActive="modalActive" @close="modalActive = !modalActive ,fetchData()">
                    <add-form @close="modalActive = !modalActive"/>
                </modal-component>
        </div>
         <div class="container-fluid">
            <div class="card  mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-mute">Liste des clients</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                            <thead>
                              <tr>                    
                                <th scope="col">Id</th>
                                <th scope="col">Nom</th>
                                <!---<th scope="col">Prenom</th>
                                <th scope="col">NIF</th>-->
                                <th scope="col">Telephone</th>
                              <!--  <th scope="col">TVA %</th>-->
                                <th scope="col">Type de client</th>
                                <th scope="col">Adresse</th>
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                      
                            <tbody>
                               <tr v-for="client in clients" :key="client.id">
                                <th scope="row">{{ client.id }}</th>
                                <td>{{ client.nom }} </td>
                                <td>{{ client.telephone }} </td>
                              <!--<td>{{ client.prenom }} </td>
                                <td>{{ client.nif }} </td>
                                           
                                <td>{{ client.assujet_tva }} </td> -->             
                                <td>{{ client.type_clients.name }} </td>            
                                <td>{{ client.adresses.name }} </td>            
                                <td>
                                    <button class="btn btn-sm btn-danger m-2"  @click="deleteUser(client.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    delete</button>
                                    <button class="btn btn-sm btn-primary" @click="modalActive = true,editUser(client,client.id)" >
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
import axios from "axios";
import Swal from 'sweetalert2'
import ModalComponent from '@/components/Global/ModalComponent';
import AddForm from './AddClientForm.vue';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            clients : [ ]
        }
    },
    mounted(){
        this.fetchData()
    },
    computed:{
        /*searchEvery(){
            let val="";
            return this.clients.filter(val.includes(this.search))
            }*/
    },
    watch: {
        clients(val) {
              console.log(val)
              $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $('#datatable').DataTable()
              });
            }
       },
    methods:{
        fetchData() {
            axios.get(this.$store.state.baseurl + "client",
          this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
        axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.clients = resp.data
                this.$store.state.typeClients=resp.data
         
                
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteUser(id) {
            Swal.fire({
             title: 'vous etes sure de vouloir supprimer ces informations',
             showDenyButton: true,
             showCancelButton: true,
             confirmButtonText: 'Delete',
            // denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {

            axios.delete(this.$store.state.baseurl + "client/" + id)
            .then(resp => {
                this.clients = resp.data
                Swal.fire('item deleted', '', 'success')
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
                Swal.fire('something wrong try again', '', 'error')
                
            })
        }
    });
            
        },
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

        editUser(client,id){
        this.$store.state.IdEditClient=id
        this.$store.state.clients=client
        
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