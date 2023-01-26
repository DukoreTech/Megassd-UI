<template>

<div class="hold-transition sidebar-mini layout-fixed">
   <div class="wrapper ">
         <navbar/>        
         <sidebar/>
       <div class="content-wrapper">
          <router-view/>
       </div>   
  </div>
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
 /* #sideBar{
  min-height: 710px;
  width: 227px;
  background: rgb(60, 74, 94);
} */

</style>