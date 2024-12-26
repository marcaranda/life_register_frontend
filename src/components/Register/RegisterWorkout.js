import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const actualDate = new Date();
  const url = getUrl();
  const { calendarDate } = useCalendar();
  const [workout, setWorkout] = useState({
    name : '',
    type : 'Gym',
    customType : '',
    url : '',
    duration : '',
    intensity : '',
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

  const handleUploadUrlButtonClick = () => {
    console.log('Upload url');
  }

  const handleSaveButtonClick = () => {
    if (isSameDay(calendarDate, actualDate) || isBefore(calendarDate, actualDate)) {
      axios.put(`${url}registerWorkout`, {
        date: format(calendarDate, 'yyyy-MM-dd'),
        workout: {
          name: workout.name,
          type: workout.type === 'Otro' ? workout.customType : workout.type,
          url: workout.url,
          duration: workout.duration,
          intensity: workout.intensity,
          calories: workout.calories + ' kcal',
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
            type='text'
            placeholder='Url externa'
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
          placeholder='Duración'
          value={workout.duration}
          onChange={(e) => handleInputChange('duration', e.target.value)}
        />
      </div>
      <div className='item'>
        <label>Intensidad:</label>
        <input
          type='text'
          placeholder='Intensidad'
          value={workout.intensity}
          onChange={(e) => handleInputChange('intensity', e.target.value)}
        />
      </div>
      <div className='item'>
        <label>Calorías:</label>
        <input
          type='text'
          placeholder='Calorías'
          value={workout.calories}
          onChange={(e) => handleInputChange('calories', e.target.value)}
        />
      </div>

      <button onClick={handleSaveButtonClick}>Guardar</button>
    </div>
  );
}

export default RegisterWorkout;