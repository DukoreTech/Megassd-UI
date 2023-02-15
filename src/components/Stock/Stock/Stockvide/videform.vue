<template>
   <div class="form">
    <div class="d-flex">
      <span class="mx-auto h3 title">Stock Vides</span>
      <span @click="close" class="h2 close ">x</span>
    </div>
  <span class="d-none">{{$store.state.vides}}{{$store.state.IdEditvide}}{{$store.state.newvide}}</span>
    <!-- retrieve data -->
   <div class="col-12 mt-2">
        <form @submit.prevent="saveInformation">
          <div>
            <label for="name">
                <input type="text" required="required" id="name" placeholder="Nom" v-model="form.name">
                <span>Nom stock</span>
            </label>
            <div>{{ errors?.name }}</div>
          </div>
          <div>
                  <div >products</div>
                  <div class="mt-1">

                    <VueMultiselect
                     v-model="form.products"
                     :options="options"
                     :multiple="true"
                     :close-on-select="true"
                     placeholder="Pick some"
                     label="name"
                     track-by="id"
                    />

                 
                 

                    
                

                  </div>
              </div>
          
          <div>
            <label for="nombre_bouteille">
                <input type="number" required="required" id="nombre_bouteille" placeholder="Nombres des Bouteilles" v-model="form.quantite">
                <span>Quantité</span>
             </label>
             <div>{{ errors?.nombre_bouteille }}</div>
          </div>   
          <div class="d-flex justify-content-around">
            <button type="submit" :disabled="loading" class="btn btn-sm btn-danger" >
              <div v-if="loading" class="d-flex justify-content-center mx-2">
						       <span class="">Loading...</span>
                         <div class="spinner-border" role="status">
                         </div>
              </div>
              <span v-if="!loading">{{saveEditBtn}}</span>
            </button>
            <button type="reset" :disabled="loading" v-if="saveEditBtn=='Ajouter'" class="btn btn-sm btn-primary" >vider</button>
          </div>
          </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import api from '../../../../../api'

import VueMultiselect from 'vue-multiselect'
   
export default {
  components: { VueMultiselect },
   
    data(){
        return{
            form:{
              products:[],
                name:"",
                quantite:"",
                
            },
            

            products:[],
            value:[],
            vides:[],
            value: null,
            options: [],
    
            saveEditBtn:"",
            
        }
    },
    mounted(){
        this.getproducts()
        console.log(this.options)

    },
    watch:{

      "$store.state.IdEditvide"(a){
    console.log(a)
    if(this.$store.state.IdEditvide==null){
      //this.getuser()
         this.form={};
         this.saveEditBtn="new"

        }else{
          this.saveEditBtn="Modifier"
            this.form.name=this.$store.state.vides.name;
           // this.form.products=this.$store.state.vides.products;
            this.form.quantite=this.$store.state.vides.quantite;
           
        }

  },
     
     "products"(val){
 //console.log(val)
 this.address=val
 val.forEach(element => {
   this.options.push({id:element.id,name:element.name})
 });
 
},

 },
    methods:{
      addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    },
        close(){
      this.$emit('close')
    },
        getproducts() {
            api.get("products")
            .then(resp => {
                this.products = resp.data
            })
            .catch(err => {
                console.error(err)
            })
        },
        saveInformation() {
          if (this.form["products_id","quantite","name"]=="") return;
    
           if(this.$store.state.IdEditvide==null){
                 
            api.post(
              "vides",
              this.form
            )
            .then((resp) => {
              this.loading=false
              this.vides= resp.data;
           //   this.getuser()
              this.form = { name:"",products_id:"",quantite:""} 
             
              Swal.fire({
               icon: 'success',
               title: 'Ajouter',
               text: 'Enregister avec succès',  
              });
            })
            .catch((err) => {
              this.loading=false
              console.error(err.response.data.errors);
              this.errors = err.response.data.errors;
            });
           }else{
            this.loading=true
             api.patch("vides/"+this.$store.state.IdEditvide,
              this.form )
            .then((resp) => {
              this.vides = resp.data;
              Swal.fire({
               icon: 'success',
               title: 'Modification',
               text: 'Modification réussi!',  
              });
          this.$emit('close')
             })
            .catch((err) => {
              this.loading=false
              console.error(err.response.data.errors);
              this.errors = err.response.data.errors;
            });
    
           }
     
        },


    },
    
   


}
</script>

<style  scoped src="@/assets/css/form.css">


</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>