<template>
<div>
        <div>    
            <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="modalActive = true,$store.state.IdEditPerte=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter perte
                  </button>
               
              </div>    
               
                <modal-component :modalActive="modalActive" @close="modalActive = !modalActive ,fetchData()">
                    <add-form @close="modalActive = !modalActive ,fetchData()" />
                </modal-component>
        </div>

         <div class="container-fluid">
            <div class="card  mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-mute">Liste des pertes</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                            <thead>
                              <tr>                    
                                <th scope="col">Id</th>
                                <th scope="col">Product</th>
                                <th scope="col">Nature</th>
                                <th scope="col">Nb bouteilles</th>
                                <th scope="col">Stock</th>
                                <th scope="col">casier</th>
                                <th scope="col">Restant</th>
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                      
                            <tbody>
                               <tr v-for="perte in pertes" :key="perte.id">
                                <th scope="row">{{ perte.id }}</th>
                                <td>{{ perte.products.name }} </td>
                                <td>{{ perte.nature }} </td>
                                <td>{{ perte.quantity }} </td>
                                <td>{{ perte.stock}} </td>
                                <td>{{ perte.casier }} </td>
                                <td>{{ perte.restant }} </td>
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
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import Swal from 'sweetalert2';
import ModalComponent from '@/components/Global/ModalComponent';
import AddForm from './PerteAddForm';
import api from '../../../../api';
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
    watch: {
        pertes(val) {
              console.log(val)
              $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $('#datatable').DataTable()
              });
            }
       },
   
    methods:{
        fetchData() {
                api.get("pertes")
            .then(resp => {
                this.pertes = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        
        deletePerte(id) {
            Swal.fire({
                title: 'vous etes sure de vouloir supprimer ces informations',
            // showDenyButton: true,
             showCancelButton: true,
             confirmButtonText: 'supprimer'
             })
            .then((result) => {
                if (result.isConfirmed) {
            api.delete("pertes/" + id)
            .then(resp => {
                this.pertes = resp.data
                Swal.fire('suppression avec succès', '', 'success')
                this.fetchData()

            })
            .catch(err => {
                console.error(err)
                Swal.fire('une erreur est survenue veuillez réessayer plus tard', '', 'error')
            })
        }
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