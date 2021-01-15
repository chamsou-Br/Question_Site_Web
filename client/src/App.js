import React from 'react';
import SignIn from './compenents/signin';
import { BrowserRouter , Route } from 'react-router-dom'
import Login from './compenents/Login';
import ANAquesContextProvider from './context/ANAques';
import ANA from './compenents/ANA';
import ANAresContextProvider from './context/ANAres';
import UserContextProvider from './context/userContext';
import ResToResContextProvider from './context/ResToRes';
import MyProject from './compenents/myproject';
import ProjectContextprovider from './context/myprojectContext';

function App() {
  return (
    <BrowserRouter >
      <div className="App">
      <ResToResContextProvider>
      <UserContextProvider>
        <ANAresContextProvider>
          <ANAquesContextProvider>
            <ProjectContextprovider>
                <Route path='/ana' component={ANA} />
                <Route path='/Signin' component={SignIn} />
                <Route path='/login' component={Login} />
                <Route path='/project' component={MyProject} />
            </ProjectContextprovider>
          </ANAquesContextProvider>
        </ANAresContextProvider>
        </UserContextProvider>
        </ResToResContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
