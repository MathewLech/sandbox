import { AUTH_USER, AUTH_ERROR, FETCH_TESTDATA,WS_REFRESH } from 'actions/types';
import axiosInstance from 'axiosRoot'
import  {       
  API_REFRESH_TOKEN,
  API_OBTAIN_TOKEN,
  API_TEST
} from 'RoutesDefine'

export const signin = (formProps, callback) => async dispatch => {
    try {      
      const response = await axiosInstance.post(
        API_OBTAIN_TOKEN,
        formProps
      );
  
      dispatch({ type: AUTH_USER, payload: response.data.access });
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refreshtoken', response.data.refresh);
      callback();
    } catch (e) {
      dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
  };

export const fetchtestdata = (history) => async dispatch => {
  try {      
    const token = localStorage.getItem('token');      
// If we have a token, consider the user to be signed in
  if (token) {
      // we need to update application state

          await axiosInstance.get(API_TEST, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem('token')
            }
          })
          .then(response => {
            dispatch({
              type: FETCH_TESTDATA,
              payload: response.data.Message
            });
          });
      }
    else{
      throw new Error('Exception message');
    }
  } catch (error) {           

    
  }
};

export const refreshToken = (history) => async dispatch => {
  try {                
      var bodyFormData = new FormData();
      bodyFormData.set('refresh', localStorage.getItem('refreshtoken'));
      
      await axiosInstance.post(API_REFRESH_TOKEN, bodyFormData)
        .then(
          response => {
            localStorage.setItem('token', response.data.access);  
            dispatch({ type: AUTH_USER, payload: response.data.access });                      
          })
        }
    catch(error){                      

    };
  }

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const wsRefresh = (increment) => async dispatch => {        

  dispatch(        
    
    {
      type: WS_REFRESH, 
      payload: increment }  

    );

  };