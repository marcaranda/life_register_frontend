import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/pages/LogInOut.css";

function LogInOut() {
  const [showLogIn, setShowLogIn] = useState(true);
  const navigate = useNavigate();



  return (
    <div className='app-container'>
      <main className='content'>
        <div className='header'>
          <button className={showLogIn ? 'active' : ''} onClick={() => setShowLogIn(true)}>Iniciar Sesión</button>
          <button className={!showLogIn ? 'active' : ''} onClick={() => setShowLogIn(false)}>Registrarse</button>
        </div>

        {showLogIn ?
          <div className='form'>
            <div className='item'>
              <label>Usuario</label>
              <input type='text' />
            </div>
            <div className='item'>
              <label>Contraseña</label>
              <input type='password' />
            </div>
            <button onClick={() => navigate('/')}>Iniciar Sesión</button>
          </div>
          :
          <div className='form'>
            <div className='item'>
                <label>Nombre</label>
                <input type='text' />
              </div>
              <div className='item'>
                <label>Correo</label>
                <input type='email' />
              </div>
              <div className='item'>
                <label>Contraseña</label>
                <input type='password' />
              </div>
            <button onClick={() => navigate('/')}>Registrarse</button>
          </div>
        }
      </main>
    </div>
  );
}

export default LogInOut;