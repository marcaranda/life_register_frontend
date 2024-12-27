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
  const [friends, setFriends] = useState([]);

  const handleSearch = async () => {
    try {
      await axios.get(`${url}getUsers?name=${search}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then((response) => {
        console.log('Friends:', response.data);
        setFriends(response.data);
      }
    )} catch (error) {
      console.error('Error fetching friends:', error);
    };
  }

  return (
    <div className='app-container'>
      <Navbar pageName='Inicio' />
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
          {friends.map((friend, index) => (
            <div className='friend' key={index}>
              <h3>{friend.user.name}</h3>
              <button onClick={() => navigate(`/`)}>Ver perfil</button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SearchFriends;