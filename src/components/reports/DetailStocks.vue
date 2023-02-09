<template>
    <div class="page-wrapper">
                <div class="content container-fluid">
                    <loading v-if="isLoading"></loading>

					<!-- Page Header -->
					<div class="page-header">
						<div class="row">
							<div class="col">
								<h3 class="page-title">Détails Stock</h3>
								<ul class="breadcrumb">
									<li class="breadcrumb-item"><a href="" @click="$router.push('/')">Tableau de Bord</a></li>
									<li class="breadcrumb-item active">Détails Stock</li>
								</ul>
							</div>
						</div>
                        <div class="row">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                              <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#detail-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Details Stock</button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#report-tab-pane" type="button" role="tab" aria-controls="report-tab-pane" aria-selected="false">Rapports stocks</button>
                              </li>

                            </ul>

                        </div>
					</div>
					<!-- /Page Header -->
				<div class="tab-content" id="myTabContent">
                    <div class="row tab-pane fade show active" id="detail-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
						<div class="col-sm-12">
							<div class="card">
								<div class="card-header">
									<h4 class="card-title">Stocks</h4>
									
								</div>
								<div class="card-body">

									<div class="table-responsive">
										<table class="table table-bordered  table-striped table-hover text-center dt-responsive nowrap" id="datatable" width="100%" cellspacing="0">
											<thead>
												<tr>
                                                    <th scope="col">Numéro</th>

													<th scope="col">Produit</th>
													<th scope="col">Activité</th>
													<th scope="col">sortie</th>
													<th scope="col">Entrée</th>
                                                    <th scope="col">stock actuel</th>
                                                    <th scope="col">stock initial</th>
                                                    <th scope="col-3">date effectué</th>
                                                    
													
												</tr>
											</thead>
                                            <tbody>
                                                <tr v-for="detail in detailsstock" :key="detail.id">
                                                    <td>{{detail.id}}</td>
                                                    <td>{{detail.product_name}}</td>
													<td>{{detail.activity_realise}}</td>
												
													<td>{{detail.quantite_sortie}}</td>
													<td>{{detail.quantite_entre}}</td>
                                                    <td>{{detail.quantite_actuel}}</td>
                                                    <td>{{detail.stock_quantite_initial	}}</td>
                                                    <td>{{(detail.created_at.substr(0, 10))}}</td>
                                                    
                                                    
                                                    
                                                    
                                                </tr>


                                            </tbody>
											
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
                    <div class="row tab-pane fade" id="report-tab-pane" role="tabpanel" aria-labelledby="report-tab" tabindex="0">
						<div class="col-sm-12">
							<div class="card">
								<div class="card-header" >
									<h4 class="card-title">Rapport</h4>  
								</div>
                                <div class="p-3">
                                        <input type="date" v-model="dateT">

                                    </div>
								<div class="card-body">

									<div class="table-responsive">
										<table class="table table-bordered  table-striped table-hover text-center dt-responsive nowrap" id="dattab" width="100%" cellspacing="0">
											<thead>
                                                
												<tr>
                                                    <th>
                                                      #
                                                    </th>
                                                    <th scope="col">S.I</th>
													<th scope="col">Ventes</th>
													<th scope="col">Receptions</th>
                                                    
													<th scope="col">SF</th>
                                                </tr>

											</thead>
                                            <tbody>
                                                <tr v-for="pro in products" :key="pro.id">
                                                   <td scope="col">{{ pro.products.name }}</td>
                                                   <td>
                                                    <div v-for="det in stockinitial" :key="det.id">
                                                        <span v-if="det.id == pro.product_id">
                                                            {{  det.stockinitial }}

                                                        </span>
                                                

                                                       
                                                    </div>
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
			</div>
  
</template>

<script>
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import api from '../../../api'
import axios from 'axios'
export default {
    data()
    {
        return{
            detailsstock:[],
            isLoading:false,
            products:[],
            dateT:new Date().toISOString().slice(0,10),
            stokD:[],
            a:[],
            b:[],
            stockinitial:[],
            stockfinal:[],

        }
    },
    mounted(){
        this.fetchData()
        this.getproducts()
        this.saveInformation()
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
             
            },
            "dateT"(val){
                console.log(val)
                this.saveInformation()
            }
       },
    methods:{
        
        fetchData() {
            
            this.isLoading=true
            axios.get(this.$store.state.baseurl + "getstockdetails",
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
        getproducts() {
            console.log(this.dateT)
          api.get("stock")
            .then(resp => {
                this.products = resp.data
               
            })
            .catch(err => {
                console.error(err)
            })
        },
        saveInformation(){
        api.get("stockD",{params:{

            dateT:this.dateT
            

      }}).then(resp=>{
            this.stokD=resp.data;
            this.stokD.forEach(element => {
                //let a=[]
                this.products.forEach(element1 => {
                    
                    if(element1.id==element.product_id)
                    {
                        this.a.push({stockinitial:element.stock_quantite_initial,id:element1.id})
                        this.b.push({stockfinal:element.quantite_actuel,id:element1.id})
                    } 
                });
                
                
            });
            

            for (const item of this.a) {
              const isDuplicate = this.stockinitial.find((obj) => obj.id === item.id && obj.stockinitial > item.stockinitial);
              if (!isDuplicate) {
                this.stockinitial.push(item);
              }
            }
            this.b.forEach((el, i) => {
  this.b.forEach((element, index) => {
   
    if (element.id === el.id && element.stockfinal < el.stockfinal) {
      if (!this.stockfinal.includes(el)) this.stockfinal.push(el);
    }
  });
});

                console.log(this.stockfinal)
                console.log(this.stockinitial)
                console.log(this.b)
                

        }).catch(err=>{
            console.log(err)
        })

    }

    },

}
</script>

<style>



</style>