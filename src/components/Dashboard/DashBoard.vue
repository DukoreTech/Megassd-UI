<template>
 <div class="page-wrapper">
			
            <div class="content container-fluid ">
                
                <!-- Page Header -->
                <div class="page-header">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3 class="page-title">Bienvenue à <span class="font-weight-bolder"> Mega Mugere SSD </span></h3>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item active">Tableau de Bord</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- /Page Header -->

                <div class="row mb-3">  
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="dash-widget-header">
                                    <span class="dash-widget-icon text-primary border-primary">
                                        <font-awesome-icon icon="fa-solid fa-cart-flatbed-suitcase" />
                                    </span>
                                    <div class="dash-count">
                                        <h6>{{totalV}} Fbu</h6>
                                    </div>
                                </div>
                                <div class="dash-widget-info">
                                    <h6 class="text-muted">Montant Ventes Totals</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="dash-widget-header">
                                    <span class="dash-widget-icon text-success">
                                        <font-awesome-icon icon="fa-solid fa-money-check-dollar" />
                                    </span>
                                    <div class="dash-count">
                                        <h6>{{totalA}} Fbu</h6>
                                    </div>
                                </div>
                                <div class="dash-widget-info">
                                    <h6 class="text-muted">Montant Achats effectues</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="dash-widget-header">
                                    <span class="dash-widget-icon text-danger border-danger">
                                        <i class="fe fe-money"></i>
                                        <font-awesome-icon icon="fa-solid fa-wine-bottle" />
                                    </span>
                                    <div class="dash-count">
                                        <h6>{{totalP}}</h6>
                                    </div>
                                </div>
                                <div class="dash-widget-info">                                    
                                    <h6 class="text-muted">Produits</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="dash-widget-header">
                                    <span class="dash-widget-icon  border-dark">
                                        <font-awesome-icon icon="fa-solid fa-users" />  
                                    </span>
                                    <div class="dash-count">
                                        <h6>{{totalCl}}</h6>
                                    </div>
                                </div>
                                <div class="dash-widget-info">                                 
                                    <h6 class="text-muted">Clients</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="dash-widget-header">
                                    <span class="dash-widget-icon text-warning border-warning">
                                        <font-awesome-icon icon="fa-solid fa-cart-plus" />
                                    </span>
                                    <div class="dash-count">
                                        <h6>{{Nbvente}}</h6>
                                    </div>
                                </div>
                                <div class="dash-widget-info">
                                    
                                    <h6 class="text-muted">Ventes effectues</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                
                     <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="dash-widget-header">
                                    <span class="dash-widget-icon text-secondary border-secondary">
                                        <font-awesome-icon icon="fa-solid fa-scale-unbalanced-flip" />
                                    </span>
                                    <div class="dash-count">
                                        <h6>{{Nbachat}}</h6>
                                    </div>
                                </div>
                                <div class="dash-widget-info">                                    
                                    <h6 class="text-muted">Achats effectues</h6>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
                <div class="row">
						<div class="col-md-6 d-flex">
						
							<!-- Recent Orders -->
							<div class="card card-table flex-fill">
								<div class="card-header">
									<h4 class="card-title">Achats Journalier </h4>
								</div>
								<div class="card-body">
									<div class="table-responsive">
										<table class="table table-hover table-center mb-0">
											<thead>
												<tr>
													<th>N°</th>
													<th>produits</th>
													<th>quantité</th>
													<th>Montant</th>
												</tr>
											</thead>
											<tbody>
                                              <span v-if="purchase.length==0">Pas d'achats effectué encore</span>
                                                <tr v-for="reception in purchase" :key="reception.id">
                                                    
                                                    <th scope="row">{{ reception.id }}</th>
                                                    <td>{{ reception.products.name }} </td>
                                                    <td>{{ reception.quantity }} </td>                   
                                                    <td>{{ reception.montant_total }} Fbu</td>  
                                                </tr>
											
												
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<!-- /Recent Orders -->
							
						</div>
						<div class="col-md-6 d-flex">
						
							<!-- Feed Activity -->
							<div class="card  card-table flex-fill">
								<div class="card-header">
									<h4 class="card-title">Ventes Journalier</h4>
								</div>
								<div class="card-body">
									<div class="table-responsive">
										<table class="table table-hover table-center mb-0">
											<thead>
												<tr>
                                                    <th>No</th>													
													<th>Produits</th>
													<th>client</th>
                                                    <th>Montant</th>
													<th>A payé</th>													
												</tr>
											</thead>
                                            
											<tbody>
                                                <center><p v-if="sales.length==0"  class=" m-3">Pas de ventes effectué encore</p></center>    
                                                <tr v-for="order in sales" :key="order.id">
                                                    <th scope="row">{{ order.id }}</th>
                                                    <td>
                                                        <div v-for="val in JSON.parse(order.products)" :key="val">
                                                            {{ val.product_name }},
                                                        </div>
                                                    </td>
                                                    <td>{{ order.clients.nom}} </td>
                                                    <td>{{ order.total_amount}} </td>
                                                    <td>{{ order.payed_amount}} </td>
                                                    
                                                    
                                                </tr>
												
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<!-- /Feed Activity -->
							
						</div>
					</div>

              
              
                
            </div>			
        </div>
</template>

<script>
//import axios from 'axios'
import api from "../../../api";

export default {
    data()
    {
        return{
            dashboard:[ ],
            totalV:'',
            totalA:'',
            totalCl:'',
            totalP:'',
            Nbachat:'',
            Nbvente:'',
            username:'',
            sales:[],
            purchase:[],
            date:new Date().toISOString().slice(0,10)
            
        }
    },
    mounted()
    {
        this.fetchData()
        this.getuser()
        this.gettodaysales()
        this.gettodaypurchase()
        
    },
    methods:{
        fetchData() {
            console.log(this.$store.state.token)
            api.get("dashboard")
            .then(resp => {
                this.dashboard = resp.data
                console.log(this.dashboard)
                this.totalA=this.dashboard.montant_total
                this.totalCl=this.dashboard.clientsCount
                this.totalP=this.dashboard.produitsCount
                this.totalV=this.dashboard.total_amount
                this.Nbachat=this.dashboard.receptionCount
                this.Nbvente=this.dashboard.ordersCount
               
               // this.$store.state.=resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        getuser(){
      let userlogged= JSON.parse(this.$store.state.user)
      this.username=Object.values(userlogged)[0].name
    },
    gettodaysales(){
        api.get("gettodaysales",{params:{
        dateorder:this.date

      }}).then(resp=>{
            this.sales=resp.data;
        }).catch(err=>{
            console.log(err)

        })

    },
    gettodaypurchase(){
        api.get("gettodaypurchase",{params:{
            dateT:this.date

      }}).then(resp=>{
            this.purchase=resp.data;
        }).catch(err=>{
            console.log(err)
        })

    }

      
       
    }

}
</script>

<style>

.page-wrapper {
	margin-left: 24px;
	padding-top:20px;
	position: relative;
	transition: all 0.4s ease;
}
.page-wrapper > .content {
	padding: 1.875rem 1.875rem 0;
    padding: 20px;
}
.page-header {
	margin-bottom: 1.875rem;
}
.page-header .breadcrumb {
    background-color: transparent;
    color: #6c757d;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0;
    padding: 0;
}
.page-header .breadcrumb a {
	color: #333;
}
.dash-count {
    font-size: 10px;
    
    margin-left: auto;
}
.dash-widget-info h3 {
    margin-bottom: 10px;
}
.dash-widget-header {
    align-items: center;
    display: flex;
    margin-bottom: 15px;
}
.dash-widget-icon {
    align-items: center;
    display: inline-flex;
    font-size: 1.875rem;
    height: 50px;
    justify-content: center;
    line-height: 48px;
    text-align: center;
    width: 50px;
	border: 3px solid;
    border-radius: 50px;
    padding: 28px;
}
.card-chart .card-body {
	padding: 8px;
}
#morrisArea > svg, #morrisLine > svg  {
	width: 100%;
}

</style>