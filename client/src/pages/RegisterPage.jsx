import React, { useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { Loader } from '../components/Loader';
import { useAuth } from '../context/authContext/useAuth';


function RegisterPage(){

   const navigate = useNavigate();
   const [showPass, setShowPass] = useState(false);
   const { error, register, isLoading, isAuthenticated } = useAuth();
   const [data, setData] = useState({
      username: "",
      fullname: "",
      email: "",
      password: ""
   });

   const handleInputChange = (e) => {
      setData({
         ...data,
         [e.currentTarget.name]: e.currentTarget.value
      })
   }
  
   const handleSubmit = async (e) => {
      e.preventDefault();
      await register(data);
      navigate("/login")
   }

   if (isAuthenticated)
      return <Navigate to="/home" replace />;

   if (isLoading) 
      return <Loader text="Registering User..."/>;

   return(
      <section>
         <h2 >Savvy</h2>
         <div >
            <h2>Sign Up</h2>
            <form  onSubmit={handleSubmit}>
      
               <div >
                  <label htmlFor="usernameField">Username:</label>
                  <input 
                     type="text" 
                     id="usernameField"
                     name="username"
                     onChange={handleInputChange} 
                     value={data.username} required 
                  /> 
               </div>
               
               <div >
                  <label htmlFor="fullnameField">Full Name:</label>
                  <input 
                     type="text" 
                     id="fullnameField"
                     name="fullname"
                     onChange={handleInputChange} 
                     value={data.fullname} required 
                  />
               </div>
      
               <div >
                  <label htmlFor="emailField">Email:</label>
                  <input 
                     type="email" 
                     id="emailField"
                     name="email" 
                     onChange={handleInputChange} 
                     value={data.email} required 
                  />
               </div>
      
               <div >
                  <label htmlFor="passwordField">Password:</label>
                  <input 
                     type={showPass ? "text" : "password"} 
                     id="passwordField"
                     name="password"
                     onChange={handleInputChange} 
                     value={data.password} required 
                  />
                  <i
                     className={`fas ${showPass ? "fa-eye" : "fa-eye-slash"}`}
                     onClick={() => setShowPass(!showPass)}
                     aria-label={showPass ? "Hide password" : "Show password"}
                  ></i>
               </div>

               <p >{error}</p>
      
               <button type="submit">Register</button>

            </form>

            <p >
               Have already an account ? 
               <Link to="/login"> Login here</Link>
            </p>

         </div>
      </section>
   )
}

export { RegisterPage }