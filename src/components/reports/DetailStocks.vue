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
                            <button class="btn btn-sm btn-dark mb-4" ><font-awesome-icon icon="fa-solid fa-print" @click="print('printMe')"/></button>
                            <div class="mb-4">
                                        <input type="date" v-model="dateT">

                                    </div>
							<div class="card" id="printMe">
								<div class="card-header d-flex" >
									<h4 class="card-title">Rapport du: {{  dateT }}</h4>  
                                   
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
                                                <tr v-for="pro in result" :key="pro.id">
                                                   <td scope="col">{{ pro.product_name }}</td>
                                                   <td>
                                                     <div v-if="  dateT >= (pro.date_created.substr(0, 10))">
                                                
                                                           {{ pro.stinit}}
                                                    </div>
                                                    
                                       
                                                    </td>
                                                   <td>{{  pro.vente }}</td>
                                                   <td>
                                                   
                                                     {{  pro.reception }}

                                                   </td>
                                                   <td >
                                                    <div v-if="(pro.date_created.substr(0, 10))<=dateT">
                                                    
                                                            {{  pro.stf }}
                                                    </div>

                                                    
                                                 <!---<div v-show="(pro.updated_at.substr(0, 10))!==dateT  || (pro.updated_at)==null">
                                                            {{  pro.plein }}
                                                    </div>-->
                                                    
                                           
                                                   

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
            result: [ ]
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
                this.a=[]
                 this.b=[]
                this.saveInformation()
            },
       },
       computed:
       {
         
          initialstock:function()
          {
            return this.stockinitial;
          },
          finalstock: function()
          {
            return this.stockfinal;
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
            

                this.stockfinal = [...new Map(this.b.map(item =>
                                 [item.id, item])).values()];
                this.stockinitial = Object.values(this.a.reduce((acc, d) => (!acc[d.id] ? { ...acc, [d.id]: d } : acc), {}));
    
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


                        let result=[]
                this.result=[]
                this.products.forEach(element => {
                    this.result.push({id:element.product_id,stinit:element.plein,stf:element.plein,vente:"",reception:"",product_name:element.products.name,date_created:element.date})
                   // result.push({id:element.product_id,stinit:element.plein,stf:element.plein,vente:"",reception:"",product_name:element.products.name})
                 
                });
                
                this.result.forEach(element => {
                    this.stockinitial.forEach(element1 => {
                        
                                       
                            if(element1.id==element.id )
                        {
                            element.stinit=element1.stockinitial 
                        }  
                    });
                    this.stockfinal.forEach(element3 => {
                            if(element3.id==element.id)
                        {
                           
                            element.stf=element3.stockfinal
                                
                            
                        }

                        });
                       this.ventes.forEach(element4 => {
                        if(element4.id==element.id)
                        {
                            element.vente=element4.vente

                        }
                   
                    });
                     this.receptions.forEach(element5 => {
                        if(element5.id==element.id)
                        {
                            element.reception=element5.reception

                        }
                });
                    
                
                    
                });
                console.log(this.result)
                console.log(result)
     
            
          
           
          
  
                

        }).catch(err=>{
            console.log(err)
        })

    },
    print(element_id, title="Document") {
            const prtHtml = document.getElementById(element_id).innerHTML;
                // Get all stylesheets HTML
                let stylesHtml = '';
                for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                    stylesHtml += node.outerHTML;
                }
                
                // Open the print window
                const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
                
                WinPrint.document.write(`<!DOCTYPE html>
                <html>
                <head>
                    <title>${title} </title>
                    ${ stylesHtml }
                </head>
                <body>
                    ${ prtHtml }
                </body>
                </html>`);
                
               WinPrint.document.close();
                WinPrint.focus();
                WinPrint.print();

        },
 

    },
    

}
</script>

<style>



</style>