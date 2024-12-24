import { useState } from 'react';
import Select from 'react-select';
import '../../styles/components/Register/RegisterMeal.css';

function RegisterMeal() {
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
    console.log(meal);
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