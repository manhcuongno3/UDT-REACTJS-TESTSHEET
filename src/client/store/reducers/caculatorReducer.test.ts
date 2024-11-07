import { calculatorReducer } from './calculatorReducer';
import { ADD_DIGIT, CLEAR, CALCULATE, SET_ACTIVE_OPERATOR, CalculatorActionTypes, UPDATE_DISPLAY, UPDATE_CURRENT_INPUT, TOGGLE_EDITING, ADD_HISTORY, CLEAR_ALL_HISTORY } from '../actions/calculatorActions';
import { DEFAULT_DISPLAY, ERROR_DISPLAY } from '../../utils/constants';

describe('calculatorReducer', () => {
  it('should handle ADD_DIGIT', () => {
    const initialState = { display: '0', currentInput: '', history: [] as string[], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: ADD_DIGIT, payload: '5' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.display).toBe('5');
    expect(newState.currentInput).toBe('5');
  });

  it('should handle max length of display is 8', () => {
    const initialState = { display: '0', currentInput: '', history: [], activeOperator: null, isEditing: false };
    let state = calculatorReducer(initialState, { type: ADD_DIGIT, payload: '9' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '9' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '9' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '9' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '9' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '9' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '9' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '9' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '9' });

    expect(state.display).toBe('99999999');
  });

  it('should handle CLEAR', () => {
    const initialState = { display: '123', currentInput: '123', history: [] as string[], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: CLEAR as 'CLEAR' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.display).toBe('0');
    expect(newState.currentInput).toBe('');
  });

  it('should handle UPDATE_DISPLAY', () => {
    const initialState = { display: '0', currentInput: '', history: [], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: UPDATE_DISPLAY as 'UPDATE_DISPLAY', payload: '123' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.display).toBe('123');
  });

  it('should handle CALCULATE', () => {
    const initialState = { display: '0', currentInput: '2+2', history: [] as string[], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: CALCULATE as 'CALCULATE' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.display).toBe('4');
  });

  it('should handle CALCULATE with only operator', () => {
    const initialState = { display: '0', currentInput: '+', history: [] as string[], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: CALCULATE as 'CALCULATE' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.display).toBe('0');
  });

  it('should handle without currentInput', () => {
    const initialState = { display: '0', currentInput: '', history: [] as string[], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: CALCULATE as 'CALCULATE' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.display).toBe('0');
  });

  it('should handle division by zero', () => {
    const initialState = { display: '0', currentInput: '2÷0', history: [] as string[], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: CALCULATE as 'CALCULATE' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.display).toBe(ERROR_DISPLAY);
  });

  it('should handle empty input', () => {
    const initialState = { display: '0', currentInput: '', history: [] as string[], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: CALCULATE as 'CALCULATE' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.display).toBe(DEFAULT_DISPLAY);
    expect(newState.currentInput).toBe('');
    expect(newState.activeOperator).toBeNull();
  });

  it('should handle input contains only division operator (÷) and special operators end with operator', () => {
    const initialState = { display: '0', currentInput: '÷', history: [] as string[], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: CALCULATE as 'CALCULATE' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.display).toBe(ERROR_DISPLAY);
  });

  it('should handle special operators end with operator', () => {
    const initialState = { display: '2', currentInput: '2+', history: [] as string[], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: CALCULATE as 'CALCULATE' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.display).toBe("4");
  });

  it('it should handle percentage', () => {
    const initialState = { display: '2', currentInput: '2%', history: [] as string[], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: CALCULATE as 'CALCULATE' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.display).toBe("0,02");
  });

  it('it should handle percentage without digit', () => {
    const initialState = { display: '0', currentInput: '%', history: [] as string[], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: CALCULATE as 'CALCULATE' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.display).toBe("0");
  });


  it('should handle SET_ACTIVE_OPERATOR', () => {
    const initialState = { display: '2', currentInput: '2', history: [] as string[], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: SET_ACTIVE_OPERATOR as 'SET_ACTIVE_OPERATOR', payload: '+' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.activeOperator).toBe('+');
    expect(newState.currentInput).toBe('2+');
  });

  it('should handle multiple digit inputs', () => {
    const initialState = { display: '0', currentInput: '', history: [] as string[], activeOperator: null, isEditing: false };
    const action1: CalculatorActionTypes = { type: ADD_DIGIT, payload: '1' };
    const action2: CalculatorActionTypes = { type: ADD_DIGIT, payload: '2' };
    const action3: CalculatorActionTypes = { type: ADD_DIGIT, payload: '3' };

    let state = calculatorReducer(initialState, action1);
    state = calculatorReducer(state, action2);
    state = calculatorReducer(state, action3);

    expect(state.display).toBe('123');
    expect(state.currentInput).toBe('123');
  });

  it('should handle decimal points correctly', () => {
    const initialState = { display: '0', currentInput: '', history: [] as string[], activeOperator: null, isEditing: false };
    const action1: CalculatorActionTypes = { type: ADD_DIGIT, payload: '1' };
    const action2: CalculatorActionTypes = { type: ADD_DIGIT, payload: '.' };
    const action3: CalculatorActionTypes = { type: ADD_DIGIT, payload: '5' };

    let state = calculatorReducer(initialState, action1);
    state = calculatorReducer(state, action2);
    state = calculatorReducer(state, action3);

    expect(state.display).toBe('1.5');
    expect(state.currentInput).toBe('1.5');
  });

  it('should handle complex calculations', () => {
    const initialState: {
      display: string;
      currentInput: string;
      history: string[];
      activeOperator: string | null;
      isEditing: boolean;
    } = { display: '0', currentInput: '', history: [], activeOperator: null, isEditing: false };
    let state = initialState;

    // Build calculation: 5 + 3 * 2
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '5' });
    state = calculatorReducer(state, { type: SET_ACTIVE_OPERATOR, payload: '+' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '3' });
    state = calculatorReducer(state, { type: SET_ACTIVE_OPERATOR, payload: '*' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '2' });
    state = calculatorReducer(state, { type: CALCULATE });

    expect(state.display).toBe('11');
  });

  it('should update history after calculation', () => {
    const initialState = {
      display: '0',
      currentInput: '',
      history: [] as string[],
      activeOperator: null as string | null,
      isEditing: false
    };
    let state = initialState;

    // Perform calculation: 2 + 2
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '2' });
    state = calculatorReducer(state, { type: SET_ACTIVE_OPERATOR, payload: '+' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '2' });
    state = calculatorReducer(state, { type: CALCULATE });

    expect(state.history).toContain('2+2 = 4');
  });

  it('should handle consecutive operator changes', () => {
    const initialState = { display: '5', currentInput: '5', history: [], activeOperator: null, isEditing: false };
    let state = calculatorReducer(initialState, { type: SET_ACTIVE_OPERATOR, payload: '+' });
    state = calculatorReducer(state, { type: SET_ACTIVE_OPERATOR, payload: '-' });

    expect(state.activeOperator).toBe('-');
    expect(state.currentInput).toBe('5-');
  });

  it('should handle calculations with negative numbers', () => {
    const initialState = { display: '0', currentInput: '', history: [], activeOperator: null, isEditing: false };
    let state = calculatorReducer(initialState, { type: ADD_DIGIT, payload: '-' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '5' });
    state = calculatorReducer(state, { type: SET_ACTIVE_OPERATOR, payload: '+' });
    state = calculatorReducer(state, { type: ADD_DIGIT, payload: '3' });
    state = calculatorReducer(state, { type: CALCULATE });

    expect(state.display).toBe('-2');
    expect(state.history).toContain('-5+3 = -2');
  });

  it('should handle input containing only operators (+, -, x)', () => {
    const initialState = { display: '0', currentInput: '+', history: [] as string[], activeOperator: null, isEditing: false };
    let state = calculatorReducer(initialState, { type: CALCULATE });
    expect(state.display).toBe('0');
    
    state = { ...initialState, currentInput: '-' };
    state = calculatorReducer(state, { type: CALCULATE });
    expect(state.display).toBe('0');
    
    state = { ...initialState, currentInput: 'x' };
    state = calculatorReducer(state, { type: CALCULATE });
    expect(state.display).toBe('0');
  });
  // ... existing code ...

  it('should handle invalid expressions with ERROR_DISPLAY', () => {
    const initialState = { display: '0', currentInput: '2++2', history: [], activeOperator: null, isEditing: false };
    let state = calculatorReducer(initialState, { type: CALCULATE });
    expect(state.display).toBe(ERROR_DISPLAY);
    expect(state.currentInput).toBe('');
  });

  it('should update currentInput', () => {
    const initialState = { display: '0', currentInput: '2+', history: [], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: UPDATE_CURRENT_INPUT, payload: '2-' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.currentInput).toBe('2-');
  });

  it('should handle toggle editing', () => {
    const initialState = { display: '0', currentInput: '2+', history: [], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: TOGGLE_EDITING };
    const newState = calculatorReducer(initialState, action);
    expect(newState.isEditing).toBe(true);
  });

  it('should handle add history', () => {
    const initialState = { display: '0', currentInput: '2+', history: [], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: ADD_HISTORY, payload: '2+2 = 4' };
    const newState = calculatorReducer(initialState, action);
    expect(newState.history).toContain('2+2 = 4');
  });

  it('should handle clear all history', () => {
    const initialState = { display: '0', currentInput: '2+', history: ['2+2 = 4'], activeOperator: null, isEditing: false };
    const action: CalculatorActionTypes = { type: CLEAR_ALL_HISTORY };
    const newState = calculatorReducer(initialState, action);
    expect(newState.history).toEqual([]);
  });

});
