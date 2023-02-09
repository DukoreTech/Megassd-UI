<template>
    <div class="page-wrapper">
                <div class="content container-fluid">
                    

                    <loading v-if="isLoading"></loading>
					<div class="page-header">
						<div class="row">
							<div class="col">
								<h3 class="page-title">Détails ventes</h3>
								<ul class="breadcrumb">
									<li class="breadcrumb-item"><a href="" @click="$router.push('/')">Tableau de bord</a></li>
									<li class="breadcrumb-item active">Détails ventes</li>
								</ul>
							</div>
                            
						</div>
                       <div class="row">
                            <div class="col-lg-6 d-flex px-3">
                             
                                <label>De:</label><br>
                                <input type="date" class="form-control col-4"  v-model="date1" placeholder="Search" />
                               
                                <label>A:</label><br>
                                <input type="date" class="form-control col-4"  v-model="date2" placeholder="Search" />

                            </div>
                            <div class="col-lg-4">
                                <input type="text" class="form-control col-6"  v-model="search" placeholder="Search" @keypress.enter="searchEvery"/>

                            </div>
                        </div>
                        
                        
                  </div>
                    
					

					<div class="row">
						<div class="col-sm-12">
							<div class="card" id="table">
								<div class="card-header">
									<h4 class="card-title">Détails ventes</h4>
									<p class="card-text">
										
									</p>
								</div>
								<div class="card-body">
									<div class="table-responsive" >
										<table class="table table-bordered  table-striped table-hover text-center"  width="100%" cellspacing="0">
											<thead>
												<tr class="p-5">
													
                                                    <th>order_id</th>
                                                    <th>client</th>
                                                    <th v-for="column in products"
                                                    :key="column.id"
                                                    >{{ column.name }}

                                                    </th>
                                                    <th>date effectué</th>
                                                    <th>Statut</th>
													<!---<th>commande</th>
													<th>Produits</th>
													<th>Qté</th>
                                                    <th>Qté Stock</th>
                                                    <th>Prix</th>
                                                    <th>Fait le:</th>
                                                    -->
													
												</tr>
											</thead>
                                            <tbody>
                                                
                                                <tr v-for="detail in orders" :key="detail.id">
														
													<td>{{detail.id}}</td>
                                                    <td>{{detail.clients.nom}}</td>
													<td v-for="pro in products" :key="pro.id">
                                                        <div v-for="prod in JSON.parse(detail.products)" :key="prod.product_id">
                                                             <div v-if="prod.product_id==pro.id">
                                                                 {{ prod.product_quantity }}
                                                             </div>
                                                           
                                                        </div>
                                      
                                                    </td>
                                                    <td>{{ (detail.date_facturation)}}</td>
                                                    <td><span v-if="detail.status==1" style="color:black;"><font-awesome-icon icon="fa-solid fa-check" /></span><span class="bg-secondary text-white mt-5" style=" width:120px;" 
                                                         v-if="detail.status==0">En cours</span></td>            
                                                                          
                                                   </tr>
                                            
                                                <tr rowspan="2">
                                                <th>Total #{{orders.length}}</th>
                                                <th></th>
                                                 <th v-for="pro in products" :key="pro.id">
                                                    {{  totalAmount  }}
                                                </th>
												 
												 <th></th>
                                                 <th></th>
                                                
                                             </tr>
                                            


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
import axios from 'axios'
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import $ from "jquery";

import api from '../../../api'

export default {
    data()
    {
        return{
			
            i:0,
            detailsorder:[],
			totalAmount :"",
			fromDate: "",
            toDate: "", 
            isLoading:false,
            products:[],
            prod:[],
            columns:[],
            orders:[]
        }
    },
	
    mounted(){
        this.fetchData()
        this.getproducts()
        this.getventes()
    },
	watch: {
            detailsorder(val) {
                $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $('#datatable').DataTable(
                    {
                        scrollX:true,
                        scrollY:true,
                        dom: 'Bfrtip',
                    buttons: ['copy', 'csv', 'print'
                    ]
                    }
                )
              });
                                        
			  console.log(this.totalAmount)
            },
            orders(val)
            {
                
			  const _ = require("lodash"); 
              this.orders.forEach(element => {
                JSON.parse(element.products).forEach(element1 => {
			  this.totalAmount = _.sumBy(element1, "product_quantity")
                });
                   
              });
            }
       },
    methods:{
		getproducts() {
            api.get("products")
            .then(resp => {
                this.products = resp.data
                this.products.forEach(element => {
                    this.columns.splice(2,0,{id:element.id,name:element.name})
                    
                });
            })
            .catch(err => {
                console.error(err)
            })
        },
      
        fetchData() {
            this.isLoading=true
            axios.get(this.$store.state.baseurl + "getorderdetail",
          this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
        axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.isLoading=false
                this.detailsorder =resp.data
            
               // this.$store.state.typeClients=resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        getventes() {
                api.get("ventes")
                .then(resp => {
                    this.orders = resp.data
                    this.$store.state.vantes=resp.data
                    console.log(this.orders)
                    this.orders.forEach(element => {
                      JSON.parse(element.products).forEach(element1 => {

                        this.prod.push({order_id:element.id,product_id:element1.product_id,quantite:element1.product_quantity,client:element.clients.nom})
                            
                        });
                        console.log(this.prod)
                        
                        
                        
                    });
                  
                })
                .catch(err => {
                    console.error(err)
                })
            }

	}
  
		
	

}
</script>

<style >
th{
	padding:10px;
	text-align: center;
}
td{
	text-align: center;
}

</style>