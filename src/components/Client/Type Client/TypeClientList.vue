<template>
<div>
        <div>      
            <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="modalActive = true,$store.state.IdEditTypClient=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter type de Client
                  </button>
                <div class="mt-3">
                        <input type="text" class="form-control"  v-model="search" placeholder="Search" @keypress.enter="searchEvery"/>
                </div>
             </div>   
                <modal-component :modalActive="modalActive" @close="modalActive = !modalActive ">
                    <add-form @close="modalActive = !modalActive"/>
                </modal-component>
        </div>

         <div class="container-fluid">
            <div class="card  mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-mute">Liste des type des clients</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                            <thead>
                              <tr>                    
                                <th scope="col">Id</th>
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
                                    <button class="btn btn-sm btn-default m-2"  @click="deleteTClient(typeClient.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    </button>
                                    <button class="btn btn-sm btn-default" @click="modalActive = true,editTypeClient(typeClient,typeClient.id)" >
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

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            typeClients :[]
        }
    },
    created(){
        this.fetchData()
    },
    computed:{
        searchEvery(){
            return this.typeClients.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        fetchData() {
            axios.get(this.$store.state.baseurl + "typeclient",
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.typeClients = resp.data
                this.$store.state.typeClients=resp.data
                setTimeout(() => {
          $("#datatable").DataTable({
            lengthMenu: [
              [5,10, 25, 50, -1],
              [5,10, 25, 50, "All"],
            ],
            pageLength: 5,
          });
        });
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteTClient(id) {
            Swal.fire({
             title: 'Do you want to save the changes?',
             showDenyButton: true,
             showCancelButton: true,
             confirmButtonText: 'Save',
             denyButtonText: `Don't save`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
    
                axios.delete(this.$store.state.baseurl + "typeclient/" + id,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
                axios.defaults.headers.common['Accept'] = `Application/json`)
              .then(resp => {
                Swal.fire('item deleted', '', 'success')
                this.typeClients = resp.data
                this.$store.state.typeClients=resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
            })
              
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
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

</style>