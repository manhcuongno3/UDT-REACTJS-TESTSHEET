import '../styles/index.scss';

// Move existing Keypad.tsx content here
// Update import paths:
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDigit,
  calculate,
  clear,
  clearAllHistory,
  setActiveOperator,
  toggleEditing,
  updateCurrentInput,
  updateDisplay,
} from '../../../store/actions/calculatorActions';
import { KeypadButton } from './KeypadButton';
import { CalculatorState, KeypadProps, ButtonValue } from '../../../types';
import { DEFAULT_DISPLAY, ERROR_DISPLAY, OPERATORS } from '../../../utils/constants';
import { getKeypadLayout } from '../../../utils/helpers';

export const Keypad: React.FC<KeypadProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const display = useSelector((state: CalculatorState) => state.display);
  const activeOperator = useSelector((state: CalculatorState) => state.activeOperator);
  const currentInput = useSelector((state: CalculatorState) => state.currentInput);
  const isEditing = useSelector((state: CalculatorState) => state.isEditing);
  const history = useSelector((state: CalculatorState) => state.history);

  // Memoize layout to prevent unnecessary recalculations
  const layout = useMemo(() => getKeypadLayout(display), [display]);

  const handleKeyPress = useCallback((value: ButtonValue) => {
    // Handle clear
    if (value === 'C') {
      dispatch(clear());
      return;
    }

    if (value === 'AC') {
      dispatch(clearAllHistory());
      return;
    }

    // Handle sign toggle
    if (value === '+/-') {
      if(display === ERROR_DISPLAY || display === DEFAULT_DISPLAY) {
        return;
      }
      const newDisplayValue = display.startsWith('-') ? display.slice(1) : '-' + display;
      dispatch(updateDisplay(newDisplayValue));

      if (currentInput) {
        const newCurrentInput = currentInput.replace(/(-?\d+)$/, (match) =>
          match.startsWith('-') ? match.slice(1) : '-' + match
        );
        dispatch(updateCurrentInput(newCurrentInput));
      }
      return;
    }

    // Handle decimal
    if (value === ',' && !display.includes(',')) {
      dispatch(addDigit('.'));
      return;
    }

    // Handle percentage
    if (value === '%') {
      if(display === ERROR_DISPLAY || display === DEFAULT_DISPLAY) {  
        return;
      }
      dispatch(addDigit(value));
      dispatch(calculate());
      return;
    }

    // Handle numbers
    if (/[0-9]/.test(value)) {
      if (isEditing) {
        const lastOperatorMatch = currentInput.match(/[\d]+$/);
        const newValue = lastOperatorMatch
          ? currentInput.replace(/(\d+)$/, value)
          : value;
        dispatch(updateCurrentInput(newValue));
        dispatch(updateDisplay(value));
        dispatch(toggleEditing());
      } else {
        dispatch(addDigit(value));
      }
      return;
    }

    // Handle operators
    if (OPERATORS.includes(value as typeof OPERATORS[number])) {
      dispatch(setActiveOperator(value));
      return;
    }

    // Handle equals
    if (value === '=') {
      dispatch(calculate());
    }
  }, [dispatch, display, currentInput, isEditing]);

  return (
    <div className="keypad">
      {layout.map((row, rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          {row.map(({ value, className }) => (
            <KeypadButton
              key={value}
              value={value}
              className={`${className || ''} ${value === activeOperator ? 'active' : ''}`.trim()}
              onPress={handleKeyPress as (value: string) => void}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
