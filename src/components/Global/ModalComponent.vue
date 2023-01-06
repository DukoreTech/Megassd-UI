<template>
    <transition name="modal-animation">
        <div v-show="modalActive" class="modal">
            <transition name="modal-animation-inner">
                <div v-show="modalActive" class="modal-inner">
                    <!-- <span @click="close" class="h2 close ">x</span> -->
                    <slot/>    
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    props: ['modalActive'],
    setup(props, { emit }) {
        const close = () => {
            emit('close')
        }
        return {
            close
        }
    }
}
</script>

<style scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    height:100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(110, 110, 110, 0.7);
}

.modal-inner {
    position: relative;
    max-width:max-content;
    width:min-content;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    padding:0px 0px 30px 0px;
}

.modal-animation-enter-active,
.modal-animation-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
    opacity: 0;
}

.modal-animation-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-animation-inner-leave-to {
    transform: scale(0.8);
}
.close{
    float: right;
    margin-right:10px;
    cursor:pointer;
}
</style>