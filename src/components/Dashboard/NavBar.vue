<template>
     
<div>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light shadow  layout-navbar-fixed">

    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button">
                <font-awesome-icon icon="fa-solid fa-bars"/></a>
        </li>

    </ul>
     <ul class="navbar-nav " id="showTitle">
        <li class="nav-item">    
            <span  class="nav-link">
            <span class="brand-text font-weight-light h5">MEGA SSD</span>
            </span>
        </li>    
    </ul>

    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown" id="profileDrop">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img class="rounded-circle  mx-auto img " src="@/assets/user.png">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small mr-2">{{username}}</span>                        
                </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li>

                    <router-link :to="{name:'Profile'}" class="dropdown-item">
                        <font-awesome-icon icon="fa-solid fa-user"/>
                        Mot de passe
                        </router-link> 
                </li>

                <li>
                    <router-link to="" @click="logout" class="dropdown-item">
                        <font-awesome-icon icon="fa-solid fa-sign-out-alt"/>
                        Déconnexion
                    </router-link> 
                </li>
            </ul>
        </li>
    </ul>
  </nav>
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
    margin-right: 10px;
}
#showTitle{
  display:none;
}
@media (max-width:900px){
  
#showTitle{
  display:block;
}
}
</style>