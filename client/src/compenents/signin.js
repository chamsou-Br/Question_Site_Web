import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons';
import  axios from 'axios';
import {useContext } from 'react';
import { userContext } from '../context/userContext';


const SignIn = (props) => {

    const [username , setusername] = useState('');
    const [password , setpassword] = useState('');

    const {user , signuser} = useContext(userContext);
  
  const handlesubmit = (e) => {
    signuser(username , password);
      axios.get('/signin').then(res => {
          if (res.data.isuser === true) {
              setTimeout(() => {
                props.history.push('/ana');
              },500);
          }
          if (res.data.isuser === false) {
            setTimeout(() => {
              props.history.push('/login');
            },500);
        }
          
      })
  }
        
        return (
            <div className='Signin'  >
                <div className='logo'>
                     <FontAwesomeIcon className='icon' icon={faGraduationCap} size='4x'  />
                </div>
                <div className='title'>Sign in </div>
            
                <div className='theme' >
                    <div className="introduction">
                        <h2 >Let's get started Now :)</h2>  
                        <p>Or <a href='/login'>create an account</a> if not regestered yet ..!</p>
                    </div>
                </div>
                <div className='SigninCarte'>
                    <form action="/signin" method="POST" onSubmit={handlesubmit}>
                    <hr /><br/>
                        <label>UserName :</label>
                        <input type='text' name='username' onChange={(e) => setusername(e.target.value)} placeholder='username' required /><br /> 
                        <label>password :</label>
                        <input type='password' name='password' onChange={(e) => setpassword(e.target.value)} placeholder='password' /><br/>
                        
                        <button type='submit'>Sign in</button>
                        <h3>Forget password ?</h3>
                    </form>
                </div>
                </div>
        )
    }
export default SignIn