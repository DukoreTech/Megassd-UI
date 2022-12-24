<template>
<div>
        <div>    
            <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="modalActive = true,$store.state.IdEditLocation=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter location
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
                    <h6 class="m-0 font-weight-bold text-mute">Liste des locations</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                              <tr>                    
                                <th scope="col">Id</th>
                                <th scope="col">Produit</th>
                                <th scope="col">Client</th>
                                <th scope="col">Quantite</th>
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                      
                            <tbody>
                               <tr v-for="location in locations" :key="location.id">
                                <th scope="row">{{ location.id }}</th>
                                <td>{{ location.product_id }} </td>
                                <td>{{ location.client_id }} </td>
                                <td>{{ location.quantity }} </td>
                                <td>
                                    <button class="btn btn-sm btn-default m-2"  @click="deleteLocation(location.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    </button>
                                    <button class="btn btn-sm btn-default" @click="modalActive = true,editLocation(location,location.id)" >
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
import AddForm from './LocationAddForm';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            locations : []
        }
    },
    mounted(){
        this.fetchData()
    },
    computed:{
        searchEvery(){
            return this.locations.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        fetchData() {
            axios.get(this.$store.state.baseUrl + "/locations/")
            .then(resp => {
                this.locations = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        
        deleteLocation(id) {
            axios.delete(this.$store.state.baseUrl + "/locations/" + id)
            .then(resp => {
                this.locations = resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
            })
            
        },

        editLocation(location,id){
        this.$store.state.IdEditLocation=id
        this.$store.state.locations=location
        
        }
    }
    
}
</script>

<style scoped>
    .ajout{
        color: white;
    }

</style>