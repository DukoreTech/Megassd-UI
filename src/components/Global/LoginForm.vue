<template>
  <div class="register">
    <form>
        <label for="NomUtilisateur">
            <input type="text" id="name" placeholder="Nom d'utilisateur">
            <span>Nom d'utilisateur</span>
        </label>
       
        <label for="MotPasse">
            <input type="text" id="phone" placeholder="Mot de passe">
            <span>Mot de passe</span>
        </label>
        <button type="button">Enregistre</button>
    </form>
</div>

</template>

<script>
export default {

}
</script>

<style scoped>
 .register{
    margin:auto; 
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

