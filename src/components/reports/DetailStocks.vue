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
                                                    <td>{{(detail.date.substr(0, 10))}}</td>
                                                    
                                                    
                                                    
                                                    
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
                                            <tbody v-if="stokD.length!=0">
                                                <tr v-for="pro in products" :key="pro.id">
                                                   <td scope="col">{{ pro.products.name }}</td>
                                                   <td>
                                                <div v-show="(pro.updated_at.substr(0, 10))==dateT">
                                                    <div  v-for="det in stockinitial"  :key="det.id" >
                                                        <div v-if="det.id === pro.product_id" :exist=true>
                                                           {{  det.stockinitial }}
                                                        </div>     
                                                    </div>
                                                </div>
                                                    <div v-show="(pro.updated_at.substr(0, 10))!==dateT  || (pro.updated_at)==null">
                                                            {{  pro.plein }}
                                                    </div>
                                       
                                                   </td>
                                                   <td>
                                                    <div v-for="det in ventes" :key="det.id">
                                                        <span v-if="det.id == pro.product_id">
                                                            {{  det.vente }}

                                                        </span>
                                                    </div>

                                                   </td>
                                                   <td>
                                                    <div v-for="det in receptions" :key="det.id">
                                                        <span v-if="det.id == pro.product_id" >
                                                            {{  det.reception }}

                                                        </span>
                                     
   
                                                    </div>

                                                    
                                                   </td>
                                                   <td>
                                                    <div v-show="(pro.updated_at.substr(0, 10))==dateT">
                                                    <div v-for="det in stockfinal" :key="det.id">
                                                        <span v-if="det.id == pro.product_id " >
                                                            {{  det.stockfinal }}

                                                        </span>
   
                                                    </div>
                                                    </div>
                                                    <div v-show="(pro.updated_at.substr(0, 10))!==dateT  || (pro.updated_at)==null">
                                                            {{  pro.plein }}
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
            exist:false,
            b:[],
            stockinitial:[],
            stockfinal:[],
            ventes:[],
            receptions:[],
            sample:[],
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
                this.a["id","stockinitial"]=""
                 this.b["id","stockfinal"]=""
                this.saveInformation()
            },
       },
       computed:
       {
          stockslist :function()
          {
            this.products.forEach(element => {
                
                stockinitial.forEach(element1 => {

                    stockfinal.forEach(element2 => {

                        if(element1.id==element.product_id && element2.id==element.id)
                        {
                            this.sample.push({id:element.product_id,name:element.product_name,si:element1.stockinitial,sf:element2.stockfinal})

                        }
                        
                    });
                    
                });
                
            });
            return stockslist;


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
            let c=[]
                let d=[]

            this.stokD.forEach(element => {
                
                //let a=[]
                this.products.forEach(element1 => {

                    
                    if(element1.id==element.product_id)
                    {

                        this.a.push({stockinitial:element.stock_quantite_initial,id:element1.id})
                        this.b.push({stockfinal:element.quantite_actuel,id:element1.id})
                        if(element.activity_realise=="VENTE")
                        {
                            c.push({id:element1.id,vente:element.quantite_sortie})

                            
                        }
                        else if(element.activity_realise=="Achats")
                        {
                            d.push({id:element1.id,reception:element.quantite_entre})

                        }
                    }
                  
                });
                
                
            });

            var ventes = c.reduce(function(acc, val){
                     var o = acc.filter(function(obj){
                         return obj.id==val.id;
                     }).pop() || {id:val.id, vente:0};
                     
                     o.vente += val.vente;
                     acc.push(o);
                     return acc;
               },[]);
               var reception = d.reduce(function(acc, val){
                     var o = acc.filter(function(obj){
                         return obj.id==val.id;
                     }).pop() || {id:val.id, reception:0};
                     
                     o.reception += val.reception;
                     acc.push(o);
                     return acc;
               },[]);
               this.ventes = ventes.filter(function(itm, i, a) {
                            return i == a.indexOf(itm);
                        });
               this.receptions=reception.filter(function(itm, i, a) {
                            return i == a.indexOf(itm);
                        });
          /*  const uniqBy = (arr, key) => Object.values(
            arr.reduce((a, c) => {
              a[c[key]] = a[c[key]]?.stockinitial > c.stockinitial
                ? a[c[key]]
                : c
              return a
            }, {}))*/

         

           /* const uniqbyf=
            (arr, key) => Object.values(
            arr.reduce((a, c) => {
              a[c[key]] = a[c[key]]?.stockfinal < c.stockfinal
                ? a[c[key]]
                : c
              return a
            }, {}))*/

          //  this.stockinitial= uniqBy(this.a, 'id')

          



            this.stockfinal = [...new Map(this.b.map(item =>
                             [item.id, item])).values()];
            this.stockinitial = Object.values(this.a.reduce((acc, d) => (!acc[d.id] ? { ...acc, [d.id]: d } : acc), {}));
             
            //console.log(this.ventes)
            //console.log(this.receptions)
          //  console.log(this.stockfinal)
            console.log(this.stockinitial)
            console.log(this.a)
           
          
  
                

        }).catch(err=>{
            console.log(err)
        })

    },
 

    },

}
</script>

<style>



</style>