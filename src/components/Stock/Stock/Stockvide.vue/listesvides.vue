<template>

<div>
       <div>    
                <div class="d-md-flex m-3 justify-content-between" >
                    <button class="btn btn-info mt-2 ml-5 ajout" @click="modalActive = true,$store.state.IdEditvide=null ,addM=true,newM==false">
                        <font-awesome-icon icon="fa-solid fa-plus-circle" />
                        Nouveau stock
                      </button>
                      <button class="btn btn-info mt-2 ml-5 ajout" @click="modalActive = true,$store.state.IdEditvide=null, addM=false,newM==false">
                        <font-awesome-icon icon="fa-solid fa-plus-circle" />
                        Louer les vides
                      </button>
                   <!-- <div class="mt-3">
                            <input type="text" class="form-control"  v-model="search" placeholder="Search" @keypress.enter="searchEvery"/>
                    </div>-->
                </div>
           
               
                <modal-component :modalActive="modalActive" @close="modalActive = !modalActive, fetchData()">
                    <videform v-if="newM==false && addM==true" @close="modalActive = !modalActive ,fetchData()"/>
                    <newvide v-if="newM==true && addM==false" @close="modalActive=!modalActive ,fetchData()"/>
                </modal-component>
        </div>

         <div class="container-fluid">
            <loading v-if="isLoading"></loading>
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
                <div class="row">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                              <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#detail-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Stock vides</button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#report-tab-pane" type="button" role="tab" aria-controls="report-tab-pane" aria-selected="false">Vides en location</button>
                              </li>

                            </ul>

                </div>
			</div>
    <div class="tab-content" id="myTabContent">
        <div class="row tab-pane fade show active" id="detail-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <div class="card  mb-4">
                <div class="card-header">
					<h4 class="card-title">Stocks</h4>
					<p class="card-text">
						
					</p>
				</div>

               
                <div class="card-body">
                    <div class="table-responsive" >
                        <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0" style="overflow-x:auto !important;">
                            <thead>
                              <tr>                    
                                <th scope="col">#</th>
                                <th scope="col">Nom du stock</th>
                                <th scope="col">Produits</th>
                                <th scope="col">Quantité</th>
                                <th scope="col">Date de création</th>
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                      
                           <tbody>
                               <tr v-for="stock in stocks" :key="stock.id">
                                <th scope="row">{{ stock.id }}</th>
                                <td >{{ stock.name }} </td>
                                <td>
                                    <div v-for="pro in JSON.parse(stock.products)" :key="pro.id">
                                        {{pro.name}},

                                    </div>
                                     </td>
                                <td>{{ stock.quantite}} </td>
                                <td>{{(stock.created_at.substr(0, 10))}}</td>
                                <td class="mx-3">
                                    <button class="btn btn-sm btn-danger m-2"  @click="deleteStock(stock.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    </button>
                                    <button class="btn btn-sm btn-primary" @click="modalActive = true,newstock(stock,stock.id),newM=true,addM=false">
                                      <font-awesome-icon icon="fa-solid fa-plus" />
                                    </button>
                                    <button class="btn btn-sm btn-primary " @click="modalActive = true,editStock(stock,stock.id),addM=true,newM=false" >
                                      <font-awesome-icon icon="fa-solid fa-edit" />
                                    </button>
                                   
                               </td>
                              </tr>
                            </tbody>
                         </table>
                      </div>
                </div>
            </div>
        </div>
        <div class="row tab-pane fade" id="report-tab-pane" role="tabpanel" aria-labelledby="report-tab" tabindex="0">
            <div class="card  mb-4">
                <div class="card-header">
					<h4 class="card-title">Vides Louer</h4>
					<p class="card-text">
						
					</p>
				</div>

               
                <div class="card-body">
                    <div class="table-responsive" >
                        <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0" style="overflow-x:auto !important;">
                            <thead>
                              <tr>                    
                                <th scope="col">#</th>
                                <th scope="col">Nom du stock</th>
                                <th scope="col">Quantité</th>
                                <th scope="col">Date de création</th>
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                      
                           <tbody>
                              
                            </tbody>
                         </table>
                      </div>
                </div>
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
import videform from '../Stockvide.vue/videform.vue';
import newvide from '../Stockvide.vue/newvide.vue';

import api from '../../../../../api';
export default {
    components: { ModalComponent, videform ,newvide},
    data() {
        return{
            modalActive: false,
            search:'',
            stocks : [],
            products:[],
            addM:false,
            newM:false,

            isLoading:false
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
            this.isLoading=true
            api.get("vides")
            .then(resp => {
                this.isLoading=false
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
        this.$store.state.IdEditvide=id
        this.$store.state.vides=stock
        
        }, 
        newstock(stock,id)
        {
            this.$store.state.newvide=id
            this.$store.state.vides=stock 
        }
    }
    
}
</script>

<style>

</style>