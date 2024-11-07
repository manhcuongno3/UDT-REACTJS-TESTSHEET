import React from 'react';
import { useSelector } from 'react-redux';
import { CalculatorState } from '../../types';
import './styles.scss';
const CalculatorHistory: React.FC = () => {
  const history = useSelector((state: CalculatorState) => state.history); 
  return (
    <div className="calculator-history">
      <h2>Calculation History</h2>
      <div className="history-list">
        {history.length === 0 ? (
          <p>No calculations yet</p>
        ) : (
          <ul>
            {history.map((calculation, index) => (
              <li key={index}>{calculation}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CalculatorHistory;
