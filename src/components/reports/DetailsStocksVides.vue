<template>
    <div class="page-wrapper">
                <div class="content container-fluid">
             <loading v-if="isLoading"></loading>

					<!-- Page Header -->
					<div class="page-header">
						<div class="row">
							<div class="col">
								<h3 class="page-title"> Détails Stock</h3>
								<ul class="breadcrumb">
									<li class="breadcrumb-item"><a href="" @click="$router.push('/')">Tableau de bord</a></li>
									<li class="breadcrumb-item active"> Détails Stock</li>
								</ul>
							</div>
						</div>
					</div>
					<!-- /Page Header -->
					
					<div class="row">
						<div class="col-sm-12">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title">Stocks</h4>
									
								</div>
								<div class="card-body">

									<div class="table-responsive-md" style="overflow-x:auto;">
										<table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
											<thead>
												<tr>
													<th scope="col">N॰</th>
                                                    <th scope="col">Stock</th>
													<th scope="col">Activité Realisé</th>
													<th scope="col">sortie</th>
													<th scope="col">entrée</th>
                                                    <th scope="col">stock actuel</th>
                                                    <th scope="col">stock initial</th>
                                                    <th scope="col">date effectué:</th>
                                                    
													
												</tr>
											</thead>
                                            <tbody>
                                                <tr v-for="detail in detailsstock" :key="detail.id">
                                                    <td>{{detail.id}}</td>
													<td>{{detail.stock_name}}</td>
                                                    <td>{{detail.activity_realise}}</td>
													<td>{{detail.quantite_sortie}}</td>
													<td>{{detail.quantite_entre}}</td>
                                                    <td>{{detail.quantite_actuel}}</td>
                                                    <td>{{detail.stock_quantite_initial	}}</td>
                                                    <td>{{(detail.created_at.substr(0, 10))	}}</td>
                                                    
                                                    
                                                    
                                                    
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
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from 'axios'
export default {
    data()
    {
        return{
            detailsstock:[],
            isLoading:false
        }
    },
    mounted(){
        this.fetchData()
    },
    watch: {
            detailsstock(val) {
              console.log(val)
              $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $('#datatable').DataTable(
                    {
                        dom: 'Bfrtip',
                       buttons: ['copy', 'csv', 'print'
                    ]
                    }
                )
              });
            }
       },
    methods:{
        
        fetchData() {
            this.isLoading=true
            axios.get(this.$store.state.baseurl + "getvidesstock",
          this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
        axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.isLoading=false
                this.detailsstock = resp.data
                console.log(this.detailsstock)
                
               // this.$store.state.typeClients=resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },

    },

}
</script>

<style >




</style>