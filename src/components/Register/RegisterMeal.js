import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalendar } from '../Calendar/CalendarContext';
import { isSameDay, isBefore, format } from 'date-fns';
import { getUrl } from '../../data/Constants';
import Select from 'react-select';
import axios from 'axios';
import '../../styles/components/Register/RegisterMeal.css';

function RegisterMeal() {
  const navigate = useNavigate();
  const actualDate = new Date();
  const url = getUrl();
  const token = localStorage.getItem('authToken');
  const { calendarDate } = useCalendar();
  const [meal, setMeal] = useState([{ name : '', quantity : '', unit : 'g' }]);

  const handleAddFood = () => {
    const newFood = { name : '', quantity : '', unit : 'g' };
    setMeal([...meal, newFood]);
  }

  const deleteFood = (index) => {
    setMeal(meal.filter((_, i) => i !== index));
  }

  const handleInputChange = (index, key, value) => {
    const newMeal = [...meal];
    newMeal[index][key] = value;
    setMeal(newMeal);
  }

  const handleSaveButtonClick = () => {
    if (isSameDay(calendarDate, actualDate) || isBefore(calendarDate, actualDate)) {
      axios.put(`${url}register/meal`, {
        date: format(calendarDate, 'yyyy-MM-dd'),
        meal: meal.map(item => ({
          name: item.name,
          quantity: parseFloat(item.quantity),
          unit: item.unit.value
        }))
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
    <div>
      <div className='meal-list'>
        {meal.map((food, index) => (
          <div key={index} className='item'>
            <input
              type='text'
              placeholder='Alimento'
              value={food.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            />
            <input
              type='number'
              placeholder='Cantidad'
              value={food.quantity}
              onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
            />
            <Select
              isSearchable={false}
              options={[
                { value: 'g', label: 'Gramos' },
                { value: 'unit', label: 'Unidades' },
              ]}
              value={food.unit}
              onChange={(selectedOption) => handleInputChange(index, 'unit', selectedOption)}
              className='select'
            />
            <button onClick={() => deleteFood(index)}>Delete</button>
          </div>
        ))}
      </div>

      <div className='buttons'>
        <button onClick={handleAddFood}>Añadir Alimento</button>
        <button onClick={handleSaveButtonClick}>Guardar</button>
      </div>
    </div>
  );
}

export default RegisterMeal;