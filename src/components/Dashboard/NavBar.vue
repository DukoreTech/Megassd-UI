<template>
      <!-- <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon rounded-circle border-0"></span>
                </button>
                <div class="navbar-brand">
                    <img class="rounded-circle  mx-auto img " src="@/assets/Produit-brarudi.jpg">
                    MEGA S.S.D
                </div>
                <div class="collapse navbar-collapse justify-content-start " id="navbarNavDropdown">
                <div class="navbar-nav">

                    <div class="nav-item dropdown" id="profileDrop">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                            <span class="mr-2 d-none d-lg-inline text-gray-600 small mr-2">{{username}}</span>                        
                         </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li>

                            <router-link :to="{name:'Profile'}" class="dropdown-item">
                                <font-awesome-icon icon="fa-solid fa-user"/>
                                Motdepasse
                             </router-link> 
                        </li>

                        <li>
                            <router-link to="" @click="logout" class="dropdown-item">
                              <font-awesome-icon icon="fa-solid fa-sign-out-alt"/>
                             deconnexion
                            </router-link> 
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </nav>
  </div> -->


<!-- new div -->
<div>
     <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light shadow  layout-navbar-fixed ">
    <!-- Left navbar links -->
    <ul class="navbar-nav">

      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button">
            <font-awesome-icon icon="fa-solid fa-bars"/></a>
      </li>

    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown" id="profileDrop">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img class="rounded-circle  mx-auto img " src="@/assets/user.png">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small mr-2">{{username}}</span>                        
                </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li>

                <router-link :to="{name:'Profile'}" class="dropdown-item">
                    <font-awesome-icon icon="fa-solid fa-user"/>
                    Motdepasse
                    </router-link> 
            </li>

            <li>
                <router-link to="" @click="logout" class="dropdown-item">
                    <font-awesome-icon icon="fa-solid fa-sign-out-alt"/>
                    deconnexion
                </router-link> 
            </li>
        </ul>
        </li>
    </ul>
  </nav>
  <!-- /.navbar -->
  </div>

</template>

<script>
export default {
    data(){
        return{
            username:'',
            name:'',
            email:'',
            id:'',
        }
    },
    methods:{
        logout: function() {
        this.$store.commit('logout')
        localStorage.removeItem('token')
        this.$router.push('/')
        
      },
      getuser(){
      let userlogged= JSON.parse(this.$store.state.user)
      this.username=Object.values(userlogged)[0].name
      this.id=Object.values(userlogged)[0].id
      this.email=Object.values(userlogged)[0].email
      
    },
   
     
    },
    mounted(){
        this.getuser()
        console.log(this.id)
    }

}
</script>

<style scoped>
 img,.img{
    width:25px;
    height:25px;
}
#profileDrop{
    margin-right: 30px;
}

</style>