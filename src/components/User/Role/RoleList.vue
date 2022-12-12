<template>
<div>
        <div>       
            <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5" @click="modalActive = true,$store.state.IdEditRole=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter  Role
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
                    <h6 class="m-0 font-weight-bold text-mute">Liste des roles</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                              <tr>                    
                                <th scope="col">Id</th>
                                <th scope="col">Role</th>
                                <th scope="col">Description</th>                           
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                           
                            <tbody>
                               <tr v-for="role in roles" :key="role.id">
                                <th scope="row">{{ role.id }}</th>
                                <td>{{ role.role }} </td>
                                <td>{{ role.description }} </td>         
                                <td>
                                    <button class="btn btn-sm btn-default m-2"  @click="deleteRole(role.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    </button>
                                    <button class="btn btn-sm btn-default" @click="modalActive = true,editRole(role,role.id)" >
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
import AddForm from './AddFormRole.vue';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            roles :[]
        }
    },
    mounted(){
        this.fetchData()
    },
    computed:{
        searchEvery(){
            return this.roles.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        fetchData() {
            axios.get(this.$store.state.baseUrl + "/roles/")
            .then(resp => {
                this.roles = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteRole(id) {
            axios.delete(this.$store.state.baseUrl + "/roles/" + id)
            .then(resp => {
                this.roles = resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
            })
            
        },

        editRole(role,id){
        this.$store.state.IdEditRole=id
        this.$store.state.roles=role
        
        }
    }
    
}
</script>

<style scoped>

</style>