<template>
    <div class="page-wrapper">
                <div class="content container-fluid">
                    <loading v-if="isLoading"></loading>


					<!-- Page Header -->
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
										<table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
											<thead>
												<tr class="p-5">
													<th>#</th>
													<th>commande</th>
													<th>Produits</th>
													<th>Qté</th>
                                                    <th>Qté Stock</th>
                                                    <th>Prix</th>
                                                    <th>Fait le:</th>
													
												</tr>
											</thead>
                                            <tbody>
                                                
                                                <tr v-for="detail in detailsorder" :key="detail.id">
													<td>{{detail.id}}</td>	
													<td>{{detail.order_id}}</td>
                                                    <td>{{detail.name}}</td>
													<td>{{detail.product_quantity}}Casier</td>
													<td>{{detail.quantite_stock}}</td>
													<td>{{detail.price_unitaire}}</td>
                                                    <td>{{(detail.created_at.substr(0, 10))	}}</td>
                                                </tr>
                                                <tr rowspan="2">
                                                 <th ></th>
                                                 <th >Total #{{detailsorder.length}}</th>
                                                 <th ></th>
                                                 
                                                 <th ></th> 
												                 
                                                 <th ></th>
												 <th >Total Rs.{{totalAmount}}</th> 
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



export default {
    data()
    {
        return{
			
            detailsorder:[],
			totalAmount :"",
			fromDate: "",
            toDate: "", 
            isLoading:false
        }
    },
	
    mounted(){
        this.fetchData()
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
                                        
              
		
			  const _ = require("lodash");
			  this.totalAmount = _.sumBy(this.detailsorder, "price_unitaire")
			  console.log(this.totalAmount)
            }
       },
    methods:{
		
      
        fetchData() {
            this.isLoading=true
            axios.get(this.$store.state.baseurl + "getorderdetail",
          this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
        axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.loading=false
                this.detailsorder =resp.data
				
               // this.$store.state.typeClients=resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },

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