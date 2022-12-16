<template>
<div>
        <div> 
          <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="modalActive = true,$store.state.IdEditReception=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter Reception
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
                    <h6 class="m-0 font-weight-bold text-mute">Liste des reception</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="dataTable" width="100%" cellspacing="0">
                            <thead>                              
                              <tr>                    
                                <th scope="col">Id</th>
                                <th scope="col">Produit</th>
                                <th scope="col">Lot</th>
                               <!--<th scope="col">Stock</th>--> 
                                <th scope="col">Quantite</th>
                                <th scope="col">TVA %</th>
                                <th scope="col">Date d'achat</th>
                                <th scope="col">Montant</th>
                                <th scope="col">Montant Total</th>
                                <th scope="col">Description</th>
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>                     
                            <tbody>
                               <tr v-for="reception in receptions" :key="reception.id">
                                <th scope="row">{{ reception.id }}</th>
                                <td>{{ reception.product_id }} </td>
                                <td>{{ reception.lot_id }} </td>
                               <!--<td>{{ reception.stock_id }} </td>--> 
                                <td>{{ reception.quantity }} </td>            
                                <td>{{ reception.tva }} </td>            
                                <td>{{ reception.date_achat }} </td>            
                                <td>{{ reception.montant }} </td>            
                                <td>{{ reception.montant_total }} </td>            
                                <td>{{ reception.description }} </td>            
                                <td>
                                    <button class="btn btn-sm btn-default m-2"  @click="deleteReception(reception.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    </button>
                                    <button class="btn btn-sm btn-default" @click="modalActive = true,editReception(reception,reception.id)" >
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
import AddForm from './ReceptionAddForm.vue';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            receptions : [ ]
        }
    },
    mounted(){
        this.fetchData()
    },
    computed:{
        searchEvery(){
            return this.receptions.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        fetchData() {
            axios.get(this.$store.state.baseurl + "reception",
          this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.receptions = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteReception(id) {
            axios.delete(this.$store.state.baseurl + "reception/"+id,
          this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.receptions = resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
            })
            
        },

        editReception(reception,id){
        this.$store.state.IdEditReception=id
        this.$store.state.receptions=reception
        
        }
    }
    
}
</script>

<style scoped>
    .ajout{
        color: white;
    }

</style>