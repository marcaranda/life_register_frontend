import { useState, useEffect } from 'react';
import { getUrl } from '../../data/Constants';
import { format } from 'date-fns';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WeekCalendar from '../../components/Calendar/WeekCalendar';
import ListMeal from '../../components/List/ListMeal';
import ListWorkout from '../../components/List/ListWorkout';
import axios from "axios";
import '../../styles/pages/Social/Profile.css';

function FriendProfile() {
  const url = getUrl();
  const token = localStorage.getItem('authToken');
  const [user, setUser] = useState({"name": "", "email": ""}); 
  const [showMealList, setShowMealList] = useState(true);
  const [dayData, setDayData] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    localStorage.removeItem('user');

    getDayData(new Date());

    // eslint-disable-next-line
  }, []);

  const getDayData = async (date) => {
    try {
      const dateFormatted = format(date, 'yyyy-MM-dd');
      await axios.get(`${url}registedDay?date=${dateFormatted}&email=${user.email}`, {
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
      <Navbar pageName={user?.name} />
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
      <Footer pageName="friend"/>
    </div>
  );
}

export default FriendProfile;