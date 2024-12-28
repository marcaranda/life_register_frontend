import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUrl } from '../../data/Constants';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import "../../styles/pages/Social/Friends.css";

function FriendsList() {
  return (
    <div>
      <h1>Friends List</h1>
    </div>
  )
}

function Notifications() {
  const url = getUrl();
  const token = localStorage.getItem('authToken');
  const [notifications, setNotifications] = useState([]);

  useEffect (() => {
    const getNotifications = async () => {
      try {
        await axios.get(`${url}friends/request`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }).then((response) => {
          setNotifications(response.data);
        });
      }
      catch (error) {
        console.error('Error fetching friends:', error);
      }
    }

    getNotifications();
  }, []);

  const handleAcceptRequest = async (email) => {
    try {
      await axios.put(`${url}friends/accept?email=${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then((response) => {
        console.log(response.data);
      }
    )} catch (error) {
      console.error('Error accepting friend:', error);
    }
  }

  return (
    <div className='friends-container'>
      {notifications.map((friend, index) => (
        <div className='friend' key={index}>
          <h3>{friend.name}</h3>
          <button onClick={() => handleAcceptRequest(friend.email)}>Aceptar</button>
        </div>
      ))}
    </div>
  )
}

function Friends() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className='app-container'>
      <Navbar pageName='Buscar Amigos' />
      <main className='content'>
        <div className='header'>
          <button className={!showNotifications ? 'active' : ''} onClick={() => setShowNotifications(false)}>Siguiendo</button>
          <button className={showNotifications ? 'active' : ''} onClick={() => setShowNotifications(true)}>Notificaciones</button>
        </div>
        {showNotifications ? <Notifications /> : <FriendsList />}
      </main>
      <Footer />
    </div>
  )
}

export default Friends;