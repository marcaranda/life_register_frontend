import { useState, useEffect } from 'react';
import { getUrl } from '../data/Constants';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WeekCalendar from '../components/Calendar/WeekCalendar';
import ListMeal from '../components/List/ListMeal';
import ListWorkout from '../components/List/ListWorkout';
import axios from "axios";
import '../styles/pages/Main.css';

function Main() {
  const url = getUrl();
  const token = localStorage.getItem('authToken');
  const [showMealList, setShowMealList] = useState(true);
  const [dayData, setDayData] = useState(null);

  useEffect(() => {
    getDayData(new Date());

    // eslint-disable-next-line
  }, []);

  const getDayData = async (date) => {
    try {
      const dateFormatted = format(date, 'yyyy-MM-dd');
      await axios.get(`${url}registedDay?date=${dateFormatted}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Añadir el token en las cabeceras
        }
      }).then((response) => {
          setDayData(response.data);
        });
    } catch (error) {
      console.error('Error fetching diet:', error);
    }
  }

  return (
    <div className='app-container'>
      <Navbar pageName='Inicio' />
      {token ? (
        <>
        <main className='content'>
          <WeekCalendar 
            pageCallback={"main"}
            getDayData={getDayData}
          />
          <div className='header'>
            <button className={showMealList ? 'active' : ''} onClick={() => setShowMealList(true)}>Comida</button>
            <button className={!showMealList ? 'active' : ''} onClick={() => setShowMealList(false)}>Entreno</button>
          </div>
          {showMealList ? <ListMeal meals={dayData?.meals || []} /> : <ListWorkout workouts={dayData?.workouts || []} />}
        </main>
        </>
      ) : (
        <>
        <main className='content'>
          <h1>Por favor, inicia sesión para ver esta página</h1>
        </main>
        </>
      )}
      <Footer pageName="home"/>
    </div>
  );
}

export default Main;