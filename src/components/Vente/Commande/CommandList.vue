<template>
<div>
        <div> 
          <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="this.$router.push({name:'lotExForm'})">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter command
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
                        <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                            <thead>                              
                              <tr>                    
                                <th scope="col">Id</th>
                                <th scope="col-lg-4">Produit</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Paied Amount</th>
                                <th scope="col">To:client</th>
                                <th scope="col">Date effectue</th>
                                <th scope="col">status</th>
                                <th scope="col">Added by</th>
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>                     
                            <tbody>
                               <tr v-for="order in orders" :key="order.id">
                                <th scope="row">{{ order.id }}</th>
                                <td>
                                    <div v-for="val in JSON.parse(order.products)" :key="val">
                                        {{ val.product_name }}
                                    
                                    </div>
                                    
                                </td>
                                <td>{{ order.total_amount}} </td>
                                <td>{{ order.payed_amount}} </td>
                                <td>{{ order.clients.nom}} </td>
                                <td>{{ order.date_facturation}} </td>
                                <td><span v-if="order.status==1" style="background:turquoise;color:white; padding:4px;">Payed</span><span style="background-color:#495057;color:white ;padding:4px;" 
                                     v-if="order.status==0">Pending</span></td>            
                                <td>{{ order.users.name}} </td>                       
                                <td>
                                    <router-link :to="{name:'InvoiceOrderView',params:{id:order.id}}" v-if="order.status==1" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseStock"
                                        aria-expanded="true" aria-controls="collapseStock">
                                        
                                    Invoice
                            </router-link> 
                                    
                                    <button v-if="order.status==0" class="btn btn-sm btn-primary" @click="editReception(reception,reception.id)">
                                    <font-awesome-icon icon="fa-solid fa-edit"/>confirm
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
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";
import ModalComponent from '@/components/Global/ModalComponent';
import AddForm from './CommandAddForm.vue';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            orders : [ ]
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
    watch: {
        orders(val) {
              console.log(val)
              $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $('#datatable').DataTable()
              });
            }
       },
    
    methods:{
        ajout(){
            this.$router.push({name:'AddCommande'})
        },
        fetchData() {
            axios.get(this.$store.state.baseurl + "ventes",axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
                    axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.orders = resp.data
                console.log(this.orders)
              
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteReception(id) {
            axios.delete(this.$store.state.baseUrl + "/receptions/" + id)
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