import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegisterMeal from '../components/Register/RegisterMeal';
import RegisterWorkout from '../components/Register/RegisterWorkout';
import '../styles/pages/Register.css';

function Register() {
  const [showRegisterMeal, setShowRegisterMeal] = useState(true);

  useEffect(() => {
    const workout = localStorage.getItem('workout')
    if (workout) {
      setShowRegisterMeal(false);
    }
  }, []);

  return (
    <div className='app-container'>
      <Navbar pageName='Registro' />
      <main className='content'>
        <div className='header'>
          <button className={showRegisterMeal ? 'active' : ''} onClick={() => setShowRegisterMeal(true)}>Comida</button>
          <button className={!showRegisterMeal ? 'active' : ''} onClick={() => setShowRegisterMeal(false)}>Entreno</button>
        </div>
        {showRegisterMeal ? <RegisterMeal /> : <RegisterWorkout />}
      </main>
      <Footer />
    </div>
  );
}

export default Register;