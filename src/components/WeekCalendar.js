import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faList } from "@fortawesome/free-solid-svg-icons";
import { endOfWeek, startOfWeek, format, add, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import Calendar from 'react-calendar';
import "../styles/components/WeekCalendar.css";

function WeekCalendar({calendarDate, handleCalendarChange}) {
  const [days, setDays] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const getWeekDays = () =>{
    const start = startOfWeek(calendarDate, { locale: es });
    const end = endOfWeek(calendarDate, { locale: es });

    const daysList = [];
    let day = start;

    while (day <= end) {
      daysList.push(day);
      day = add(day, { days: 1 });
    }

    setDays(daysList);
  }

  useEffect(() => {
    getWeekDays();
    // eslint-disable-next-line
  }, [calendarDate]);

  const handleShowCalendarClick = () => {
    setShowCalendar(prevShowCalendar => !prevShowCalendar);
  }

  return (
    <div className="calendar">
        <div className="calendar-row">
          <div />
          <label>Calendario</label>
          <button
            onClick={handleShowCalendarClick}  
          >
            {showCalendar ? <FontAwesomeIcon color='#ffffff' icon={faList} /> : <FontAwesomeIcon color='#ffffff' icon={faCalendar} />}
          </button>
        </div>
        {showCalendar ? (
          <div className="calendar-row-one-item">
            <Calendar 
              value={calendarDate}
              onChange={handleCalendarChange}
              locale="es-ES"
            />
          </div>
        ) : (
          <div className="calendar-row-one-item">
            <div className="week-body">
              {days.length > 0 && (
                <>
                <span>Semana {format(days[0], 'dd')} - {format(days[6], 'dd')} del {format(days[0], 'MM-yyyy', { locale : es})}</span>
                <div className="week-container">
                  {days.map((day, index) => (
                    <button
                      className={isSameDay(day, calendarDate) ? 'selected' : 'non-selected'}
                      key={index}
                      onClick={() => handleCalendarChange(day)}
                    >
                      <p>{format(day, 'EEE', { locale : es }).charAt(0).toUpperCase()}</p>
                      <p>{format(day, 'dd')}</p>
                    </button>
                  ))}
                </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
  );
}

export default WeekCalendar;