//import logo from './logo.svg';
import './App.css';
//import Footer from './componentes/Footer';
import Rutas from './Rutas';
import {useAuth0} from '@auth0/auth0-react';
import { LoginButton } from './componentes/Login';
import { LogoutButton } from './componentes/Logout';
import { Profile } from './componentes/Profile';

function App() {
  const {isAuthenticated} = useAuth0();
  return (
    <div className="App">
      <header className="">
      <Rutas/>
      {
          isAuthenticated ?(
            <>
            <Profile/>
            <LogoutButton/>
            </>
          ):(
            <LoginButton/>
          )
        }
          
          
      </header>
    
    </div>
    
  );
}

export default App;
