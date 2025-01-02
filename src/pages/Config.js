import { useState, useEffect } from 'react';
import { getUrl } from '../data/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import "../styles/pages/Config.css";

function Config() {
  const url = getUrl();
  const token = localStorage.getItem('authToken');
  const [user, setUser] = useState(null);
  const [editData, setEditData] = useState({
    name: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    const getUser = async () => {
      /*try {
        await axios.get(`${url}user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          setUser(response.data);
        }
      )}
      catch (error) {
        console.error('Error fetching user:', error);
      }*/
    }

    getUser();
  }, [url, token]);

  const handleEdit = (field) => {
    setEditData({
      ...editData,
      [field]: !editData[field],
    });
  }

  return (
    <div className='app-container'>
      <Navbar pageName='Configuración' />
      <main className='content'>
        <div className='item'>
          <h2>Datos personales</h2>
          <div className='row-item'>
            <div className='column-item'>
              <label>Nombre</label>
              <input
                type='text' 
                value={user?.name}
                disabled={!editData.name}
              />
            </div>
            <button onClick={() => handleEdit("name")}>
              <FontAwesomeIcon color='#ffffff' icon={editData.name ? faXmark : faEdit} />
            </button>
          </div>
          <div className='row-item'>
            <div className='column-item'>
              <label>Email</label>
              <input
                type='email' 
                value={user?.email}
                disabled={!editData.email}
              />
            </div>
              <button onClick={() => handleEdit("email")}>
                <FontAwesomeIcon color='#ffffff' icon={editData.email ? faXmark : faEdit} />
              </button>
          </div>
          <div className='row-item'>
            <div className='column-item'>
              <label>Contraseña actual</label>
              <input
                type='password'
                value={user?.password}
                disabled={true}
              />
            </div>
            <button onClick={() => handleEdit("password")}>
              <FontAwesomeIcon color='#ffffff' icon={editData.password ? faXmark : faEdit} />
            </button>
          </div>
          {editData.password &&
            <>
              <div className='column-item'>
                <label>Nueva contraseña</label>
                <input type='password'/>
              </div>
              <div className='column-item'>
                <label>Repetir contraseña</label>
                <input type='password'/>
              </div>
            </>
          }
        </div>

        <div className='item'>
          <h2>Visibilidad</h2>
          <div className='row-item'>
            <label>Mostrar Comidas</label>
            <input type='checkbox'/>
          </div>
          <div className='row-item'>
            <label>Mostrar Entrenamientos</label>
            <input type='checkbox'/>
          </div>
        </div>
      </main>
      <Footer pageName="config"/>
    </div>
  )
}

export default Config;