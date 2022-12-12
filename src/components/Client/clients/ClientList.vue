<template>
<div>
        <div> 
          <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5" @click="modalActive = true,$store.state.IdEditClient=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter Client
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
                    <h6 class="m-0 font-weight-bold text-mute">Liste des clients</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                              <tr>                    
                                <th scope="col">Id</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Prenom</th>
                                <th scope="col">Date de naissance</th>
                                <th scope="col">Telephone</th>
                                <th scope="col">Email</th>
                                <th scope="col">Type de client</th>
                                <th scope="col">Adresse</th>
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                      
                            <tbody>
                               <tr v-for="client in clients" :key="client.id">
                                <th scope="row">{{ client.id }}</th>
                                <td>{{ client.nom }} </td>
                                <td>{{ client.prenom }} </td>
                                <td>{{ client.dateDenaissance }} </td>
                                <td>{{ client.telephone }} </td>            
                                <td>{{ client.mail }} </td>            
                                <td>{{ client.typeClient }} </td>            
                                <td>{{ client.adresse }} </td>            
                                <td>
                                    <button class="btn btn-sm btn-default m-2"  @click="deleteUser(client.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    </button>
                                    <button class="btn btn-sm btn-default" @click="modalActive = true,editUser(client,client.id)" >
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
        searchEvery(){
            return this.clients.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        fetchData() {
            axios.get(this.$store.state.baseUrl + "/clients/")
            .then(resp => {
                this.clients = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteUser(id) {
            axios.delete(this.$store.state.baseUrl + "/clients/" + id)
            .then(resp => {
                this.clients = resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
            })
            
        },

        editUser(client,id){
        this.$store.state.IdEditClient=id
        this.$store.state.clients=client
        
        }
    }
    
}
</script>

<style scoped>

</style>