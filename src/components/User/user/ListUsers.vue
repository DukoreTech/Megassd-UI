<template>
<div>
        <div>      
            <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="modalActive = true,$store.state.IdEditUser=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter  utilisateur
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
                    <h6 class="m-0 font-weight-bold text-mute">Liste des utilisateurs</h6>
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
                                <th scope="col">Adresse</th>
                                <th scope="col">Nom d'Utilasateur</th>
                                <th scope="col">Mot de Passe</th>
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                            
                            <tbody>
                               <tr v-for="user in users" :key="user.id">
                                <th scope="row">{{ user.id }}</th>
                                <td>{{ user.nom }} </td>
                                <td>{{ user.prenom }} </td>
                                <td>{{ user.dateDenaissance }} </td>
                                <td>{{ user.telephone }} </td>            
                                <td>{{ user.mail }} </td>            
                                <td>{{ user.adresse }} </td>            
                                <td>{{ user.nomDUtilisateur}} </td>            
                                <td>{{ user.motDePasse }} </td>            
                                <td>
                                    <button class="btn btn-sm btn-default m-2"  @click="deleteUser(user.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    </button>
                                    <button class="btn btn-sm btn-default" @click="modalActive = true,editUser(user,user.id)" >
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
import api from '../../../../api';
import Swal from 'sweetalert2';
import ModalComponent from '@/components/Global/ModalComponent.vue';
import AddForm from './AddFormUser.vue';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            users : [ ]
        }
    },
    mounted(){
        this.fetchData()
    },
    computed:{
        searchEvery(){
            return this.users.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        fetchData() {
            api.get("/users/")
            .then(resp => {
                this.users = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteUser(id) {
            axios.delete(this.$store.state.baseUrl + "/users/" + id)
            .then(resp => {
                this.users = resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
            })
            
        },

        editUser(user,id){
        this.$store.state.IdEditUser=id
        this.$store.state.users=user
        
        }
    }
    
}
</script>

<style scoped>

    .ajout{
        color: white;
    }

</style>