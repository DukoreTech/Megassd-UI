import axios from "axios";
import router from "@/router";
import store from '@/store';

const api = axios.create({
    baseURL: store.state.baseurl
})
api.interceptors.request.use(
   
    config => {
      
      config.headers['Access-Control-Allow-Origin']='*';
      config.headers['Content-Type']='application/json';
      config.headers['Access-Control-Allow-Methods']='GET,PUT,POST,DELETE,PATCH,OPTIONS';
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization =  `Bearer ${token}` ;
        config.headers['Content-Type'] = `application/x-www-form-urlencoded; charset=UTF-8`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
      console.log(error);
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
          store.commit('logout')
            localStorage.removeItem('token')
            router.push('/')
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