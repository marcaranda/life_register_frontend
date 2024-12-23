import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegisterMeal from '../components/RegisterMeal';
import RegisterWorkout from '../components/RegisterWorkout';
import '../styles/pages/Register.css';

function Register() {
  const [showRegisterMeal, setShowRegisterMeal] = useState(true);

  const handleCalendarChange = (date) => {
    console.log(date);
  }

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