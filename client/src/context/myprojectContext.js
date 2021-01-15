import React from 'react';
import {useState , createContext} from 'react';

export const  ProjectContext = createContext();

const ProjectContextprovider = (props) => {

    const [project , setproject] = useState([
        
    ])

    const getProjectFromData = (projects) => {
        setproject(projects)
    };

    const Projectfinish = (id) => {
      const newproject =  project.filter(proj => {
            if (proj.id === id && proj.finish === 'nofinish' ) {
                    proj.finish = 'finish' ;
            } else if (proj.id === id && proj.finish === 'finish' ) {
                proj.finish = 'nofinish'
            }
            return proj
        })
        setproject(newproject);
    }

    const Addproj = (title , description , databegin , datalimite) => {
        setproject([...project , {title : title , description : description, datebegin : databegin  , datalimite : datalimite , finish : false , id : Math.random()}])
    }
    
    const Removeproj = (id) => {
        const newproject = project.filter(proj => {
            if (proj.id !== id ) {
                return proj
            }
        })
        setproject(newproject);
    }

    return(
        <ProjectContext.Provider value={{project , Projectfinish : Projectfinish , Addproj : Addproj , Removeproj : Removeproj , getProjectFromData : getProjectFromData}}>
            {props.children}
        </ProjectContext.Provider> 
    )
}
export default ProjectContextprovider