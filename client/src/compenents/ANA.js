import React from 'react';
import {useContext , useState , useEffect} from 'react';
import { ANAquesContext } from '../context/ANAques';
import { ANArestionContext } from '../context/ANAres';
import { userContext } from '../context/userContext';
import axios from 'axios' ;
import { ResToResContext } from '../context/ResToRes';
import Navbar from './navbar';


const ANA = (props) => {
    const {AnaQues , AddQues , displayFormRes , getAnaQyesData} = useContext(ANAquesContext);
    const {ANAres , display , AddRes , getAnaResData , display2} = useContext(ANArestionContext);
    const [reponse , setReponse] = useState('')
    const [question , setQuestion ] = useState('');
    const [reponseToReponse , setreponseToReponse ] = useState('');
    const {user} = useContext(userContext);
    const {ResToRes , AddRestores , getResToResData} = useContext(ResToResContext);


    useEffect (() => {
        if (user.username === '') { 
            props.history.push('/login'); }
        axios.get('/ana').then(res => {
            getAnaQyesData(res.data.question);
            getAnaResData(res.data.reponse);
            getResToResData(res.data.reponseToReponse)
        })
    },[])
    const Addquestion = (e , question , user) => {
        e.preventDefault();
        const data = {
            type : 'question',
            question : question ,
            user : user
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
            url : '/ana',
            data : form,
            Headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            } ,
            
        }); 
        AddQues(question , user);
        setQuestion('');     
        document.querySelector('.questionnput').value = ''; 
    }

    const Addrerponse = (e , reponse , id , user) => {
        e.preventDefault();
        const data = {
            type : 'reponse',
            reponse : reponse ,
            user : user ,
            id : id
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
            url : '/ana',
            data : form,
            Headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            } ,
            
        }); 
        AddRes(reponse , id , user);
        setReponse('');
        document.querySelector('.inputRes').value = '';
    }

    const AddresToresubmit = (e ,resto , id , user , resN ) => {
        e.preventDefault();
        const data = {
            type : 'restores',
            reponse : resto ,
            user : user , 
            id : id ,
            resN : resN
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
            url : '/ana',
            data : form,
            Headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            } ,
            
        }); 
        AddRestores(resto , id , user , resN)
        setreponseToReponse('');
       }

    const Showres = (id) => {
        displayFormRes(id);
        display2(id);
    }

    const ANAQuestion = AnaQues.length ? ( <div className='Question'>
       { AnaQues.map(ques => {
        return(
            <div className='qeus_res'   key={ques.id} > 
            <div className='QuestionCarte'  onClick={() => Showres(ques.id)}  key={ques.id} >
                <div className='usernameQues' >
                    #{ques.username}
                </div>
                <div className='QuesQues' >
                    {ques.question}
                </div>
               
            </div>
           {ANAres.map(res => {
                 if (res.id === ques.id) {  
                        
                    return(   <div key={res.resN}>
                        <div style={{display : ques.display}} className='ReponseCarte' onClick={() => display(res.resN , ques.display)}  key={res.resN}>
                                    <div className='usernameRes' >
                                        #{res.username}
                                    </div>
                                    <div className='ResRes' >
                                         {res.reponse}
                                     </div>
                                </div>
                                {ResToRes.map(tores => {
                                    if ( (tores.id === res.id) && (tores.resN === res.resN) ) {

                                        return(
                                            <div style={{display : res.display}} className='ReponseToReponseCarte' key={tores.key}>
                                                       <div className='usernameRes' >
                                                            #{tores.username}
                                                        </div>
                                                        <div className='ResRes' >
                                                            {tores.reponse}
                                                        </div>
                                           </div>
                                        )
                                    }

                                })}
                                <form action="/ana" method="POST" className='Addrestores'  style={{display : res.display}}  onSubmit={(e) => AddresToresubmit(e,reponseToReponse , ques.id , user.username , res.resN)}>
                                        <input type='text' className='inputRestores' value={reponseToReponse}   onChange={(e) => setreponseToReponse(e.target.value) } placeholder='Reply to this answer ...' />
                                        <input type='submit' value='+'  />
                                </form>
                                </div>
                                )  
                 }
                 }
                 )} 
                 <form action="/ana" method="POST" className='Addres'  style={{display : ques.display}} onSubmit={(e) => Addrerponse(e,reponse , ques.id , user.username) }>
                      <input type='text' className='inputRes' value={reponse}  onChange={(e) => setReponse(e.target.value) } placeholder='Add Reponse ...' />
                      <input type='submit' value='+'  />
                </form>
                </div>
            
        )
    })}
    </div>) : (
         <div className='empty' >we Have any Question Now ... :( </div>)


    return(
        <div className='anaBody' >
        
        <div className='Theme'></div>
        <div>
        <Navbar /><br /><br/><br/>
        <div className='analyseQuestion'>
            <div className='AnaTitle' >
                <h1>Developper DZ</h1>
            </div>
            <form action="/ana" method="POST" className='Addques' onSubmit={(e) => Addquestion(e , question , user.username)}>
                <input type='text' name='question' className='questionnput' onChange={(e) => setQuestion(e.target.value) } placeholder='Add Question ...' />
                <input type='submit' value='+'  />
           </form>
           <hr className='hrANA' />
           {ANAQuestion}
        </div></div>
        <br /><br/><br/>
        </div>
    )
}
export default ANA 