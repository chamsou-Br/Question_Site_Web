import React, { useState } from 'react' ;
import {createContext } from 'react';

export const userContext = createContext();

const UserContextProvider = (props) => {

        const  [user , setUser] = useState({username : '' , password : ''} )
    const signuser = (username , password) => {
        const newuser = {username : username , password : password};
        setUser(newuser);
    }

    return(
        <userContext.Provider value={{user , signuser : signuser}}>
            {props.children}
        </userContext.Provider>
    )
}
export default UserContextProvider



















  
  
    