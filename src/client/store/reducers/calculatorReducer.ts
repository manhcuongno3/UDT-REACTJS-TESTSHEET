import { CalculatorActionTypes, ADD_DIGIT, CLEAR, CALCULATE, SET_ACTIVE_OPERATOR, UPDATE_CURRENT_INPUT, ADD_HISTORY, TOGGLE_EDITING, UPDATE_DISPLAY, CLEAR_ALL_HISTORY } from "../actions/calculatorActions";
import { CalculatorState } from "../../types";
import { evaluateExpression, formatResult, isOperator, SPECIAL_OPERATORS } from "../../utils/helpers";
import { DEFAULT_DISPLAY, ERROR_DISPLAY, MAX_DISPLAY_LENGTH } from "../../utils/constants";



const initialState: CalculatorState = {
  display: DEFAULT_DISPLAY,
  currentInput: "",
  history: [],
  activeOperator: null,
  isEditing: false,
};

export const calculatorReducer = (
  state = initialState,
  action: CalculatorActionTypes
): CalculatorState => {
  switch (action.type) {
    case ADD_DIGIT:
      if (state.display.replace(/[^0-9]/g, '').length >= MAX_DISPLAY_LENGTH) {
        return state;
      }

      return {
        ...state,
        display: state.display === DEFAULT_DISPLAY || state.activeOperator || state.currentInput === "" ? action.payload : state.display + action.payload,
        currentInput: state.currentInput + action.payload,
        activeOperator: null,
      };
    case UPDATE_DISPLAY:
      return {
        ...state,
        display: action.payload,
      };
    case CLEAR:
      return {
        ...state,
        display: "0",
        currentInput: "",
        activeOperator: null
      };
    case SET_ACTIVE_OPERATOR:
      // Prevent consecutive operators by replacing the last operator
      const lastChar = state.currentInput.slice(-1);

      return {
        ...state,
        activeOperator: action.payload,
        currentInput: isOperator(lastChar)
          ? state.currentInput.slice(0, -1) + action.payload
          : state.currentInput + action.payload,
      };
    case CALCULATE:
      try {
        if (!state.currentInput) {
          return state;
        }

        // Handle division by zero
        if (state.currentInput.includes('÷0')) {
          return { ...state, display: ERROR_DISPLAY, currentInput: "", activeOperator: null };
        }

        // Handle input contains only division operator (÷)
        if (/[÷]+$/.test(state.currentInput)) {
          return {
            ...state,
            display: state.currentInput.length === 1 ? ERROR_DISPLAY : "1",
            currentInput: "",
            activeOperator: null
          };
        }

        // Handle when input contains only operators (+, -, x) and special operators end with operator
        if (/[+\-x]+$/.test(state.currentInput)) {
          if (state.currentInput.length === 1) {
            return {
              ...state,
              display: DEFAULT_DISPLAY,
              currentInput: "",
              activeOperator: null
            };
          } else {
            // Special experssion end with operator handling
            const lastOperator = state.currentInput.slice(-1);
            const result = SPECIAL_OPERATORS[lastOperator](parseFloat(state.display.replace(',', '.')));
            return {
                ...state,
                display: formatResult(result),
                currentInput: "",
                activeOperator: null
            };
          }
        }

        // Simplified percentage handling
        if (state.currentInput.endsWith('%')) {
          if (state.currentInput.length <= 1) {
            return state;
          }
          if (state.activeOperator) {
            return {
              ...state,
              display: DEFAULT_DISPLAY,
              currentInput: "",
              activeOperator: null
            };
          }
          const baseExpression = state.currentInput.slice(0, -1);
          const result = baseExpression
            ? evaluateExpression(baseExpression) / 100
            : parseFloat(state.display.replace(',', '.')) / 100;

          return {
            ...state,
            display: formatResult(result),
            currentInput: "",
            activeOperator: null,
            history: [...state.history, `${state.currentInput} = ${formatResult(result)}`],
          };
        }

        const result = evaluateExpression(state.currentInput);
        return {
          ...state,
          display: formatResult(result),
          currentInput: "",
          activeOperator: null,
          history: [...state.history, `${state.currentInput} = ${formatResult(result)}`],
        };
      } catch {
        return { ...state, display: ERROR_DISPLAY, currentInput: "", activeOperator: null };
      }
    case UPDATE_CURRENT_INPUT:
      return {
        ...state,
        currentInput: action.payload,
        activeOperator: null
      };
    case TOGGLE_EDITING:
      return { ...state, isEditing: !state.isEditing };
    case ADD_HISTORY:
      return { ...state, history: [...state.history, action.payload] };
    case CLEAR_ALL_HISTORY:
      return { ...state, history: [] };
    default:
      return state;
  }
};
