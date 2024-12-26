import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/pages/LogInOut.css";

function LogInOut() {
  const navigate = useNavigate();
  const [showLogIn, setShowLogIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleShowLogInClick = (bool) => {
    if (bool !== showLogIn) {
      setShowLogIn(bool);
      setFormData({ name: '', email: '', password: '' });
    }
  }

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  }

  const handleSubmit = (type) => {
    if (type === 'login') {
      const loginData = {
        name: formData.name,
        password: formData.password
      }

      try {
        // const response = await axios.post(`${url}login`, loginData);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching diet:', error);
      }

      console.log('Login:', loginData);
      navigate('/')
    } else {
      try {
        // const response = await axios.post(`${url}register`, formData);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching diet:', error);
      }

      console.log('Register:', formData);
      navigate('/')
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
              <label>Usuario</label>
              <input
                type='text'
                placeholder='Nombre'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className='item'>
              <label>Contraseña</label>
              <input
                type='password'
                placeholder='Contraseña'
                value={formData.password}
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
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div className='item'>
                <label>Correo</label>
                <input
                  type='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className='item'>
                <label>Contraseña</label>
                <input
                  type='password'
                  placeholder='Contraseña'
                  value={formData.password}
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