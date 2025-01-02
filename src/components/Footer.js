import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserGroup, faPlus, faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import '../styles/components/Footer.css';

function Footer({ pageName }) {
  const navigate = useNavigate();

  return (
    <footer className='footer'>
      <button onClick={() => navigate('/')}>
        <FontAwesomeIcon color={pageName === "home" ? '#1780ea' : '#ffffff'} icon={faHome} />
      </button>
      <button onClick={() => navigate('/friends')}>
        <FontAwesomeIcon color={pageName === "friend" ? '#1780ea' : '#ffffff'} icon={faUserGroup} />
      </button>
      <button onClick={() => navigate('/register')}>
        <FontAwesomeIcon color={pageName === "register" ? '#1780ea' : '#ffffff'} icon={faPlus} />
      </button>
      <button onClick={() => navigate('/')}>
        <FontAwesomeIcon color={pageName === "profile" ? '#1780ea' : '#ffffff'} icon={faUser} />
      </button>
      <button onClick={() => navigate('/config')}>
        <FontAwesomeIcon color={pageName === "config" ? '#1780ea' : '#ffffff'} icon={faCog} />
      </button>
    </footer>
  );
}

export default Footer;