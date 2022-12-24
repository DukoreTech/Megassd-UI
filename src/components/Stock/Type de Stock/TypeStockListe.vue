<template>
<div>
        <div>    
             <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="modalActive = true,$store.state.IdEditTypStock=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter  type de Stock
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
                    <h6 class="m-0 font-weight-bold text-mute">Liste des type des stock</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                              <tr>                    
                                <th scope="col">Id</th>
                                <th scope="col">Type de stock</th>
                                <th scope="col">Description</th>                           
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                           
                            <tbody>
                               <tr v-for="typeStock in typeStocks" :key="typeStock.id">
                                <th scope="row">{{ typeStock.id }}</th>
                                <td>{{ typeStock.typeStock }} </td>
                                <td>{{ typeStock.description }} </td>         
                                <td>
                                    <button class="btn btn-sm btn-default m-2"  @click="deleteTStock(typeStock.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    </button>
                                    <button class="btn btn-sm btn-default" @click="modalActive = true,editTypeStock(typeStock,typeStock.id)" >
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
import AddForm from './TypeStockForm';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            typeStocks :[]
        }
    },
    mounted(){
        this.fetchData()
    },
    computed:{
        searchEvery(){
            return this.typeStocks.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        fetchData() {
            axios.get(this.$store.state.baseUrl + "/typeStocks/")
            .then(resp => {
                this.typeStocks = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteTStock(id) {
            axios.delete(this.$store.state.baseUrl + "/typeStocks/" + id)
            .then(resp => {
                this.typeStocks = resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
            })
            
        },

        editTypeStock(typeStock,id){
        this.$store.state.IdEditTypStock=id
        this.$store.state.typeStocks=typeStock
        
        }
    }
    
}
</script>

<style scoped>
    .ajout{
        color: white;
    }

</style>