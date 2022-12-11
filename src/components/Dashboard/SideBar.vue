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
            <li class="nav-item ">           
                <font-awesome-icon icon="fa-solid fa-tachometer-alt" class="icon"/> 
                <span class="ml-2 label"> Dashboard </span>
            </li>
            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Nav Item -User -->
            <li class="nav-item">
               <font-awesome-icon icon="fa-solid fa-user" class="icon"/> 
               <span class="ml-2 label"> User </span>  
    
            </li>
            <hr class="sidebar-divider">

            <!-- Nav Item - prduit -->
            <li class="nav-item">
                     
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
span,.icon{
    color: white;
}
#navbar{
    color:white;
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