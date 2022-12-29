<template>
    <div class="page-wrapper">
                <div class="content container-fluid">

					<!-- Page Header -->
					<div class="page-header">
						<div class="row">
							<div class="col">
								<h3 class="page-title">Stock details</h3>
								<ul class="breadcrumb">
									<li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
									<li class="breadcrumb-item active">stock details</li>
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

									<div class="table-responsive">
										<table class="datatable table table-stripped">
											<thead>
												<tr>
													<th>product_name</th>
													<th>Activity_Realisé</th>
													<th>quantite sortie</th>
													<th>quantite sortie</th>
													<th>quantite_entre</th>
                                                    <th>quantite_actuel</th>
                                                    <th>stock_initial</th>
                                                    <th>on date:</th>
                                                    <th>done by:</th>
													<th>Actions</th>
												</tr>
											</thead>
                                            <tbody>
                                                <tr v-for="detail in detailsstock" :key="detail.id">
                                                    <td>{{detail.product_name}}</td>
													<td>{{detail.activity_realise}}</td>
													<td>{{detail.quantite_sortie}}</td>
													<td>{{detail.quantite_sortie}}</td>
													<td>{{detail.quantite_entre}}</td>
                                                    <td>{{detail.quantite_actuel}}</td>
                                                    <td>{{detail.stock_quantite_initial	}}</td>
                                                    <td>{{detail.created_at	}}</td>
                                                    <td>{{detail.user_id	}}</td>
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
export default {
    data()
    {
        return{
            detailsstock:[],
        }
    },
    mounted(){
        this.fetchData()
    },
    methods:{
        fetchData() {
            axios.get(this.$store.state.baseurl + "getstockdetails",
          this.form,axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`,
        axios.defaults.headers.common['Accept'] = `Application/json`)
            .then(resp => {
                this.detailsstock = resp.data
               // this.$store.state.typeClients=resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },

    },

}
</script>

<style>
th{
	padding:10px;
	text-align: center;
}
td{
	text-align: center;
}

</style>