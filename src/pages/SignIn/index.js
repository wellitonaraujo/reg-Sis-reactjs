import { useState } from 'react';
import './signin.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { func } from 'prop-types';

function SignIn() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
 
  }
    return (
      <div className="container-center">
        <div className="login">
          <div className="logo-area">
            <img src={logo} alt="Sistema logo"/>
          </div>

          <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>
            <input type="email" placeholder="exemplo@email.com" value={email} onChange ={ (event) => setEmail(event.target.value)}/>
            <input type="password" placeholder="*******" value={password} onChange={ (event) => setPassword(event.target.value) }/>
            <button type="submt">Acessar</button>
          </form>
          <Link to="/register">Criar conta</Link>

        </div>
      </div>
    );
  }
  
  export default SignIn;
  