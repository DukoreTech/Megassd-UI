<template>
    <div class="container">
        <div class="page-header">
						<div class="row">
							<div class="col">
								<h3 class="page-title">Client</h3>
								<ul class="breadcrumb">
									<li class="breadcrumb-item"><a href="" @click="$router.push('/')">Dashboard</a></li>
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
                     <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Dettes</button>
                   </li>
                   <li class="nav-item" role="presentation">
                     <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Vides Non retourné</button>
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
                                <th scope="col">Actions</th>
                             </tr>
                            </thead>
                      
                            <tbody>
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
                                            
                                        
                                <td>
                                    <button class="btn btn-sm btn-danger m-2"  @click="deleteUser(client.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                    supprimer</button>
                                    <button class="btn btn-sm btn-primary" @click="modalActive = true,editUser(client,client.id)" >
                                    Modifier<font-awesome-icon icon="fa-solid fa-edit"/>
                                    </button>
                                </td>
                              </tr>
                            </tbody>
                         </table>
                    </div>
            </div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
              <div class="table-responsive ">
                    
                    <table v-if="orders!==[0]" class="table table-bordered  table-striped table-hover text-center" id="datatable" width="100%" cellspacing="0">
                        <thead>
                          <tr>                    

                            <th scope="col">order_id</th>
                            <th scope="col">products</th>
                            <th scope="col">TotalAmount</th>
                            <th scope="col">Payed Amount</th>
                            <th scope="col">On Date:</th>
                            <th scope="col">Actions</th>
                         </tr>
                        </thead>
                  
                        <tbody>
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
                                        
                                    
                            <td>
                                <button class="btn btn-sm btn-danger m-2"  @click="deleteUser(client.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                                supprimer</button>
                                <button class="btn btn-sm btn-primary" @click="modalActive = true,editUser(client,client.id)" >
                                Modifier<font-awesome-icon icon="fa-solid fa-edit"/>
                                </button>
                            </td>
                          </tr>
                        </tbody>
                     </table>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
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
            orders:[]
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
    
  }

}

}



</script>

<style>

</style>