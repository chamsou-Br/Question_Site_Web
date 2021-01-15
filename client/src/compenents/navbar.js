import React from 'react';
import { Link , NavLink , withRouter} from 'react-router-dom'
class Navbar extends React.Component{
    render(){
        return(
            <nav>
                <p className='navTitle'>Tresor question</p>
                <ul>
                   <li><Link to='/project'>Project</Link> </li>
                    <li><Link to='/ana'>Question</Link>  </li>
                    <li><NavLink to='/Signin'>Log out</NavLink></li>
                </ul>
            </nav>
        )
    }
}
export default Navbar 