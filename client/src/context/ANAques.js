import React, { useState  } from 'react';
import {createContext  } from 'react';



export const ANAquesContext = createContext();

const ANAquesContextProvider = (props) => {

    
    
    const [AnaQues , setquesANA] = useState(  [
            
        ]);

        const getAnaQyesData = (data) => {
            setquesANA(data);
        } 
        const AddQues = (question , user) => {
            setquesANA([...AnaQues ,  {
                username : user ,
                question : question ,
                display : 'None',
                id : Math.random()
            }])
        }

        const displayFormRes = (id) => {
            const newstate = AnaQues.filter(qes => {
                if (qes.id === id && qes.display === 'None') {
                        qes.display = 'Block'
    
                } else if (qes.id === id && qes.display === 'Block') {
                    qes.display = 'None'
            } 
            return qes 
        })
        setquesANA(newstate);
        }
    return(
        <ANAquesContext.Provider value={{AnaQues , AddQues : AddQues , displayFormRes : displayFormRes , getAnaQyesData : getAnaQyesData }}>
            {props.children}
        </ANAquesContext.Provider>
    )
}

export default ANAquesContextProvider