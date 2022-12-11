<template>
   <div class="col-md-12">
         <navbar/>
      <span class="d-flex">
         <div class="col-md-2 border" id="sideMenu" >
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
      'navbar':require("@/components/Dashboard/NavBar.vue").default
   }

}
</script>

<style>

</style>