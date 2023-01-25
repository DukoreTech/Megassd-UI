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
     console.log(this.$store.getters.token)
     
 },


}
</script>

<style>

#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50; 	
}



th{
    padding:10px;
	text-align: center;
    text-transform: capitalize;
    text-align: center;
    font-size: 13px;
    font-weight: bold;
        
    }
    td{
        text-align: center;
        font-size: 16px;  
        
    }
    @media (min-width: 480px) {
  .table td:before {
    display: none;
  }
}

@media (min-width: 480px) {
    .table th, .table td {
  text-align: center;
}
  .table th, table td {
    display: table-cell;
    padding: .25em .5em;
  }
  .table th:first-child, .table td:first-child {
    padding-left: 0;
  }
  .table th:last-child, .table td:last-child {
    padding-right: 0;
  }
}



h1 {
  font-weight: normal;
  letter-spacing: -1px;
  
}

.table {
  border-radius: .4em;
  overflow: hidden;
}

.table th, .table td {
  margin: .3em 1em;
}
@media (min-width: 480px) {
  .table th, table td {
    padding: 0.2em !important;
  }
}

</style>