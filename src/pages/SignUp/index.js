import { useState, useContext } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

function SignUp() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(event) {
    event.preventDefault();

    if(name !== '' && email !== '' && password !== '') {
      signUp(email, password, name)
    }
 
  }
    return (
      <div className="container-center">
        <div className="login">
          <div className="logo-area">
            <img src={logo} alt="Sistema logo"/>
          </div>

          <form onSubmit={handleSubmit}>
            <h1>Criar conta</h1>
            <input type="text" placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)}/>
            <input type="email" placeholder="exemplo@email.com" value={email} onChange ={ (event) => setEmail(event.target.value)}/>
            <input type="password" placeholder="*******" value={password} onChange={ (event) => setPassword(event.target.value) }/>
            <button type="submt">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
          </form>
          <Link to="/">Já tenho uma conta</Link>

        </div>
      </div>
    );
  }
  
  export default SignUp;
  
  