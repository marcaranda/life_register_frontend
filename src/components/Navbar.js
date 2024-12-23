import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import '../styles/components/Navbar.css';

function Navbar( { pageName }) {
  const navigate = useNavigate();

  return (
    <nav className='navbar'>
      <button onClick={() => navigate('/')}>
        <FontAwesomeIcon color='#ffffff' icon={faSearch} />
      </button>
      <span>{pageName}</span>
      <button onClick={() => navigate('/')}>
        <FontAwesomeIcon color='#ffffff' icon={faSignIn} />
      </button>
    </nav>
  );
}

export default Navbar;