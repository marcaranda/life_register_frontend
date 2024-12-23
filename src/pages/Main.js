import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WeekCalendar from '../components/WeekCalendar';

function Main() {

  const handleCalendarChange = (date) => {
    console.log(date);
  }

  return (
    <div className='app-container'>
      <Navbar pageName='Inicio' />
      <main className='content'>
        <WeekCalendar calendarDate={new Date()} handleCalendarChange={handleCalendarChange} />
      </main>
      <Footer />
    </div>
  );
}

export default Main;