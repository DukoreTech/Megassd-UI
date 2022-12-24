<template>
<div>
        <div>    
            <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="modalActive = true,$store.state.IdEditPerte=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter perte
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
                    <h6 class="m-0 font-weight-bold text-mute">Liste des pertes</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                              <tr>                    
                                <th scope="col">Id</th>
                                <th scope="col">Produit</th>
                                <th scope="col">Type de perte</th>
                                <th scope="col">Quantite</th>
                                <th scope="col">Description</th>
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                      
                            <tbody>
                               <tr v-for="perte in pertes" :key="perte.id">
                                <th scope="row">{{ perte.id }}</th>
                                <td>{{ perte.product_id }} </td>
                                <td>{{ perte.type_perte }} </td>
                                <td>{{ perte.quantity }} </td>
                                <td>{{ perte.description }} </td>
                                <td>
                                    <button class="btn btn-sm btn-default m-2"  @click="deletePerte(perte.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    </button>
                                    <button class="btn btn-sm btn-default" @click="modalActive = true,editPerte(perte,perte.id)" >
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
import AddForm from './PerteAddForm';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            pertes : []
        }
    },
    mounted(){
        this.fetchData()
    },
    computed:{
        searchEvery(){
            return this.pertes.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        fetchData() {
            axios.get(this.$store.state.baseUrl + "/pertes/")
            .then(resp => {
                this.pertes = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        
        deletePerte(id) {
            axios.delete(this.$store.state.baseUrl + "/pertes/" + id)
            .then(resp => {
                this.pertes = resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
            })
            
        },

        editPerte(perte,id){
        this.$store.state.IdEditPerte=id
        this.$store.state.pertes=perte
        
        }
    }
    
}
</script>

<style scoped>
    .ajout{
        color: white;
    }

</style>