<template>
  <div class="register">
    <form>
        <label for="NomUtilisateur">
            <span>Email</span>
            <input type="email" required="required" id="name" v-model="form.email" placeholder="Nom d'utilisateur">
            
            
        </label>
        <span>{{ errors?.email}}</span>
       
        <label for="MotPasse">
            <span>Mot de passe</span>
            <input type="text" id="phone" :required="required" v-model="form.password" placeholder="Mot de passe">
           
            

           

        </label>
        <span>{{ errors?.password}}</span>
        
        <button type="button" @click.prevent="login">Login</button>
    </form>
</div>

</template>

<script>
import axios from "axios"
import Swal from 'sweetalert2'
///import   "../"
export default {
    
    data(){
        return{
            form:{

            
                email: "admin1@gmail.com",
                password: "12345678",
                
            },
            errors: {}
        }

    },
    methods:{
    login:function()
       {
       
        
        

        axios.post(this.$store.state.baseurl + "login",this.form,{headers:{
            
        }})
        .then( (response) =>{
            
           
        this.$store.commit("login", JSON.stringify(response.data
        ))
       
        const token=response.data.token
         localStorage.setItem('token',token),
         localStorage.setItem('user'.user),
           this.$router.push({name:'Dashboard'}) 
            })
          
          .catch(err => {
          
            //alert(err.message)
            //console.log(err)
            console.log(err.response.data.errors)
            this.errors = err.response.data.errors;
          /*  Swal.fire({
               icon: 'error',
               title: 'error',
               text:  err.response.data.errors
              });
              
          }*/
        
        }
          

          )
        
      },
      
   },
}
</script>

<style scoped>
 .register{
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center; 
    height: 100vh;
    }
 *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
body{
    min-height:100vh;
    display:grid;
    place-content:center;
    font-family:sans-serif;
    color:#6b6b6b;
}
form{
    width:90vw;
    max-width:768px;
    border:1px solid #ddd;
    padding:3vw;
    display:flex;
    flex-direction:column;
    border-radius:5px;
}

label{
    margin-bottom:15px;
    position:relative;
    border-bottom:1px solid #ddd;
}
input{
    width:100%;
    padding:10px 0px;
    margin-top:20px;
    border:none;
    outline:none;
}
input::placeholder{
    opacity:0;
}
span{
    position:absolute;
    top:0;
    left:0;
    transform:translateY(30px);
    font-size:0.825em;
    transition-duration:300ms;
}
button{
    padding:15px 0px; 
    margin-top:20px;
    background:teal;
    color:#fff;
    border:1px solid teal;
    cursor:pointer;
    border-radius:3px;
}
label:focus-within > span,
input:not(:placeholder-shown) + span{
    color:purple;
    transform:translateY(0px);
}

</style>

