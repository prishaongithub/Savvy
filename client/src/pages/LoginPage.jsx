import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { useAuth } from '../context/authContext/useAuth';


function LogInPage (){
   
   const [showPass, setShowPass] = useState(false);
   const { error, login, isLoading, isAuthenticated, clearError } = useAuth();
   const [data, setData] = useState({
      emailORusername: "",
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
      await login(data);
   }

   if (isAuthenticated)
      return <Navigate to="/home" replace />;

   if (isLoading) 
      return <Loader text="Logging in..."/>;

   return (
      <section>

         <h2>Savvy</h2>
         <div>

            <h2>Log In</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
               <div>
                  <label htmlFor="emailORusername">Username or Email:</label>
                  <input 
                     name="emailORusername"
                     type="text"
                     onChange={ handleInputChange } 
                     value={data.emailORusername} required 
                  />
               </div>

               <div>
                  <label htmlFor="password">Password:</label>
                  <input 
                     name="password"
                     type={showPass ? "text" : "password"}
                     onChange={ handleInputChange } 
                     value={data.password} required 
                  />
                  <i
                     className={`fas ${showPass ? "fa-eye" : "fa-eye-slash"}`}
                     onClick={() => setShowPass(!showPass)}
                     aria-label={showPass ? "Hide password" : "Show password"}
                  ></i>
               </div>

               <p>{error}</p>

               <button 
                  type="submit"
               > Log In </button>

            </form>

            <p>Don't have an account ? 
               <Link to="/register"> Register here</Link>
            </p>

         </div>

      </section>
   )
}


export {LogInPage}