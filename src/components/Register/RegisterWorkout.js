import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCalendar } from '../Calendar/CalendarContext';
import { isSameDay, isBefore, format } from 'date-fns';
import { getUrl } from '../../data/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import axios from 'axios';
import '../../styles/components/Register/RegisterWorkout.css';

function RegisterWorkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const actualDate = new Date();
  const url = getUrl();
  const token = localStorage.getItem('authToken');
  const { calendarDate } = useCalendar();
  const [workout, setWorkout] = useState({
    name : '',
    type : 'Gym',
    customType : '',
    url : '',
    duration : '',
    intensity : 3,
    calories : '',
  })

  const dropDownOptions = [
    { value: 'Gym', label: 'Gym' },
    { value: 'Fútbol', label: 'Fútbol' },
    { value: 'Correr', label: 'Correr' },
    { value: 'Ciclismo', label: 'Ciclismo' },
    { value: 'Natación', label: 'Natación' },
    { value: 'Padel', label: 'Padel' },
    { value: 'Otro', label: 'Otro' },
  ]

  const handleInputChange = (key, value) => {
    if (key === 'type' && value.value === 'Otro') {
      setWorkout({
        ...workout,
        [key] : value.value,
      })
    } else {
      setWorkout({
        ...workout,
        [key] : value
      })
    }
  }

  useEffect(() =>{
    const getStravaData = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      if (code !== null) {
        const workoutFromStorage = JSON.parse(localStorage.getItem('workout'));
        
        try {
          await axios.put(`${url}register/strava`, {
            'url' : workoutFromStorage.url,
            'code' : code,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          })
          .then((response) => {
            setWorkout({
              ...workoutFromStorage,
              name: response.data.name,
              duration: response.data.moving_time,
              calories: response.data.calories,
            });
            localStorage.removeItem('workout');
          });
        } catch (error) {
          console.error('Error fetching strava data:', error);
        }
      }
    }

    getStravaData();
    // eslint-disable-next-line
  }, []);

  const handleUploadUrlButtonClick = () => {
    if (workout.url && /^https:\/\/www\.strava\.com\/activities\/\d+$/.test(workout.url)) {
      localStorage.setItem('workout', JSON.stringify(workout));

      const stravaUrl = `https://www.strava.com/oauth/authorize?client_id=142165&response_type=code&redirect_uri=http://localhost:3000/register&scope=read,activity:read`;
      window.location.href = stravaUrl;
    }
  }

  const handleSaveButtonClick = () => {
    if (isSameDay(calendarDate, actualDate) || isBefore(calendarDate, actualDate)) {
      axios.put(`${url}register/workout`, {
        date: format(calendarDate, 'yyyy-MM-dd'),
        workout: {
          name: workout.name,
          type: workout.type === 'Otro' ? workout.customType : workout.type,
          url: workout.url,
          duration: /^([0-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/.test(workout.duration) ? workout.duration : '00:00',
          intensity: workout.intensity.toString(),
          calories: (workout.calories ? workout.calories : 0) + ' kcal',
        }
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Aquí se añade el Bearer token en las cabeceras
          'Content-Type': 'application/json', // O el tipo de contenido que esté esperando el servidor
        }
      }).then(() => {
        navigate('/');
      }).catch((error) => {
        console.error('Error saving meal:', error);
      });
    } else {
      alert('No puedes añadir comidas a un día futuro');
      navigate('/');
    }
  }

  return (
    <div className='workout-form'>
      <div className='item'>
        <label>Nombre:</label>
        <input
          type='text'
          placeholder='Nombre'
          value={workout.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </div>
      <div className='item'>
        <label>Tipo:</label>
        <Select
          isSearchable={false}
          options={dropDownOptions}
          value={dropDownOptions.filter(function (option) {
            return option.value === workout.type;
          })}
          onChange={(selectedOption) => handleInputChange('type', selectedOption.value)}
          className='select'
        />
        { workout.type === 'Otro' &&
          <input
            type='text'
            placeholder='Tipo de entreno'
            value={workout.customType}
            onChange={(e) => handleInputChange('customType', e.target.value)}
          />
        }
      </div>
      <div className='item'>
        <label>URL:</label>
        <div className='two-elements'>
          <input
            className='url'
            type='url'
            placeholder='Url externa (strava)'
            value={workout.url}
            onChange={(e) => handleInputChange('url', e.target.value)}
          />
          <button onClick={() => handleUploadUrlButtonClick()}>
            <FontAwesomeIcon color='#ffffff' icon={faUpload} />
          </button>
        </div>
      </div>
      <div className='item'>
        <label>Duración:</label>
        <input
          type='text'
          placeholder='Duración: hh:mm'
          value={workout.duration}
          onChange={(e) => handleInputChange('duration', e.target.value)}
        />
      </div>
      <div className='item'>
        <label>Intensidad: {workout.intensity}</label>
        <input
          type='range'
          placeholder='Intensidad: 1-5'
          max={5}
          min={1}
          value={workout.intensity}
          onChange={(e) => handleInputChange('intensity', e.target.value)}
        />
      </div>
      <div className='item'>
        <label>Calorías:</label>
        <input
          type='number'
          placeholder='Calorías'
          value={workout.calories}
          onChange={(e) => handleInputChange('calories', e.target.value)}
        />
      </div>

      <div className='buttons'>
        <button onClick={handleSaveButtonClick}>Guardar</button>
      </div>
    </div>
  );
}

export default RegisterWorkout;