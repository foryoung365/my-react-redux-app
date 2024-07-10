import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import weatherReducer from '../features/weather/weatherSlice';
import quotesReducer from '../features/quotes/quotesSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    weather: weatherReducer,
    quotes: quotesReducer,
  },
});
