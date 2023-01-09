import axios from "axios";
import router from "@/router";
import store from '@/store';

const api = axios.create({
    baseURL: store.state.baseurl
})
api.interceptors.request.use(
   
    config => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization =  `Bearer ${token}` ;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
)

api.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:

          break;
      
          case 401:
            
            store.commit('logout')
            localStorage.removeItem('token')
            router.push('/')
            break;
    
        case 404:
         // alert('page not exist');
          break;
        case 502:
         setTimeout(() => {
            router.push('/')
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);

export default api