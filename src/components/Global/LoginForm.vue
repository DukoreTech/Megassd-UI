<template>
<main style="background:linear-gradient(90deg, #C7C5F4, #776BCC);display: flex;justify-content: center; padding:30px;
	">
	
    

  <div class="container">
   
	<div class="screen">
		<div class="screen__content">
			<img class="img-profile mt-2 rounded-circle bg-light d-flex justify-content-center "  src="@/assets/Produit-brarudi.jpg"/>
			<div class="ml-4 font-weight-bolder h4 title">MEGA MUGERE SSD</div>
			<form class="login" @submit.prevent="login">
				<div class="login__field">					
					<font-awesome-icon icon="fa-solid fa-user" class="icon login__icon" />
					<input type="text" required="required" v-model="form.email" class="login__input" placeholder=" Email">
				</div>
				<div class="login__field">
					
					<font-awesome-icon icon="fa-solid fa-lock" class="icon login__icon" />
					<input type="password" required="required" v-model="form.password" class="login__input" placeholder="Mot de passe">
				</div>
				<button class="button login__submit">
					<div v-if="loading" class="d-flex justify-content-center mx-2">
						<span class="">Loading...</span>
                         <div class="spinner-border" role="status">
                          
                         </div>
                    </div>

					<span v-if="!loading" class="button__text">Connexion</span>
                     
                    <font-awesome-icon v-if="!loading" icon="fas fa-chevron-right" class="icon " />

				</button>				
			</form>
			
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
</main>
</template>

<script>
import axios from "axios"
import Swal from 'sweetalert2'
///import   "../"
export default {
    
    data(){
        return{
            form:{
                email: "",
                password: "", 
            },
			loading: false,
            errors: [],
        }

    },
    methods:{
        validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    login:function()
       {
		this.loading = true ;

if (!this.form.password) {
this.errors.push('password required');
}
if (!this.form.email) {
this.errors.push('Email required');
}
else if(!this.validEmail(this.form.email)){
    this.errors.push('email invalide');
}

if(this.errors.length > 0)
{

	
	   
        
        Swal.fire({
               icon: 'error',
               title: 'error',
               text:  this.errors
			   
              });
			  this.loading=false;
			   
			  
              this.errors=[]
			  
				  
    
}


else{
	
    
	axios.post(this.$store.state.baseurl + "login",this.form)
        .then( (response) =>{
    
        this.$store.commit("login", JSON.stringify(response.data
        ))
		
       const token=response.data.token
        localStorage.setItem('token',token),
         this.$store.state.token=response.data.token
		 this.$store.state.role=response.data.user.Role

		 console.log(this.$store.state.role)
		 this.loading = false;
         
         //window.location('/')
           this.$router.push({name:'Dashboard'}) 
            })
          
          .catch(err => {
          
            //alert(err.message)
            console.log(err)
           
            Swal.fire({
               icon: 'error',
               title: 'error',
               text:  ' email ou motdepasse invalide '
              });
			  this.loading = false;
              
          });
        } 
        
        },

         

    } 
        

        
      
    }
      
   

</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css?family=Raleway:400,700');

* {

	margin: 0;
    padding: 0;	
	font-family: Raleway,sans-serif;
    
}

.container {
   /* background: linear-gradient(90deg, #C7C5F4, #776BCC);*/
	display: flex;
	justify-content: center;
	align-items:center;
	
	height: fit-content;
	overflow: hidden;
		

}

.screen {	
	position: relative;	
	height:600px;
	width: 360px;	
	box-shadow: 0px 0px 24px #5C5696;
}

.screen__content {
	z-index: 1;
	position: relative;	
	height: 100%;
}

.screen__background {		
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	-webkit-clip-path: inset(0 0 0 0);
	clip-path: inset(0 0 0 0);	
}

.screen__background__shape {
	transform: rotate(45deg);
	position: absolute;
}

.screen__background__shape1 {
	height: 520px;
	width: 520px;
	background: #FFF;	
	top: -50px;
	right: 120px;	
	border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
	height: 220px;
	width: 220px;
	background: #6C63AC;	
	top: -172px;
	right: 0;	
	border-radius: 32px;
}

.screen__background__shape3 {
	height: 540px;
	width: 190px;
	background: linear-gradient(270deg, #5D54A4, #6A679E);
	top: -24px;
	right: 0;	
	border-radius: 32px;
}

.screen__background__shape4 {
	height: 400px;
	width: 200px;
	background: #7E7BB9;	
	top: 420px;
	right: 50px;	
	border-radius: 60px;
}

.login {
	width: 320px;
	padding: 30px;
	/* padding-top: 156px; */
}

.login__field {
	padding: 20px 0px;	
	position: relative;	
}

.login__icon {
	position: absolute;
	top: 30px;
	color: #7875B5;
}

.login__input {
	border: none;
	border-bottom: 2px solid #D1D1D4;
	background: none;
	padding: 10px;
	padding-left: 24px;
	font-weight: 700;
	width: 75%;
	transition: .2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
	outline: none;
	border-bottom-color: #6A679E;
}

.login__submit {
	background: #fff;
	font-size: 14px;
	margin-top: 30px;
	padding: 16px 20px;
	border-radius: 26px;
	border: 1px solid #D4D3E8;
	text-transform: uppercase;
	font-weight: 700;
	display: flex;
	align-items: center;
	width: 100%;
	color: #4C489D;
	box-shadow: 0px 2px 2px #5C5696;
	cursor: pointer;
	transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
	border-color: #6A679E;
	outline: none;
}

.button__icon {
	font-size: 24px;
	margin-left: auto;
	color: #7875B5;
}

.title{
	margin-top:10px;
	color: #6C63AC;	
}
.img-profile {
        display: block;
        text-align: center;
        margin:auto;
		width:120px !important;
		height:120px !important;
      
    }

@media screen and (max-width: 400px) {
	
	.screen {
			

		
			position: relative;	
			height: 500px;
			width: 560px;	
	
		
		}
		.login__icon {
	position: absolute;
	top: 20px;
	left:20px;
	color: #7875B5;
}
		.login__field {
	padding: 10px 0px;
	margin-left:5px;	
	
}
		main{
			height:650px;
		}
		
.login__submit {
	margin-top: 30px;
	width: 80%;
	margin-left:30px;
	
}
.login__input {
	
	
	padding: 10px;
	margin-left: 30px;
	font-weight: 700;
	width: 80%;
	
}

}







</style>

