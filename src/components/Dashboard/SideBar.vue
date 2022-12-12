<template>
    <div>
            <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ml-4 w-sm-20 " id="accordionSidebar">
             <li class="nav-item dropdown">
                <div class="text-center">
                    <img class="rounded-circle w-25 h-25 mx-auto p-2 " src="@/assets/logo.png">
                    <span class="label" >MEGA</span>
                </div>        
            </li>
            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item mt-2 ">           
                <font-awesome-icon icon="fa-solid fa-tachometer-alt" class="icon"/> 
                <span class="ml-2 label"> Tableau de Bord </span>
            </li>
            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Nav Item -User -->
            <li class="nav-item">
                <div class="mb-3 link" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                     <div class="d-flex justify-content-between">
                         <span>
                            <font-awesome-icon icon="fa-solid fa-user" class="icon" />
                            <span class=" ml-2 label "> Utilisateurs</span>
                         </span>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class=" icon mt-1" />
                     </div>
                    
                    </div>
                   
                    <div class="collapse" id="collapseExample">
                        <div class="bg-light py-2 px-3 collapse-inner rounded d-block">
                           <router-link :to="{name:'User'}" class="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                             aria-expanded="true" aria-controls="collapseTwo">
                              <font-awesome-icon icon="fa-solid fa-circle-dot"  />
                             User
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
                        <font-awesome-icon icon="fa-solid fa-angle-right" class=" icon mt-1" />
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

            <!-- Nav Item - stock -->
             <li class="nav-item">
                       
             </li>
            <hr class="sidebar-divider">

            <!-- Nav Item - client -->
             <li class="nav-item">
                          
             </li>
             <hr class="sidebar-divider">

            <!-- Nav Item - Perte -->
             <li class="nav-item">
                           
                  
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
span,.icon{
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
   .icon,.label{
       display: block;
       text-align: center;
       margin: auto;
   }
}

@media screen and (max-width:400px) {
   .label{
       display: none;
   }
}


</style>