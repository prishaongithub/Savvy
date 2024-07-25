import axios from 'axios'

const serverApi = axios.create({
   baseURL: import.meta.env.VITE_SERVER_API,
   withCredentials: true,
   headers: {
      "Content-type": "application/json"
   }
});

export const loginUser = async (userData) => {
   try {
      
      const { data } = await serverApi.post("/user/login", userData);
      return await data?.data;

   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while logging in user. Please try again");
   }
}


export const registerUser = async (userData) => {
   try {
      
      const { data } = await serverApi.post("/user/register", userData);
      return await data.data;

   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while registering user. Please try again")
   }
}

export const logoutUser = async () => {
   try {
      
      const { data } = await serverApi.get("/user/logout");
      return await data?.data;

   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while logging out. Please try again")
   }
}


export const getUserDetails = async () => {
   try {
      
      const { data } = await serverApi.get("/user/getuserdetails");
      // console.log(data.data)
      return await data?.data;

   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while fetching user details. Please try again")
   }
}



export const updateUserDetails = async (userData) => {
   try {
      
      const { data } = await serverApi.put("/user/updateuserdetails", userData );
      return await data.data;

   } catch (error) {
      if(error?.response?.data?.statusCode) 
         throw new Error(error.response.data.message);
      else 
         throw new Error("Error while updating user details. Please try again")
   }
}