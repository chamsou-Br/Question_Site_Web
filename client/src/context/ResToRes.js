import React, { useState } from 'react' ;
import {createContext } from 'react';

export const ResToResContext = createContext();

const ResToResContextProvider = (props) => {

        const [ResToRes , setResToRes] = useState([
           
        ])
        const AddRestores = (resto , id , user , resN) => {
            setResToRes([...ResToRes , {  username : user,reponse : resto , id : id , display : 'Block' , resN : resN , key : Math.random() }])
        }
        const getResToResData = (data) => {
            setResToRes(data);
        } 
       
    return(
        <ResToResContext.Provider value={{ResToRes , AddRestores : AddRestores , getResToResData : getResToResData}}>
            {props.children}
        </ResToResContext.Provider>
    )
}
export default ResToResContextProvider