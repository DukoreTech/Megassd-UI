<template>
   <div class="form">
    <div class="d-flex">
      <span class="mx-auto h3 title">Stock Vides</span>
      <span @click="close" class="h2 close ">x</span>
    </div>
  <span class="d-none">{{$store.state.products}}{{$store.state.IdEditProduit}}</span>
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
                    <Multiselect
                      mode="tags"
                      required="required"
                      :close-on-select="false"
                      :searchable="true"
                      value-prop="id"
                      :object="false"
                      v-model="form.products"
                      @select="onSelect"
                      :options="options"
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
import Multiselect from '@vueform/multiselect'
import Swal from 'sweetalert2';
import api from '../../../../../api'


   
export default {
    components: {
      Multiselect,
    },
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
            options:[],
            saveEditBtn:"Enregistrer",
            
        }
    },
    mounted(){
        this.getproducts()
        console.log(this.options)

    },
    watch:{
     
     "products"(val){
 //console.log(val)
 this.address=val
 val.forEach(element => {
   this.options.push({id:element.id,name:element.name,label:element.name})
  
   
 });
 
},
"form.products"(val){
  console.log(this.form.products)

},
"$store.state.IdEditvide"(a){
 console.log(a)
 if(this.$store.state.IdEditvide==null){
  // this.getuser()
      this.form={};
      this.saveEditBtn="Ajouter"

     }else{
         this.form=this.$store.state.vides;
         this.saveEditBtn="Modifier"
     }

}
 },
    methods:{
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