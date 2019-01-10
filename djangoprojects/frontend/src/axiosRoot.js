import axios from 'axios';
import  {       
  API_REFRESH_TOKEN
} from 'RoutesDefine'
import store from 'Store'
import { AUTH_USER } from 'actions/types';

//define a axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',          
    timeout: 5000,
    contentType: "application/json"
  });

  axiosInstance.interceptors.response.use(function (response) {
    return response;
  },function (error) {    
    const originalRequest = error.config;
  
    if (error.response.status === 401 && !originalRequest._retry) {
  
      originalRequest._retry = true;      

      var bodyFormData = new FormData();
      
      bodyFormData.set('refresh', localStorage.getItem('refreshtoken'));  
      
      return axiosInstance.post(API_REFRESH_TOKEN, bodyFormData)
        .then(({data}) => {
          localStorage.setItem('token', data.access);          
          //axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.access;
          store.dispatch({ type: AUTH_USER, payload: data.access });                      
          originalRequest.headers['Authorization'] = 'Bearer ' + data.access;
          return axiosInstance(originalRequest);
        });
    }
  
    return Promise.reject(error);
  });

  export default axiosInstance