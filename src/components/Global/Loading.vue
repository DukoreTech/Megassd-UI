<template>
  <div>
           <div class="d-flex justify-content-center mx-2">
						  <span class="">Loading...</span>
                         <div class="spinner-border" role="status">
                          
                         </div>
            </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

.container-loader{
    width: 100%;
    height: calc(100vh - 20vh);
    display: flex;
    justify-content: center;
    align-items: center;
}
.loader {
    border: 10px solid var(--secondary);
    /* Light grey */
    border-top: 10px solid var(--grey);
    /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    
    100% {
        transform: rotate(360deg);
    }
}

</style>