<template>
<div>
        <div>    
            <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-2 ml-5 ajout" @click="modalActive = true,$store.state.IdEditProduit=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter produit
                  </button>
               
              </div>      
               
                <modal-component :modalActive="modalActive" @close="modalActive = !modalActive,fetchData()">
                    <add-form  @close="modalActive = !modalActive ,fetchData()"/>
                </modal-component>
        </div>

         <div class="container-fluid">
            <div class="card  mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-mute">Liste des products</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
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
                                    <button class="btn btn-sm btn-danger m-2"  @click="deleteProduit(product.id)"><font-awesome-icon icon="fa-solid fa-trash"/>delete
                                    </button>
                                    <button class="btn btn-sm btn-primary" @click="modalActive = true,editProduit(product,product.id)" >
                                    <font-awesome-icon icon="fa-solid fa-edit"/>Edit
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
import Swal from 'sweetalert2';
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";
import ModalComponent from '@/components/Global/ModalComponent';
import AddForm from './ProduitAddForm';
import api from '../../../../api';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            products : [ ],
            token:this.$store.state.token
        }
    },
    mounted(){
        this.fetchData()
        ///this.editProduit()
    },
    computed:{
        searchEvery(){
            return this.products.filter(val=>val.includes(this.search))
            }
    },
    watch: {
        products(val) {
              console.log(val)
              $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $('#datatable').DataTable()
              });
            }
       },
    methods:{
        fetchData() {
            api.get("products")
            .then(resp => {
                this.products = resp.data
          
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteProduit(id) {
            Swal.fire({
                title: 'vous etes sure de vouloir supprimer ces informations',
            // showDenyButton: true,
             showCancelButton: true,
             confirmButtonText: 'Delete'
             })
            .then((result) => {
                if (result.isConfirmed) {
            api.delete("products/" + id)
            .then(resp => {
                this.products = resp.data
                
                Swal.fire('item deleted', '', 'success')
                this.fetchData()

            })
            .catch(err => {
                console.error(err)
                Swal.fire('something wrong try again', '', 'error')
                
            })
            
        }
    });
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