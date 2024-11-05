export interface DisplayProps {
  value: string;
}

export interface KeypadProps {
  onKeyPress: (value: string) => void;
}

export type ButtonVariant = 'function' | 'operator' | 'number';

export interface KeypadButtonProps {
  value: string;
  className?: string;
  onPress: (value: string) => void;
}
