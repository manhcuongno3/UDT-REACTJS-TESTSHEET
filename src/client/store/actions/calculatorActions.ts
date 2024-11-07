import { Operation } from "../../types";

export const ADD_DIGIT = "ADD_DIGIT";
export const CLEAR = "CLEAR";
export const CALCULATE = "CALCULATE";
export const SET_ACTIVE_OPERATOR = "SET_ACTIVE_OPERATOR";
export const UPDATE_CURRENT_INPUT = "UPDATE_CURRENT_INPUT";
export const ADD_HISTORY = "ADD_HISTORY";
export const TOGGLE_EDITING = "TOGGLE_EDITING";
export const UPDATE_DISPLAY = "UPDATE_DISPLAY";
export const CLEAR_ALL_HISTORY = "CLEAR_ALL_HISTORY";
interface AddDigitAction {
  type: typeof ADD_DIGIT;
  payload: string;
  [key: string]: any;
}

interface ClearAction {
  type: typeof CLEAR;
  [key: string]: any;
}

interface CalculateAction {
  type: typeof CALCULATE;
  [key: string]: any;
}

interface SetActiveOperatorAction {
  type: typeof SET_ACTIVE_OPERATOR;
  payload: string;
  [key: string]: any;
}

interface UpdateCurrentInputAction {
  type: typeof UPDATE_CURRENT_INPUT;
  payload: string;
  [key: string]: any;
}

interface AddHistoryAction {
  type: typeof ADD_HISTORY;
  payload: string;
  [key: string]: any;
}

interface ClearAllHistoryAction {
  type: typeof CLEAR_ALL_HISTORY;
  [key: string]: any;
}

interface ToggleEditingAction {
  type: typeof TOGGLE_EDITING;
  [key: string]: any;
}

interface UpdateDisplayAction {
  type: typeof UPDATE_DISPLAY;
  payload: string;
  [key: string]: any;
}

export type CalculatorActionTypes = AddDigitAction | ClearAction | CalculateAction | SetActiveOperatorAction | UpdateCurrentInputAction | AddHistoryAction | ToggleEditingAction | UpdateDisplayAction | ClearAllHistoryAction;

export const addDigit = (digit: string): CalculatorActionTypes => ({
  type: ADD_DIGIT,
  payload: digit,
});
  
export const clear = (): CalculatorActionTypes => ({
  type: CLEAR,
});

export const calculate = (): CalculatorActionTypes => ({
  type: CALCULATE,
});

export const setActiveOperator = (operator: string): CalculatorActionTypes => ({
  type: SET_ACTIVE_OPERATOR,
  payload: operator,
});

export const updateCurrentInput = (input: string): CalculatorActionTypes => ({
  type: UPDATE_CURRENT_INPUT,
  payload: input,
});

export const addHistory = (operation: string): CalculatorActionTypes => ({
  type: ADD_HISTORY,
  payload: operation,
});

export const clearAllHistory = (): CalculatorActionTypes => ({
  type: CLEAR_ALL_HISTORY,
});

export const toggleEditing = (): CalculatorActionTypes => ({
  type: TOGGLE_EDITING,
});

export const updateDisplay = (display: string): CalculatorActionTypes => ({
  type: UPDATE_DISPLAY,
  payload: display,
});