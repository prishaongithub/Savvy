import { useContext } from 'react';
import { AuthContext } from './Auth';
import { loginUser, registerUser, logoutUser } from '../../actions/userAction';

export const useAuth = () => {
   const { state, dispatch } = useContext(AuthContext);

   const login = async (userData) => {
      try {
         dispatch({ type: 'LOADING' });
         const data = await loginUser(userData);
         dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      } catch (error) {
         dispatch({ type: 'LOGIN_FAIL', payload: error.message });
      }
   };

   const register = async (userData) => {
      try {
         dispatch({ type: 'LOADING' });
         const data = await registerUser(userData);
         dispatch({ type: 'REGISTER_SUCCESS', payload: data });
      } catch (error) {
         dispatch({ type: 'REGISTER_FAIL', payload: error.message });
      }
   };

   const logout = async () => {
      try {
         dispatch({ type: 'LOADING' });
         const data = await logoutUser();
         dispatch({ type: 'LOGOUT' });
         return data.message;
      } catch (error) {
         dispatch({ type: 'LOGOUT_ERROR', payload: error.message });
      }
   };

   const clearError = () => {
      dispatch({ type: 'CLEAR_ERROR' });
   };

   return {
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      error: state.error,
      login,
      register,
      logout,
      clearError,
   };
};