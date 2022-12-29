import axios from "axios";
export default({Vue})=>
{

Vue.prototype.$http = axios
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
  Vue.prototype.$http.defaults.headers.common['Accept'] = `Application/json`
}
}