<template>
<div>
        <div> 
          <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-2 ml-5 ajout" @click="modalActive = true,$store.state.IdEditReception=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter Reception
                  </button>
                
             </div>  

                <modal-component :modalActive="modalActive" @close="modalActive = !modalActive , fetchData()">
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
                                <th scope="col">Produit</th>
                                <th scope="col">prix d'achats</th>
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
                                <td>{{ reception.products.name }} </td>
                                <td>{{ reception.lot_id }}Fbu</td>
                               <!--<td>{{ reception.stock_id }} </td>--> 
                                <td>{{ reception.quantity }} </td>            
                                <td>{{ reception.tva }} </td>            
                                <td>{{ reception.date_achat }} </td>            
                                <td>{{ reception.montant }} </td>            
                                <td>{{ reception.montant_total }} </td>            
                                <td>{{ reception.description }} </td>            
                                <td>
                                   <!-- <button class="btn btn-sm btn-danger m-2"  @click="deleteReception(reception.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    delete</button>-->
                                    <button class="btn btn-sm btn-primary" @click="modalActive = true,editReception(reception,reception.id)" >
                                    <font-awesome-icon icon="fa-solid fa-edit"/>edit
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
import Swal from 'sweetalert2';
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
    watch: {
        receptions(val) {
              console.log(val)
              $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $('#datatable').DataTable()
              });
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
            Swal.fire({
                title: 'vous etes sure de vouloir supprimer ces informations',
             showDenyButton: true,
             showCancelButton: true,
             confirmButtonText: 'Delete'
             })  .then((result) => {
                if (result.isConfirmed) {
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
                }
            });
           
            
        },

        editReception(reception,id){
        this.$store.state.IdEditReception=id
        this.$store.state.receptions=reception
        console.log(this.$store.state.receptions)
        
        }
    }
    
}
</script>

<style scoped>
    .ajout{
        color: white;
    }
    th{
        text-transform: capitalize;
        text-align: center;
        font-size: 13px;
        font-weight: bold;
        
    }
    td{
        text-align: center;
        font-size: 16px;  
        
    }

</style>