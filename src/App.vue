<template>
   <div>
      <index v-if="isLoggedIn"/>
       <Loginview v-else/>
   </div>
</template>
<script>
import '../axios'
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
     console.log(this.$store.getters.token)
 },


}
</script>

<style scoped>

#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50; 	
  background: linear-gradient(90deg, #C7C5F4, #776BCC); 
}


</style>