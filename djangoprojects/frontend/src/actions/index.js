import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_TESTDATA } from 'actions/types';


export const signin = (formProps, callback) => async dispatch => {
    try {      
      const response = await axios.post(
        'http://localhost:8000/api/auth/token/obtain/',
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

            await axios.get('http://localhost:8000/api/testing', {
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
     if (typeof myVar !== "undefined"){
            if (error.response.status === 401) {        
              dispatch(refreshToken(history));
          }
          else {        
            dispatch({ type: AUTH_USER, payload: "" });
            dispatch({ type: AUTH_ERROR, payload: 'Problem With JWT' });
          }
      }
      else{
        dispatch(refreshToken(history));
      } 
    }
  };

  export const refreshToken = (history) => async dispatch => {
    try {                
        var bodyFormData = new FormData();
        bodyFormData.set('refresh', localStorage.getItem('refreshtoken'));
        
        await axios.post(`http://localhost:8000/api/auth/token/refresh/`, bodyFormData)
          .then(
            response => {
              localStorage.setItem('token', response.data.access);  
              dispatch({ type: AUTH_USER, payload: response.data.access });                      
            })
          }
      catch(error){                      
            // If cannot get new token Take user to signout screen
            //this will call action signout user, updating our state and subsequent component props
            dispatch({ type: AUTH_USER, payload: "" });
            dispatch({ type: AUTH_ERROR, payload: 'Refresh Token Expired' });
            history.push('/signout');
      };
    }

    export const signout = () => {
      localStorage.removeItem('token');
    
      return {
        type: AUTH_USER,
        payload: ''
      };
    };



