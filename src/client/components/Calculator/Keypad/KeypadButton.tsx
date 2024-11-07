import React from 'react';
import { KeypadButtonProps } from '../../../types';
import '../styles/index.scss';

export const KeypadButton: React.FC<KeypadButtonProps> = ({ value, className, onPress }) => (
  <button
    className={`key ${className || ''}`}
    onClick={() => onPress(value)}
  >
    {value}
  </button>
); 