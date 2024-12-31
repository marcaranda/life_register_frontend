import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import '../../styles/components/List/ListMeal.css';

function Meal ({ mealObj, index }) {
  const [showDetails, setShowDetails] = useState(false);
  const ingredients = mealObj["meal"];
  const macros = mealObj["macros"];

  const roundValue = (value) => {
    const [number, unit] = value.split(' ');
    const roundedNumber = Math.round(parseFloat(number));
    return `${roundedNumber} ${unit}`;
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className='item'>
      <div className='header' onClick={() => setShowDetails(prev => !prev)}>
        <h3>Comida {index + 1}</h3>
        <p>
          <FontAwesomeIcon icon={showDetails ? faArrowUp : faArrowDown} />
        </p>
      </div>
      {showDetails && (
        <>
          <div className='ingredients'>
            <ul>
              {ingredients.map((meal, index) => (
                <li key={index}>{capitalizeFirstLetter(meal.name)} {meal.quantity} {meal.unit}</li>
              ))}
            </ul>
          </div>
          <p className='line'></p>
          <div className='macros'>
            <ul>
              <li key="calories">Calorías: {roundValue(macros["calorias"])}</li>
              <li key="carbohydrates">Carbohidratos:
                <ul>
                  {Object.entries(macros["carbohidratos"]).map(([key, value]) => (
                    <li key={key}>{key}: {roundValue(value)}</li>
                  ))}
                </ul>
              </li>
              <li key="fats">Grasas:
                <ul>
                  {Object.entries(macros["grasas"]).map(([key, value]) => (
                    <li key={key}>{key}: {roundValue(value)}</li>
                  ))}
                </ul>
              </li>
              <li key="proteins">Proteínas: {roundValue(macros["proteinas"])}</li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

function ListMeal({ meals }) {
  return (
    <div className='list-meal'>
      {meals.map((mealObj, index) =>
        Object.keys(mealObj).map((mealKey) => (
          <Meal key={index} mealObj={mealObj[mealKey]} index={index} />  
        ))
      )}
    </div>
  )
}

export default ListMeal;