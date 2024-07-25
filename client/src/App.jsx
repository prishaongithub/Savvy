import React from "react"
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from 'react-router-dom'
import { LogInPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useAuth } from "./context/authContext/useAuth";

function App() {

  const router = createBrowserRouter(
     createRoutesFromElements(
        <Route errorElement={<>404 Page not found</>}>
           <Route
              path='/'
              element={<div>Hello World, This is Landing page</div> } // Landing page
           />

           <Route 
              path='/login' 
              element={<LogInPage />} 
           />

           <Route 
              path='/register' 
              element={<RegisterPage />} 
           />
           <Route 
              path='/home' 
              element={<ProtectedRoute>Hello World, This is Home page. You are logged in</ProtectedRoute>} 
           />
        </Route>
     )
  );

  return (
     <>
        <RouterProvider router={router} />
     </>
  )
}

function ProtectedRoute({children}){

  const {isAuthenticated} = useAuth();

  if(!isAuthenticated) 
    return <Navigate to="/login" replace />
  return children;

}

export default App
