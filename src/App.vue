<template>
   <div>
      <index v-if="isLoggedIn"/>
       <Loginview v-else/>
   </div>

</template>

<script>
export default {
   components:{
      
      'Loginview':require("@/views/loginView.vue").default,
      'index':require("@/views/IndexPageview.vue").default
      
   },
   computed: {
      isLoggedIn: function() { return this.$store.getters.user}
    },
    mounted(){
     this.$store.commit("initialize")
 },


}
</script>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>