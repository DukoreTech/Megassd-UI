<template>
  <div class="register">
    <form>
        <label for="NomUtilisateur">
            <input type="email" id="name" v-model="email" placeholder="Nom d'utilisateur">
            <span>Email</span>
        </label>
       
        <label for="MotPasse">
            <input type="text" id="phone" v-model="password" placeholder="Mot de passe">
            <span>Mot de passe</span>
        </label>
        <button type="button" @click.prevent="login">Login</button>
    </form>
</div>

</template>

<script>
import axios from "axios"
///import   "../"
export default {
    
    data(){
        return{
                email: "admin1@gmail.com",
                password: "12345678",
                errormessage:""
        }

    },
    methods:{
    login:function()
       {
        let email=this.email
        let password=this.password
    
       
        axios.post(this.$store.state.baseurl + "login",{email:email,password:password},{headers:{
            
        }}).then( (response) =>{
            
           
        this.$store.commit("login", JSON.stringify(response.data
        ))
       
        const token=response.data.token
        

         localStorage.setItem('token',token),
           this.$router.push({name:'Dashboard'}) 
            })
          
          .catch(err => {
            //alert(err.message)
            console.log(err)
            this.errormessage=err.message
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

