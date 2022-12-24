<template>
   <div class="col-md-12">
         <navbar/>
      <span class="d-flex">
         <div class="col-md-2 border" id="sideBar" >
            <sidebar/>
         </div>
         <div class="col-md-10">
            <div class="my-3">
               <router-view/>
            </div> 
            <div class="fixed-bottom">
            </div>
         </div>
      </span>

  </div>

</template>

<script>
export default {
   components:{
      'navbar':require("@/components/Dashboard/NavBar.vue").default,
      'sidebar':require("@/components/Dashboard/SideBar.vue").default
   }

}
</script>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
 #sideBar{
  min-height: 710px;
  width: 227px;
  background: rgb(60, 74, 94);
}
</style>