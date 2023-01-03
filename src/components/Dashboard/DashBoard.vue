<template>
 <div class="page-wrapper">
			
            <div class="content container-fluid ">
                
                <!-- Page Header -->
                <div class="page-header">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3 class="page-title">Welcome Admin!</h3>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item active">Dashboard</li>
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
                                        <i class="fe fe-users"></i>
                                    </span>
                                    <div class="dash-count">
                                        <h6>{{totalV}}Fbu</h6>
                                    </div>
                                </div>
                                <div class="dash-widget-info">
                                    <h6 class="text-muted">Total sales</h6>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-primary w-50"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="dash-widget-header">
                                    <span class="dash-widget-icon text-success">
                                        <i class="fe fe-credit-card"></i>
                                    </span>
                                    <div class="dash-count">
                                        <h6>{{totalA}}</h6>
                                    </div>
                                </div>
                                <div class="dash-widget-info">
                                    
                                    <h6 class="text-muted">Montant Achats effectues</h6>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-success w-50"></div>
                                    </div>
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
                                    </span>
                                    <div class="dash-count">
                                        <h6>{{totalP}}</h6>
                                    </div>
                                </div>
                                <div class="dash-widget-info">
                                    
                                    <h6 class="text-muted">products</h6>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-danger w-50"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="dash-widget-header">
                                    <span class="dash-widget-icon text-warning border-warning">
                                        <i class="fe fe-folder"></i>
                                    </span>
                                    <div class="dash-count">
                                        <h6>{{totalCl}}</h6>
                                    </div>
                                </div>
                                <div class="dash-widget-info">
                                    
                                    <h6 class="text-muted">Client</h6>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-warning w-50"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="dash-widget-header">
                                    <span class="dash-widget-icon text-warning border-warning">
                                        <i class="fe fe-folder"></i>
                                    </span>
                                    <div class="dash-count">
                                        <h6>{{Nbvente}}</h6>
                                    </div>
                                </div>
                                <div class="dash-widget-info">
                                    
                                    <h6 class="text-muted">Ventes effectues</h6>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-warning w-50"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                     <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="dash-widget-header">
                                    <span class="dash-widget-icon text-warning border-warning">
                                        <i class="fe fe-folder"></i>
                                    </span>
                                    <div class="dash-count">
                                        <h6>{{Nbachat}}</h6>
                                    </div>
                                </div>
                                <div class="dash-widget-info">
                                    
                                    <h6 class="text-muted">Achats effectues</h6>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-warning w-50"></div>
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
import axios from 'axios'

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
            


        }
    },
    mounted()
    {
        this.fetchData()
        
        
    },
    methods:{
        fetchData() {
            console.log(this.$store.state.token)
            axios.get(this.$store.state.baseurl + "dashboard",
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.getters.token}`,
          axios.defaults.headers.common['Accept'] = `Application/json`)
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
      
       
    }

}
</script>

<style>

.page-wrapper {
	margin-left: 24px;
	padding-top: 60px;
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