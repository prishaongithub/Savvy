import React, { createContext, useReducer, useEffect } from 'react';
import { getUserDetails } from '../../actions/userAction';

const initialState = {
   user: null,
   isAuthenticated: false,
   isLoading: true,
   error: null,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, initialState);

   useEffect(() => {
      const loadUser = async () => {
         try {
            dispatch({ type: 'LOADING' });
            const userData = await getUserDetails();
            dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
         } catch (error) {
            dispatch({ type: 'AUTH_ERROR' });
         }
      };

      loadUser();
   }, []);

   return (
      <AuthContext.Provider value={{ state , dispatch }}>
         {children}
      </AuthContext.Provider>
   );
};



// Auth reducer 

const authReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN_SUCCESS':
         return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user: action.payload,
            error: null,
         };
      case 'REGISTER_SUCCESS':
         return {
            ...state,
            isLoading: false,
            user: action.payload,
            error: null,
         };
      case 'AUTH_ERROR':
      case 'LOGIN_FAIL':
      case 'REGISTER_FAIL':
      case 'LOGOUT':
         return {
            ...state,
            isAuthenticated: false,
            isLoading: false,
            user: null,
            error: action.payload,
         };
      case 'LOGOUT_FAIL':
         return {
            error: action.payload,
         };
      case 'CLEAR_ERROR':
         return {
            ...state,
            error: null,
         };
      case 'LOADING':
         return {
            ...state,
            isLoading: true,
         };
      default:
         return state;
   }
};
