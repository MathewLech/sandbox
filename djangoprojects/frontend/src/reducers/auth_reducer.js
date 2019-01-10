import { AUTH_USER, AUTH_ERROR,WS_REFRESH } from 'actions/types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:      
      return { ...state, authenticated: action.payload };      
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case WS_REFRESH:           
      return { ...state, wsrefresh: action.payload }; 
    default:
      return state;
  }
}
