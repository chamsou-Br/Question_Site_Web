import React  from 'react';
import {useContext , useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons';
import { userContext } from '../context/userContext';

const Login = (props) => {

    const [username , setusername] = useState('');
    const [password , setpassword] = useState('');
    const {user , signuser} = useContext(userContext);

    const handlesubmit = (e) => {
        signuser(username , password);
        console.log('submit succed');
                setTimeout(() => {
                    console.log('sign in user succed');
                  props.history.push('/ana');
                },1000);
    }
    
   
        return (
            <div className='Login'  >
                <div className='logo'>
                     <FontAwesomeIcon className='icon' icon={faGraduationCap} size='4x'/>
                </div>
                <div className='title'>Log in </div>
                <div className='theme' >
                    <div className="introduction">
                        <h2 >Let's get started  :)</h2>  
                        <p>Or <a href='/signin'>Sign in</a> if regestered Near ..!</p>
                    </div>
                </div>
                <div className='loginCarte'>
                    <form  action="/login" method="POST" onSubmit={handlesubmit}>
                    <hr />
                        <label>UserName :</label>
                        <input type='text' name='username' onChange={(e) => setusername(e.target.value)} placeholder='username' required /><br /> 
                        <label>Email :</label>
                        <input type='email' name='email' placeholder='Email'  /><br />   
                        <label>password :</label>
                        <input type='password' name='password' onChange={(e) => setpassword(e.target.value)} placeholder='password' /><br/>
                        <button type='submit'>LoG in</button>
                    </form>
                </div>
                </div>
        )
    }
export default Login