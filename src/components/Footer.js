import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserGroup, faPlus, faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import '../styles/components/Footer.css';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className='footer'>
      <button onClick={() => navigate('/')}>
        <FontAwesomeIcon color='#ffffff' icon={faHome} />
      </button>
      <button onClick={() => navigate('/')}>
        <FontAwesomeIcon color='#ffffff' icon={faUserGroup} />
      </button>
      <button onClick={() => navigate('/')}>
        <FontAwesomeIcon color='#ffffff' icon={faPlus} />
      </button>
      <button onClick={() => navigate('/')}>
        <FontAwesomeIcon color='#ffffff' icon={faUser} />
      </button>
      <button onClick={() => navigate('/')}>
        <FontAwesomeIcon color='#ffffff' icon={faCog} />
      </button>
    </footer>
  );
}

export default Footer;