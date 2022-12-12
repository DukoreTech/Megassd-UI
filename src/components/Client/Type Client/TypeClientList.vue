<template>
<div>
        <div>        
                <button class="btn btn-info m-5" @click="modalActive = true,$store.state.IdEditTypClient=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter typeClient
                  </button>
                <div class="m-3 float-end ">
                        <input type="text" class="form-control"  v-model="search" placeholder="Search" @keypress.enter="searchEvery"/>
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
                        <table class="table table-bordered  table-striped table-hover text-center" id="dataTable" width="100%" cellspacing="0">
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
                                <td>{{ typeClient.typeClient }} </td>
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
import axios from "axios";
import ModalComponent from '@/components/Global/ModalComponent';
import AddForm from './TypeClAddForm';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            typeClients :[]
        }
    },
    mounted(){
        this.fetchData()
    },
    computed:{
        searchEvery(){
            return this.typeClients.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        fetchData() {
            axios.get(this.$store.state.baseUrl + "/typeClients/")
            .then(resp => {
                this.typeClients = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteTClient(id) {
            axios.delete(this.$store.state.baseUrl + "/typeClients/" + id)
            .then(resp => {
                this.typeClients = resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
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

</style>