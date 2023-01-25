<template>
  <div class="content">
    <div class="d-md-flex m-3 justify-content-between" >
                <button class="btn btn-info mt-2 ml-5 ajout" @click="modalActive = true,$store.state.IdEditClient=null">
                    <font-awesome-icon icon="fa-solid fa-plus-circle" />
                    Ajouter Client
                  </button>
               
             </div>  

                <modal-component :modalActive="modalActive" @close="modalActive = !modalActive ,fetchData()">
                    <add-form @close="modalActive = !modalActive,fetchData()"/>
                </modal-component>
<section class="">
  <div class="container py-5 h-50">
    <div class="row  align-items-center h-50">
      <div class="col-md-4 col-xl-4 mb-5" v-for="client in clients" :key="client.id">

        <div class="card" style="border-radius: 15px;">
          <div class="card-body">
            <div class="text-center " style="margin-top:-50px;">
              <img src="@/assets/user.png"
                class="rounded-circle img-fluid m-2" style="width: 100px;margin-top:-60px; border:1px solid aliceblue;" />
            </div>
            <h4 class="mb-2 text-center">{{ client.nom }}</h4>
             <hr>
        
            <div class="d-flex justify-content-around  mt-5 mb-2">
              <div>
                <p class="text-muted mb-0">Client ID:</p>
                <p class="text-muted mb-0">client Type:</p>
                <p class="text-muted mb-0">client Address:</p>
                <p class="text-muted mb-0">Phone Number:</p>
              </div>
              <div>
                <p class="text-muted mb-0">#{{ client.id }}</p>
                <p class="text-muted mb-0">{{  client.type_clients.name }}</p>
                <p class="text-muted mb-0">{{ client.adresses.name  }}</p>
                <p class="text-muted mb-0">{{ client.telephone }}</p>

              </div>

              
            </div>
          </div>
          <div class="cart-footer">
            <div class="d-flex justify-content-center align-items-center">
                <router-link :to="{name:'Clientshistoric',params:{id:client.id,client: JSON.stringify(client)}}" class="btn  btn-success text-white m-2" 
                                        aria-expanded="true" aria-controls="collapseStock"><font-awesome-icon icon="fa-solid fa-eye" /></router-link>
                                        
                
                <button class="btn btn btn-danger m-2"  @click="deleteUser(client.id)"><font-awesome-icon icon="fa-solid fa-trash"/>
                 
                </button>
                <button class="btn btn btn-primary m-2" @click="modalActive = true,editUser(client,client.id)" >
                <font-awesome-icon icon="fa-solid fa-edit"/>
                </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</section>

</div>
</template>

<script>
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";
import Swal from 'sweetalert2'
import ModalComponent from '@/components/Global/ModalComponent';
import AddForm from './AddClientForm.vue';
import  api from '../../../../api'
export default {
    components: { ModalComponent, AddForm },
    data() {
        return{
            modalActive: false,
            search:'',
            clients : this.$store.state.clients
        }
    },
    mounted(){
        this.fetchData()
    },
    computed:{
        /*searchEvery(){
            let val="";
            return this.clients.filter(val.includes(this.search))
            }*/
            clients(){
                return this.$store.state.clients
            }
            
    },
    watch: {
        clients(val) {
              console.log(val)
              $('#datatable').DataTable().destroy();
              this.$nextTick(()=> {
                $('#datatable').DataTable()
              });
            }
       },
    methods:{
        fetchData() {
            api.get("client",this.form)
            .then(resp => {
                this.clients = resp.data
                this.$store.state.clients=resp.data    
            })
            .catch(err => {
                console.error(err)
            })
        },
        deleteUser(id) {
            Swal.fire({
             title: 'vous etes sure de vouloir supprimer ces informations',
             showCancelButton: true,
             confirmButtonText: 'supprimer',
            // denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {

            api.delete(this.$store.state.baseurl + "client/" + id)
            .then(resp => {
                this.clients = resp.data
                Swal.fire('suppression avec succès', '', 'success')
                this.fetchData()
            })
            .catch(err => {
                console.error(err)
                Swal.fire('une erreur est survenue veuillez réessayer plus tard', '', 'error')
                
            })
        }
    });
            
        },
        searchInArray(arrayList, searchText) {
            //Methode pour faire une rechercher dans le tableau
            if(Array.isArray(arrayList) ){
                return arrayList.filter(
                e => JSON.stringify(e)
                         .toLowerCase()
                         .includes(searchText.toLowerCase())
            )
            }
            return arrayList
            

        },

        editUser(client,id){
        this.$store.state.IdEditClient=id
        this.$store.state.clients=client
        
        }
    }
    
}
</script>

<style>
.pat-widget-profile .pro-widget-content {
	padding: 0 0 20px;
}
.pat-widget-profile .booking-date li {
	font-size: .875rem;
}
.pat-widget-profile .booking-date li span {
    font-size: .875rem;
}

.patient-info {
	margin-top: 15px;
}
.patient-info ul {
    padding: 0;
    list-style: none;
	font-size: .875rem;
	margin: 0;
}
.patient-info ul li {
    position: relative;
    font-size: .875rem;
    font-weight: 500;
    color: #272b41;
    text-transform: capitalize;
}
.patient-info ul li + li {
	margin-top: 15px;
}
.patient-info ul li i {
	width: 18px;
}
.patient-info ul li span {
    color: #757575;
    float: right;
    font-weight: 400;
}
.profile-sidebar {
    background-color: #fff;
	border: 1px solid #f0f0f0;
    border-radius: 4px;
	margin-bottom:30px;
	overflow: hidden;
}
.pro-widget-content{
    border-bottom: 1px solid #f0f0f0;
    padding: 20px;
    text-align: center;
}

.profile-info-widget {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
    text-align: left;
}
.profile-info-widget .img {
    margin-right: 15px;
}
.profile-info-widget .img img {
    border-radius: 10px;
    height: 90px;
    width: 90px;
    object-fit: cover;
}
.profile-det-info {
	overflow: hidden;
}
.profile-det-info h3 {
	font-size: 17px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}


</style>