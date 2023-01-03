<template>
    <div class="page-wrapper">
                <div class="content container-fluid">

					<!-- Page Header -->
					<div class="page-header">
						<div class="row">
							<div class="col">
								<h3 class="page-title">Data Tables</h3>
								<ul class="breadcrumb">
									<li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
									<li class="breadcrumb-item active">Data Tables</li>
								</ul>
							</div>
						</div>
					</div>
					<!-- /Page Header -->
					
					<div class="row">
						<div class="col-sm-12">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title">Details ventes</h4>
									<p class="card-text">
										
									</p>
								</div>
								<div class="card-body">
									<div class="table-responsive">
										<table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
											<thead>
												<tr class="p-5">
													<th>#</th>
													<th>order_id</th>
													<th>product_name</th>
													
													
													<th>product_quantity</th>
                                                    <th>quantite_stock</th>
                                                    <th>Prix de vente</th>
													<th>done by:</th>
                                                    <th>on date:</th>
													<th>Actions</th>
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
                                                    <td>{{detail.user_id}}</td>
                                                    <td>{{detail.created_at	}}</td>
													<td>
														<button class="btn-sm btn btn-primary">View</button>
													</td>
                                                    
                                                    
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
import $ from "jquery";
export default {
    data()
    {
        return{
            detailsorder:[],
        }
    },
    mounted(){
        this.fetchData()
    },
    methods:{
		initialize()
        {
            setTimeout(() => {
                    $('#datatable').dataTable( {
                     paging: true,
                    searching: true
                  } );
      
        });
    },
        fetchData() {
            axios.get(this.$store.state.baseurl + "getorderdetail",
          this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
        axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.detailsorder =resp.data
				this.initialize()
               // this.$store.state.typeClients=resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },

    },

}
</script>

<style scoped>
th{
	padding:10px;
	text-align: center;
}
td{
	text-align: center;
}

</style>