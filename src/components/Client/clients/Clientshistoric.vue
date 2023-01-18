<template>
    <div class="container">
        <div class="page-header">
						<div class="row">
							<div class="col">
								<h3 class="page-title">Client</h3>
								<ul class="breadcrumb">
									<li class="breadcrumb-item"><a href="" @click="$router.push('/')">Dashboard</a></li>
                  <li class="breadcrumb-item"><a href="" @click="$router.push('/Client')">Clients</a></li>
									<li class="breadcrumb-item active">{{ clients.nom }}</li>
								</ul>
							</div>
						</div>
		</div>
        <div class="profile">
        <div class="row">
        <div class="card">
                    <div class="card-body">
            <h4 class="mb-2 text-center">{{ clients.nom }}</h4>
             <hr>
            <div class="historique">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                   <li class="nav-item" role="presentation">
                     <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Orders</button>
                   </li>
                   <li class="nav-item" role="presentation">
                     <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Vides</button>
                   </li>
                   <li class="nav-item" role="presentation">
                     <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Dettes</button>
                   </li>
                </ul>
              
            </div>
          </div>
        </div>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active mt-5" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <div class="table-responsive ">
                    
                        <table v-if="orders!==[0]" class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                            <thead>
                              <tr>                    

                                <th scope="col">order_id</th>
                                <th scope="col">products</th>
                                <th scope="col">TotalAmount</th>
                                <th scope="col">Payed Amount</th>
                                <th scope="col">On Date:</th>
                                <th scope="col">Status</th>
                             </tr>
                            </thead>
                      
                            <tbody>
                              <div v-if="orders.length==0">
                                <p class="text-center vh-30">No order yet</p>
                              </div>                   
                               <tr v-for="order in orders" :key="order.id">
                                <th scope="row">{{ order.id }}</th>
                                  <td>
                                      <div v-for="val in JSON.parse(order.products)" :key="val">
                                          {{ val.product_name }},
                                      </div>
                                      
                                </td>
                                <td>{{ order.total_amount}} </td>
                                <td>{{ order.payed_amount}} </td>
                                <td>{{ order.date_facturation}} </td>                                                                                                                                                                                                       
                                            
                                        
                                <td><span v-if="order.status==1" style="background:turquoise;color:white; padding:4px;">Finished</span><span style="background-color:#495057;color:white ;padding:4px;" 
                                     v-if="order.status==0">Pending</span></td>             
                              </tr>
                            </tbody>
                         </table>
                    </div>
            </div>
            <div class="tab-pane fade mt-5" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
              <div class="table-responsive ">
                    
                    <table v-if="orders!==[0]" class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                        <thead>
                          <tr>                    

                            <th scope="col">number</th>
                                    <th scope="col">order Id</th>
                                    <th scope="col">product</th>
                                    <!--<th scope="col">Stock</th>--> 
                                    <th scope="col">Quantité depart</th>
                                    <th scope="col">Quantité Restant</th>
                                    <th scope="col">Status</th>
                         </tr>
                        </thead>
                  
                        <tbody>
                          <div v-if="DetteVides.length==0">
                          <p>No debt</p>

                        </div>
                                   <tr v-for="dette in DetteVides" :key="dette.id">
                                    <th scope="row">{{ dette.id }}</th>
                                    <td>{{ dette.order_id }} </td>
                                    <td>{{ dette.products.name }}</td>
                                    <td>{{ dette.quantite_depart }}</td>
                                    <td>{{ dette.reste }} </td>           
                                                  
                                    <td>
                                       <!-- <button class="btn btn-sm btn-danger m-2"  @click="deleteReception(reception.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                        delete</button>-->
                                        <span class="bg-success p-2 text-white" v-if="dette.reste==0">Done</span>
                                        <span class="bg-success p-2 text-white" v-if="dette.reste!==0">pending</span>
                
                                    </td>
                                  </tr>
                                </tbody>
                     </table>
                </div>
            </div>
            <div class="tab-pane fade mt-5" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
              <div class="table-responsive">
                    <table class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                        <thead>                              
                          <tr>                    
                            <th scope="col">Id</th>
                            <th scope="col">order_id</th>
                            <th scope="col">prix payés </th>
                            <th scope="col">montant_en_exces</th>
                            <th scope="col">montant_en_dette</th>
                            <th scope="col">Montant Amenée</th>
                            <th scope="col">montant_rembourse</th>
                            <th scope="col">Status</th>
                         </tr>
                        </thead>  
                        <div v-if="DetteMoney.length==0">
                          <p class="text-center vh-30">No debt</p>

                        </div>                   
                        <tbody>
                           <tr v-for="money in DetteMoney" :key="money.id">
                            <th scope="row">{{ money.id }}</th>
                            <!--<td>{{JSON.parse(money.orders.products)[0].product_name }} </td>-->
                            <td>{{ money.order_id}}</td>
                           <!--<td>{{ reception.stock_id }} </td>--> 
                            <td>{{ money.montant_paye }} </td>            
                            <td>{{ money.montant_en_exces }} </td>            
                            <td>{{ money.montant_en_dette }}</td>            
                            <td>{{ money.montant_amene}}</td>            
                            <td>{{ money.montant_rembourse }}</td>                      
                            <td>
                               <!-- <button class="btn btn-sm btn-danger m-2"  @click="deleteReception(reception.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                delete</button>-->
                                <span class="bg-success p-2 text-white" v-if="money.montant_en_exces==0 && money.montant_en_dette==0">Payed</span>
                                <span class="bg-success p-2 text-white" v-if="money.montant_en_exces!==0 && money.montant_en_dette!==0">pending</span>
                                
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
  
</template>

<script>
import  api from '../../../../api';
export default {
    props:['id','client'],
    data(){
        return{
            
            clients: '',
            address:'',
            typeclient:'',
            orders:[],
            DetteVides:[],
            DetteMoney:[]
        }
       
    },
    mounted()
{
    let clp=JSON.parse(this.client)
    this.clients= clp
    let add=JSON.stringify(clp.adresses)
    this.address=JSON.parse(add)
    console.log(this.address)
    this.getcommands()
    this.getvides()
    this.getargent()

},
methods:{
  getcommands()
  {
    api.get("getcommands",{params:{
      client_id:this.id
      }})
            .then(resp => {
                this.orders = resp.data
               
              })
            .catch(err => {
                console.error(err)
            })
    
  },
  getvides(){
    api.get("getvides",{params:{
      client_id:this.id
      }})
            .then(resp => {
                this.DetteVides = resp.data
               
              })
            .catch(err => {
                console.error(err)
            })
  },
  getargent()
  {
    api.get("getdettemoney",{params:{
      client_id:this.id
      }})
            .then(resp => {
                this.DetteMoney = resp.data
               
              })
            .catch(err => {
                console.error(err)
            })

  }

}

}



</script>

<style>

</style>