import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPAth'



export const UserContext=createContext();

const UserProvider=({children})=>{
    const [user,setuser]=useState(null);
    const [loading,setloading]=useState(true);

    useEffect(()=>{
        if(user) return;
        const accessToken=localStorage.getItem("token");
        if(!accessToken){
            setloading(false);
            return;
        }

        const fetchUser=async()=>{
            try {
                const responce=await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setuser(responce.data);
            } catch (error) {
                console.log(error,"user not authorized");
                clearUser();
            }finally{
                setloading(false);
            }
        };

        fetchUser();
    },[])
    
    const updateUser=(userdata)=>{
        setuser(userdata);
        localStorage.setItem("token",userdata.token);
        setloading(false);
    };

    const clearUser=()=>{
        setuser(null);
        localStorage.removeItem("token");
    }

    return (
        <UserContext.Provider value={{user,loading,updateUser,clearUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
