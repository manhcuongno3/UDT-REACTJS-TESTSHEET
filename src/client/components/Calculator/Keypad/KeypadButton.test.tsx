import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { KeypadButton } from './KeypadButton';

describe('KeypadButton', () => {
  it('renders the button with the correct value', () => {
    const { getByText } = render(<KeypadButton value="1" className="test-class" onPress={() => {}} />);
    const buttonElement = getByText('1');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('key test-class');
  });

  it('calls onPress with the correct value when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<KeypadButton value="1" className="test-class" onPress={onPressMock} />);
    const buttonElement = getByText('1');
    fireEvent.click(buttonElement);
    expect(onPressMock).toHaveBeenCalledWith('1');
  });
}); 