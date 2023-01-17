<template>
    
    <div> 
      <div class="d-md-flex m-3 justify-content-between">
         </div>  

            <modal-component :modalActive="modalActive" @close="modalActive = !modalActive , fetchData()">
                <DetteArgentForm @close="modalActive = !modalActive,fetchData()"/>
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
                            <th scope="col">Client</th>
                            <th scope="col">prix payés </th>
                            <th scope="col">montant_en_exces</th>
                            <th scope="col">montant_en_dette</th>
                            <th scope="col">Montant Amenée</th>
                            <th scope="col">montant_rembourse</th>
                            <th scope="col">Actions</th>
                         </tr>
                        </thead>                     
                        <tbody>
                           <tr v-for="money in DetteMoney" :key="money.id">
                            <th scope="row">{{ money.id }}</th>
                            <td>{{JSON.parse(money.orders.products)[0].product_name }} </td>
                            <td>{{ money.clients.nom}}</td>
                           <!--<td>{{ reception.stock_id }} </td>--> 
                            <td>{{ money.montant_paye }} </td>            
                            <td>{{ money.montant_en_exces }} </td>            
                            <td>{{ money.montant_en_dette }}</td>            
                            <td>{{ money.montant_amene}}</td>            
                            <td>{{ money.montant_rembourse }}</td>                      
                            <td>
                               <!-- <button class="btn btn-sm btn-danger m-2"  @click="deleteReception(reception.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                delete</button>-->
                                <span class="bg-success p-2 text-white" v-if="money.montant_en_exces==0 && money.montant_en_dette==0">Payed</span>
                                <button v-if="money.montant_en_exces!=0 || money.montant_en_dette!=0" class="btn btn-sm btn-primary" @click="modalActive = true,editMoney(money,money.id)" >
                                <font-awesome-icon icon="fa-solid fa-edit"/><span v-if=" money.montant_en_dette !=0">Payer</span><span v-if=" money.montant_en_exces !=0"> Rembourse</span>
                                </button>
                            </td>
                          </tr>
                        </tbody>
                     </table>
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
//import axios from "axios";
import Swal from 'sweetalert2';
import ModalComponent from '@/components/Global/ModalComponent';
import DetteArgentForm from './DetteArgentFom.vue'
import api from '../../../../api';

export default {
components: { ModalComponent, DetteArgentForm},
data() {
    return{
        modalActive: false,
        search:'',
        DetteMoney : [ ]
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
    DetteMoney(val) {
          console.log(val)
          $('#datatable').DataTable().destroy();
          this.$nextTick(()=> {
            $('#datatable').DataTable()
          });
        }
   },

methods:{
    fetchData() {
        api.get("getDetteArgent",
      )
        .then(resp => {
            this.DetteMoney = resp.data
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
         confirmButtonText: 'suppprimer'
         })  .then((result) => {
            if (result.isConfirmed) {
                api.delete("reception/"+id)
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
    editMoney(Money,id){
    this.$store.state.IdEditDetteArgent=id
    this.$store.state.DetteArgent=Money
    console.log(this.$store.state.DetteArgent)
    
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