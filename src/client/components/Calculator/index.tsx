import React, { useState } from 'react';
import './styles.scss';

import { WindowControls } from './WindowControls';
import { Display } from './Display';
import { Keypad } from './Keypad';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');

  const handleKeyPress = (value: string) => {
    // Add handler logic later
    setDisplay(value);
  };

  return (
    <div className="calculator-wrapper">
      <div className="calculator">
        <WindowControls />
        <Display value={display} />
        <Keypad onKeyPress={handleKeyPress} />
      </div>
    </div>
  );
};

export default Calculator;
