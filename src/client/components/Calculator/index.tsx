import React from 'react';
import Display from './Display';
import { Keypad } from './Keypad';
import { WindowControls } from './WindowControls';
import './styles/index.scss';

const Calculator: React.FC = () => {
  return (
    <div className="calculator-wrapper">
      <div className="calculator">
        <WindowControls />
        <Display />
        <Keypad />
      </div>
    </div>
  );
};

export default Calculator;
