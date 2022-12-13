<template>
<div>
        <div>    
            <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="modalActive = true,$store.state.IdEditProduit=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter produit
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
                    <h6 class="m-0 font-weight-bold text-mute">Liste des products</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                              <tr> 
                                <th scope="col">Id</th>
                                <th scope="col">Nom</th>
                                <th scope="col">caisse</th>
                                <th scope="col">Unite de mesure</th>
                                <th scope="col">Nombres de bouteilles</th>
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                      
                            <tbody>
                               <tr v-for="product in products" :key="product.id">
                                <th scope="row">{{ product.id }}</th>
                                <td>{{ product.name }} </td>
                                <td>{{ product.caisse }} </td>
                                <td>{{ product.unite_mesure }} </td>
                                <td>{{ product.nombre_bouteille }} </td>
                                <td>
                                    <button class="btn btn-sm btn-default m-2"  @click="deleteProduit(product.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    </button>
                                    <button class="btn btn-sm btn-default" @click="modalActive = true,editProduit(product,product.id)" >
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
import AddForm from './ProduitAddForm';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            products : [ ]
        }
    },
    mounted(){
        this.fetchData()
    },
    computed:{
        searchEvery(){
            return this.products.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        fetchData() {
            axios.get(this.$store.state.baseUrl + "/products/")
            .then(resp => {
                this.products = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteProduit(id) {
            axios.delete(this.$store.state.baseUrl + "/products/" + id)
            .then(resp => {
                this.products = resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
            })
            
        },

        editProduit(product,id){
        this.$store.state.IdEditProduit=id
        this.$store.state.products=product
        
        }
    }
    
}
</script>

<style scoped>
.ajout{
    color: white;
}

</style>