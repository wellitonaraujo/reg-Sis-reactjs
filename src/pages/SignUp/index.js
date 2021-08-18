import { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function SignUp() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  // Função 
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
            <input type="text" placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)}/>
            <input type="email" placeholder="exemplo@email.com" value={email} onChange ={ (event) => setEmail(event.target.value)}/>
            <input type="password" placeholder="*******" value={password} onChange={ (event) => setPassword(event.target.value) }/>
            <button type="submt">Cadastrar</button>
          </form>
          <Link to="/">Já tenho uma conta</Link>

        </div>
      </div>
    );
  }
  
  export default SignUp;
  
  