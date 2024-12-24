import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import '../../styles/components/List/ListMeal.css';

function Meal ({ meal }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className='item'>
      <div className='header' onClick={() => setShowDetails(prev => !prev)}>
        <p>{meal.name}</p>
        <p>
          <FontAwesomeIcon icon={showDetails ? faArrowUp : faArrowDown} />
        </p>
      </div>
      {showDetails && (
        <div>
          <p>{meal.quantity} {meal.unit}</p>
        </div>
      )}
    </div>
  )
}

function ListMeal({ meals }) {
  return (
    <div className='list'>
      {meals.map((meal, index) => (
        <Meal key={index} meal={meal} />
      ))}
    </div>
  )
}

export default ListMeal;