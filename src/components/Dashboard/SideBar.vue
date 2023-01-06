<template>
    <div>
            <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ml-4 w-sm-20 " id="accordionSidebar">
             
            <!-- Nav Item - Dashboard -->
            <li class="nav-item mt-3">           
                  <router-link :to="{name:'Dashboard'}" class="nav-link" >
                        <font-awesome-icon icon="fa-solid fa-tachometer-alt" class="icon"/> 
                        <span class="ml-2 label"> Tableau de Bord </span>
                </router-link> 
            </li>
            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Nav Item -User -->
            <li class="nav-item">
                <div class=" link" data-bs-toggle="collapse" @click="showArrowUtil" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                     <div class="d-flex justify-content-between">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-user" class="icon" />
                            <span class=" ml-2 label "> Utilisateurs</span>
                         </span>
                         
                        <font-awesome-icon v-if="!isShowarrowUtil" icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                        <font-awesome-icon v-else icon="fa-solid fa-angle-down" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapseExample" data-bs-parent="#accordionSidebar">
                        <div class="bg-light py-2 mt-2 px-3 collapse-inner rounded d-block">
                           <router-link :to="{name:'User'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                             aria-expanded="true" aria-controls="collapseTwo">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Utilisateur
                            </router-link>  
                             <router-link :to="{name:'Role'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                                <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                                  Role 
                             </router-link>          
                        </div>
                    </div> 
    
            </li>
            <hr class="sidebar-divider">

            <!-- Nav Item - clients -->
           <li class="nav-item">
                <div class=" link" data-bs-toggle="collapse" @click="showArrowClients" data-bs-target="#collapseClients" aria-expanded="false" aria-controls="collapseClients">
                     <div class="d-flex justify-content-between">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-users-between-lines" class="icon" />
                            <span class=" ml-2 label "> Clients</span>
                         </span>
                        <font-awesome-icon v-if="!isShowarrowClients" icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                        <font-awesome-icon v-else icon="fa-solid fa-angle-down" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapseClients" data-bs-parent="#accordionSidebar">
                        <div class="bg-light py-2 mt-2 px-3 collapse-inner rounded d-block">
                             <router-link :to="{name:'Client'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseClient"
                                aria-expanded="true" aria-controls="collapseClient">
                                <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                                  Client 
                             </router-link>          
                           <router-link :to="{name:'Adresse'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseClient"
                             aria-expanded="true" aria-controls="collapseClient">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Adresse
                            </router-link>  
                            <router-link :to="{name:'TyClient'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseClient"
                             aria-expanded="true" aria-controls="collapseClient">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Type de client
                            </router-link>  
                        </div>
                    </div> 
    
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">
                 <li class="nav-item">
                <div class="link" data-bs-toggle="collapse" @click="showArrowStock"  data-bs-target="#collapstock" aria-expanded="false" aria-controls="collapstock">
                     <div class="d-flex justify-content-between">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-cart-plus" class="icon" />
                            <span class=" ml-2 label "> Stock </span>
                         </span>
                        <font-awesome-icon v-if="!isShowarrowStock" icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                        <font-awesome-icon v-else icon="fa-solid fa-angle-down" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapstock" data-bs-parent="#accordionSidebar">
                        <div class="bg-light py-2 mt-2 px-3 collapse-inner rounded d-block">
                             <router-link :to="{name:'Produit'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseStock"
                                aria-expanded="true" aria-controls="collapseStock">
                                <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                                  Produit 
                             </router-link>          
                           <router-link :to="{name:'Stock'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseStock"
                             aria-expanded="true" aria-controls="collapseStock">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Stock
                            </router-link>  
                          
                        </div>
                    </div> 
    
            </li>

            <!-- Nav Item - Reception -->
              <hr class="sidebar-divider">
                 <li class="nav-item">
                <div class="link" data-bs-toggle="collapse" @click="showArrowReception" data-bs-target="#collapReception" aria-expanded="false" aria-controls="collapReception">
                     <div class="d-flex justify-content-between">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-cart-plus" class="icon" />
                            <span class=" ml-2 label "> Reception </span>
                         </span>
                        <font-awesome-icon v-if="!isShowarrowReception" icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                        <font-awesome-icon v-else icon="fa-solid fa-angle-down" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapReception" data-bs-parent="#accordionSidebar">
                        <div class="bg-light py-2 mt-2 px-3 collapse-inner rounded d-block">
                             <router-link :to="{name:'lot'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseReception"
                                aria-expanded="true" aria-controls="collapseReception">
                                <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                                  Prix de vente 
                             </router-link>          
                           <router-link :to="{name:'Reception'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseReception"
                             aria-expanded="true" aria-controls="collapseReception">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Reception
                            </router-link>  
                          
                        </div>
                    </div> 
    
            </li>

            <!-- Nav Item - Vente -->
              <hr class="sidebar-divider">
            <li class="nav-item">
                <div class="link" data-bs-toggle="collapse" @click="showArrowVente" data-bs-target="#collapVente" aria-expanded="false" aria-controls="collapVente">
                     <div class="d-flex justify-content-between">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-cart-plus" class="icon" />
                            <span class=" ml-2 label "> Vente </span>
                         </span>
                       <font-awesome-icon v-if="!isShowarrowVente" icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                       <font-awesome-icon v-else icon="fa-solid fa-angle-down" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapVente" data-bs-parent="#accordionSidebar">
                        <div class="bg-light py-2 mt-2 px-3 collapse-inner rounded d-block">
                             <router-link :to="{name:'Commande'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseVente"
                                aria-expanded="true" aria-controls="collapseVente">
                                <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                                  Commande 
                             </router-link>          
                           
                             
                        </div>
                    </div> 
    
            </li>

            <!-- Nav Item - Perte -->
              <hr class="sidebar-divider">
            <li class="nav-item">
                <div class="link" @click="showArrowPerte" data-bs-toggle="collapse" data-bs-target="#collapPerte" aria-expanded="false" aria-controls="collapPerte">
                     <div class="d-flex justify-content-between iconBetween">
                        <span>
                            <font-awesome-icon icon="fa-solid fa-cart-plus" class="icon" />
                            <span class=" ml-2 label "> Perte </span>
                         </span>
                       <font-awesome-icon v-if="!isShowarrowPerte" icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                       <font-awesome-icon v-else icon="fa-solid fa-angle-down" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapPerte" data-bs-parent="#accordionSidebar">
                        <div class="bg-light py-2 mt-2 px-3 collapse-inner rounded d-block">
                             <router-link :to="{name:'Location'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapsPerte"
                                aria-expanded="true" aria-controls="collapsPerte">
                                <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                                  Location 
                             </router-link>          
                           <router-link :to="{name:'Perte'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapsPerte"
                             aria-expanded="true" aria-controls="collapsPerte">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Perte
                            </router-link>  
                           
                        </div>
                    </div> 
                    
    
            </li>
             <hr class="sidebar-divider">

            <!-- Nav Item - report -->
            <li class="nav-item">
                <div class="link" data-bs-toggle="collapse" @click="showArrowReports" data-bs-target="#collapReport" aria-expanded="false" aria-controls="collapVente">
                     <div class="d-flex justify-content-between">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-cart-plus" class="icon" />
                            <span class=" ml-2 label "> Reports </span>
                         </span>
                       <font-awesome-icon v-if="!isShowarrowReports" icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                       <font-awesome-icon v-else icon="fa-solid fa-angle-down" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapReport" data-bs-parent="#accordionSidebar">
                        <div class="bg-light py-2 mt-2 px-3 collapse-inner rounded d-block">
                             <router-link :to="{name:'salesreport'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseVente"
                                aria-expanded="true" aria-controls="collapseVente">
                                <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                                  sales report 
                             </router-link>          
                           <router-link :to="{name:'DetailStocksView'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseVente"
                             aria-expanded="true" aria-controls="collapseVente">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                              stock details
                            </router-link>  
                            <router-link :to="{name:'DetailsStocksView'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseVente"
                             aria-expanded="true" aria-controls="collapseVente">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                              details des vides
                            </router-link> 
                           <router-link :to="{name:'AllinVoiceView'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseVente"
                             aria-expanded="true" aria-controls="collapseVente">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             factures
                            </router-link>  
                        </div>
                    </div> 
    
            </li>
           
        </ul>
        <!-- End of Sidebar -->
    </div>


</template>

<script>
export default {
    data(){
        return{
            isShowarrowUtil : false,
            isShowarrowClients:false,
            isShowarrowStock:false,
            isShowarrowReception:false,
            isShowarrowPerte:false,
            isShowarrowVente:false,
            isShowarrowReports:false
        }
    },
    methods:{
        showArrowUtil(){
            this.isShowarrowUtil = !this.isShowarrowUtil 
            this.isShowarrowClients=false
            this.isShowarrowStock=false
            this.isShowarrowReception=false
            this.isShowarrowPerte=false
            this.isShowarrowVente=false
            this.isShowarrowReports=false
        },
        showArrowClients(){
            this.isShowarrowClients = !this.isShowarrowClients 
            this.isShowarrowUtil=false
            this.isShowarrowStock=false
            this.isShowarrowReception=false
            this.isShowarrowPerte=false
            this.isShowarrowVente=false
            this.isShowarrowReports=false
        },
       showArrowStock(){
            this.isShowarrowStock = !this.isShowarrowStock 
            this.isShowarrowUtil=false
            this.isShowarrowClients=false
            this.isShowarrowReception=false
            this.isShowarrowPerte=false
            this.isShowarrowVente=false
            this.isShowarrowReports=false
        },
         showArrowReception(){
            this.isShowarrowReception = !this.isShowarrowReception 
            this.isShowarrowUtil=false
            this.isShowarrowClients=false
            this.isShowarrowStock=false
            this.isShowarrowPerte=false
            this.isShowarrowVente=false
            this.isShowarrowReports=false
        },
        showArrowVente(){
            this.isShowarrowVente = !this.isShowarrowVente 
            this.isShowarrowUtil=false
            this.isShowarrowClients=false
            this.isShowarrowStock=false
            this.isShowarrowPerte=false
            this.isShowarrowReception=false
            this.isShowarrowReports=false
        },
        showArrowPerte(){
            this.isShowarrowPerte = !this.isShowarrowPerte 
            this.isShowarrowUtil=false
            this.isShowarrowClients=false
            this.isShowarrowStock=false
            this.isShowarrowReports=false
            this.isShowarrowReception=false
            this.isShowarrowVente=false
        },
        showArrowReports(){
            this.isShowarrowReports = !this.isShowarrowReports 
            this.isShowarrowUtil=false
            this.isShowarrowClients=false
            this.isShowarrowStock=false
            this.isShowarrowPerte=false
            this.isShowarrowReception=false
            this.isShowarrowVente=false
        }



    }

}
</script>

<style scoped>
.link{
    cursor: pointer;
}
.label{
    font-size: 13px;
    text-align: center;
}
span,.icon,.iconAngle{
    color: white;
    text-align: center;
}

#navbar{
    color:white;
}
#collapseExample{
    cursor: pointer;
}
li{
    margin: auto 20px;
} 
/* media query */
@media screen and (max-width:980px) {
   .icon,.label,.Title{
       display: block;
       text-align: center;
        margin: auto;
       
   }
   .iconAngle{
       display: none;
   }

   li{
       display: block;
       text-align: center;
       margin: auto;
   }
}

@media screen and (max-width:580px) {
   li .label,img,.iconAngle{
       display: none;
   }

}


</style>