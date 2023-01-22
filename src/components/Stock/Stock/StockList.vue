<template>
<div>
       <div>    
            <!-- <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-5 mb-5 ml-5 ajout" @click="modalActive = true,$store.state.IdEditStock=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter stock
                  </button>
                <div class="mt-3">
                        <input type="text" class="form-control"  v-model="search" placeholder="Search" @keypress.enter="searchEvery"/>
                </div>
              </div> -->   
               
                <modal-component :modalActive="modalActive" @close="modalActive = !modalActive, fetchData()">
                    <add-form @close="modalActive = !modalActive ,fetchData()"/>
                </modal-component>
        </div>

         <div class="container-fluid">
            <div class="page-header mb-5 pt-4">
						<div class="row">
							<div class="col">
								<h3 class="page-title">Stock</h3>
								<ul class="breadcrumb">
									<li class="breadcrumb-item"><a href="" @click="$router.push('/')">Tableau de bord</a></li>
									<li class="breadcrumb-item active">stock</li>
								</ul>
							</div>
						</div>
					</div>
            <div class="card  mb-4">
               
                <div class="card-body">
                    <div class="table-responsive" >
                        <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0" style="overflow-x:auto !important;">
                            <thead>
                              <tr>                    
                                <th scope="col">Id</th>
                                <th scope="col">Produit</th>
                                <th scope="col">Nbvides</th>
                                <th scope="col">Nbpleins</th>
                                <th scope="col">Date created</th>
                               
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                      
                            <tbody>
                               <tr v-for="stock in stocks" :key="stock.id">
                                <th scope="row">{{ stock.id }}</th>
                                <td v-if="stock.products && stock.products.name">{{ stock.products.name }} </td>
                                <td>{{ stock.vide }} </td>
                                <td>{{ stock.plein }} </td>
                                <td>{{(stock.date.substr(0, 10))}}</td>
                                <td>
                                    <!--<button class="btn btn-sm btn-danger m-2"  @click="deleteStock(stock.id)"><font-awesome-icon icon="fa-solid fa-trash"/>delete
                                    </button>-->
                                    <button class="btn btn-sm btn-primary" @click="modalActive = true,editStock(stock,stock.id)" >
                                     vides <font-awesome-icon icon="fa-solid fa-plus" />
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
import AddForm from './StockAddForm';

import api from '../../../../api';

export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            stocks : [ ],
            products:[],
        }
    },
    mounted(){
        this.fetchData()
    },
    watch: {
        stocks(val) {
              console.log(val)
              $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $("#datatable").DataTable({
            lengthMenu: [
              [5,10, 25, 50, -1],
              [5,10, 25, 50, "All"],

            ],
            pageLength: 5,
            scrollY: true,
            scrollCollapse: true,
       
          });
               
              });
            }
       },
    computed:{
        searchEvery(){
            return this.stocks.filter(val=>val.includes(this.search))
            }
    },
    methods:{
        
        fetchData() {
            api.get("stock")
            .then(resp => {
                this.stocks = resp.data
           
            })
            .catch(err => {
                console.error(err)
            })
        },
        
        deleteStock(id) {
            api.delete("stock/" + id,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
            )
            .then(resp => {
                this.stocks = resp.data
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
            })
            
        },

        editStock(stock,id){
        this.$store.state.IdEditStock=id
        this.$store.state.stocks=stock
        
        }
    }
    
}
</script>

<style scoped>
    .ajout{
        color: white;
    }
  

</style>