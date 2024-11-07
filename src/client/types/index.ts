export interface KeypadProps {
}

export interface KeypadButtonProps {
  value: ButtonValue;
  className?: string;
  onPress: (value: ButtonValue) => void;
}

export interface Operation {
  number: number;
  operator: string | null;
}

export interface CalculatorState {
  display: string;
  currentInput: string;
  isEditing: boolean;
  history: string[];
  activeOperator: string | null;
}

export type ButtonValue = 'AC' | 'C' | '+/-' | '%' | '÷' | 'x' | '-' | '+' | '=' | ',' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type ButtonConfig = { value: ButtonValue; className?: string };
