import * as actions from './calculatorActions';
import {
  ADD_DIGIT,
  CLEAR,
  CALCULATE,
  SET_ACTIVE_OPERATOR,
  UPDATE_CURRENT_INPUT,
  ADD_HISTORY,
  TOGGLE_EDITING,
  UPDATE_DISPLAY,
  CLEAR_ALL_HISTORY
} from './calculatorActions';

describe('Calculator Actions', () => {
  it('should create an action to add a digit', () => {
    const digit = '5';
    const expectedAction = {
      type: ADD_DIGIT,
      payload: digit
    };
    expect(actions.addDigit(digit)).toEqual(expectedAction);
  });

  it('should create an action to clear', () => {
    const expectedAction = {
      type: CLEAR
    };
    expect(actions.clear()).toEqual(expectedAction);
  });

  it('should create an action to calculate', () => {
    const expectedAction = {
      type: CALCULATE
    };
    expect(actions.calculate()).toEqual(expectedAction);
  });

  it('should create an action to set active operator', () => {
    const operator = '+';
    const expectedAction = {
      type: SET_ACTIVE_OPERATOR,
      payload: operator
    };
    expect(actions.setActiveOperator(operator)).toEqual(expectedAction);
  });

  it('should create an action to update current input', () => {
    const input = '123';
    const expectedAction = {
      type: UPDATE_CURRENT_INPUT,
      payload: input
    };
    expect(actions.updateCurrentInput(input)).toEqual(expectedAction);
  });

  it('should create an action to add history', () => {
    const operation = '5 + 3';
    const expectedAction = {
      type: ADD_HISTORY,
      payload: operation
    };
    expect(actions.addHistory(operation)).toEqual(expectedAction);
  });

  it('should create an action to clear all history', () => {
    const expectedAction = {
      type: CLEAR_ALL_HISTORY
    };
    expect(actions.clearAllHistory()).toEqual(expectedAction);
  });

  it('should create an action to toggle editing', () => {
    const expectedAction = {
      type: TOGGLE_EDITING
    };
    expect(actions.toggleEditing()).toEqual(expectedAction);
  });

  it('should create an action to update display', () => {
    const display = '123';
    const expectedAction = {
      type: UPDATE_DISPLAY,
      payload: display
    };
    expect(actions.updateDisplay(display)).toEqual(expectedAction);
  });
});
