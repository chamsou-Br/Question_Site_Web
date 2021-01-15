import React, { useState } from 'react' ;
import {createContext } from 'react';

export const ANArestionContext = createContext();

const ANAresContextProvider = (props) => {

        const [ANAres , setANAres] = useState([
            
        ])
        const display = (id , condition) => {
    
            const newstate = ANAres.filter(res => {
                if (res.resN === id && res.display === 'None' && condition === 'Block') {
                        res.display = 'Block'
    
                } else if (res.resN === id || res.display === 'Block') {
                    res.display = 'None'
            } 
            return res 
        })
           setANAres(newstate);
    }

    const display2 = (id) => {
        const  newstate = ANAres.filter(res => {
              if (res.id === id ) {
                res.display = 'None'
              } 
          return res 
        })
       setANAres(newstate);
    }

    const AddRes = (reponse , id , user) => {
        
        setANAres([...ANAres , {  username : user,reponse : reponse , id : id , display : 'None' , resN : Math.random() }])
    }

    const getAnaResData = (data) => {
        setANAres(data);
    } 

    return(
        <ANArestionContext.Provider value={{ANAres , display : display , AddRes : AddRes , getAnaResData : getAnaResData , display2 : display2}}>
            {props.children}
        </ANArestionContext.Provider>
    )
}
export default ANAresContextProvider