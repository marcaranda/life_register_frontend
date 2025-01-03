import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import '../../styles/components/List/ListWorkout.css';

function Workout ({ workout }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className='item'>
      <div className='header' onClick={() => setShowDetails(prev => !prev)}>
        <h3>{workout.name}</h3>
        <p>
          <FontAwesomeIcon icon={showDetails ? faArrowUp : faArrowDown} />
        </p>
      </div>
      {showDetails && (
        <div>
          <p>{workout.type}</p>
          <p>{workout.duration}</p>
          <p>{workout.intensity}</p>
          <p>{workout.calories}</p>
        </div>
      )}
    </div>
  )
}

function ListWorkout({ workouts }) {
  return (
    <div className='list-workout'>
      {workouts.map((workoutObj, index) =>
        Object.keys(workoutObj).map((workoutKey) => (
          <Workout key={`${index}-${workoutKey}`} workout={workoutObj[workoutKey]} />
        ))
      )}
    </div>
  )
}

export default ListWorkout;