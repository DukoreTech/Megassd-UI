<template>
<div>
        <div>        
                <button class="btn btn-info m-5" @click="modalActive = true,$store.state.IdEditAdresse=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter Adresse
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
                    <h6 class="m-0 font-weight-bold text-mute">Liste des adresses</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="dataTable" width="100%" cellspacing="0">
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
                                <td>{{ adresse.zone }} </td>
                                <td>{{ adresse.description }} </td>         
                                <td>
                                    <button class="btn btn-sm btn-default m-2"  @click="deleteRole(adresse.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    </button>
                                    <button class="btn btn-sm btn-default" @click="modalActive = true,editRole(adresse,adresse.id)" >
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
import ModalComponent from '@/components/Global/ModalComponent.vue';
import AddForm from './AddAdressForm';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            adresses :[]
        }
    },
    mounted(){
        this.fetchData()
    },
    computed:{
        searchEvery(){
            return this.adresses.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        fetchData() {
            axios.get(this.$store.state.baseUrl + "/adresses/")
            .then(resp => {
                this.adresses = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteRole(id) {
            axios.delete(this.$store.state.baseUrl + "/adresses/" + id)
            .then(resp => {
                this.adresses = resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
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

</style>