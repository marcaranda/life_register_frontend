import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import '../../styles/components/List/ListMeal.css';

function Meal ({ mealObj, index }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className='item'>
      <div className='header' onClick={() => setShowDetails(prev => !prev)}>
        <h3>Comida {index + 1}</h3>
        <p>
          <FontAwesomeIcon icon={showDetails ? faArrowUp : faArrowDown} />
        </p>
      </div>
      {showDetails && (
        <div>
          {mealObj.map((meal, index) => (
            <p key={index}>{meal.name} {meal.quantity} {meal.unit}</p>
          ))}
        </div>
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