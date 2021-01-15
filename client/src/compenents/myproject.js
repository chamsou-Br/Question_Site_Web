import React, { useEffect } from 'react' ;
import {useContext , useState } from 'react';
import { ProjectContext } from '../context/myprojectContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { userContext } from '../context/userContext';
import Navbar from './navbar';

const MyProject = (props) => {

    const {project , Projectfinish , Addproj , Removeproj , getProjectFromData} = useContext(ProjectContext);
    const {user} = useContext(userContext);
    const [titleproj , settitleproje ] = useState('');
    const [descriptionproj , setdescriptionproj] = useState('');
    const [datebegin , setdatabegin] = useState('');
    const [datelimite , setdatelimite] = useState('');

    useEffect(() => {
        if (user.username === '') { 
            props.history.push('/login'); }
            else {
        const data = {
            type : 'getProjectFromData',
            user : user.username
        }
        let form = [] ;
        for (let prop in data) {
            let encodedkey = encodeURIComponent(prop);
            let encodedval = encodeURIComponent(data[prop]);
            form.push(encodedkey + '=' + encodedval);
        }
        form = form.join('&');
        axios({
            method : 'POST',   
            url : '/project',
            data : form,
            Headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            } ,
            
        })
            axios.get('/project').then(res => {
                getProjectFromData(res.data);
            })
        }
       
    },[])

    const projectfinishclick = (proj) => {
        Projectfinish(proj.id);

        const data = {
            type : 'finishProject',
            id : proj.id ,
            user : user.username
        }
        let form = [] ;
        for (let prop in data) {
            let encodedkey = encodeURIComponent(prop);
            let encodedval = encodeURIComponent(data[prop]);
            form.push(encodedkey + '=' + encodedval);
        }
        form = form.join('&');
        axios({
            method : 'POST',   
            url : '/project',
            data : form,
            Headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            } ,
            
        }); 
       
    }

    const AddprojectForm = ( e,title , description , databegin , datalimite) => {
        e.preventDefault();
        Addproj(title , description , databegin , datalimite);
        const data = {
            type : 'addproject',
            title : title ,
            description : description ,
            databegin : datebegin ,
            datalimite : datalimite ,
            user : user.username
        }
        let form = [] ;
        for (let prop in data) {
            let encodedkey = encodeURIComponent(prop);
            let encodedval = encodeURIComponent(data[prop]);
            form.push(encodedkey + '=' + encodedval);
        }
        form = form.join('&');
        axios({
            method : 'POST',   
            url : '/project',
            data : form,
            Headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            } ,
            
        }); 
        settitleproje('');
        setdescriptionproj('');
        setdatelimite('');
        setdatabegin('');
    }

    const Removeprojclick = (id) => {
        Removeproj(id);
        const data = {
            type : 'removeproject',
            id : id ,
            user : user.username
        }
        let form = [] ;
        for (let prop in data) {
            let encodedkey = encodeURIComponent(prop);
            let encodedval = encodeURIComponent(data[prop]);
            form.push(encodedkey + '=' + encodedval);
        }
        form = form.join('&');
        axios({
            method : 'POST',   
            url : '/project',
            data : form,
            Headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            } ,
            
        }); 
    }

    const Projectdiv = project.length ? (
        <div className='projects'>
            { project.map(proj => {
                return(<div className='carteoneproject' key={proj.id}>
                    <div className='close' onClick={() => Removeprojclick(proj.id)}><FontAwesomeIcon  className='icon' icon={faWindowClose} size='2x'/></div>
             <div className='oneproject' id={proj.finish} onLoad={() => console.log('fgfndh,j')} onClick={() => projectfinishclick(proj)}  >
            
                 <div className='infoproj' > 
                    <div className='title' >
                        {proj.title}
                    </div>
                    <hr className='hrtitle' />
                    <div className='description' >
                        {proj.description}
                    </div>
                 </div>
                <div className='temp' >
                    <p className='datebegin'> {proj.datebegin} </p>
                    <p className='datalimite'> {proj.datalimite} </p>
                </div>
                </div>
                </div>)
            })}
        </div>
    ) : (<div className='empty'> you don't have any project :(</div>)


    return(
        <div className='myproject' >
        <Navbar />
                <div className="introduction">
                        <h2 >Let's get started  :)</h2>  
                        <p>and Create our projects ..:)</p>
                </div>
        <div className='cover'></div>
            <section className='projectCarte' >
                {Projectdiv}
            </section>
            <section className='projectform' >
                <div className='infoprojects'>
                    <form action="/project" method="POST" className='Addproject' onSubmit={(e) => AddprojectForm(e , titleproj , descriptionproj , datebegin , datelimite)}    >
                            <input type='text' className='inputproject' value={titleproj} onChange={(e) => settitleproje(e.target.value) }    placeholder='title of your project...' />
                            <input type='text' className='inputproject' value={descriptionproj} onChange={(e) => setdescriptionproj(e.target.value) }     placeholder='description of your project...' />
                            <input type='text' className='inputtitle' value={datebegin} onChange={(e) => setdatabegin(e.target.value) }     placeholder='dateBegin of your project...' />
                            <input type='text' className='inputtitle' value={datelimite}  onChange={(e) => setdatelimite(e.target.value) }   placeholder='dateLimite of your project...' />
                             <input type='submit' value='Add project'  />
                    </form>
                </div>
            </section>
        </div>
       
    )

}
export default MyProject