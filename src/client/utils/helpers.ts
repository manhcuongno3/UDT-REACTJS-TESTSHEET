import e from 'express';
import { ButtonConfig } from '../types';
import { OPERATORS } from './constants';

export const getKeypadLayout = (displayValue: string): ButtonConfig[][] => [
  [
    { value: displayValue === '0' ? 'AC' : 'C', className: 'function' },
    { value: '+/-', className: 'function' },
    { value: '%', className: 'function' },
    { value: '÷', className: 'operator' },
  ],
  [
    { value: '7' },
    { value: '8' },
    { value: '9' },
    { value: 'x', className: 'operator' },
  ],
  [
    { value: '4' },
    { value: '5' },
    { value: '6' },
    { value: '-', className: 'operator' },
  ],
  [
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '+', className: 'operator' },
  ],
  [
    { value: '0', className: 'zero' },
    { value: ',', className: '' },
    { value: '=', className: 'operator' },
  ],
];

export const evaluateExpression = (expression: string): number => {
  return eval(expression
    .replace(/x/g, '*')
    .replace(/÷/g, '/')
    .replace(/,/g, '.')
  );
};

export const formatResult = (result: number): string => {
  if (Math.abs(result) > 9999999) {
    return "Error";
  }
  const roundedResult = Number(result).toFixed(2);
  return roundedResult.replace(/\.?0+$/, '').replace('.', ',');
};

export const SPECIAL_OPERATORS: Record<string, (n: number) => number> = {
  'x': n => n * n,  // Square
  '+': n => n * 2,  // Double
  '-': () => 0,     // Zero
};

export const isOperator = (char: string) => OPERATORS.includes(char as any);  