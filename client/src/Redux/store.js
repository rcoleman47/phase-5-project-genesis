import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Reducers/user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    
  },
})