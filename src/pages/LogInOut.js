import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUrl } from '../data/Constants';
import axios from 'axios';
import "../styles/pages/LogInOut.css";

function LogInOut() {
  const navigate = useNavigate();
  const url = getUrl();
  const [showLogIn, setShowLogIn] = useState(true);
  const [dataForm, setDataForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleShowLogInClick = (bool) => {
    if (bool !== showLogIn) {
      setShowLogIn(bool);
      setDataForm({ name: '', email: '', password: '' });
    }
  }

  const handleInputChange = (key, value) => {
    setDataForm({
      ...dataForm,
      [key]: value
    });
  }

  const handleSubmit = async (type) => {
    if (type === 'login') {
      const formData = new URLSearchParams();
      formData.append('username', dataForm.email);
      formData.append('password', dataForm.password);

      try {
        await axios.post(`${url}login`, formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Necesario para OAuth2PasswordRequestForm
          },
        })
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem('authToken', token);
          navigate('/');
        });
      } catch (error) {
        console.error('Error fetching diet:', error);
      }
    } else {
      try {
        await axios.post(`${url}registerUser`, dataForm)
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem('authToken', token);
          navigate('/');
        });
      } catch (error) {
        console.error('Error fetching diet:', error);
      }
    }
  }

  return (
    <div className='app-container'>
      <main className='content'>
        <div className='header'>
          <button className={showLogIn ? 'active' : ''} onClick={() => handleShowLogInClick(true)}>Iniciar Sesión</button>
          <button className={!showLogIn ? 'active' : ''} onClick={() => handleShowLogInClick(false)}>Registrarse</button>
        </div>

        {showLogIn ?
          <div className='form'>
            <div className='item'>
              <label>Correo</label>
              <input
                type='email'
                placeholder='Email'
                value={dataForm.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                />
            </div>
            <div className='item'>
              <label>Contraseña</label>
              <input
                type='password'
                placeholder='Contraseña'
                value={dataForm.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </div>
            <button onClick={() => handleSubmit('login')}>Iniciar Sesión</button>
          </div>
          :
          <div className='form'>
            <div className='item'>
                <label>Nombre</label>
                <input
                  type='text'
                  placeholder='Nombre'
                  value={dataForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div className='item'>
                <label>Correo</label>
                <input
                  type='email'
                  placeholder='Email'
                  value={dataForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className='item'>
                <label>Contraseña</label>
                <input
                  type='password'
                  placeholder='Contraseña'
                  value={dataForm.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
              </div>
            <button onClick={() => handleSubmit('register')}>Registrarse</button>
          </div>
        }
      </main>
    </div>
  );
}

export default LogInOut;