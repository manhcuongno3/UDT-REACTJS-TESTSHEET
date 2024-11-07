// Add at the top of the file
import '../styles/index.scss';

// Move existing Display.tsx content here
// Update import paths:
import { CalculatorState } from "../../../types"; 
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditing } from "../../../store/actions/calculatorActions";

const Display: React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const isEditing = useSelector((state: CalculatorState) => state.isEditing);
  const display = useSelector((state: CalculatorState) => state.display);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Don't trigger if clicking on keypad buttons or the display itself
      if (inputRef.current && 
          !inputRef.current.contains(target) && 
          !target.closest('.keypad') &&
          !target.closest('.display')) {
        dispatch(toggleEditing());
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, dispatch]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditing) {
      dispatch(toggleEditing());
    }
  };

  return (
    <div className="display" onClick={handleClick}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={display}
          autoFocus
          className="display-input"
        />
      ) : (
        <span>{display}</span>
      )}
    </div>
  );
};

export default Display;
