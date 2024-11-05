import React from 'react';
import { KeypadButton } from './KeypadButton';
import { KeypadProps } from './types';

const KEYPAD_LAYOUT = [
  [{ value: 'AC', className: 'function' }, { value: '+/-', className: 'function' }, { value: '%', className: 'function' }, { value: '÷', className: 'operator' }],
  [{ value: '7' }, { value: '8' }, { value: '9' }, { value: '×', className: 'operator' }],
  [{ value: '4' }, { value: '5' }, { value: '6' }, { value: '−', className: 'operator' }],
  [{ value: '1' }, { value: '2' }, { value: '3' }, { value: '+', className: 'operator' }],
  [{ value: '0', className: 'zero' }, { value: '.' }, { value: '=', className: 'operator' }],
];

export const Keypad: React.FC<KeypadProps> = ({ onKeyPress }) => (
  <div className="keypad">
    {KEYPAD_LAYOUT.map((row, rowIndex) => (
      <React.Fragment key={`row-${rowIndex}`}>
        {row.map(({ value, className }) => (
          <KeypadButton
            key={value}
            value={value}
            className={className}
            onPress={onKeyPress}
          />
        ))}
      </React.Fragment>
    ))}
  </div>
); 