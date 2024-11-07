import { createStore } from "redux";
import { calculatorReducer } from "./reducers/calculatorReducer";
import { CalculatorState } from "../types";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist'

export const getInitialState = (): CalculatorState => ({
  display: "0",
  currentInput: "",
  history: [],
  activeOperator: null,
  isEditing: false,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['history'],
}

const persistedReducer = persistReducer(persistConfig, calculatorReducer)


export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
