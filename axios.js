import axios from "axios";

export default({Vue})=>
{

Vue.prototype.$http = axios
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
  axios.defaults.headers.common['Accept'] = `Application/json`
  
}
}