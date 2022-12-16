
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {faCheckCircle,faAngleDown,faCalendarCheck,faMoneyBill,faUsersBetweenLines,faCircleDot,faAngleRight ,faUserSecret,faUser,faTachometerAlt,faHouse,faShoppingCart,faCartPlus,faCog,faPlus,faPlusCircle,faEdit,faUserEdit,faTrash,faTrashAlt,faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCheckCircle,faAngleDown,faCalendarCheck,faMoneyBill,faUsersBetweenLines,faCircleDot,faAngleRight,faUserSecret,faUser,faTachometerAlt,faHouse,faShoppingCart,faCartPlus,faCog,faPlus,faPlusCircle,faEdit,faUserEdit,faTrash,faTrashAlt,faSignOutAlt)

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import "@/assets/vendor/datatables-demo.js"
// import "@/assets/vendor/datatables/dataTables.bootstrap4.js"
// import "@/assets/vendor/datatables/jquery.dataTables.js"

createApp(App)
    .use(store)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(VueSweetalert2)
    .mount('#app')
    