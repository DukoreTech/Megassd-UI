<template>
    <div>
            <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ml-4 w-sm-20 " id="accordionSidebar">
             <li class="nav-item my-4">
                <div class="text-center">
                    <img class="rounded-circle w-25 h-25 mx-auto p-2 " src="@/assets/logo.png">
                    <span class="Title" >MEGA</span>
                </div>        
            </li>
            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item">           
                  <router-link :to="{name:'Dashboard'}" class="nav-link" >
                        <font-awesome-icon icon="fa-solid fa-tachometer-alt" class="icon"/> 
                        <span class="ml-2 label"> Tableau de Bord </span>
                </router-link> 
            </li>
            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Nav Item -User -->
            <li class="nav-item">
                <div class="mb-3" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                     <div class="d-flex justify-content-between">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-user" class="icon" />
                            <span class=" ml-2 label "> Utilisateurs</span>
                         </span>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapseExample">
                        <div class="bg-light py-2 px-3 collapse-inner rounded d-block">
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
                <div class="mb-3 link" data-bs-toggle="collapse" data-bs-target="#collapseClients" aria-expanded="false" aria-controls="collapseClients">
                     <div class="d-flex justify-content-between">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-users-between-lines" class="icon" />
                            <span class=" ml-2 label "> Clients</span>
                         </span>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapseClients">
                        <div class="bg-light py-2 px-3 collapse-inner rounded d-block">
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
                <div class="mb-3 link" data-bs-toggle="collapse" data-bs-target="#collapstock" aria-expanded="false" aria-controls="collapstock">
                     <div class="d-flex justify-content-between">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-cart-plus" class="icon" />
                            <span class=" ml-2 label "> Stock </span>
                         </span>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapstock">
                        <div class="bg-light py-2 px-3 collapse-inner rounded d-block">
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
                           <router-link :to="{name:'TypeStock'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseStock"
                             aria-expanded="true" aria-controls="collapseStock">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Type de Stock
                            </router-link>  
                        </div>
                    </div> 
    
            </li>

            <!-- Nav Item - Reception -->
              <hr class="sidebar-divider">
                 <li class="nav-item">
                <div class="mb-3 link" data-bs-toggle="collapse" data-bs-target="#collapReception" aria-expanded="false" aria-controls="collapReception">
                     <div class="d-flex justify-content-between">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-cart-plus" class="icon" />
                            <span class=" ml-2 label "> Reception </span>
                         </span>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapReception">
                        <div class="bg-light py-2 px-3 collapse-inner rounded d-block">
                             <router-link :to="{name:'Produit'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseReception"
                                aria-expanded="true" aria-controls="collapseReception">
                                <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                                  Produit 
                             </router-link>          
                           <router-link :to="{name:'Stock'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseReception"
                             aria-expanded="true" aria-controls="collapseReception">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Stock
                            </router-link>  
                           <router-link :to="{name:'TypeStock'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseReception"
                             aria-expanded="true" aria-controls="collapseReception">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Type de Stock
                            </router-link>  
                        </div>
                    </div> 
    
            </li>

            <!-- Nav Item - Vente -->
              <hr class="sidebar-divider">
                 <li class="nav-item">
                <div class="mb-3 link" data-bs-toggle="collapse" data-bs-target="#collapVente" aria-expanded="false" aria-controls="collapVente">
                     <div class="d-flex justify-content-between">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-cart-plus" class="icon" />
                            <span class=" ml-2 label "> Vente </span>
                         </span>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapVente">
                        <div class="bg-light py-2 px-3 collapse-inner rounded d-block">
                             <router-link :to="{name:'Produit'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseVente"
                                aria-expanded="true" aria-controls="collapseVente">
                                <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                                  Produit 
                             </router-link>          
                           <router-link :to="{name:'Stock'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseVente"
                             aria-expanded="true" aria-controls="collapseVente">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Stock
                            </router-link>  
                           <router-link :to="{name:'TypeStock'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseVente"
                             aria-expanded="true" aria-controls="collapseVente">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Type de Stock
                            </router-link>  
                        </div>
                    </div> 
    
            </li>

            <!-- Nav Item - Perte -->
              <hr class="sidebar-divider">
                 <li class="nav-item">
                <div class="mb-3 link" data-bs-toggle="collapse" data-bs-target="#collapPerte" aria-expanded="false" aria-controls="collapPerte">
                     <div class="d-flex justify-content-between iconBetween">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-cart-plus" class="icon" />
                            <span class=" ml-2 label "> Perte </span>
                         </span>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class=" iconAngle mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapPerte">
                        <div class="bg-light py-2 px-3 collapse-inner rounded d-block">
                             <router-link :to="{name:'Produit'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapsPerte"
                                aria-expanded="true" aria-controls="collapsPerte">
                                <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                                  Produit 
                             </router-link>          
                           <router-link :to="{name:'Stock'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapsPerte"
                             aria-expanded="true" aria-controls="collapsPerte">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Stock
                            </router-link>  
                           <router-link :to="{name:'TypeStock'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapsPerte"
                             aria-expanded="true" aria-controls="collapsPerte">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             Type de Stock
                            </router-link>  
                        </div>
                    </div> 
    
            </li>
             <hr class="sidebar-divider">

            <!-- Nav Item - vente -->
             <li class="nav-item">
                           
                    

             </li>
           
        </ul>
        <!-- End of Sidebar -->
    </div>


</template>

<script>
export default {

}
</script>

<style scoped>
.link{
    cursor: pointer;
}
span,.icon,.iconAngle{
    color: white;
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