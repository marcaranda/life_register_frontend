import { useState, useEffect } from 'react';
import { getUrl } from '../data/Constants';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WeekCalendar from '../components/WeekCalendar';
import ListMeal from '../components/List/ListMeal';
import ListWorkout from '../components/List/ListWorkout';
import axios from "axios";
import '../styles/pages/Main.css';

function Main() {
  const url = getUrl();
  const [showMealList, setShowMealList] = useState(true);
  const [dayData, setDayData] = useState(null);

  useEffect(() => {
    getDayData(new Date());

    // eslint-disable-next-line
  }, []);

  const getDayData = async (date) => {
    try {
      const dateFormatted = format(date, 'yyyy-MM-dd');
      await axios.get(`${url}registedDay?date=${dateFormatted}`)
        .then((response) => {
          console.log(response.data);
          setDayData(response.data);
        });
    } catch (error) {
      console.error('Error fetching diet:', error);
    }
  }

  const data = {
    workouts : [
      {
        name : 'pruebaWorkout',
        type : 'Gym',
        customType : '',
        url : 'prueba.com',
        duration : '01:00',
        intensity : '4',
        calories : '150kcal',
      },
      {
        name : 'pruebaWorkout2',
        type : 'Fútbol',
        customType : '',
        url : 'prueba2.com',
        duration : '01:30',
        intensity : '5',
        calories : '200kcal',
      }
    ],
    meals : [
      {
        name : 'pruebaMeal',
        quantity : '100',
        unit : 'g',
      },
      {
        name : 'pruebaMeal2',
        quantity : '200',
        unit : 'g',
      }
    ]
  }

  return (
    <div className='app-container'>
      <Navbar pageName='Inicio' />
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
      <Footer />
    </div>
  );
}

export default Main;