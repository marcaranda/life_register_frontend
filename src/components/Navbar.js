import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import '../styles/components/Navbar.css';

function Navbar( { pageName }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const handleLogInOutClick = () => {
    if (token !== null) localStorage.removeItem('authToken')
    navigate('/enter')
  }

  return (
    <nav className='navbar'>
      <button onClick={() => navigate('/searchFriends')}>
        <FontAwesomeIcon color='#ffffff' icon={faSearch} />
      </button>
      <span>{pageName}</span>
      <button onClick={() => handleLogInOutClick()}>
        <FontAwesomeIcon color='#ffffff' icon={token === null ? faSignIn : faSignOut} />
      </button>
    </nav>
  );
}

export default Navbar;