import React from 'react';
import { DisplayProps } from './types';

export const Display: React.FC<DisplayProps> = ({ value }) => (
  <div className="display">{value}</div>
); 