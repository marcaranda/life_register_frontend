import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUrl } from '../../data/Constants';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import "../../styles/pages/Social/SearchFriends.css";

function SearchFriends() {
  const navigate = useNavigate();
  const url = getUrl();
  const token = localStorage.getItem('authToken');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      await axios.get(`${url}getUsers?name=${search}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then((response) => {
        setUsers(response.data);
      }
    )} catch (error) {
      console.error('Error fetching friends:', error);
    };
  }

  const handleAddFriend = async (email) => {
    await axios.post(`${url}friends/request?email=${email}`)
  }

  const handleShowProfile = async (email) => {
    
  }

  return (
    <div className='app-container'>
      <Navbar pageName='Buscar Amigos' />
      <main className='content'>
        <div className='header-search'>
          <h1>Buscar amigos</h1>
          <div className='search-bar'>
            <input 
              type='text' 
              placeholder='Buscar amigos'
              onChange={(e) => setSearch(e.target.value)}  
            />
            <button onClick={() => handleSearch()}>Buscar</button>
          </div>
        </div>
        <div className='friends-container'>
          {users.map((friend, index) => (
            <div className='friend' key={index}>
              <h3>{friend.name}</h3>
              <div className='buttons'>
                <button onClick={() => handleShowProfile(friend.email)}>Ver Perfil</button>
                <button onClick={() => handleAddFriend(friend.email)}>Seguir</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SearchFriends;