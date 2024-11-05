import React from "react";
import { KeypadButtonProps } from "./types";

export const KeypadButton: React.FC<KeypadButtonProps> = ({ value, className = '', onPress }) => (
  <button
    className={`key ${className}`.trim()}
    onClick={() => onPress(value)}
  >
    {value}
  </button>
); 