

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueHtmlToPaper from "vue-html-to-paper";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import Select2 from 'vue3-select2-component';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {faWarehouse,faFile,faCartFlatbedSuitcase,faScaleUnbalancedFlip,faWineBottle,faMinus,faTimes,faAngleLeft,faCheckCircle,faAngleDown,faCalendarCheck,faMoneyBill,faUsersBetweenLines,faCircleDot,faAngleRight ,faUserSecret,faUser,faTachometerAlt,faHouse,faShoppingCart,faCartPlus,faCog,faPlus,faPlusCircle,faEdit,faUserEdit,faTrash,faTrashAlt,faSignOutAlt,faUsers,faMoneyCheckDollar,faEye,faCheck,faFileInvoice,faLock,faChevronRight,faPrint} from '@fortawesome/free-solid-svg-icons'

/* add icons tPlus,o the library */
library.add(faWarehouse,faFile,faCartFlatbedSuitcase,faScaleUnbalancedFlip,faWineBottle,faMinus,faTimes,faAngleLeft,faCheckCircle,faAngleDown,faCalendarCheck,faMoneyBill,faUsersBetweenLines,faCircleDot,faAngleRight,faUserSecret,faUser,faTachometerAlt,faHouse,faShoppingCart,faCartPlus,faCog,faPlus,faPlusCircle,faEdit,faUserEdit,faTrash,faTrashAlt,faSignOutAlt,faUsers,faMoneyCheckDollar,faEye,faCheck,faFileInvoice,faLock,faChevronRight,faPrint)
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vue from "vue";



const options = {
    name: '_blank',
    specs: [
      'fullscreen=yes',
      'titlebar=yes',
      'scrollbars=yes'
    ],
    styles: [
      'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      'https://unpkg.com/kidlat-css/css/kidlat.css'
    ]
  }
  

// import "@/assets/vendor/datatables-demo.js"
// import "@/assets/vendor/datatables/dataTables.bootstrap4.js"
// import "@/assets/vendor/datatables/jquery.dataTables.js"

createApp(App)
    .use(store)
    .use(router)
    .use(VueHtmlToPaper, options)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(VueSweetalert2)
    .component('Select2', Select2)
    .mount('#app')

